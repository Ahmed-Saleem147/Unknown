/* ============================================
   UNKNOWN FC — ADMIN PORTAL JAVASCRIPT
   ============================================ */

// ============================================
// DEFAULT DATA
// ============================================
const DEFAULT_PASSWORD = 'unknownfc2026';

const DEFAULT_NEWS = [
  { id: 1, date: '2026-03-28', title: 'Unknown FC Dominates in Latest 5-A-Side Tournament', excerpt: 'The squad showed incredible form, with outstanding performances from multiple players...' },
  { id: 2, date: '2026-03-15', title: 'New Training Regime Kicks Off This Season', excerpt: 'Coaching staff unveil new tactical approaches ahead of the upcoming fixtures...' },
  { id: 3, date: '2026-03-02', title: 'Squad Photo Shoot — Behind The Scenes', excerpt: 'Check out exclusive behind-the-scenes moments from our latest team photoshoot...' },
  { id: 4, date: '2026-02-18', title: 'Unknown FC Officially on Instagram & TikTok', excerpt: 'Follow us @unknownfcboys for exclusive content, match highlights and more...' },
];

const DEFAULT_FIXTURES = [
  { id: 1, day: '15', month: 'APR', homeTeam: 'Unknown FC', awayTeam: 'Rivals XI', time: '15:00 GMT', venue: 'Home Ground', status: 'upcoming', score: '' },
  { id: 2, day: '22', month: 'APR', homeTeam: 'City United', awayTeam: 'Unknown FC', time: '16:00 GMT', venue: 'Away', status: 'upcoming', score: '' },
  { id: 3, day: '29', month: 'APR', homeTeam: 'Unknown FC', awayTeam: 'Thunder Boys', time: '14:30 GMT', venue: 'Home Ground', status: 'upcoming', score: '' },
  { id: 4, day: '28', month: 'MAR', homeTeam: 'Unknown FC', awayTeam: 'East Side FC', time: 'Full Time', venue: 'Home Ground', status: 'win', score: '3 - 1' },
];

const DEFAULT_SQUAD = [
  { id: 1,  number: '01', name: 'Andy Johnfiah',        position: 'Player', photo: '' },
  { id: 2,  number: '02', name: 'Lord Ayamga',           position: 'Player', photo: '' },
  { id: 3,  number: '03', name: 'Thomas Partey',         position: 'Player', photo: '' },
  { id: 4,  number: '04', name: 'Prince Bonney',         position: 'Player', photo: '' },
  { id: 5,  number: '05', name: 'Gilbert Selasi',        position: 'Player', photo: '' },
  { id: 6,  number: '06', name: 'André Lamar Ayebo',     position: 'Player', photo: '' },
  { id: 7,  number: '07', name: 'Asiedu Samuel',         position: 'Player', photo: '' },
  { id: 8,  number: '08', name: 'Divassa Amartey',       position: 'Player', photo: '' },
  { id: 9,  number: '09', name: 'Agala Derick Kwame',    position: 'Player', photo: '' },
  { id: 10, number: '10', name: 'Luqman Said',           position: 'Player', photo: '' },
  { id: 11, number: '11', name: 'Frank Arhin Issachar',  position: 'Player', photo: '' },
  { id: 12, number: '12', name: 'Abdul Sadat Smart',     position: 'Player', photo: '' },
  { id: 13, number: '13', name: 'Ahmed Saleem',          position: 'Player', photo: '' },
  { id: 14, number: '14', name: 'Godson Emmanuel',       position: 'Player', photo: '' },
  { id: 15, number: '15', name: 'Benjamin Nii Odai',     position: 'Player', photo: '' },
  { id: 16, number: '16', name: 'Kumi Francis',          position: 'Player', photo: '' },
  { id: 17, number: '17', name: 'Jakes Kyei',            position: 'Player', photo: '' },
  { id: 18, number: '18', name: 'Abdul Majeed Idrissa',  position: 'Player', photo: '' },
  { id: 19, number: '19', name: 'Lumor Drachma',         position: 'Player', photo: '' },
];

const DEFAULT_SPONSORS = [
  { id: 1, name: 'Kenniz Travel & Tour' },
  { id: 2, name: 'The 13th' },
  { id: 3, name: 'Accra by Air' },
];

const DEFAULT_SETTINGS = {
  phone1: '020 912 6842',
  phone2: '053 774 8210',
  email: 'unknownfootballclub7@gmail.com',
  instagram: 'unknownfcboys',
  tiktok: 'unknownfcboys',
};

// ============================================
// JSONBIN — CLOUD STORAGE
// ============================================
const BIN_ID     = '69d79ea4856a682189157ecc';
const READ_KEY   = '$2a$10$mFthzZ19pT0VhpeaTHHuyunfhhSVek9Pl8rigpyH7tlCiSSkaGhl.';
const WRITE_KEY  = '$2a$10$YL3zUiyQZw5hR8T.tHF4yescWt4JlleD1K8/1WDbypqHQKD1iH.jm';
const BIN_URL    = 'https://api.jsonbin.io/v3/b/' + BIN_ID;

let binData = {};

function getData(key, fallback) {
  const val = binData[key];
  return (val !== undefined && val !== null) ? val : fallback;
}

// Returns a promise — callers must await this
async function saveData(key, val) {
  binData[key] = val;
  const res = await fetch(BIN_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': WRITE_KEY
    },
    body: JSON.stringify(binData)
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => res.status);
    console.error('JSONBin save failed:', msg);
    throw new Error('Save failed (' + res.status + ')');
  }
}

async function fetchAndInitBin() {
  try {
    const res = await fetch(BIN_URL, { headers: { 'X-Master-Key': WRITE_KEY } });
    if (res.ok) {
      const json = await res.json();
      binData = json.record || {};
    }
  } catch (e) { binData = {}; }

  // Initialize any missing OR empty-array keys with defaults (first run)
  let needsSave = false;
  if (!binData._initialized) {
    if (!binData.news     || binData.news.length     === 0) { binData.news     = DEFAULT_NEWS;     needsSave = true; }
    if (!binData.fixtures || binData.fixtures.length === 0) { binData.fixtures = DEFAULT_FIXTURES; needsSave = true; }
    if (!binData.squad    || binData.squad.length    === 0) { binData.squad    = DEFAULT_SQUAD;    needsSave = true; }
    if (!binData.sponsors || binData.sponsors.length === 0) { binData.sponsors = DEFAULT_SPONSORS; needsSave = true; }
    if (!binData.gallery  || binData.gallery.length  === 0) { binData.gallery  = DEFAULT_GALLERY;  needsSave = true; }
    if (!binData.settings || Object.keys(binData.settings).length === 0) { binData.settings = DEFAULT_SETTINGS; needsSave = true; }
    binData._initialized = true;
    needsSave = true;
  }

  if (needsSave) {
    await fetch(BIN_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Master-Key': WRITE_KEY },
      body: JSON.stringify(binData)
    });
  }

  // Password stays local only
  if (!localStorage.getItem('ufc_pw')) localStorage.setItem('ufc_pw', DEFAULT_PASSWORD);
}

// ============================================
// AUTH
// ============================================
const loginScreen = document.getElementById('loginScreen');
const adminWrap   = document.getElementById('adminWrap');
const loginForm   = document.getElementById('loginForm');
const loginPw     = document.getElementById('loginPassword');
const togglePw    = document.getElementById('togglePw');
const logoutBtn   = document.getElementById('logoutBtn');

function isLoggedIn() { return sessionStorage.getItem('ufc_admin') === 'yes'; }
function login() { sessionStorage.setItem('ufc_admin', 'yes'); }
function logout() { sessionStorage.removeItem('ufc_admin'); location.reload(); }

togglePw.addEventListener('click', () => {
  loginPw.type = loginPw.type === 'password' ? 'text' : 'password';
  togglePw.innerHTML = loginPw.type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const pw = localStorage.getItem('ufc_pw') || DEFAULT_PASSWORD;
  if (loginPw.value === pw) {
    login();
    showAdmin();
  } else {
    loginPw.style.outline = '2px solid #ff4444';
    showToast('Incorrect password. Try again.', true);
    setTimeout(() => { loginPw.style.outline = ''; }, 2000);
  }
});

logoutBtn.addEventListener('click', (e) => { e.preventDefault(); logout(); });

async function showAdmin() {
  loginScreen.style.display = 'none';
  adminWrap.style.display = 'flex';
  // Show loading state
  document.getElementById('topbarTitle').textContent = 'Loading...';
  await fetchAndInitBin();
  loadDashboard();
  renderAll();
}

// ============================================
// SIDEBAR NAVIGATION
// ============================================
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');

sidebarToggle.addEventListener('click', () => { sidebar.classList.toggle('open'); });

document.querySelectorAll('.nav-item[data-section]').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    switchSection(item.dataset.section);
    if (window.innerWidth <= 768) sidebar.classList.remove('open');
  });
});

function switchSection(name) {
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  document.querySelector(`.nav-item[data-section="${name}"]`).classList.add('active');
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById('section-' + name).classList.add('active');
  document.getElementById('topbarTitle').textContent = name.charAt(0).toUpperCase() + name.slice(1);
}

// ============================================
// TOAST
// ============================================
let toastTimer;
function showToast(msg, isError = false) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = 'toast show' + (isError ? ' error' : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.className = 'toast'; }, 3500);
}

// ============================================
// MODAL
// ============================================
const modalOverlay = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');
const modalTitle   = document.getElementById('modalTitle');
const modalBody    = document.getElementById('modalBody');

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

function openModal(title, bodyHTML) {
  modalTitle.textContent = title;
  modalBody.innerHTML = bodyHTML;
  modalOverlay.classList.add('active');
}
function closeModal() {
  modalOverlay.classList.remove('active');
  modalBody.innerHTML = '';
}

// ============================================
// DASHBOARD
// ============================================
function loadDashboard() {
  document.getElementById('stat-news').textContent     = getData('news', []).length;
  document.getElementById('stat-fixtures').textContent = getData('fixtures', []).length;
  document.getElementById('stat-squad').textContent    = getData('squad', []).length;
  document.getElementById('stat-sponsors').textContent = getData('sponsors', []).length;
  document.getElementById('stat-gallery').textContent  = getData('gallery', DEFAULT_GALLERY).length;
}

// ============================================
// RENDER ALL
// ============================================
function renderAll() {
  renderNews();
  renderFixtures();
  renderSquad();
  renderSponsors();
  renderGallery();
  loadSettings();
  loadDashboard();
}

// ============================================
// NEWS
// ============================================
function renderNews() {
  const news = getData('news', []);
  const tbody = document.getElementById('newsTable');
  const empty = document.getElementById('newsEmpty');

  if (news.length === 0) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  tbody.innerHTML = news.map(n => `
    <tr>
      <td>${formatDate(n.date)}</td>
      <td><strong>${escHtml(n.title)}</strong></td>
      <td style="max-width:260px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escHtml(n.excerpt)}</td>
      <td>
        <div class="tbl-actions">
          <button class="tbl-btn edit" onclick="editNews(${n.id})" title="Edit"><i class="fas fa-edit"></i></button>
          <button class="tbl-btn delete" onclick="deleteNews(${n.id})" title="Delete"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openAddNews() {
  openModal('Add News Article', newsForm(null));
  document.getElementById('newsFormEl').addEventListener('submit', submitNews);
}

function editNews(id) {
  const news = getData('news', []);
  const item = news.find(n => n.id === id);
  if (!item) return;
  openModal('Edit News Article', newsForm(item));
  document.getElementById('newsFormEl').addEventListener('submit', (e) => submitNews(e, id));
}

function newsForm(item) {
  return `
    <form id="newsFormEl">
      <div class="form-group">
        <label>Date</label>
        <input type="date" id="nDate" value="${item ? item.date : today()}" required />
      </div>
      <div class="form-group">
        <label>Title</label>
        <input type="text" id="nTitle" placeholder="News article title..." value="${item ? escHtml(item.title) : ''}" required />
      </div>
      <div class="form-group">
        <label>Excerpt (short description)</label>
        <textarea id="nExcerpt" placeholder="Short summary shown on website..." rows="3" required>${item ? escHtml(item.excerpt) : ''}</textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="cancel-btn" onclick="closeModal()">Cancel</button>
        <button type="submit" class="save-btn"><i class="fas fa-save"></i> Save Article</button>
      </div>
    </form>
  `;
}

async function submitNews(e, editId = null) {
  e.preventDefault();
  const btn = document.querySelector('#newsFormEl .save-btn');
  btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
  const news = getData('news', []);
  const item = {
    id: editId || Date.now(),
    date: document.getElementById('nDate').value,
    title: document.getElementById('nTitle').value.trim(),
    excerpt: document.getElementById('nExcerpt').value.trim(),
  };
  if (editId) {
    const idx = news.findIndex(n => n.id === editId);
    if (idx !== -1) news[idx] = item;
  } else {
    news.unshift(item);
  }
  try {
    await saveData('news', news);
    closeModal(); renderNews(); loadDashboard();
    showToast(editId ? 'News article updated!' : 'News article added!');
  } catch {
    btn.disabled = false; btn.innerHTML = '<i class="fas fa-save"></i> Save Article';
    showToast('Failed to save — check connection.', true);
  }
}

async function deleteNews(id) {
  if (!confirm('Delete this news article?')) return;
  const news = getData('news', []).filter(n => n.id !== id);
  try { await saveData('news', news); renderNews(); loadDashboard(); showToast('News article deleted.'); }
  catch { showToast('Failed to delete — check connection.', true); }
}

// ============================================
// FIXTURES
// ============================================
function renderFixtures() {
  const fixtures = getData('fixtures', []);
  const tbody = document.getElementById('fixturesTable');
  const empty = document.getElementById('fixturesEmpty');

  if (fixtures.length === 0) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  tbody.innerHTML = fixtures.map(f => `
    <tr>
      <td>${f.day} ${f.month}</td>
      <td><strong>${escHtml(f.homeTeam)}</strong></td>
      <td><strong>${escHtml(f.awayTeam)}</strong></td>
      <td>${escHtml(f.venue)}</td>
      <td>
        <span class="badge ${f.status}">
          ${f.status === 'upcoming' ? 'Upcoming' : f.status.charAt(0).toUpperCase() + f.status.slice(1)}
          ${f.score ? ' · ' + f.score : ''}
        </span>
      </td>
      <td>
        <div class="tbl-actions">
          <button class="tbl-btn edit" onclick="editFixture(${f.id})" title="Edit"><i class="fas fa-edit"></i></button>
          <button class="tbl-btn delete" onclick="deleteFixture(${f.id})" title="Delete"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openAddFixture() {
  openModal('Add Fixture', fixtureForm(null));
  document.getElementById('fixtureFormEl').addEventListener('submit', submitFixture);
  toggleScoreField();
}

function editFixture(id) {
  const fixtures = getData('fixtures', []);
  const item = fixtures.find(f => f.id === id);
  if (!item) return;
  openModal('Edit Fixture', fixtureForm(item));
  document.getElementById('fixtureFormEl').addEventListener('submit', (e) => submitFixture(e, id));
  toggleScoreField();
}

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

function fixtureForm(f) {
  const monthOpts = MONTHS.map((m, i) =>
    `<option value="${m}" ${f && f.month === m ? 'selected' : ''}>${m}</option>`
  ).join('');
  const statusOpts = ['upcoming','win','loss','draw'].map(s =>
    `<option value="${s}" ${f && f.status === s ? 'selected' : ''}>${s.charAt(0).toUpperCase()+s.slice(1)}</option>`
  ).join('');
  return `
    <form id="fixtureFormEl">
      <div class="modal-body form-row" style="padding:0;margin-bottom:0;">
        <div class="form-group">
          <label>Day</label>
          <input type="number" id="fDay" placeholder="e.g. 15" min="1" max="31" value="${f ? f.day : ''}" required />
        </div>
        <div class="form-group">
          <label>Month</label>
          <select id="fMonth">${monthOpts}</select>
        </div>
      </div>
      <div class="form-group">
        <label>Home Team</label>
        <input type="text" id="fHome" value="${f ? escHtml(f.homeTeam) : 'Unknown FC'}" required />
      </div>
      <div class="form-group">
        <label>Away Team</label>
        <input type="text" id="fAway" value="${f ? escHtml(f.awayTeam) : ''}" placeholder="Opponent name..." required />
      </div>
      <div class="modal-body form-row" style="padding:0;margin-bottom:0;">
        <div class="form-group">
          <label>Time / Note</label>
          <input type="text" id="fTime" value="${f ? escHtml(f.time) : ''}" placeholder="e.g. 15:00 GMT" />
        </div>
        <div class="form-group">
          <label>Venue</label>
          <input type="text" id="fVenue" value="${f ? escHtml(f.venue) : ''}" placeholder="e.g. Home Ground" />
        </div>
      </div>
      <div class="form-group">
        <label>Status</label>
        <select id="fStatus" onchange="toggleScoreField()">${statusOpts}</select>
      </div>
      <div class="form-group" id="scoreGroup" style="display:none;">
        <label>Score (e.g. 3 - 1)</label>
        <input type="text" id="fScore" value="${f ? escHtml(f.score) : ''}" placeholder="e.g. 2 - 0" />
      </div>
      <div class="modal-footer">
        <button type="button" class="cancel-btn" onclick="closeModal()">Cancel</button>
        <button type="submit" class="save-btn"><i class="fas fa-save"></i> Save Fixture</button>
      </div>
    </form>
  `;
}

function toggleScoreField() {
  const statusEl = document.getElementById('fStatus');
  const scoreGroup = document.getElementById('scoreGroup');
  if (!statusEl || !scoreGroup) return;
  scoreGroup.style.display = statusEl.value !== 'upcoming' ? 'block' : 'none';
}

async function submitFixture(e, editId = null) {
  e.preventDefault();
  const btn = document.querySelector('#fixtureFormEl .save-btn');
  btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
  const fixtures = getData('fixtures', []);
  const item = {
    id: editId || Date.now(),
    day: document.getElementById('fDay').value,
    month: document.getElementById('fMonth').value,
    homeTeam: document.getElementById('fHome').value.trim(),
    awayTeam: document.getElementById('fAway').value.trim(),
    time: document.getElementById('fTime').value.trim(),
    venue: document.getElementById('fVenue').value.trim(),
    status: document.getElementById('fStatus').value,
    score: document.getElementById('fScore') ? document.getElementById('fScore').value.trim() : '',
  };
  if (editId) {
    const idx = fixtures.findIndex(f => f.id === editId);
    if (idx !== -1) fixtures[idx] = item;
  } else {
    fixtures.push(item);
  }
  try {
    await saveData('fixtures', fixtures);
    closeModal(); renderFixtures(); loadDashboard();
    showToast(editId ? 'Fixture updated!' : 'Fixture added!');
  } catch {
    btn.disabled = false; btn.innerHTML = '<i class="fas fa-save"></i> Save Fixture';
    showToast('Failed to save — check connection.', true);
  }
}

async function deleteFixture(id) {
  if (!confirm('Delete this fixture?')) return;
  const fixtures = getData('fixtures', []).filter(f => f.id !== id);
  try { await saveData('fixtures', fixtures); renderFixtures(); loadDashboard(); showToast('Fixture deleted.'); }
  catch { showToast('Failed to delete — check connection.', true); }
}

// ============================================
// SQUAD
// ============================================
function renderSquad() {
  const squad = getData('squad', []);
  const tbody = document.getElementById('squadTable');

  if (squad.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:40px;color:var(--grey);">No players yet. Add your first one!</td></tr>`;
    return;
  }

  tbody.innerHTML = squad.map(p => {
    const hasPhoto = p.photo && p.photo.trim() !== '';
    const thumbSrc = hasPhoto ? p.photo : '';
    const thumb = hasPhoto
      ? `<img src="${escHtml(thumbSrc)}" alt="${escHtml(p.name)}" class="squad-photo" />`
      : `<div class="squad-no-photo"><i class="fas fa-user"></i></div>`;
    return `<tr>
      <td><strong style="color:var(--orange);font-family:'Bebas Neue',sans-serif;font-size:1.2rem;">${escHtml(p.number)}</strong></td>
      <td>${thumb}</td>
      <td><strong>${escHtml(p.name)}</strong></td>
      <td><span class="badge upcoming">${escHtml(p.position)}</span></td>
      <td>
        <div class="tbl-actions">
          <button class="tbl-btn edit" onclick="editPlayer(${p.id})" title="Edit"><i class="fas fa-edit"></i></button>
          <button class="tbl-btn delete" onclick="deletePlayer(${p.id})" title="Remove"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

// Compress image to JPEG, max 400px wide, quality 0.65 — keeps base64 small enough for JSONBin
function readPhotoFile(inputId) {
  return new Promise((resolve) => {
    const input = document.getElementById(inputId);
    if (!input || !input.files || !input.files[0]) { resolve(null); return; }
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const MAX = 400;
        let w = img.width, h = img.height;
        if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; }
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.65));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  });
}

function playerFormHTML(player) {
  const isEdit = !!player;
  const hasPhoto = isEdit && player.photo && player.photo.trim() !== '';
  return `
    <form id="playerFormEl">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div class="form-group">
          <label>Jersey Number</label>
          <input type="text" id="pNum" placeholder="e.g. 20" value="${isEdit ? escHtml(player.number) : ''}" required />
        </div>
        <div class="form-group">
          <label>Position</label>
          <input type="text" id="pPos" placeholder="e.g. Player" value="${isEdit ? escHtml(player.position) : 'Player'}" />
        </div>
      </div>
      <div class="form-group">
        <label>Full Name</label>
        <input type="text" id="pName" placeholder="Player full name..." value="${isEdit ? escHtml(player.name) : ''}" required />
      </div>
      <div class="form-group">
        <label>Player Photo <span style="color:var(--grey);font-weight:400;">(optional)</span></label>
        <div class="photo-upload-area" id="photoUploadArea">
          ${hasPhoto ? `<img src="${player.photo}" class="photo-preview" id="photoPreview" />` : `<div class="photo-placeholder" id="photoPreview"><i class="fas fa-camera"></i><span>Click to upload photo</span></div>`}
          <input type="file" id="pPhotoFile" accept="image/*" style="position:absolute;inset:0;opacity:0;cursor:pointer;" />
        </div>
        ${hasPhoto ? `<button type="button" class="remove-photo-btn" id="removePhotoBtn" onclick="clearPhoto()"><i class="fas fa-times"></i> Remove photo</button>` : ''}
      </div>
      <div class="modal-footer">
        <button type="button" class="cancel-btn" onclick="closeModal()">Cancel</button>
        <button type="submit" class="save-btn"><i class="fas fa-save"></i> ${isEdit ? 'Save Changes' : 'Add Player'}</button>
      </div>
    </form>
  `;
}

// Live preview when photo selected
function bindPhotoPreview() {
  const fileInput = document.getElementById('pPhotoFile');
  if (!fileInput) return;
  fileInput.addEventListener('change', () => {
    if (!fileInput.files[0]) return;
    const reader = new FileReader();
    reader.onload = e => {
      const preview = document.getElementById('photoPreview');
      if (preview.tagName === 'IMG') {
        preview.src = e.target.result;
      } else {
        // Replace placeholder div with img
        const img = document.createElement('img');
        img.src = e.target.result;
        img.className = 'photo-preview';
        img.id = 'photoPreview';
        preview.replaceWith(img);
      }
    };
    reader.readAsDataURL(fileInput.files[0]);
  });
}

function clearPhoto() {
  const preview = document.getElementById('photoPreview');
  if (preview && preview.tagName === 'IMG') {
    const div = document.createElement('div');
    div.className = 'photo-placeholder';
    div.id = 'photoPreview';
    div.innerHTML = '<i class="fas fa-camera"></i><span>Click to upload photo</span>';
    preview.replaceWith(div);
  }
  const removeBtn = document.getElementById('removePhotoBtn');
  if (removeBtn) removeBtn.style.display = 'none';
  const fileInput = document.getElementById('pPhotoFile');
  if (fileInput) fileInput.value = '';
  // Mark as cleared
  const area = document.getElementById('photoUploadArea');
  if (area) area.dataset.cleared = 'true';
}

function openAddPlayer() {
  openModal('Add New Player', playerFormHTML(null));
  bindPhotoPreview();
  document.getElementById('playerFormEl').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.querySelector('#playerFormEl .save-btn');
    btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    const photoData = await readPhotoFile('pPhotoFile');
    const squad = getData('squad', []);
    squad.push({
      id: Date.now(),
      number: document.getElementById('pNum').value.trim(),
      name: document.getElementById('pName').value.trim(),
      position: document.getElementById('pPos').value.trim() || 'Player',
      photo: photoData || '',
    });
    try {
      await saveData('squad', squad);
      closeModal(); renderSquad(); loadDashboard();
      showToast('Player added! Photo saved to cloud.');
    } catch {
      btn.disabled = false; btn.innerHTML = '<i class="fas fa-save"></i> Add Player';
      showToast('Failed to save — check connection.', true);
    }
  });
}

function editPlayer(id) {
  const squad = getData('squad', []);
  const player = squad.find(p => p.id === id);
  if (!player) return;
  openModal(`Edit Player — #${player.number}`, playerFormHTML(player));
  bindPhotoPreview();
  document.getElementById('playerFormEl').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.querySelector('#playerFormEl .save-btn');
    btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    const area = document.getElementById('photoUploadArea');
    const cleared = area && area.dataset.cleared === 'true';
    const newPhotoData = await readPhotoFile('pPhotoFile');
    const idx = squad.findIndex(p => p.id === id);
    if (idx !== -1) {
      squad[idx] = {
        ...squad[idx],
        number: document.getElementById('pNum').value.trim(),
        name: document.getElementById('pName').value.trim(),
        position: document.getElementById('pPos').value.trim() || 'Player',
        photo: newPhotoData ? newPhotoData : (cleared ? '' : squad[idx].photo),
      };
    }
    try {
      await saveData('squad', squad);
      closeModal(); renderSquad();
      showToast('Player updated! Photo saved to cloud.');
    } catch {
      btn.disabled = false; btn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
      showToast('Failed to save — photo may be too large. Try a smaller image.', true);
    }
  });
}

async function deletePlayer(id) {
  if (!confirm('Remove this player from the squad?')) return;
  const squad = getData('squad', []).filter(p => p.id !== id);
  try { await saveData('squad', squad); renderSquad(); loadDashboard(); showToast('Player removed.'); }
  catch { showToast('Failed to remove — check connection.', true); }
}

// ============================================
// SPONSORS
// ============================================
function renderSponsors() {
  const sponsors = getData('sponsors', []);
  const list = document.getElementById('sponsorsList');
  list.innerHTML = sponsors.length === 0
    ? '<div class="empty-state"><i class="fas fa-handshake"></i><p>No sponsors yet.</p></div>'
    : sponsors.map(s => `
      <div class="sponsor-admin-item">
        <span class="sponsor-admin-name">${escHtml(s.name)}</span>
        <div class="tbl-actions">
          <button class="tbl-btn edit" onclick="editSponsor(${s.id})" title="Edit"><i class="fas fa-edit"></i></button>
          <button class="tbl-btn delete" onclick="deleteSponsor(${s.id})" title="Delete"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `).join('');
}

function openAddSponsor() {
  openModal('Add Sponsor', `
    <form id="sponsorFormEl">
      <div class="form-group">
        <label>Sponsor Name</label>
        <input type="text" id="sName" placeholder="e.g. Kenniz Travel & Tour" required />
      </div>
      <div class="modal-footer">
        <button type="button" class="cancel-btn" onclick="closeModal()">Cancel</button>
        <button type="submit" class="save-btn"><i class="fas fa-save"></i> Add Sponsor</button>
      </div>
    </form>
  `);
  document.getElementById('sponsorFormEl').addEventListener('submit', (e) => {
    e.preventDefault();
    const sponsors = getData('sponsors', []);
    sponsors.push({ id: Date.now(), name: document.getElementById('sName').value.trim() });
    saveData('sponsors', sponsors);
    closeModal();
    renderSponsors();
    loadDashboard();
    showToast('Sponsor added!');
  });
}

function editSponsor(id) {
  const sponsors = getData('sponsors', []);
  const item = sponsors.find(s => s.id === id);
  if (!item) return;
  openModal('Edit Sponsor', `
    <form id="sponsorEditFormEl">
      <div class="form-group">
        <label>Sponsor Name</label>
        <input type="text" id="sEditName" value="${escHtml(item.name)}" required />
      </div>
      <div class="modal-footer">
        <button type="button" class="cancel-btn" onclick="closeModal()">Cancel</button>
        <button type="submit" class="save-btn"><i class="fas fa-save"></i> Save</button>
      </div>
    </form>
  `);
  document.getElementById('sponsorEditFormEl').addEventListener('submit', (e) => {
    e.preventDefault();
    const idx = sponsors.findIndex(s => s.id === id);
    if (idx !== -1) sponsors[idx].name = document.getElementById('sEditName').value.trim();
    saveData('sponsors', sponsors);
    closeModal();
    renderSponsors();
    showToast('Sponsor updated!');
  });
}

function deleteSponsor(id) {
  if (!confirm('Remove this sponsor?')) return;
  const sponsors = getData('sponsors', []).filter(s => s.id !== id);
  saveData('sponsors', sponsors);
  renderSponsors();
  loadDashboard();
  showToast('Sponsor removed.');
}

// ============================================
// GALLERY
// ============================================
const DEFAULT_GALLERY = [
  'photo1.jpeg','photo2.jpeg','photo3.jpeg','photo12.jpeg','photo13.jpeg',
  'photo14.jpeg','photo4.jpeg','photo15.jpeg','photo16.jpeg','photo5.jpeg',
  'photo17.jpeg','photo18.jpeg','photo6.jpeg','photo19.jpeg','photo20.jpeg',
  'photo7.jpeg','photo21.jpeg','photo8.jpeg','photo22.jpeg','photo9.jpeg',
  'photo10.jpeg','photo23.jpeg','photo11.jpeg'
].map((src, i) => ({ id: i + 1, src }));

function renderGallery() {
  const gallery = getData('gallery', DEFAULT_GALLERY);
  const grid = document.getElementById('galleryAdminGrid');
  const empty = document.getElementById('galleryEmpty');
  if (!grid) return;

  if (gallery.length === 0) {
    grid.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  grid.innerHTML = gallery.map(item => `
    <div class="gallery-admin-item">
      <img src="${item.src}" alt="Gallery photo" />
      <button class="gallery-delete-btn" onclick="deleteGalleryPhoto(${item.id})" title="Remove photo">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `).join('');
}

function openAddPhoto() {
  openModal('Add Photos', `
    <form id="galleryFormEl">
      <div class="form-group">
        <label>Select Photos <span style="color:var(--grey);font-weight:400;">(you can pick multiple)</span></label>
        <div class="photo-upload-area" id="galleryUploadArea" style="height:auto;min-height:120px;padding:20px;">
          <div class="photo-placeholder" id="galleryPreviewWrap"><i class="fas fa-images"></i><span>Click to choose photos</span></div>
          <input type="file" id="galleryFiles" accept="image/*" multiple style="position:absolute;inset:0;opacity:0;cursor:pointer;" />
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="cancel-btn" onclick="closeModal()">Cancel</button>
        <button type="submit" class="save-btn"><i class="fas fa-upload"></i> Upload</button>
      </div>
    </form>
  `);

  // Preview selected files
  document.getElementById('galleryFiles').addEventListener('change', function() {
    const wrap = document.getElementById('galleryPreviewWrap');
    const files = Array.from(this.files);
    if (files.length === 0) return;
    wrap.innerHTML = `<span style="color:var(--orange);font-weight:600;">${files.length} photo${files.length > 1 ? 's' : ''} selected</span>`;
  });

  document.getElementById('galleryFormEl').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('galleryFiles');
    if (!input.files || input.files.length === 0) {
      showToast('Please select at least one photo.', true);
      return;
    }
    const gallery = getData('gallery', DEFAULT_GALLERY);
    const reads = Array.from(input.files).map(file => new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = ev => resolve({ id: Date.now() + Math.random(), src: ev.target.result });
      reader.readAsDataURL(file);
    }));
    const newPhotos = await Promise.all(reads);
    gallery.push(...newPhotos);
    saveData('gallery', gallery);
    closeModal();
    renderGallery();
    loadDashboard();
    showToast(`${newPhotos.length} photo${newPhotos.length > 1 ? 's' : ''} added!`);
  });
}

function deleteGalleryPhoto(id) {
  if (!confirm('Remove this photo from the gallery?')) return;
  const gallery = getData('gallery', DEFAULT_GALLERY).filter(p => p.id !== id);
  saveData('gallery', gallery);
  renderGallery();
  loadDashboard();
  showToast('Photo removed.');
}

// ============================================
// SETTINGS
// ============================================
function loadSettings() {
  const s = getData('settings', DEFAULT_SETTINGS);
  document.getElementById('set-phone1').value     = s.phone1    || '';
  document.getElementById('set-phone2').value     = s.phone2    || '';
  document.getElementById('set-email').value      = s.email     || '';
  document.getElementById('set-instagram').value  = s.instagram || '';
  document.getElementById('set-tiktok').value     = s.tiktok    || '';
}

document.getElementById('contactSettingsForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const s = getData('settings', DEFAULT_SETTINGS);
  s.phone1     = document.getElementById('set-phone1').value.trim();
  s.phone2     = document.getElementById('set-phone2').value.trim();
  s.email      = document.getElementById('set-email').value.trim();
  s.instagram  = document.getElementById('set-instagram').value.trim();
  s.tiktok     = document.getElementById('set-tiktok').value.trim();
  saveData('settings', s);
  showToast('Contact info saved!');
});

document.getElementById('passwordForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const current  = document.getElementById('set-current-pw').value;
  const newPw    = document.getElementById('set-new-pw').value;
  const confirm  = document.getElementById('set-confirm-pw').value;
  const stored   = localStorage.getItem('ufc_pw') || DEFAULT_PASSWORD;

  if (current !== stored)   return showToast('Current password is wrong.', true);
  if (newPw.length < 6)     return showToast('New password must be at least 6 characters.', true);
  if (newPw !== confirm)    return showToast('New passwords do not match.', true);

  localStorage.setItem('ufc_pw', newPw);
  document.getElementById('passwordForm').reset();
  showToast('Password changed successfully!');
});

// ============================================
// UTILS
// ============================================
function escHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
function today() {
  return new Date().toISOString().split('T')[0];
}
function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch { return dateStr; }
}

// ============================================
// INIT
// ============================================
if (isLoggedIn()) {
  showAdmin();
} else {
  loginScreen.style.display = 'flex';
}
