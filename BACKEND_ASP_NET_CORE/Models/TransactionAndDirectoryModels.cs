using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MPOnline.LibraryManagement.Models
{
    /// <summary>
    /// Chronological borrow ledger and audit trail recording book check-outs, return timestamps, and penalty evaluations.
    /// </summary>
    [Table("BorrowRecords")]
    public class BorrowRecord
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int PublicationId { get; set; }

        [ForeignKey("PublicationId")]
        public virtual Publication? Publication { get; set; }

        [Required]
        [StringLength(50)]
        public string StudentRegistrationNumber { get; set; } = string.Empty;

        [Required]
        public DateTime BorrowDate { get; set; } = DateTime.UtcNow;

        public DateTime DueDate { get; set; } = DateTime.UtcNow.AddDays(14);

        public DateTime? ReturnDate { get; set; }

        [Required]
        [StringLength(100)]
        public string IssuedByLibrarian { get; set; } = "System Operator";

        [Column(TypeName = "decimal(10, 2)")]
        public decimal LateFeePenalty { get; set; } = 0.0m;

        public bool IsReturned => ReturnDate.HasValue;
    }

    /// <summary>
    /// Student beneficiary directory entity tracking registration credentials, courses, and borrowing eligibility.
    /// </summary>
    [Table("Students")]
    public class Student
    {
        [Key]
        [StringLength(50)]
        public string RegistrationNumber { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Course { get; set; } = "B.Tech Computer Science";

        [Phone]
        public string PhoneNumber { get; set; } = string.Empty;

        public bool IsEligibleToBorrow { get; set; } = true;
    }

    /// <summary>
    /// Administrative personnel roster monitoring library employees, work shift assignments, and email coordinates.
    /// </summary>
    [Table("Librarians")]
    public class Librarian
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string DesignatedShift { get; set; } = "Morning Shift (08:00 - 14:00)";

        [Required]
        public string EmployeeId { get; set; } = string.Empty;
    }
}
