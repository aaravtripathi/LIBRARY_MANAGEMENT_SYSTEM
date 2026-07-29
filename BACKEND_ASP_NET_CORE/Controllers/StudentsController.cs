using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MPOnline.LibraryManagement.Data;
using MPOnline.LibraryManagement.Models;

namespace MPOnline.LibraryManagement.Controllers
{
    /// <summary>
    /// Student Directory Controller mirroring students.html.
    /// Governs student membership ledgers, course enrollments, and borrowing eligibility triggers (FR-07).
    /// </summary>
    [Authorize]
    public class StudentsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public StudentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Students/Index?search=Aarav
        [AllowAnonymous]
        public async Task<IActionResult> Index(string? search)
        {
            var query = _context.Students.AsNoTracking().AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var trimmed = search.Trim();
                query = query.Where(s => s.FullName.Contains(trimmed) || 
                                         s.RegistrationNumber.Contains(trimmed) || 
                                         s.Course.Contains(trimmed));
            }

            var students = await query.OrderBy(s => s.FullName).ToListAsync();
            ViewBag.SearchQuery = search;

            return View(students);
        }

        // POST: Students/Create (Mirrors frontend #student-modal creation workflow)
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Administrator,Librarian")]
        public async Task<IActionResult> Create([Bind("RegistrationNumber,FullName,Email,Course,PhoneNumber")] Student student)
        {
            if (ModelState.IsValid)
            {
                // Verify unique student registration ID and email (UQ_Students_Email)
                if (await _context.Students.AnyAsync(s => s.RegistrationNumber == student.RegistrationNumber))
                {
                    TempData["Error"] = $"Student Registration Number '{student.RegistrationNumber}' already exists in institutional records.";
                    return RedirectToAction(nameof(Index));
                }

                student.IsEligibleToBorrow = true;
                _context.Students.Add(student);
                await _context.SaveChangesAsync();

                TempData["Success"] = $"Student '{student.FullName}' ({student.RegistrationNumber}) successfully registered.";
                return RedirectToAction(nameof(Index));
            }

            TempData["Error"] = "Failed to register student. Please verify all mandatory metadata fields.";
            return RedirectToAction(nameof(Index));
        }

        // POST: Students/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Administrator,Librarian")]
        public async Task<IActionResult> DeleteConfirmed(string id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student != null)
            {
                // Check if student has open, unreturned loans before allowing removal
                bool hasActiveLoans = await _context.BorrowRecords.AnyAsync(r => r.StudentRegistrationNumber == id && r.ReturnDate == null);
                if (hasActiveLoans)
                {
                    TempData["Error"] = $"Cannot remove student ID '{id}' while active borrowed books remain unreturned.";
                    return RedirectToAction(nameof(Index));
                }

                _context.Students.Remove(student);
                await _context.SaveChangesAsync();
                TempData["Success"] = $"Student ID '{id}' removed from active membership directory.";
            }
            return RedirectToAction(nameof(Index));
        }
    }
}
