using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryManagement.Data;

namespace LibraryManagement.Controllers
{
    /// <summary>
    /// Operational Command Center Controller mirroring dashboard.html.
    /// Calculates live key performance indicators (Total Books, Active Beneficiaries, Current Loans, Staff Roster)
    /// and surfaces real-time chronological borrowing activity feeds (FR-09).
    /// </summary>
    [Authorize]
    public class DashboardController : Controller
    {
        private readonly ApplicationDbContext _context;

        public DashboardController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Dashboard or /
        [AllowAnonymous]
        public async Task<IActionResult> Index()
        {
            // Calculate live system KPIs matching dashboard.html metric cards
            var totalBooks = await _context.Books.CountAsync();
            var activeStudents = await _context.Students.CountAsync();
            var currentlyBorrowed = await _context.Books.CountAsync(b => !b.IsAvailable);
            var activeLibrarians = await _context.Librarians.CountAsync();

            ViewBag.TotalBooks = totalBooks;
            ViewBag.ActiveStudents = activeStudents;
            ViewBag.CurrentlyBorrowed = currentlyBorrowed;
            ViewBag.ActiveLibrarians = activeLibrarians;

            // Fetch recent chronological activity feed matching dashboard activity timeline (FR-09)
            var recentActivity = await _context.BorrowRecords
                .Include(r => r.Publication)
                .AsNoTracking()
                .OrderByDescending(r => r.BorrowDate)
                .Take(8)
                .ToListAsync();

            return View(recentActivity);
        }

        // GET: Dashboard/GetLiveStatsJson (Asynchronous JSON endpoint for frontend dashboard polling)
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetLiveStatsJson()
        {
            var kpiPayload = new
            {
                totalBooks = await _context.Books.CountAsync(),
                activeStudents = await _context.Students.CountAsync(),
                currentlyBorrowed = await _context.Books.CountAsync(b => !b.IsAvailable),
                activeLibrarians = await _context.Librarians.CountAsync(),
                timestamp = DateTime.UtcNow.ToString("O")
            };

            return Json(kpiPayload);
        }
    }
}
