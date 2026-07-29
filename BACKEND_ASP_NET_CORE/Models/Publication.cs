using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MPOnline.LibraryManagement.Models
{
    /// <summary>
    /// Publication Types for Table-Per-Hierarchy (TPH) inheritance modeling in Entity Framework Core.
    /// Eliminates database redundancy across Books, Academic Journals, Newspapers, and Serialized Magazines.
    /// </summary>
    public enum PublicationType
    {
        Book = 0,
        Newspaper = 1,
        Magazine = 2,
        AcademicJournal = 3
    }

    /// <summary>
    /// Consolidated primary inventory entity mapped to dbo.Publications table via TPH inheritance.
    /// </summary>
    [Table("Publications")]
    public abstract class Publication
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(150, MinimumLength = 2, ErrorMessage = "Title must be between 2 and 150 characters.")]
        public string Title { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Publisher { get; set; } = "Library Press";

        [Required]
        [DataType(DataType.Date)]
        public DateTime PublishedDate { get; set; } = DateTime.UtcNow.Date;

        [Required]
        public PublicationType Type { get; set; }

        [Required]
        public bool IsAvailable { get; set; } = true;

        [StringLength(20)]
        public string ShelfLocation { get; set; } = "General Stack";
    }

    /// <summary>
    /// Concrete Book entity containing author citations, international standard book numbers (ISBN), and edition details.
    /// </summary>
    public class Book : Publication
    {
        [Required]
        [StringLength(100)]
        public string Author { get; set; } = string.Empty;

        [Required]
        [StringLength(20)]
        public string ISBN { get; set; } = string.Empty;

        public int Edition { get; set; } = 1;

        public Book()
        {
            Type = PublicationType.Book;
        }
    }

    /// <summary>
    /// Daily institutional newspaper publication entity with regional circulation tracking.
    /// </summary>
    public class Newspaper : Publication
    {
        [StringLength(50)]
        public string CityOfCirculation { get; set; } = "Bhopal";

        public bool IsMorningEdition { get; set; } = true;

        public Newspaper()
        {
            Type = PublicationType.Newspaper;
        }
    }

    /// <summary>
    /// Serialized digital or printed magazine periodical publication entity.
    /// </summary>
    public class Magazine : Publication
    {
        [StringLength(50)]
        public string Periodicity { get; set; } = "Monthly";

        public int IssueNumber { get; set; }

        public Magazine()
        {
            Type = PublicationType.Magazine;
        }
    }
}
