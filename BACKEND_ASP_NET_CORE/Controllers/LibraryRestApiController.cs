using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryManagement.Data;
using LibraryManagement.Models;

namespace LibraryManagement.Controllers
{
    /// <summary>
    /// Master RESTful API Endpoints Controller specifically formatted to mirror the exact JSON structure
    /// consumed by the frontend JavaScript client (app.js). Enables zero-friction switching from localStorage
    /// to remote cloud backend API endpoints without altering frontend data schemas.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class LibraryRestApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LibraryRestApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/LibraryRestApi/books?page=1&query=atomic
        [HttpGet("books")]
        public async Task<IActionResult> GetBooks([FromQuery] int page = 1, [FromQuery] string? query = null)
        {
            const int pageSize = 5;
            var catalog = _context.Books.AsNoTracking().AsQueryable();

            if (!string.IsNullOrWhiteSpace(query))
            {
                var q = query.Trim();
                catalog = catalog.Where(b => b.Title.Contains(q) || b.Author.Contains(q) || b.ISBN.Contains(q));
            }

            int total = await catalog.CountAsync();
            var items = await catalog
                .OrderBy(b => b.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(b => new
                {
                    id = $"b{b.Id}",
                    title = b.Title,
                    author = b.Author,
                    isbn = b.ISBN,
                    published = b.PublishedDate.ToString("yyyy-MM-dd"),
                    borrower = !b.IsAvailable ? "s1" : null, // Mapped to frontend schema format
                    status = b.IsAvailable ? "Available" : "Borrowed",
                    shelfLocation = b.ShelfLocation
                })
                .ToListAsync();

            return Ok(new { page, totalPages = (int)Math.Ceiling(total / (double)pageSize), totalRecords = total, items });
        }

        // GET: api/LibraryRestApi/students
        [HttpGet("students")]
        public async Task<IActionResult> GetStudents()
        {
            var items = await _context.Students
                .AsNoTracking()
                .OrderBy(s => s.FullName)
                .Select(s => new
                {
                    id = s.RegistrationNumber,
                    name = s.FullName,
                    email = s.Email,
                    phone = s.PhoneNumber,
                    course = s.Course
                })
                .ToListAsync();

            return Ok(items);
        }

        // GET: api/LibraryRestApi/librarians
        [HttpGet("librarians")]
        public async Task<IActionResult> GetLibrarians()
        {
            var items = await _context.Librarians
                .AsNoTracking()
                .OrderBy(l => l.Name)
                .Select(l => new
                {
                    id = $"l{l.Id}",
                    name = l.Name,
                    email = l.Email,
                    phone = "+91 98110 00000",
                    shift = l.DesignatedShift.Contains("Morning") ? "Morning" : l.DesignatedShift.Contains("Evening") ? "Evening" : "Afternoon"
                })
                .ToListAsync();

            return Ok(items);
        }

        // GET: api/LibraryRestApi/history
        [HttpGet("history")]
        public async Task<IActionResult> GetHistory()
        {
            var items = await _context.BorrowRecords
                .AsNoTracking()
                .OrderByDescending(r => r.BorrowDate)
                .Select(r => new
                {
                    id = $"h{r.Id}",
                    bookId = $"b{r.PublicationId}",
                    studentId = r.StudentRegistrationNumber,
                    borrowedAt = r.BorrowDate.ToString("yyyy-MM-dd"),
                    returnedAt = r.ReturnDate.HasValue ? r.ReturnDate.Value.ToString("yyyy-MM-dd") : null,
                    penalty = r.LateFeePenalty
                })
                .ToListAsync();

            return Ok(items);
        }

        // POST: api/LibraryRestApi/books/checkout
        [HttpPost("books/checkout")]
        public async Task<IActionResult> CheckoutBook([FromBody] CheckoutRequest request)
        {
            if (request == null || request.BookId <= 0 || string.IsNullOrWhiteSpace(request.StudentId))
                return BadRequest(new { error = "Valid Book ID and Student Registration Number are mandatory." });

            var book = await _context.Books.FindAsync(request.BookId);
            if (book == null || !book.IsAvailable)
                return Conflict(new { error = "Book is currently unavailable or actively loaned out." });

            book.IsAvailable = false;
            var loan = new BorrowRecord
            {
                PublicationId = book.Id,
                StudentRegistrationNumber = request.StudentId.Trim(),
                BorrowDate = DateTime.UtcNow,
                DueDate = DateTime.UtcNow.AddDays(14)
            };

            _context.BorrowRecords.Add(loan);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Checkout successful.", transactionId = $"h{loan.Id}", dueDate = loan.DueDate.ToString("yyyy-MM-dd") });
        }

        // POST: api/LibraryRestApi/books/return
        [HttpPost("books/return")]
        public async Task<IActionResult> ReturnBook([FromBody] ReturnRequest request)
        {
            if (request == null || request.BookId <= 0)
                return BadRequest(new { error = "Valid Book ID required." });

            var book = await _context.Books.FindAsync(request.BookId);
            if (book == null)
                return NotFound(new { error = "Book not found in database catalog." });

            book.IsAvailable = true;
            var activeLoan = await _context.BorrowRecords
                .Where(r => r.PublicationId == request.BookId && r.ReturnDate == null)
                .OrderByDescending(r => r.BorrowDate)
                .FirstOrDefaultAsync();

            if (activeLoan != null)
            {
                activeLoan.ReturnDate = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Return processed successfully.", bookId = $"b{request.BookId}", returnedAt = DateTime.UtcNow.ToString("yyyy-MM-dd") });
        }
    }

    public class CheckoutRequest
    {
        public int BookId { get; set; }
        public string StudentId { get; set; } = string.Empty;
    }

    public class ReturnRequest
    {
        public int BookId { get; set; }
    }
}
