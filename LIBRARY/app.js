const seed = {
  books: [
    { id: 'b1', title: 'Atomic Habits', author: 'James Clear', isbn: '978-0735211292', published: '2018-10-16', borrower: null },
    { id: 'b2', title: 'Deep Work', author: 'Cal Newport', isbn: '978-1455586691', published: '2016-01-05', borrower: null },
    { id: 'b3', title: 'Ikigai: The Japanese Secret to a Long and Happy Life', author: 'Hector Garcia', isbn: '978-0143130727', published: '2017-05-02', borrower: 's2' },
    { id: 'b4', title: 'The Alchemist', author: 'Paulo Coelho', isbn: '978-0061122415', published: '1998-04-01', borrower: null },
    { id: 'b5', title: 'Think and Grow Rich', author: 'Napoleon Hill', isbn: '978-1585424336', published: '1937-01-01', borrower: null },
    { id: 'b6', title: 'Wings of Fire', author: 'A. P. J. Abdul Kalam', isbn: '978-8173711466', published: '1999-01-01', borrower: 's5' },
    { id: 'b7', title: 'The God of Small Things', author: 'Arundhati Roy', isbn: '978-8172234980', published: '1997-04-04', borrower: null },
    { id: 'b8', title: 'Malgudi Days', author: 'R. K. Narayan', isbn: '978-8185986175', published: '1943-01-01', borrower: null },
    { id: 'b9', title: 'Train to Pakistan', author: 'Khushwant Singh', isbn: '978-0143029331', published: '1956-01-01', borrower: 's6' },
    { id: 'b10', title: 'The White Tiger', author: 'Aravind Adiga', isbn: '978-1416562596', published: '2008-04-22', borrower: null },
    { id: 'b11', title: 'The Palace of Illusions', author: 'Chitra Banerjee Divakaruni', isbn: '978-0330451379', published: '2008-02-01', borrower: null },
    { id: 'b12', title: 'The Guide', author: 'R. K. Narayan', isbn: '978-8185986076', published: '1958-01-01', borrower: 's7' },
    { id: 'b13', title: 'A Suitable Boy', author: 'Vikram Seth', isbn: '978-0140230333', published: '1993-01-01', borrower: null },
    { id: 'b14', title: 'Grandma’s Bag of Stories', author: 'Sudha Murty', isbn: '978-0143333622', published: '2015-01-01', borrower: null },
    { id: 'b15', title: 'Ignited Minds', author: 'A. P. J. Abdul Kalam', isbn: '978-0143031559', published: '2002-01-01', borrower: 's8' },
    { id: 'b16', title: 'The Namesake', author: 'Jhumpa Lahiri', isbn: '978-0007178973', published: '2003-09-16', borrower: null },
    { id: 'b17', title: 'Interpreter of Maladies', author: 'Jhumpa Lahiri', isbn: '978-0006551803', published: '1999-01-01', borrower: null },
    { id: 'b18', title: 'Midnight’s Children', author: 'Salman Rushdie', isbn: '978-0099582070', published: '1981-04-01', borrower: null },
    { id: 'b19', title: 'The Inheritance of Loss', author: 'Kiran Desai', isbn: '978-0141027281', published: '2006-01-01', borrower: null },
    { id: 'b20', title: 'The Blue Umbrella', author: 'Ruskin Bond', isbn: '978-8129118784', published: '1980-01-01', borrower: null },
    { id: 'b21', title: 'The Room on the Roof', author: 'Ruskin Bond', isbn: '978-0143333387', published: '1956-01-01', borrower: null },
    { id: 'b22', title: 'The Immortals of Meluha', author: 'Amish Tripathi', isbn: '978-9380658742', published: '2010-02-01', borrower: null },
    { id: 'b23', title: 'The Secret of the Nagas', author: 'Amish Tripathi', isbn: '978-9381626344', published: '2011-08-01', borrower: null },
    { id: 'b24', title: 'The Oath of the Vayuputras', author: 'Amish Tripathi', isbn: '978-9380658827', published: '2013-02-01', borrower: null },
    { id: 'b25', title: 'Chanakya’s Chant', author: 'Ashwin Sanghi', isbn: '978-9381626375', published: '2010-08-01', borrower: null },
    { id: 'b26', title: 'The Sialkot Saga', author: 'Ashwin Sanghi', isbn: '978-9381626726', published: '2016-06-01', borrower: null },
    { id: 'b27', title: '2 States', author: 'Chetan Bhagat', isbn: '978-8129135521', published: '2009-10-01', borrower: null },
    { id: 'b28', title: 'Five Point Someone', author: 'Chetan Bhagat', isbn: '978-8129701962', published: '2004-05-01', borrower: null },
    { id: 'b29', title: 'One Indian Girl', author: 'Chetan Bhagat', isbn: '978-8129142147', published: '2016-10-01', borrower: null },
    { id: 'b30', title: 'Revolution 2020', author: 'Chetan Bhagat', isbn: '978-8129707681', published: '2011-10-01', borrower: null },
    { id: 'b31', title: 'The 3 Mistakes of My Life', author: 'Chetan Bhagat', isbn: '978-8129705021', published: '2008-01-01', borrower: null },
    { id: 'b32', title: 'I Too Had a Love Story', author: 'Ravinder Singh', isbn: '978-0143418764', published: '2007-12-01', borrower: null },
    { id: 'b33', title: 'You Can Win', author: 'Shiv Khera', isbn: '978-8179925119', published: '1998-01-01', borrower: null },
    { id: 'b34', title: 'India 2020', author: 'A. P. J. Abdul Kalam', isbn: '978-0143423683', published: '1998-01-01', borrower: null },
    { id: 'b35', title: 'My Journey', author: 'A. P. J. Abdul Kalam', isbn: '978-8129124914', published: '2013-01-01', borrower: null },
    { id: 'b36', title: 'The Monk Who Sold His Ferrari', author: 'Robin Sharma', isbn: '978-8179921623', published: '1997-01-01', borrower: null },
    { id: 'b37', title: 'The Great Indian Novel', author: 'Shashi Tharoor', isbn: '978-0140127886', published: '1989-01-01', borrower: null },
    { id: 'b38', title: 'English, August', author: 'Upamanyu Chatterjee', isbn: '978-0571260605', published: '1988-01-01', borrower: null },
    { id: 'b39', title: 'A Fine Balance', author: 'Rohinton Mistry', isbn: '978-0571173585', published: '1995-01-01', borrower: null },
    { id: 'b40', title: 'The Shadow Lines', author: 'Amitav Ghosh', isbn: '978-0143066565', published: '1988-01-01', borrower: null },
    { id: 'b41', title: 'Clear Light of Day', author: 'Anita Desai', isbn: '978-8184000262', published: '1980-01-01', borrower: null },
    { id: 'b42', title: 'The Ministry of Utmost Happiness', author: 'Arundhati Roy', isbn: '978-0670089635', published: '2017-06-01', borrower: null },
    { id: 'b43', title: 'The Lowland', author: 'Jhumpa Lahiri', isbn: '978-8184004550', published: '2013-09-01', borrower: null },
    { id: 'b44', title: 'The Legend of Suheldev', author: 'Amish Tripathi', isbn: '978-9391165000', published: '2020-06-01', borrower: null },
    { id: 'b45', title: 'Karna’s Wife', author: 'Kavita Kane', isbn: '978-8129124518', published: '2013-01-01', borrower: null },
    { id: 'b46', title: 'The Forest of Enchantments', author: 'Chitra Banerjee Divakaruni', isbn: '978-9353026056', published: '2019-01-01', borrower: null },
    { id: 'b47', title: 'The Girl in Room 105', author: 'Chetan Bhagat', isbn: '978-1542040465', published: '2018-10-01', borrower: null },
    { id: 'b48', title: 'Half Girlfriend', author: 'Chetan Bhagat', isbn: '978-8129135729', published: '2014-10-01', borrower: null },
    { id: 'b49', title: 'The Rozabal Line', author: 'Ashwin Sanghi', isbn: '978-9381626337', published: '2008-01-01', borrower: null },
    { id: 'b50', title: 'The Krishna Key', author: 'Ashwin Sanghi', isbn: '978-9381626689', published: '2012-01-01', borrower: null },
    { id: 'b51', title: 'The Zoya Factor', author: 'Anuja Chauhan', isbn: '978-9350290634', published: '2008-01-01', borrower: null },
    { id: 'b52', title: 'Serious Men', author: 'Manu Joseph', isbn: '978-0393338599', published: '2010-07-01', borrower: null },
    { id: 'b53', title: 'The Far Field', author: 'Madhuri Vijay', isbn: '978-9352778000', published: '2019-01-01', borrower: null },
    { id: 'b54', title: 'Tomb of Sand', author: 'Geetanjali Shree', isbn: '978-9354892995', published: '2022-01-01', borrower: null },
    { id: 'b55', title: 'Ghachar Ghochar', author: 'Vivek Shanbhag', isbn: '978-0143427483', published: '2015-01-01', borrower: null },
    { id: 'b56', title: 'Swami and Friends', author: 'R. K. Narayan', isbn: '978-8185986090', published: '1935-01-01', borrower: null },
    { id: 'b57', title: 'The Bachelor of Arts', author: 'R. K. Narayan', isbn: '978-8185986199', published: '1937-01-01', borrower: null },
    { id: 'b58', title: 'The Vendor of Sweets', author: 'R. K. Narayan', isbn: '978-8185986328', published: '1967-01-01', borrower: null },
    { id: 'b59', title: 'The Hungry Tide', author: 'Amitav Ghosh', isbn: '978-0007178911', published: '2004-01-01', borrower: null },
    { id: 'b60', title: 'The Glass Palace', author: 'Amitav Ghosh', isbn: '978-8172235352', published: '2000-01-01', borrower: null },
    { id: 'b61', title: 'The White Mughals', author: 'William Dalrymple', isbn: '978-0006550967', published: '2002-01-01', borrower: null },
    { id: 'b62', title: 'An Era of Darkness', author: 'Shashi Tharoor', isbn: '978-9383064653', published: '2016-11-01', borrower: null },
    { id: 'b63', title: 'The Difficulty of Being Good', author: 'Gurcharan Das', isbn: '978-0143066817', published: '2009-01-01', borrower: null },
    { id: 'b64', title: 'The Argumentative Indian', author: 'Amartya Sen', isbn: '978-0143030286', published: '2005-01-01', borrower: null },
    { id: 'b65', title: 'Price of the Modi Years', author: 'Aakar Patel', isbn: '978-9390652341', published: '2021-01-01', borrower: null }
  ],
  students: [
    { id: 's1', name: 'Aarav Tripathi', email: 'aarav@example.com', phone: '+91 98765 43210', course: 'Computer Science' },
    { id: 's2', name: 'Riya Sharma', email: 'riya@example.com', phone: '+91 98765 43211', course: 'Literature' },
    { id: 's3', name: 'Arjun Mehta', email: 'arjun@example.com', phone: '+91 98765 43212', course: 'Business Administration' },
    { id: 's4', name: 'Ananya Singh', email: 'ananya@example.com', phone: '+91 98765 43213', course: 'Psychology' },
    { id: 's5', name: 'Ishaan Kulkarni', email: 'ishaan.k@example.com', phone: '+91 98765 43214', course: 'Mechanical Engineering' },
    { id: 's6', name: 'Kavya Iyer', email: 'kavya.iyer@example.com', phone: '+91 98765 43215', course: 'History' },
    { id: 's7', name: 'Aditya Nair', email: 'aditya.nair@example.com', phone: '+91 98765 43216', course: 'Economics' },
    { id: 's8', name: 'Meera Joshi', email: 'meera.joshi@example.com', phone: '+91 98765 43217', course: 'Political Science' },
    { id: 's9', name: 'Rohan Deshmukh', email: 'rohan.d@example.com', phone: '+91 98765 43218', course: 'Architecture' },
    { id: 's10', name: 'Sana Khan', email: 'sana.khan@example.com', phone: '+91 98765 43219', course: 'Media Studies' },
    { id: 's11', name: 'Dev Patel', email: 'dev.patel@example.com', phone: '+91 98765 43220', course: 'Mathematics' },
    { id: 's12', name: 'Nandini Rao', email: 'nandini.rao@example.com', phone: '+91 98765 43221', course: 'Sociology' }
  ],
  librarians: [
    { id: 'l1', name: 'Priya Kapoor', email: 'priya@library.com', phone: '+91 98110 12121', shift: 'Morning' },
    { id: 'l2', name: 'Vikram Rao', email: 'vikram@library.com', phone: '+91 98110 13131', shift: 'Afternoon' },
    { id: 'l3', name: 'Neha Verma', email: 'neha@library.com', phone: '+91 98110 14141', shift: 'Evening' },
    { id: 'l4', name: 'Suresh Bhat', email: 'suresh.bhat@library.com', phone: '+91 98110 15151', shift: 'Morning' },
    { id: 'l5', name: 'Kiran Malhotra', email: 'kiran.m@library.com', phone: '+91 98110 16161', shift: 'Afternoon' },
    { id: 'l6', name: 'Farah Qureshi', email: 'farah.q@library.com', phone: '+91 98110 17171', shift: 'Evening' }
  ],
  history: [
    { id: 'h1', bookId: 'b3', studentId: 's2', borrowedAt: '2026-07-24', returnedAt: null },
    { id: 'h2', bookId: 'b1', studentId: 's1', borrowedAt: '2026-07-18', returnedAt: '2026-07-23' },
    { id: 'h3', bookId: 'b4', studentId: 's3', borrowedAt: '2026-07-10', returnedAt: '2026-07-16' },
    { id: 'h4', bookId: 'b6', studentId: 's5', borrowedAt: '2026-07-22', returnedAt: null },
    { id: 'h5', bookId: 'b9', studentId: 's6', borrowedAt: '2026-07-21', returnedAt: null },
    { id: 'h6', bookId: 'b12', studentId: 's7', borrowedAt: '2026-07-19', returnedAt: null },
    { id: 'h7', bookId: 'b15', studentId: 's8', borrowedAt: '2026-07-18', returnedAt: null },
    { id: 'h8', bookId: 'b8', studentId: 's9', borrowedAt: '2026-07-08', returnedAt: '2026-07-15' },
    { id: 'h9', bookId: 'b10', studentId: 's10', borrowedAt: '2026-07-03', returnedAt: '2026-07-12' }
  ]
};

const storeKey = 'library-management-state-v1';
const savedState = JSON.parse(localStorage.getItem(storeKey) || 'null');
const mergeSeedRecords = (savedRecords = [], seedRecords = []) => [
  ...savedRecords,
  ...seedRecords.filter(seedRecord => !savedRecords.some(savedRecord => savedRecord.id === seedRecord.id))
];
let state = savedState ? {
  books: mergeSeedRecords(savedState.books, seed.books),
  students: mergeSeedRecords(savedState.students, seed.students),
  librarians: mergeSeedRecords(savedState.librarians, seed.librarians),
  history: mergeSeedRecords(savedState.history, seed.history)
} : structuredClone(seed);
if (savedState) localStorage.setItem(storeKey, JSON.stringify(state));
let route = 'dashboard';
let booksCurrentPage = 1;
let booksQuery = '';
const booksPerPage = 5;
const app = document.querySelector('#app');
const modalRoot = document.querySelector('#modal-root');
const toast = document.querySelector('#toast');
const today = () => new Date().toISOString().slice(0, 10);
const uid = prefix => `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;
const escape = value => String(value ?? '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[c]);
const getStudent = id => state.students.find(item => item.id === id);
const getBook = id => state.books.find(item => item.id === id);
const save = () => localStorage.setItem(storeKey, JSON.stringify(state));
const isAuthed = () => sessionStorage.getItem('library-auth') === 'true';

function applyTheme(theme) {
  const selectedTheme = theme === 'dark' ? 'dark' : 'light';
  if (document.body) document.body.dataset.theme = selectedTheme;
  localStorage.setItem('library-theme', selectedTheme);
  const themeButton = document.querySelector('.theme-toggle');
  if (themeButton) {
    themeButton.setAttribute?.('aria-label', selectedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    themeButton.setAttribute?.('aria-checked', String(selectedTheme === 'dark'));
  }
}

document.addEventListener('click', event => {
  const toggleBtn = event.target.closest('.theme-toggle');
  if (toggleBtn) {
    const currentTheme = localStorage.getItem('library-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  }
});

function icon(name) {
  const icons = {
    dashboard: '◌', books: '▥', students: '♙', librarians: '♧', history: '◴', plus: '+', login: '⇥', logout: '⇤', eye: '◉', edit: '✎', delete: '⌫', return: '↶', borrow: '⇢', check: '✓'
  };
  return `<span aria-hidden="true">${icons[name] || '•'}</span>`;
}

function navUpdate() {
  document.querySelectorAll('[data-route]').forEach(button => button.classList.toggle('active', isAuthed() && button.dataset.route === route));
  document.querySelector('.nav-login').style.display = isAuthed() ? 'none' : 'inline-block';
  document.querySelector('.nav-logout').style.display = isAuthed() ? 'inline-block' : 'none';
  const themeButton = document.querySelector('.theme-toggle');
  if (themeButton) themeButton.style.display = isAuthed() ? 'inline-flex' : 'none';
}

function notice(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(notice.timer);
  notice.timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function render() {
  navUpdate();
  if (!isAuthed()) {
    app.innerHTML = loginPage();
    return;
  }
  const pages = { dashboard: dashboardPage, books: booksPage, students: studentsPage, librarians: librariansPage, history: historyPage };
  app.innerHTML = pages[route]();
}

function loginPage() {
  return `<section class="login-page"><div class="login-card">
    <aside class="welcome-panel"><div class="round-book">▣</div><h1>Welcome Back!</h1><div class="gold-line"></div><p>Sign in to access your library<br>management dashboard.</p><div class="book-stack"><span></span><span></span><span></span><span></span></div></aside>
    <section class="login-form-area"><h2>Sign In</h2><p>Enter your credentials to continue</p>
      <form data-form="login"><div class="field"><label for="username">Username</label><input id="username" name="username" autocomplete="username" placeholder="Enter username" required></div><div class="field"><label for="password">Password</label><input id="password" name="password" type="password" autocomplete="current-password" placeholder="Enter pw" required></div><p class="form-error" id="login-error"></p><button class="primary" type="submit">${icon('login')} &nbsp; Login</button></form>
      <div class="or-divider">or</div><p class="helper-note">Administrator username: <b>aaravtripathi</b></p>
    </section>
  </div></section>`;
}

function dashboardPage() {
  const available = state.books.filter(book => !book.borrower).length;
  const borrowed = state.books.length - available;
  const recent = [...state.history].sort((a,b) => (b.returnedAt || b.borrowedAt).localeCompare(a.returnedAt || a.borrowedAt)).slice(0, 4);
  return `<section class="page dashboard"><div class="dashboard-top"><div><h1>Welcome, Aarav</h1><p>Here is an overview of your library today.</p></div><span class="date-pill">${new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</span></div>
    <div class="stat-grid">
      ${stat('Total Books', state.books.length, '▥')}${stat('Available Books', available, '✓')}${stat('Books Borrowed', borrowed, '⇢')}${stat('Students', state.students.length, '♙')}
    </div>
    <div class="dashboard-columns"><article class="mini-card"><h2>Recent activity</h2><ul class="activity">${recent.map(item => activity(item)).join('') || '<li class="empty-state">No activity yet.</li>'}</ul></article><aside class="mini-card"><h2>Quick actions</h2><div class="quick-actions"><button data-action="add-book">${icon('plus')} Add a new book</button><button data-action="add-student">${icon('plus')} Add a student</button><button data-route="history">${icon('history')} View borrow history</button><button data-action="reset-data">↻ Restore demo data</button></div></aside></div>
  </section>`;
}
function stat(label, value, symbol) { return `<article class="stat-card"><small>${label}</small><strong>${value}</strong><span>${symbol}</span></article>`; }
function activity(item) { const book = getBook(item.bookId); const student = getStudent(item.studentId); const message = item.returnedAt ? `<b>${escape(student?.name || 'A student')}</b> returned <b>${escape(book?.title || 'a book')}</b>` : `<b>${escape(student?.name || 'A student')}</b> borrowed <b>${escape(book?.title || 'a book')}</b>`; return `<li><span class="activity-mark">${item.returnedAt ? '↶' : '⇢'}</span><div><p>${message}</p><time>${formatDate(item.returnedAt || item.borrowedAt)}</time></div></li>`; }

function pageHeading(iconText, title, subtitle, button = '') { return `<div class="section-heading"><div class="heading-copy"><div class="heading-icon">${iconText}</div><div><h1>${title}</h1><p>${subtitle}</p></div></div>${button}</div>`; }
function filteredBooks() { return state.books.filter(book => `${book.title} ${book.author} ${book.isbn}`.toLowerCase().includes(booksQuery)); }
function booksPagination(totalBooks) {
  const totalPages = Math.max(1, Math.ceil(totalBooks / booksPerPage));
  booksCurrentPage = Math.min(Math.max(booksCurrentPage, 1), totalPages);
  const firstBook = totalBooks ? (booksCurrentPage - 1) * booksPerPage + 1 : 0;
  const lastBook = Math.min(booksCurrentPage * booksPerPage, totalBooks);
  const firstPageNumber = Math.max(1, Math.min(booksCurrentPage - 1, totalPages - 2));
  const visiblePageCount = Math.min(3, totalPages);
  const pageButtons = Array.from({ length: visiblePageCount }, (_, index) => {
    const page = firstPageNumber + index;
    return `<button class="page-number ${page === booksCurrentPage ? 'current' : ''}" type="button" data-action="books-page" data-page="${page}" aria-label="Page ${page}" ${page === booksCurrentPage ? 'aria-current="page"' : ''}>${page}</button>`;
  }).join('');
  return `<div class="pagination" id="books-pager"><span>Showing ${firstBook}–${lastBook} of ${totalBooks} books</span><div class="page-controls"><button class="page-nav" type="button" data-action="books-page" data-page="${booksCurrentPage - 1}" ${booksCurrentPage === 1 ? 'disabled' : ''}>← Previous</button>${pageButtons}<button class="page-nav" type="button" data-action="books-page" data-page="${booksCurrentPage + 1}" ${booksCurrentPage === totalPages ? 'disabled' : ''}>Next →</button></div></div>`;
}
function refreshBooksResults() {
  const matching = filteredBooks();
  const totalPages = Math.max(1, Math.ceil(matching.length / booksPerPage));
  booksCurrentPage = Math.min(Math.max(booksCurrentPage, 1), totalPages);
  const start = (booksCurrentPage - 1) * booksPerPage;
  document.querySelector('#books-rows').innerHTML = booksRows(matching.slice(start, start + booksPerPage));
  document.querySelector('#books-pager').outerHTML = booksPagination(matching.length);
}
function booksPage() {
  const matching = filteredBooks();
  const totalPages = Math.max(1, Math.ceil(matching.length / booksPerPage));
  booksCurrentPage = Math.min(Math.max(booksCurrentPage, 1), totalPages);
  const start = (booksCurrentPage - 1) * booksPerPage;
  return `<section class="page"><div class="page-card">${pageHeading('▥','Books List','Manage and organize all library books.','<button class="button button-dark" data-action="add-book">+ &nbsp; Add New Book</button>')}<div class="toolbar"><input class="search" data-search="books" value="${escape(booksQuery)}" placeholder="Search books by title, author or ISBN"></div><div class="data-table-wrap"><table class="data-table"><thead><tr><th>Title</th><th>Author</th><th>ISBN</th><th>Published Date</th><th>Availability</th><th></th></tr></thead><tbody id="books-rows">${booksRows(matching.slice(start, start + booksPerPage))}</tbody></table></div>${booksPagination(matching.length)}</div></section>`;
}
function booksRows(books) { if (!books.length) return '<tr><td colspan="6" class="empty-state">No books match your search.</td></tr>'; return books.map(book => { const student = getStudent(book.borrower); return `<tr><td class="title-cell">${escape(book.title)}</td><td>${escape(book.author)}</td><td>${escape(book.isbn)}</td><td>${formatDate(book.published)}</td><td><span class="badge ${book.borrower ? 'borrowed' : 'available'}">${book.borrower ? `Borrowed${student ? ` · ${escape(student.name.split(' ')[0])}` : ''}` : 'Available'}</span></td><td><div class="actions"><button class="action-btn" data-action="details-book" data-id="${book.id}">◉ Details</button><button class="action-btn edit" data-action="edit-book" data-id="${book.id}">✎ Edit</button><button class="action-btn delete" data-action="delete-book" data-id="${book.id}">⌫ Delete</button>${book.borrower ? `<button class="action-btn return" data-action="return-book" data-id="${book.id}">↶ Return</button>` : `<button class="action-btn borrow" data-action="borrow-book" data-id="${book.id}">⇢ Borrow</button>`}</div></td></tr>`; }).join(''); }

function studentsPage() { return `<section class="page"><div class="page-card">${pageHeading('♙','Students','Manage registered students and their library access.','<button class="button button-dark" data-action="add-student">+ &nbsp; Add New Student</button>')}<div class="toolbar"><input class="search" data-search="students" placeholder="Search students by name, email or course"></div><div class="data-table-wrap"><table class="data-table"><thead><tr><th>Student Name</th><th>Email</th><th>Phone</th><th>Course</th><th>Books Held</th><th></th></tr></thead><tbody id="students-rows">${studentsRows(state.students)}</tbody></table></div></div></section>`; }
function studentsRows(students) { if (!students.length) return '<tr><td colspan="6" class="empty-state">No students match your search.</td></tr>'; return students.map(student => { const held = state.books.filter(book => book.borrower === student.id); return `<tr><td class="title-cell">${escape(student.name)}</td><td>${escape(student.email)}</td><td>${escape(student.phone)}</td><td>${escape(student.course)}</td><td>${held.length ? `<span class="badge borrowed">${held.length} book${held.length > 1 ? 's' : ''}</span>` : '<span class="badge available">None</span>'}</td><td><div class="actions"><button class="action-btn" data-action="details-student" data-id="${student.id}">◉ Details</button><button class="action-btn edit" data-action="edit-student" data-id="${student.id}">✎ Edit</button><button class="action-btn delete" data-action="delete-student" data-id="${student.id}">⌫ Delete</button></div></td></tr>`; }).join(''); }

function librariansPage() { return `<section class="page"><div class="page-card">${pageHeading('♧','Librarians','Manage the staff who keep your library running.','<button class="button button-dark" data-action="add-librarian">+ &nbsp; Add Librarian</button>')}<div class="toolbar"><input class="search" data-search="librarians" placeholder="Search librarians by name, email or shift"></div><div class="data-table-wrap"><table class="data-table"><thead><tr><th>Librarian Name</th><th>Email</th><th>Phone</th><th>Shift</th><th>Status</th><th></th></tr></thead><tbody id="librarians-rows">${librariansRows(state.librarians)}</tbody></table></div></div></section>`; }
function librariansRows(librarians) { if (!librarians.length) return '<tr><td colspan="6" class="empty-state">No librarians match your search.</td></tr>'; return librarians.map(person => `<tr><td class="title-cell">${escape(person.name)}</td><td>${escape(person.email)}</td><td>${escape(person.phone)}</td><td>${escape(person.shift)}</td><td><span class="badge available">Active</span></td><td><div class="actions"><button class="action-btn" data-action="details-librarian" data-id="${person.id}">◉ Details</button><button class="action-btn edit" data-action="edit-librarian" data-id="${person.id}">✎ Edit</button><button class="action-btn delete" data-action="delete-librarian" data-id="${person.id}">⌫ Delete</button></div></td></tr>`).join(''); }

function historyPage() { return `<section class="page"><div class="page-card">${pageHeading('◴','Borrow History','Track every book that has been borrowed or returned.')}<div class="toolbar"><input class="search" data-search="history" placeholder="Search by book title or student name"></div><div class="data-table-wrap"><table class="data-table"><thead><tr><th>Book</th><th>Student</th><th>Borrowed On</th><th>Returned On</th><th>Status</th></tr></thead><tbody id="history-rows">${historyRows(state.history)}</tbody></table></div></div></section>`; }
function historyRows(history) { if (!history.length) return '<tr><td colspan="5" class="empty-state">There is no borrow history yet.</td></tr>'; return [...history].sort((a,b) => (b.returnedAt || b.borrowedAt).localeCompare(a.returnedAt || a.borrowedAt)).map(item => { const book = getBook(item.bookId); const student = getStudent(item.studentId); return `<tr><td class="title-cell">${escape(book?.title || 'Deleted book')}</td><td>${escape(student?.name || 'Deleted student')}</td><td>${formatDate(item.borrowedAt)}</td><td>${item.returnedAt ? formatDate(item.returnedAt) : '—'}</td><td><span class="badge ${item.returnedAt ? 'returned' : 'open'}">${item.returnedAt ? 'Returned' : 'Borrowed'}</span></td></tr>`; }).join(''); }
function formatDate(value) { if (!value) return '—'; const [year, month, day] = value.split('-'); return `${day}-${month}-${year}`; }

function openModal(title, content) { modalRoot.innerHTML = `<div class="modal-backdrop"><div class="modal" role="dialog" aria-modal="true" aria-label="${escape(title)}"><div class="modal-header"><h2>${title}</h2><button class="close" type="button" data-action="close-modal" aria-label="Close">×</button></div>${content}</div></div>`; }
function closeModal() { modalRoot.innerHTML = ''; }
function actions(cancel = true, label = 'Save') { return `<div class="modal-actions">${cancel ? '<button class="button button-light" type="button" data-action="close-modal">Cancel</button>' : ''}<button class="primary" type="submit">${label}</button></div>`; }
function confirmLogout() { openModal('Log out', `<p class="confirmation">Are you sure you want to log out of the Library Management System?</p><div class="modal-actions"><button class="button button-light" type="button" data-action="close-modal">Stay signed in</button><button class="button button-dark" type="button" data-action="confirm-logout">Log out</button></div>`); }
function performLogout() { sessionStorage.removeItem('library-auth'); route = 'dashboard'; closeModal(); render(); notice('You have been logged out safely.'); }
function bookForm(book = {}) { const editing = Boolean(book.id); openModal(editing ? 'Edit Book' : 'Add New Book', `<form data-form="book" data-id="${book.id || ''}"><div class="form-grid"><div class="field wide"><label>Book Title</label><input name="title" value="${escape(book.title || '')}" required></div><div class="field"><label>Author</label><input name="author" value="${escape(book.author || '')}" required></div><div class="field"><label>ISBN</label><input name="isbn" value="${escape(book.isbn || '')}" required></div><div class="field wide"><label>Published Date</label><input name="published" type="date" value="${escape(book.published || '')}" required></div></div>${actions(true, editing ? 'Save Changes' : 'Add Book')}</form>`); }
function studentForm(student = {}) { const editing = Boolean(student.id); openModal(editing ? 'Edit Student' : 'Add New Student', `<form data-form="student" data-id="${student.id || ''}"><div class="form-grid"><div class="field wide"><label>Full Name</label><input name="name" value="${escape(student.name || '')}" required></div><div class="field"><label>Email</label><input name="email" type="email" value="${escape(student.email || '')}" required></div><div class="field"><label>Phone</label><input name="phone" value="${escape(student.phone || '')}" required></div><div class="field wide"><label>Course</label><input name="course" value="${escape(student.course || '')}" required></div></div>${actions(true, editing ? 'Save Changes' : 'Add Student')}</form>`); }
function librarianForm(person = {}) { const editing = Boolean(person.id); openModal(editing ? 'Edit Librarian' : 'Add Librarian', `<form data-form="librarian" data-id="${person.id || ''}"><div class="form-grid"><div class="field wide"><label>Full Name</label><input name="name" value="${escape(person.name || '')}" required></div><div class="field"><label>Email</label><input name="email" type="email" value="${escape(person.email || '')}" required></div><div class="field"><label>Phone</label><input name="phone" value="${escape(person.phone || '')}" required></div><div class="field wide"><label>Shift</label><select name="shift"><option ${person.shift === 'Morning' ? 'selected' : ''}>Morning</option><option ${person.shift === 'Afternoon' ? 'selected' : ''}>Afternoon</option><option ${person.shift === 'Evening' ? 'selected' : ''}>Evening</option></select></div></div>${actions(true, editing ? 'Save Changes' : 'Add Librarian')}</form>`); }
function details(type, id) { const data = type === 'book' ? getBook(id) : type === 'student' ? getStudent(id) : state.librarians.find(item => item.id === id); if (!data) return; let rows = []; if (type === 'book') { rows = [['Title',data.title],['Author',data.author],['ISBN',data.isbn],['Published',formatDate(data.published)],['Status',data.borrower ? `Borrowed by ${getStudent(data.borrower)?.name || 'Unknown'}` : 'Available']]; } if (type === 'student') { const held = state.books.filter(book => book.borrower === data.id).map(book => book.title); rows = [['Name',data.name],['Email',data.email],['Phone',data.phone],['Course',data.course],['Books held',held.join(', ') || 'No books currently held']]; } if (type === 'librarian') rows = [['Name',data.name],['Email',data.email],['Phone',data.phone],['Shift',data.shift],['Status','Active']]; openModal(`${type[0].toUpperCase() + type.slice(1)} Details`, `<dl class="details">${rows.map(([key,value]) => `<dt>${escape(key)}</dt><dd>${escape(value)}</dd>`).join('')}</dl><div class="modal-actions"><button class="button button-dark" data-action="close-modal">Close</button></div>`); }
function confirmDelete(type, id) { const names = { book:'book', student:'student', librarian:'librarian' }; const entity = type === 'book' ? getBook(id) : type === 'student' ? getStudent(id) : state.librarians.find(item => item.id === id); openModal(`Delete ${names[type]}`, `<p class="confirmation">Are you sure you want to permanently delete <b>${escape(entity?.title || entity?.name)}</b>?</p><div class="modal-actions"><button class="button button-light" data-action="close-modal">Cancel</button><button class="button button-danger" data-action="confirm-delete" data-type="${type}" data-id="${id}">Delete</button></div>`); }
function borrowForm(book) { if (!state.students.length) { notice('Add a student before borrowing a book.'); return; } openModal('Borrow Book', `<form data-form="borrow" data-id="${book.id}"><p class="confirmation">Choose the student who will borrow <b>${escape(book.title)}</b>.</p><div class="field"><label>Student</label><select name="studentId" required>${state.students.map(student => `<option value="${student.id}">${escape(student.name)} · ${escape(student.course)}</option>`).join('')}</select></div>${actions(true, 'Borrow Book')}</form>`); }

document.addEventListener('click', event => {
  if (event.target.classList?.contains('modal-backdrop')) { closeModal(); return; }
  const control = event.target.closest('[data-action], [data-route]');
  if (!control) return;
  if (control.dataset.route) { event.preventDefault(); if (!isAuthed()) { notice('Please sign in to access the library.'); return; } route = control.dataset.route; render(); window.scrollTo({top:0,behavior:'smooth'}); return; }
  const { action, id, type } = control.dataset;
  if (action === 'login-link') { document.querySelector('#username')?.focus(); return; }
  if (action === 'toggle-theme') { applyTheme(document.body?.dataset.theme === 'dark' ? 'light' : 'dark'); return; }
  if (action === 'logout') return confirmLogout();
  if (action === 'confirm-logout') return performLogout();
  if (action === 'close-modal') { closeModal(); return; }
  if (action === 'books-page') { booksCurrentPage = Number(control.dataset.page); render(); return; }
  if (action === 'add-book') return bookForm();
  if (action === 'edit-book') return bookForm(getBook(id));
  if (action === 'delete-book') return confirmDelete('book', id);
  if (action === 'details-book') return details('book', id);
  if (action === 'borrow-book') return borrowForm(getBook(id));
  if (action === 'return-book') return returnBook(id);
  if (action === 'add-student') return studentForm();
  if (action === 'edit-student') return studentForm(getStudent(id));
  if (action === 'delete-student') return confirmDelete('student', id);
  if (action === 'details-student') return details('student', id);
  if (action === 'add-librarian') return librarianForm();
  if (action === 'edit-librarian') return librarianForm(state.librarians.find(item => item.id === id));
  if (action === 'delete-librarian') return confirmDelete('librarian', id);
  if (action === 'details-librarian') return details('librarian', id);
  if (action === 'confirm-delete') return deleteItem(type, id);
  if (action === 'reset-data') { state = structuredClone(seed); save(); render(); notice('Demo data restored.'); }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modalRoot.innerHTML) closeModal();
});

document.addEventListener('submit', event => {
  const form = event.target;
  if (!form.matches('form[data-form]')) return;
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(form));
  const kind = form.dataset.form;
  if (kind === 'login') { if (payload.username.trim().toLowerCase() === 'aaravtripathi' && payload.password.trim()) { sessionStorage.setItem('library-auth','true'); route = 'dashboard'; render(); notice('Welcome back, Aarav!'); } else { document.querySelector('#login-error').textContent = 'Use username “aaravtripathi” and enter any password.'; } return; }
  if (kind === 'book') { const existing = getBook(form.dataset.id); if (existing) Object.assign(existing, payload); else state.books.push({id:uid('b'),...payload,borrower:null}); finish(existing ? 'Book updated successfully.' : 'Book added successfully.'); }
  if (kind === 'student') { const existing = getStudent(form.dataset.id); if (existing) Object.assign(existing,payload); else state.students.push({id:uid('s'),...payload}); finish(existing ? 'Student updated successfully.' : 'Student added successfully.'); }
  if (kind === 'librarian') { const existing = state.librarians.find(item => item.id === form.dataset.id); if (existing) Object.assign(existing,payload); else state.librarians.push({id:uid('l'),...payload}); finish(existing ? 'Librarian updated successfully.' : 'Librarian added successfully.'); }
  if (kind === 'borrow') { const book = getBook(form.dataset.id); book.borrower = payload.studentId; state.history.push({id:uid('h'),bookId:book.id,studentId:payload.studentId,borrowedAt:today(),returnedAt:null}); finish(`${book.title} has been borrowed.`); }
});
function finish(message) { save(); closeModal(); render(); notice(message); }
function returnBook(bookId) { const book = getBook(bookId); const loan = [...state.history].reverse().find(item => item.bookId === bookId && !item.returnedAt); if (loan) loan.returnedAt = today(); book.borrower = null; finish(`${book.title} has been returned.`); }
function deleteItem(type, id) { if (type === 'book') { const book = getBook(id); if (book.borrower) { notice('Return this book before deleting it.'); closeModal(); return; } state.books = state.books.filter(item => item.id !== id); } if (type === 'student') { if (state.books.some(book => book.borrower === id)) { notice('This student must return their book first.'); closeModal(); return; } state.students = state.students.filter(item => item.id !== id); } if (type === 'librarian') state.librarians = state.librarians.filter(item => item.id !== id); finish(`${type[0].toUpperCase() + type.slice(1)} deleted successfully.`); }

document.addEventListener('input', event => { const input = event.target; if (!input.matches('[data-search]')) return; const query = input.value.trim().toLowerCase(); if (input.dataset.search === 'books') { booksQuery = query; booksCurrentPage = 1; refreshBooksResults(); } if (input.dataset.search === 'students') document.querySelector('#students-rows').innerHTML = studentsRows(state.students.filter(item => `${item.name} ${item.email} ${item.course}`.toLowerCase().includes(query))); if (input.dataset.search === 'librarians') document.querySelector('#librarians-rows').innerHTML = librariansRows(state.librarians.filter(item => `${item.name} ${item.email} ${item.shift}`.toLowerCase().includes(query))); if (input.dataset.search === 'history') document.querySelector('#history-rows').innerHTML = historyRows(state.history.filter(item => `${getBook(item.bookId)?.title || ''} ${getStudent(item.studentId)?.name || ''}`.toLowerCase().includes(query))); });

applyTheme(localStorage.getItem('library-theme') || 'light');
render();
