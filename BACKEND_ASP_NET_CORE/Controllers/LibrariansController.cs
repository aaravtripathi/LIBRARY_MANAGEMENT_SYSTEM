using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryManagement.Data;
using LibraryManagement.Models;

namespace LibraryManagement.Controllers
{
    /// <summary>
    /// Staff Roster and Shift Supervision Controller mirroring librarians.html.
    /// Manages librarian personnel records, employee identification endpoints, and designated work shift schedules (FR-08).
    /// </summary>
    [Authorize(Roles = "Administrator")]
    public class LibrariansController : Controller
    {
        private readonly ApplicationDbContext _context;

        public LibrariansController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Librarians/Index
        [AllowAnonymous]
        public async Task<IActionResult> Index()
        {
            var roster = await _context.Librarians
                .AsNoTracking()
                .OrderBy(l => l.Name)
                .ToListAsync();

            return View(roster);
        }

        // POST: Librarians/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Name,Email,DesignatedShift,EmployeeId")] Librarian librarian)
        {
            if (ModelState.IsValid)
            {
                _context.Librarians.Add(librarian);
                await _context.SaveChangesAsync();
                TempData["Success"] = $"Staff member '{librarian.Name}' added to active supervision roster.";
                return RedirectToAction(nameof(Index));
            }
            return View(librarian);
        }

        // POST: Librarians/UpdateShift/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> UpdateShift(int id, string designatedShift)
        {
            var librarian = await _context.Librarians.FindAsync(id);
            if (librarian != null)
            {
                librarian.DesignatedShift = string.IsNullOrWhiteSpace(designatedShift) ? "Morning Shift" : designatedShift.Trim();
                await _context.SaveChangesAsync();
                TempData["Success"] = $"Shift assignment for '{librarian.Name}' updated to '{librarian.DesignatedShift}'.";
            }
            return RedirectToAction(nameof(Index));
        }

        // POST: Librarians/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var librarian = await _context.Librarians.FindAsync(id);
            if (librarian != null)
            {
                _context.Librarians.Remove(librarian);
                await _context.SaveChangesAsync();
                TempData["Success"] = $"Librarian record #{id} removed from personnel roster.";
            }
            return RedirectToAction(nameof(Index));
        }
    }
}
