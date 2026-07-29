using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MPOnline.LibraryManagement.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Dependency Injection Configuration & Database Context Setup
// Utilizes Microsoft SQL Server in production environments and tests with Entity Framework Core ORM
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? "Server=(localdb)\\mssqllocaldb;Database=MPOnline_LMS_ProductionDB;Trusted_Connection=True;";

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// 2. ASP.NET Core Identity & Role-Based Access Control (RBAC) Registration
// Binds canonical user credentials (Id, Email, PasswordHash, LockoutEnd) and security roles directly to SQL tables
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options => {
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequireUppercase = true;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

// 3. Cross-Origin Resource Sharing (CORS) Configuration for AWS S3 Static Hosting
// Enables regional AWS CloudFront and S3 bucket origins to interact securely with private cloud APIs
var staticOrigin = builder.Configuration["CloudStorageConfiguration:StaticFrontendOrigin"] 
    ?? "https://mponline-library-portal-2026.s3.ap-south-1.amazonaws.com";

builder.Services.AddCors(options => {
    options.AddPolicy("AllowS3StaticFrontend", policy => {
        policy.WithOrigins(staticOrigin, "http://localhost:3000", "http://localhost:5000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

var app = builder.Build();

// 4. HTTP Request Pipeline Configuration
if (app.Environment.IsDevelopment()) {
    app.UseDeveloperExceptionPage();
} else {
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("AllowS3StaticFrontend");

// CRITICAL ENGINEERING ORDER MANDATED BY ASP.NET CORE PIPELINE:
// app.UseAuthentication() MUST execute directly before app.UseAuthorization() and after UseRouting()
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Dashboard}/{action=Index}/{id?}");

app.MapRazorPages();

app.Run();
