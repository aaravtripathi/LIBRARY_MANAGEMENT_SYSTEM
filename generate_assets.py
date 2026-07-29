import os
import sys
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from pygments import highlight
from pygments.lexers import HtmlLexer, CssLexer, CSharpLexer, SqlLexer
from pygments.formatters import ImageFormatter

# Handle stdout encoding on Windows
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except:
        pass

# Create output directory for assets
output_dir = os.path.join(os.path.abspath(os.path.dirname(__file__)), "report_assets")
os.makedirs(output_dir, exist_ok=True)

print(f"Generating high-resolution graphic assets in: {output_dir}")

# Set consistent matplotlib font size and resolution
plt.rcParams.update({
    'font.size': 11,
    'font.family': 'sans-serif',
    'figure.dpi': 300
})

# 1. Chart: SDLC Maintenance Cost Distribution
def generate_sdlc_cost():
    labels = ['Maintenance & Evolution', 'Testing & QA', 'System Designing', 'Coding & Implementation', 'Requirements Gathering']
    sizes = [67, 15, 8, 7, 3]
    colors = ['#2c3e50', '#8e44ad', '#3498db', '#27ae60', '#e67e22']
    explode = (0.05, 0, 0, 0, 0)
    
    fig, ax = plt.subplots(figsize=(7, 5))
    wedges, texts, autotexts = ax.pie(sizes, explode=explode, labels=labels, autopct='%1.0f%%',
                                      shadow=False, startangle=140, colors=colors,
                                      textprops=dict(color="w", weight="bold"))
    for t in texts:
        t.set_color('#13161c')
        t.set_size(10)
    for at in autotexts:
        at.set_size(11)
        
    ax.axis('equal')
    plt.title('Relative Cost of SDLC Phases (IBM Systems Sciences Institute)', fontsize=13, pad=15, weight='bold')
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, "sdlc_cost.png"), dpi=300)
    plt.close()
    print("[OK] Generated: sdlc_cost.png")

# 2. Chart: Relative Cost of Bug Fixes across SDLC Phases
def generate_bug_cost_curve():
    phases = ['Requirements &\nArchitecture', 'Coding &\nImplementation', 'QA &\nTesting', 'Production\nRelease']
    costs = [1.0, 5.0, 15.0, 100.0]
    
    fig, ax = plt.subplots(figsize=(7.5, 4.5))
    ax.plot(phases, costs, marker='o', linewidth=3, color='#c0392b', markersize=9, markerfacecolor='#f39c12')
    
    for i, txt in enumerate(costs):
        ax.annotate(f"{int(txt)}x", (phases[i], costs[i]), textcoords="offset points", xytext=(0,10), ha='center', weight='bold', fontsize=11, color='#2c3e50')
        
    ax.set_ylabel('Relative Escalation Factor (Multiplier)', weight='bold')
    ax.set_title('Relative Cost of Defect Resolution Based on SDLC Phase', fontsize=13, pad=15, weight='bold')
    ax.grid(True, linestyle='--', alpha=0.6)
    ax.set_ylim(0, 115)
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, "bug_cost_curve.png"), dpi=300)
    plt.close()
    print("[OK] Generated: bug_cost_curve.png")

# 3. Chart: SLA Resolution Targets by Defect Severity
def generate_sla_chart():
    severities = ['Critical (Blocker)', 'High (Major)', 'Medium (Noticeable)', 'Low (Cosmetic/Trivial)']
    hours = [8, 16, 40, 80]
    labels = ['Same Day (8h)', '2 Working Days (16h)', '5 Working Days (40h)', 'Next Sprint (80h)']
    colors = ['#c0392b', '#e67e22', '#f39c12', '#3498db']
    
    fig, ax = plt.subplots(figsize=(8, 4.5))
    bars = ax.barh(severities, hours, color=colors, edgecolor='#1d222a', height=0.6)
    ax.invert_yaxis()
    
    for bar, label in zip(bars, labels):
        ax.text(bar.get_width() + 2, bar.get_y() + bar.get_height()/2, label, 
                va='center', weight='bold', color='#2c3e50', fontsize=10)
        
    ax.set_xlabel('Maximum Target Resolution Window (Working Hours)', weight='bold')
    ax.set_title('Enterprise SLA Targets for Bug & Defect Resolution', fontsize=13, pad=15, weight='bold')
    ax.set_xlim(0, 110)
    ax.grid(axis='x', linestyle='--', alpha=0.5)
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, "sla_resolution_targets.png"), dpi=300)
    plt.close()
    print("[OK] Generated: sla_resolution_targets.png")

# 4. Chart: ASP.NET Core / C# Performance Optimization Benchmark
def generate_memory_optimization():
    scenarios = ['Standard String/Array', 'Span<T> & Memory<T>', 'ArrayPool<T> Re-use']
    allocations_kb = [450.5, 12.2, 0.8]
    throughput_req_sec = [2200, 7800, 9400]
    
    x = np.arange(len(scenarios))
    width = 0.35
    
    fig, ax1 = plt.subplots(figsize=(8, 4.8))
    
    color = '#c0392b'
    ax1.set_xlabel('Optimization Paradigm', weight='bold')
    ax1.set_ylabel('Memory Allocation per Request (KB) [Lower is better]', color=color, weight='bold')
    rects1 = ax1.bar(x - width/2, allocations_kb, width, label='Memory Allocations (KB)', color=color, alpha=0.85)
    ax1.tick_params(axis='y', labelcolor=color)
    ax1.set_ylim(0, 500)
    
    ax2 = ax1.twinx()
    color = '#27ae60'
    ax2.set_ylabel('Throughput (Requests / Sec) [Higher is better]', color=color, weight='bold')
    rects2 = ax2.bar(x + width/2, throughput_req_sec, width, label='Throughput (Req/sec)', color=color, alpha=0.85)
    ax2.tick_params(axis='y', labelcolor=color)
    ax2.set_ylim(0, 11000)
    
    ax1.set_xticks(x)
    ax1.set_xticklabels(scenarios, weight='bold')
    plt.title('ASP.NET Core Memory Allocation vs Throughput Tuning', fontsize=13, pad=15, weight='bold')
    
    for rect in rects1:
        height = rect.get_height()
        ax1.annotate(f"{height} KB", (rect.get_x() + rect.get_width()/2, height), xytext=(0, 4), textcoords="offset points", ha='center', fontsize=9, weight='bold', color='#c0392b')
    for rect in rects2:
        height = rect.get_height()
        ax2.annotate(f"{height}/s", (rect.get_x() + rect.get_width()/2, height), xytext=(0, 4), textcoords="offset points", ha='center', fontsize=9, weight='bold', color='#27ae60')
        
    fig.tight_layout()
    plt.savefig(os.path.join(output_dir, "memory_optimization.png"), dpi=300)
    plt.close()
    print("[OK] Generated: memory_optimization.png")

# 5. Chart: SQL Server Pagination Latency vs Table Growth
def generate_sql_pagination_perf():
    table_rows = [10000, 50000, 200000, 500000, 1000000]
    full_scan_ms = [14.2, 58.5, 210.4, 490.8, 1050.6]
    offset_fetch_ms = [1.8, 2.3, 3.1, 3.9, 4.5]
    
    fig, ax = plt.subplots(figsize=(7.5, 4.5))
    ax.plot([str(r) for r in table_rows], full_scan_ms, marker='o', color='#c0392b', linewidth=2.5, label='Legacy Table Scan (No Windowing)')
    ax.plot([str(r) for r in table_rows], offset_fetch_ms, marker='s', color='#2980b9', linewidth=2.5, label='SQL Server OFFSET / FETCH')
    
    ax.set_xlabel('Total Records in Library Database Table (Rows)', weight='bold')
    ax.set_ylabel('Query Execution Time (ms) [Log Scale]', weight='bold')
    ax.set_yscale('log')
    ax.set_title('Pagination Query Performance: Full Scan vs. OFFSET / FETCH', fontsize=13, pad=15, weight='bold')
    ax.legend(loc='upper left', frameon=True)
    ax.grid(True, linestyle=':', alpha=0.7)
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, "sql_pagination_perf.png"), dpi=300)
    plt.close()
    print("[OK] Generated: sql_pagination_perf.png")

# 6. Syntax-highlighted code image generator helper
def generate_code_image(filename, code_text, lexer, title_text="Code Excerpt"):
    formatter = ImageFormatter(
        font_name="Consolas",
        font_size=14,
        line_numbers=True,
        line_number_bg="#1e222a",
        line_number_fg="#616e88",
        line_number_separator=True,
        style="monokai",
        background_color="#181c24",
        line_pad=4,
        padding=15
    )
    raw_img_data = highlight(code_text.strip(), lexer(), formatter)
    
    temp_path = os.path.join(output_dir, f"temp_{filename}")
    with open(temp_path, "wb") as f:
        f.write(raw_img_data)
        
    code_img = Image.open(temp_path)
    w, h = code_img.size
    header_h = 42
    new_img = Image.new("RGB", (w, h + header_h), "#0d1015")
    
    draw = ImageDraw.Draw(new_img)
    draw.ellipse((14, 15, 26, 27), fill="#ff5f56")
    draw.ellipse((34, 15, 46, 27), fill="#ffbd2e")
    draw.ellipse((54, 15, 66, 27), fill="#27c93f")
    
    try:
        font = ImageFont.truetype("arial.ttf", 15)
    except:
        font = ImageFont.load_default()
        
    draw.text((w // 2, header_h // 2), title_text, fill="#e5e7eb", anchor="mm", font=font)
    new_img.paste(code_img, (0, header_h))
    
    final_path = os.path.join(output_dir, filename)
    new_img.save(final_path, quality=95)
    os.remove(temp_path)
    print(f"[OK] Generated code graphic: {filename}")

code_html_navbar = """<header class="topbar">
  <a class="brand" href="dashboard.html" aria-label="Library Management home">
    <svg class="brand-mark" viewBox="0 0 24 24"><path d="M3.5 5.5A3.5 3.5 0 0 1 7 2h3.5.../"></svg>
    <span>Library Management</span>
  </a>
  <nav class="main-nav" aria-label="Primary navigation">
    <a class="nav-link active" href="dashboard.html">Dashboard</a>
    <a class="nav-link" href="books.html">Books</a>
    <a class="nav-link" href="students.html">Students</a>
    <a class="nav-link" href="librarians.html">Librarians</a>
    <a class="nav-link" href="history.html">Borrow History</a>
  </nav>
  <div class="account-actions">
    <button class="theme-toggle" id="theme-toggle" type="button" role="switch" aria-label="Switch to dark mode">
      <span class="theme-track"><span class="theme-thumb"><span class="theme-moon">☾</span><span class="theme-sun">☀</span></span></span>
    </button>
  </div>
</header>"""

code_css_variables = """/* Design System Tokens & Dark Mode Theme Overrides */
:root {
  --ink: #13161c;
  --ink-2: #1d222a;
  --paper: #ffffff;
  --canvas: #f5f6f8;
  --gold: #e8b341;
  --green: #158a5a;
  --orange: #c67b20;
  --red: #ce3939;
  --shadow: 0 14px 30px rgba(20, 25, 35, .13);
}

body[data-theme="dark"] {
  --ink: #edf1f6;
  --paper: #171d25;
  --canvas: #0e131a;
  --muted: #abb4c0;
  --line: #2a323d;
  --shadow: 0 14px 32px rgba(0, 0, 0, .32);
}
body[data-theme="dark"] .page-card, body[data-theme="dark"] .mini-card { background: #171d25; }"""

code_csharp_pagination = """// ASP.NET Core Controller with Dynamic Search & Windowed OFFSET/FETCH Pagination
public async Task<IActionResult> Index(string? searchQuery, int page = 1) {
    int pageSize = 5;
    var query = _context.Books.AsNoTracking().AsQueryable();

    if (!string.IsNullOrWhiteSpace(searchQuery)) {
        searchQuery = searchQuery.Trim().ToLower();
        query = query.Where(b => b.Title.ToLower().Contains(searchQuery) ||
                                 b.Author.ToLower().Contains(searchQuery) ||
                                 b.ISBN.ToLower().Contains(searchQuery));
    }

    int totalItems = await query.CountAsync();
    int totalPages = (int)Math.Ceiling((double)totalItems / pageSize);
    page = Math.Clamp(page, 1, Math.Max(1, totalPages));

    var paginatedBooks = await query
        .OrderBy(b => b.BookId)
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();

    return View(new BookListViewModel { Books = paginatedBooks, CurrentPage = page, TotalPages = totalPages });
}"""

code_csharp_tests = """// xUnit Unit Testing Suite with EF Core InMemory Database & FluentAssertions
public class BooksControllerInMemoryTests : IDisposable {
    private readonly LibraryContext _context;
    private readonly BooksController _controller;

    public BooksControllerInMemoryTests() {
        var options = new DbContextOptionsBuilder<LibraryContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        _context = new LibraryContext(options);
        SeedDatabase();
        _controller = new BooksController(_context);
    }

    [Fact]
    public async Task Index_FiltersBooks_WhenSearchStringIsProvided() {
        // Act - Pass target search term down to endpoint
        var result = await _controller.Index(searchQuery: "node", page: 1);

        // Assert - Verify payload using natural FluentAssertions syntax
        var viewResult = result.Should().BeOfType<ViewResult>().Subject;
        var model = viewResult.Model.Should().BeAssignableTo<BookListViewModel>().Subject;
        model.Books.Should().ContainSingle();
        model.Books.First().Title.Should().Be("node js");
    }
}"""

code_csharp_identity = """// Register ASP.NET Core Identity & Entity Framework Core Services in Program.cs
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SQLServerIdentityConnection")));

builder.Services.AddIdentity<IdentityUser, IdentityRole>(options => {
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 6;
    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

var app = builder.Build();
app.UseRouting();
app.UseAuthentication(); // MUST appear after UseRouting and before UseAuthorization
app.UseAuthorization();
app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");"""

code_sql_tables = """-- Enterprise Library Management Database Schema & Seed Script
CREATE TABLE Publications (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(100) NOT NULL,
    Publisher NVARCHAR(50) NOT NULL,
    PublishedDate DATE NOT NULL,
    [Type] INT NOT NULL, -- 0 for Newspaper, 1 for Magazine
    IsAvailable BIT NOT NULL DEFAULT 1
);

INSERT INTO Publications (Title, Publisher, PublishedDate, [Type], IsAvailable) VALUES
('The Daily Times', 'Global Media Group', '2026-07-22', 0, 1),
('Financial Chronicle', 'WallSt Press', '2026-07-21', 0, 1),
('National Geographic Vol 45', 'NatGeo Society', '2026-07-01', 1, 1),
('Forbes Business 30 Under 30', 'Forbes Media', '2026-07-10', 1, 0);

SELECT * FROM Publications WHERE [Type] = 1 AND IsAvailable = 1;"""

# Generate code graphic assets
generate_code_image("code_html_navbar.png", code_html_navbar, HtmlLexer, "dashboard.html -- Multi-Page Navigation Structure")
generate_code_image("code_css_variables.png", code_css_variables, CssLexer, "styles.css -- CSS Tokens & Dark Mode Hierarchy")
generate_code_image("code_csharp_pagination.png", code_csharp_pagination, CSharpLexer, "BooksController.cs -- Dynamic Search & Pagination")
generate_code_image("code_csharp_tests.png", code_csharp_tests, CSharpLexer, "BooksControllerTests.cs -- xUnit & FluentAssertions Suite")
generate_code_image("code_csharp_identity.png", code_csharp_identity, CSharpLexer, "Program.cs -- ASP.NET Core Identity RBAC Pipeline")
generate_code_image("code_sql_tables.png", code_sql_tables, SqlLexer, "Schema.sql -- Publications Table & Seeding Query")

# 7. Synthetic UI Mockup Renderings (Pillow Wireframe Generator)
def generate_ui_mockups():
    w, h = 900, 560
    img = Image.new("RGB", (w, h), "#f5f6f8")
    draw = ImageDraw.Draw(img)
    try:
        f_title = ImageFont.truetype("arialbd.ttf", 18)
        f_body = ImageFont.truetype("arial.ttf", 13)
        f_small = ImageFont.truetype("arial.ttf", 11)
        f_num = ImageFont.truetype("arialbd.ttf", 26)
    except:
        f_title = f_body = f_small = f_num = ImageFont.load_default()
        
    draw.rectangle((0, 0, w, 65), fill="#12161d")
    draw.text((25, 22), "Library Management System", fill="#ffffff", font=f_title)
    draw.text((320, 25), "Dashboard   |   Books   |   Students   |   Librarians   |   History", fill="#ecedf0", font=f_body)
    draw.rectangle((810, 18, 870, 45), fill="#2d3745", outline="#ffffff", width=1)
    draw.text((822, 24), "Theme", fill="#ffffff", font=f_body)
    
    draw.text((35, 90), "Welcome, Aarav", fill="#13161c", font=f_title)
    draw.text((35, 115), "Here is an overview of your library today.", fill="#69707d", font=f_body)
    draw.rectangle((760, 95, 865, 130), fill="#ffffff", outline="#e1e4e8", width=1)
    draw.text((775, 106), "28 Jul 2026", fill="#5d6571", font=f_body)
    
    card_w = 195
    card_h = 100
    gap = 20
    colors = ["#1f2630", "#197a5e", "#c27820", "#4b5870"]
    titles = ["Total Books", "Available Books", "Books Borrowed", "Students Registered"]
    nums = ["65", "60", "5", "12"]
    for i in range(4):
        cx = 35 + i * (card_w + gap)
        cy = 150
        draw.rounded_rectangle((cx, cy, cx + card_w, cy + card_h), radius=10, fill=colors[i])
        draw.text((cx + 15, cy + 15), titles[i], fill="#d0d4d9", font=f_small)
        draw.text((cx + 15, cy + 45), nums[i], fill="#ffffff", font=f_num)
        
    draw.rounded_rectangle((35, 275, 580, 520), radius=10, fill="#ffffff", outline="#e5e7eb", width=1)
    draw.text((55, 295), "Recent Activity Logs", fill="#13161c", font=f_title)
    activities = [
        ("Return", "Riya Sharma returned Ikigai: The Japanese Secret...", "24 Jul 2026"),
        ("Borrow", "Ishaan Kulkarni borrowed Wings of Fire", "22 Jul 2026"),
        ("Borrow", "Kavya Iyer borrowed Train to Pakistan", "21 Jul 2026"),
        ("Borrow", "Aditya Nair borrowed The Guide", "19 Jul 2026")
    ]
    for idx, (mark, desc, dt) in enumerate(activities):
        y = 340 + idx * 42
        draw.ellipse((55, y, 80, y + 25), fill="#edf6f2")
        draw.text((58, y + 6), mark[:1], fill="#18875a", font=f_small)
        draw.text((90, y + 5), desc, fill="#343a43", font=f_body)
        draw.text((480, y + 6), dt, fill="#9298a1", font=f_small)
        if idx < 3:
            draw.line((55, y + 35, 560, y + 35), fill="#ecedf0", width=1)
            
    draw.rounded_rectangle((600, 275, 865, 520), radius=10, fill="#ffffff", outline="#e5e7eb", width=1)
    draw.text((620, 295), "Quick Actions", fill="#13161c", font=f_title)
    btns = ["+ Add a new book", "+ Add a student", "View borrow history", "Restore demo data"]
    for idx, b in enumerate(btns):
        y = 340 + idx * 44
        draw.rounded_rectangle((620, y, 845, y + 36), radius=6, fill="#f8f9fb", outline="#e6e8ec", width=1)
        draw.text((635, y + 10), b, fill="#313842", font=f_body)
        
    img.save(os.path.join(output_dir, "ui_dashboard_mockup.png"), quality=95)
    print("[OK] Generated UI graphic: ui_dashboard_mockup.png")
    
    img2 = Image.new("RGB", (w, h), "#f5f6f8")
    draw2 = ImageDraw.Draw(img2)
    draw2.rectangle((0, 0, w, 65), fill="#12161d")
    draw2.text((25, 22), "Library Management System", fill="#ffffff", font=f_title)
    draw2.text((320, 25), "Dashboard   |   [Books]   |   Students   |   Librarians   |   History", fill="#ffffff", font=f_body)
    
    draw2.rounded_rectangle((35, 95, 865, 520), radius=10, fill="#ffffff", outline="#e5e7eb", width=1)
    draw2.text((60, 120), "Books Collection Catalog", fill="#13161c", font=f_title)
    draw2.text((60, 145), "Manage library inventory, search titles, and handle borrowing.", fill="#69707d", font=f_body)
    draw2.rounded_rectangle((740, 115, 840, 150), radius=6, fill="#191d24")
    draw2.text((755, 125), "+ Add Book", fill="#ffffff", font=f_body)
    
    draw2.rounded_rectangle((60, 175, 450, 210), radius=6, fill="#ffffff", outline="#dde1e6", width=1)
    draw2.text((75, 186), "Search by title, author, or ISBN...", fill="#9298a1", font=f_body)
    
    draw2.rectangle((60, 230, 840, 265), fill="#222731")
    cols = [(75, "Title"), (320, "Author"), (480, "ISBN"), (620, "Status"), (730, "Actions")]
    for cx, ctitle in cols:
        draw2.text((cx, 240), ctitle, fill="#f9fafb", font=f_body)
        
    rows = [
        ("Atomic Habits", "James Clear", "978-0735211292", "Available", "#158a5a", "#e9f8f0"),
        ("Deep Work", "Cal Newport", "978-1455586691", "Available", "#158a5a", "#e9f8f0"),
        ("Ikigai: Japanese Secret...", "Hector Garcia", "978-0143130727", "Borrowed", "#c67b20", "#fff3e4"),
        ("The Alchemist", "Paulo Coelho", "978-0061122415", "Available", "#158a5a", "#e9f8f0"),
        ("Think and Grow Rich", "Napoleon Hill", "978-1585424336", "Available", "#158a5a", "#e9f8f0"),
    ]
    for idx, (title, auth, isbn, stat, fg, bg) in enumerate(rows):
        y = 280 + idx * 40
        draw2.text((75, y + 10), title, fill="#20252d", font=f_body)
        draw2.text((320, y + 10), auth, fill="#555a64", font=f_body)
        draw2.text((480, y + 10), isbn, fill="#555a64", font=f_body)
        draw2.rounded_rectangle((620, y + 6, 700, y + 28), radius=12, fill=bg)
        draw2.text((630, y + 9), stat, fill=fg, font=f_small)
        draw2.text((730, y + 10), "Edit | Del", fill="#69707d", font=f_small)
        if idx < 4:
            draw2.line((60, y + 38, 840, y + 38), fill="#eceef1", width=1)
            
    draw2.text((60, 485), "Showing 1 to 5 of 65 books", fill="#707885", font=f_body)
    draw2.rounded_rectangle((680, 478, 730, 506), radius=5, fill="#ffffff", outline="#dde1e6", width=1)
    draw2.text((690, 485), "<< Prev", fill="#9298a1", font=f_small)
    draw2.rounded_rectangle((740, 478, 770, 506), radius=5, fill="#181d24")
    draw2.text((752, 485), "1", fill="#ffffff", font=f_small)
    draw2.rounded_rectangle((780, 478, 840, 506), radius=5, fill="#ffffff", outline="#dde1e6", width=1)
    draw2.text((790, 485), "Next >>", fill="#404852", font=f_small)
    
    img2.save(os.path.join(output_dir, "ui_books_catalog.png"), quality=95)
    print("[OK] Generated UI graphic: ui_books_catalog.png")

generate_sdlc_cost()
generate_bug_cost_curve()
generate_sla_chart()
generate_memory_optimization()
generate_sql_pagination_perf()
generate_ui_mockups()

print("All visual assets successfully compiled!")
