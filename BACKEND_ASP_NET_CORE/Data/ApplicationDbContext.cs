using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using LibraryManagement.Models;

namespace LibraryManagement.Data
{
    /// <summary>
    /// Master database context inheriting from IdentityDbContext to integrate normalized security membership
    /// tables (AspNetUsers, AspNetRoles, AspNetUserRoles) with enterprise library inventory schemas.
    /// </summary>
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Publication> Publications { get; set; } = default!;
        public DbSet<Book> Books { get; set; } = default!;
        public DbSet<Newspaper> Newspapers { get; set; } = default!;
        public DbSet<Magazine> Magazines { get; set; } = default!;
        public DbSet<BorrowRecord> BorrowRecords { get; set; } = default!;
        public DbSet<Student> Students { get; set; } = default!;
        public DbSet<Librarian> Librarians { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configure Table-Per-Hierarchy (TPH) inheritance mapping on consolidated Publications table
            builder.Entity<Publication>()
                .ToTable("Publications")
                .HasDiscriminator<PublicationType>(p => p.Type)
                .HasValue<Book>(PublicationType.Book)
                .HasValue<Newspaper>(PublicationType.Newspaper)
                .HasValue<Magazine>(PublicationType.Magazine);

            // Instantiate composite non-clustered indexes across Title and Author to accelerate real-time fuzzy search matches
            builder.Entity<Book>()
                .HasIndex(b => new { b.Title, b.Author })
                .HasDatabaseName("IX_Books_Title_Author");

            // Define check constraints and relationships
            builder.Entity<BorrowRecord>()
                .HasOne(br => br.Publication)
                .WithMany()
                .HasForeignKey(br => br.PublicationId)
                .OnDelete(DeleteBehavior.Restrict);

            // Seed demonstration baseline catalog records for automated Quality Assurance verification
            builder.Entity<Book>().HasData(
                new Book { Id = 1, Title = "Clean Architecture: A Craftsman's Guide to Software Structure", Author = "Robert C. Martin", ISBN = "978-0134494166", Publisher = "Prentice Hall", PublishedDate = new DateTime(2017, 9, 20), IsAvailable = true, ShelfLocation = "CS-A10" },
                new Book { Id = 2, Title = "Designing Data-Intensive Applications", Author = "Martin Kleppmann", ISBN = "978-1449373320", Publisher = "O'Reilly Media", PublishedDate = new DateTime(2017, 3, 16), IsAvailable = false, ShelfLocation = "DB-C04" },
                new Book { Id = 3, Title = "C# 12 and .NET 8 - Modern Cross-Platform Development Fundamentals", Author = "Mark J. Price", ISBN = "978-1837633256", Publisher = "Packt Publishing", PublishedDate = new DateTime(2023, 11, 14), IsAvailable = true, ShelfLocation = "NET-B02" },
                new Book { Id = 4, Title = "Cloud Native DevOps with Kubernetes", Author = "John Arundel & Justin Domingus", ISBN = "978-1492040955", Publisher = "O'Reilly Media", PublishedDate = new DateTime(2019, 3, 29), IsAvailable = true, ShelfLocation = "CLD-E01" },
                new Book { Id = 5, Title = "The Pragmatic Programmer: Your Journey to Mastery", Author = "David Thomas & Andrew Hunt", ISBN = "978-0135957059", Publisher = "Addison-Wesley Professional", PublishedDate = new DateTime(2019, 9, 13), IsAvailable = true, ShelfLocation = "CS-A12" }
            );

            builder.Entity<Student>().HasData(
                new Student { RegistrationNumber = "IN26012764", FullName = "Aarav Tripathi", Email = "aarav.tripathi@github.com", Course = "Advanced Software Engineering Internship [11A]", PhoneNumber = "+91-9876543210", IsEligibleToBorrow = true }
            );
        }
    }
}
