using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;
using Moq;
using MPOnline.LibraryManagement.Controllers;
using MPOnline.LibraryManagement.Data;
using MPOnline.LibraryManagement.Models;
using Xunit;

namespace MPOnline.LibraryManagement.Tests
{
    /// <summary>
    /// Master QA Automated Test Harness executing xUnit isolated unit tests and FluentAssertions readable assertions
    /// against Microsoft EF Core In-Memory Database instances. Directly validates normal operational paths, boundary defaults,
    /// and concurrency error conditions documented in Section 7.3 (UT-01 to UT-08).
    /// </summary>
    public class BooksControllerTests : IDisposable
    {
        private readonly ApplicationDbContext _context;
        private readonly BooksController _controller;

        public BooksControllerTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new ApplicationDbContext(options);
            _context.Database.EnsureCreated();

            _controller = new BooksController(_context)
            {
                TempData = new TempDataDictionary(new Microsoft.AspNetCore.Http.DefaultHttpContext(), Mock.Of<ITempDataProvider>())
            };
        }

        // UT-01: Empty search returns default page 1 with exactly pageSize (5) items.
        [Fact]
        public async Task UT01_Index_EmptySearch_ReturnsDefaultPage1_WithExactlyPageSizeItems()
        {
            // Act
            var result = await _controller.Index(query: null, page: 1);

            // Assert using FluentAssertions English-like syntax
            var viewResult = result.Should().BeOfType<ViewResult>().Subject;
            var model = viewResult.Model.Should().BeAssignableTo<IEnumerable<Book>>().Subject;
            model.Count().Should().Be(5, "default windowed pagination size is configured to 5 records per page");
            ((int)_controller.ViewBag.CurrentPage).Should().Be(1);
        }

        // UT-02: Valid search term ('Kubernetes') extracts solely matching book entities.
        [Fact]
        public async Task UT02_Index_ValidSearchTerm_ReturnsOnlyMatchingBookEntities()
        {
            // Act
            var result = await _controller.Index(query: "Kubernetes", page: 1);

            // Assert
            var viewResult = result.Should().BeOfType<ViewResult>().Subject;
            var model = viewResult.Model.Should().BeAssignableTo<IEnumerable<Book>>().Subject;
            model.Should().ContainSingle()
                 .Which.Title.Should().Contain("Kubernetes");
        }

        // UT-03: Page out-of-bounds (page > TotalPages) clamps gracefully to last valid page.
        [Fact]
        public async Task UT03_Index_PageOutOfBounds_ClampsToLastPage()
        {
            // Act
            var result = await _controller.Index(query: null, page: 99);

            // Assert
            var viewResult = result.Should().BeOfType<ViewResult>().Subject;
            int currentPage = (int)_controller.ViewBag.CurrentPage;
            int totalPages = (int)_controller.ViewBag.TotalPages;
            currentPage.Should().Be(totalPages, "system automatically adjusts out-of-bounds pagination indices to upper bound");
        }

        // UT-04: Querying non-existent Book ID (id=999) sets warning and returns NotFound.
        [Fact]
        public async Task UT04_Details_NonExistentBookId_ReturnsNotFound()
        {
            // Act
            var result = await _controller.Details(id: 999);

            // Assert
            result.Should().BeOfType<NotFoundResult>();
        }

        // UT-05: Valid POST submission saves entity to InMemory context and redirects.
        [Fact]
        public async Task UT05_Create_ValidPostSubmission_SavesEntityAndRedirectsToIndex()
        {
            // Arrange
            var newBook = new Book
            {
                Title = "Enterprise Software Reliability and Systems Architecture",
                Author = "Aarav Tripathi",
                ISBN = "978-0987654321",
                Publisher = "MPOnline Press",
                PublishedDate = DateTime.UtcNow.Date,
                ShelfLocation = "ADV-01"
            };

            // Act
            var result = await _controller.Create(newBook);

            // Assert
            result.Should().BeOfType<RedirectToActionResult>()
                  .Which.ActionName.Should().Be("Index");
            _context.Books.Count().Should().Be(6, "database context expands by 1 item after successful creation");
        }

        // UT-06: Attempting to delete a currently borrowed book aborts and presents warning (RSK-02 safeguard).
        [Fact]
        public async Task UT06_DeleteConfirmed_ActiveBorrowedBook_AbortsDeletionWithWarning()
        {
            // Arrange: Item ID #2 (Designing Data-Intensive Applications) is seeded with IsAvailable = false
            int targetId = 2;

            // Act
            var result = await _controller.DeleteConfirmed(targetId);

            // Assert
            result.Should().BeOfType<RedirectToActionResult>();
            _controller.TempData["Error"].Should().NotBeNull();
            _context.Books.Any(b => b.Id == targetId).Should().BeTrue("active loaned books cannot be removed from catalog schemas");
        }

        // UT-07: Valid check-out shifts IsAvailable to false and creates BorrowRecord.
        [Fact]
        public async Task UT07_Borrow_ValidCheckout_ShiftsAvailabilityAndCreatesBorrowRecord()
        {
            // Arrange: Book ID #1 is available; borrow to Student ID IN26012764
            int targetId = 1;
            string studentId = "IN26012764";

            // Act
            var result = await _controller.Borrow(targetId, studentId);

            // Assert
            var book = await _context.Books.FindAsync(targetId);
            book!.IsAvailable.Should().BeFalse();

            var loanRecord = await _context.BorrowRecords.FirstOrDefaultAsync(r => r.PublicationId == targetId);
            loanRecord.Should().NotBeNull();
            loanRecord!.StudentRegistrationNumber.Should().Be(studentId);
        }

        // UT-08: Returning item marks availability true and seals return timestamp.
        [Fact]
        public async Task UT08_Return_ValidReturn_RestoresAvailabilityAndSealsTimestamp()
        {
            // Arrange: Create active loan for Book #2
            var book = await _context.Books.FindAsync(2);
            var loan = new BorrowRecord { PublicationId = 2, StudentRegistrationNumber = "IN26012764", BorrowDate = DateTime.UtcNow.AddDays(-5) };
            _context.BorrowRecords.Add(loan);
            await _context.SaveChangesAsync();

            // Act
            var result = await _controller.Return(id: 2);

            // Assert
            var updatedBook = await _context.Books.FindAsync(2);
            updatedBook!.IsAvailable.Should().BeTrue();

            var updatedLoan = await _context.BorrowRecords.FindAsync(loan.Id);
            updatedLoan!.ReturnDate.Should().NotBeNull("returning an asset seals the operational audit timestamp");
        }

        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }
    }
}
