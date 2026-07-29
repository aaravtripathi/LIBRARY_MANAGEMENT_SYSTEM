using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace MPOnline.LibraryManagement.Controllers
{
    /// <summary>
    /// Authentication gateway orchestrating ASP.NET Core Identity Service Managers (UserManager, SignInManager, RoleManager).
    /// Enforces cryptographic password hashing (bcrypt / PBKDF2), persistent cookie sessions, and Role-Based Access Control.
    /// </summary>
    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccountController(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        // GET: Account/Login
        [HttpGet]
        public IActionResult Login(string? returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl ?? "/Dashboard";
            return View();
        }

        // POST: Account/Login
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(string username, string password, bool rememberMe, string? returnUrl = null)
        {
            returnUrl ??= "/Dashboard";
            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
            {
                ModelState.AddModelError(string.Empty, "Both username and cryptographic password credentials are required.");
                return View();
            }

            // Validate against normalized Identity repository (AspNetUsers)
            var result = await _signInManager.PasswordSignInAsync(username, password, rememberMe, lockoutOnFailure: true);
            if (result.Succeeded)
            {
                return LocalRedirect(returnUrl);
            }
            if (result.IsLockedOut)
            {
                ModelState.AddModelError(string.Empty, "Account locked due to consecutive failed login attempts. Try again in 15 minutes.");
                return View();
            }

            ModelState.AddModelError(string.Empty, "Invalid login credentials.");
            return View();
        }

        // POST: Account/Logout
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }

        // POST: Account/SeedRoles (Administrative utility to initialize institutional Role-Based Security Groups)
        [HttpPost]
        public async Task<IActionResult> InitializeInstitutionalRoles()
        {
            string[] institutionalRoles = { "Administrator", "Librarian", "Member" };
            foreach (var role in institutionalRoles)
            {
                if (!await _roleManager.RoleExistsAsync(role))
                {
                    await _roleManager.CreateAsync(new IdentityRole(role));
                }
            }
            return Ok("Institutional roles (Administrator, Librarian, Member) successfully created in AspNetRoles repository.");
        }
    }
}
