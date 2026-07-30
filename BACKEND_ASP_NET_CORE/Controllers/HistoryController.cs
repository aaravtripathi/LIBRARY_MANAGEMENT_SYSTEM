using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryManagement.Data;
using LibraryManagement.Models;

namespace LibraryManagement.Controllers
{
    /// <summary>
    /// Chronological Audit Ledger and Transaction Controller mirroring history.html.
    /// Tracks complete borrowing histories, evaluates item return completion states,
    /// and performs compounding financial penalty assessments on overdue active loans (FR-05, FR-06).
    /// </summary>
    [Authorize]
    public class HistoryController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HistoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: History/Index?statusFilter=active
        [AllowAnonymous]
        public async Task<IActionResult> Index(string? statusFilter)
        {
            var ledgers = _context.BorrowRecords
                .Include(r => r.Publication)
                .AsNoTracking()
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(statusFilter))
            {
                if (statusFilter.Equals("active", StringComparison.OrdinalIgnoreCase))
                {
                    ledgers = ledgers.Where(r => r.ReturnDate == null);
                }
                else if (statusFilter.Equals("returned", StringComparison.OrdinalIgnoreCase))
                {
                    ledgers = ledgers.Where(r => r.ReturnDate != null);
                }
            }

            var historyList = await ledgers.OrderByDescending(r => r.BorrowDate).ToListAsync();
            ViewBag.StatusFilter = statusFilter;

            return View(historyList);
        }

        // POST: History/EvaluatePenalties (Executes automated penalty logic matching Chapter 10 roadmap)
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Administrator,Librarian")]
        public async Task<IActionResult> EvaluatePenalties()
        {
            var overdueLoans = await _context.BorrowRecords
                .Where(r => r.ReturnDate == null && r.DueDate < DateTime.UtcNow)
                .ToListAsync();

            int updatedCount = 0;
            const decimal dailyPenaltyRate = 10.0m; // 10 INR per overdue day per logical bug classification rule (Section 8.4)

            foreach (var loan in overdueLoans)
            {
                int overdueDays = (DateTime.UtcNow.Date - loan.DueDate.Date).Days;
                if (overdueDays > 0)
                {
                    decimal calculatedFee = overdueDays * dailyPenaltyRate;
                    if (loan.LateFeePenalty != calculatedFee)
                    {
                        loan.LateFeePenalty = calculatedFee;
                        updatedCount++;
                    }
                }
            }

            if (updatedCount > 0)
            {
                await _context.SaveChangesAsync();
                TempData["Success"] = $"Successfully evaluated and updated overdue compounding penalties for {updatedCount} active loans.";
            }
            else
            {
                TempData["Info"] = "No new overdue penalties required updating; all active loans remain within grace tolerances.";
            }

            return RedirectToAction(nameof(Index));
        }

        // GET: History/ExportLedgerJson
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ExportLedgerJson()
        {
            var data = await _context.BorrowRecords
                .Include(r => r.Publication)
                .AsNoTracking()
                .Select(r => new
                {
                    transactionId = r.Id,
                    publicationTitle = r.Publication != null ? r.Publication.Title : "Uncataloged Asset",
                    studentId = r.StudentRegistrationNumber,
                    borrowedAt = r.BorrowDate.ToString("yyyy-MM-dd"),
                    dueDate = r.DueDate.ToString("yyyy-MM-dd"),
                    returnedAt = r.ReturnDate.HasValue ? r.ReturnDate.Value.ToString("yyyy-MM-dd") : null,
                    status = r.ReturnDate.HasValue ? "Returned" : "Active",
                    penaltyInr = r.LateFeePenalty
                })
                .ToListAsync();

            return Json(data);
        }
    }
}
