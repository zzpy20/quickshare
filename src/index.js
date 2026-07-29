const STYLE = `
  :root { color-scheme: light dark; }
  *, *::before, *::after { box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
    max-width: 640px;
    margin: 0 auto;
    padding: 40px 20px 80px;
    background: #fff;
    color: #1d1d1f;
    overflow-x: hidden;
  }
  @media (min-width: 900px) {
    body { max-width: 1000px; }
  }
  @media (prefers-color-scheme: dark) {
    body { background: #1c1c1e; color: #f5f5f7; }
    #drop { border-color: #48484a !important; background: #2c2c2e !important; }
    input[type=password], input[type=search], input.meta-input { background: #2c2c2e; color: #f5f5f7; border-color: #48484a; }
    .row { background: #2c2c2e !important; }
    .row.batch { background: #1c2e42 !important; }
    .field-label { color: #f5f5f7; }
    .tag-chip, .file-tag { background: #2c2c2e !important; color: #f5f5f7 !important; }
  }
  h1 { font-size: 22px; font-weight: 600; margin-bottom: 4px; }
  p.sub { color: #86868b; margin-top: 0; font-size: 14px; }
  #auth { display: flex; gap: 8px; margin: 20px 0; }
  input[type=password], input[type=search], input.meta-input {
    flex: 1; padding: 10px 12px; border-radius: 10px; border: 1px solid #d2d2d7;
    font-size: 14px; width: 100%;
  }
  #searchBox { margin: 20px 0 0; }
  .field-label { display: block; font-size: 13px; font-weight: 500; margin: 16px 0 6px; }
  #tagFilters { display: flex; flex-wrap: wrap; gap: 6px; margin: 14px 0 0; }
  .tag-chip {
    padding: 4px 12px; border-radius: 999px; background: #e8e8ed; color: #1d1d1f;
    font-size: 12px; cursor: pointer; border: none; font-weight: 500;
  }
  .tag-chip.active { background: #0071e3; color: #fff; }
  .file-tag {
    padding: 2px 6px 2px 9px; border-radius: 999px; background: #e8e8ed; font-size: 11px;
    flex-shrink: 0; display: inline-flex; align-items: center; gap: 4px;
  }
  .file-tag button.tag-remove {
    background: none; border: none; padding: 0; margin: 0; color: inherit;
    font-size: 13px; line-height: 1; cursor: pointer; opacity: 0.55;
  }
  .file-tag button.tag-remove:hover { opacity: 1; background: none; }
  .file-row .caption { width: 100%; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
  .file-row .caption .caption-text { font-style: italic; }
  button.small-icon-btn {
    background: none; border: none; padding: 0 2px; color: inherit; font-size: 12px;
    opacity: 0.55; cursor: pointer;
  }
  button.small-icon-btn:hover { opacity: 1; background: none; }
  button.caption-add-btn {
    background: none; border: none; padding: 0; color: #0071e3; font-size: 12px;
    font-weight: 500; cursor: pointer;
  }
  button.caption-add-btn:hover { background: none; text-decoration: underline; }
  input.caption-input {
    flex: 1; min-width: 140px; padding: 6px 10px; border-radius: 8px;
    border: 1px solid #d2d2d7; font-size: 12px;
  }
  .tag-add-slot { display: inline-flex; align-items: center; gap: 4px; }
  .tag-add-slot input.tag-add-input { flex: none; width: 100px; min-width: 0; }
  @media (prefers-color-scheme: dark) {
    input.caption-input { background: #2c2c2e; color: #f5f5f7; border-color: #48484a; }
  }
  button {
    padding: 10px 16px; border-radius: 10px; border: none; background: #0071e3;
    color: #fff; font-size: 14px; font-weight: 500; cursor: pointer;
  }
  button:hover { background: #0077ed; }
  button.secondary { background: #e8e8ed; color: #1d1d1f; }
  #drop {
    border: 2px dashed #d2d2d7; border-radius: 16px; padding: 40px 20px;
    text-align: center; color: #86868b; cursor: pointer; transition: border-color .15s;
  }
  #drop.hover { border-color: #0071e3; color: #0071e3; }
  #fileInput { display: none; }
  #list { margin-top: 24px; display: flex; flex-direction: column; gap: 10px; }
  .row {
    display: flex; align-items: center; gap: 10px; background: #f5f5f7;
    border-radius: 10px; padding: 10px 12px; font-size: 13px;
  }
  .row.batch { background: #eaf3ff; font-weight: 600; }
  .row .name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .row .status { color: #86868b; flex-shrink: 0; }
  .row a { color: #0071e3; text-decoration: none; flex-shrink: 0; }
  .row.error .status { color: #ff3b30; }
  #banner { display: none; margin-bottom: 16px; padding: 10px 14px; border-radius: 10px; font-size: 13px; }
  #banner.error { display: block; background: #ffebe9; color: #cf222e; }
  img.preview { max-width: 100%; border-radius: 10px; display: block; margin-bottom: 6px; }
  a.footer-link { color: #86868b; font-size: 13px; }
  #toolbar { display: flex; align-items: center; gap: 10px; margin: 20px 0; }
  #toolbar label { display: flex; align-items: center; gap: 6px; font-size: 13px; }
  #bulkDelete { margin-left: auto; background: #ff3b30; }
  .group { border: 1px solid #e5e5ea; border-radius: 12px; padding: 12px; margin-bottom: 14px; overflow: hidden; }
  @media (prefers-color-scheme: dark) { .group { border-color: #38383a; } .file-row { border-top-color: #2c2c2e !important; } }
  .group-head { display: flex; align-items: center; gap: 10px; row-gap: 6px; flex-wrap: wrap; margin-bottom: 8px; font-size: 12px; color: #86868b; }
  .file-row { padding: 8px 0; font-size: 13px; border-top: 1px solid #f0f0f2; }
  .file-row:first-of-type { border-top: none; }
  .file-row-top { display: flex; align-items: center; gap: 10px; }
  .file-row-top input { flex-shrink: 0; }
  .file-row .name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .thumb { width: 44px; height: 44px; border-radius: 8px; object-fit: cover; flex-shrink: 0; cursor: zoom-in; background: #f5f5f7; }
  @media (min-width: 900px) { .thumb { width: 72px; height: 72px; border-radius: 10px; } }
  @media (prefers-color-scheme: dark) { .thumb { background: #2c2c2e; } }
  #lightbox {
    display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.85);
    align-items: center; justify-content: center; z-index: 2000; cursor: zoom-out; padding: 24px;
  }
  #lightbox.open { display: flex; }
  #lightbox img { max-width: 100%; max-height: 100%; border-radius: 10px; }
  .file-row-actions { display: flex; align-items: center; gap: 8px; row-gap: 6px; flex-wrap: wrap; margin-top: 6px; padding-left: 26px; }
  .file-row .meta { color: #86868b; font-size: 12px; flex-shrink: 0; }
  .file-row .meta.expiring { color: #ff9500; font-weight: 600; }
  button.small { padding: 5px 10px; font-size: 12px; }
  #pagination { display: flex; align-items: center; justify-content: center; gap: 14px; margin: 20px 0; font-size: 13px; }
  #pagination button:disabled { opacity: 0.4; cursor: default; }
  .fab {
    position: fixed; right: 20px; bottom: calc(20px + env(safe-area-inset-bottom));
    width: 56px; height: 56px; border-radius: 50%; background: #0071e3; color: #fff;
    display: flex; align-items: center; justify-content: center; font-size: 30px;
    font-weight: 300; line-height: 1; text-decoration: none;
    box-shadow: 0 4px 14px rgba(0,0,0,0.28); z-index: 1000;
  }
  .fab:hover { background: #0077ed; }
`;

const AUTH_BLOCK_HTML = `
  <div id="auth">
    <input type="password" id="token" placeholder="Upload password">
    <button id="saveToken">Save</button>
  </div>
`;

const AUTH_JS = `
const tokenInput = $('token'), authBox = $('auth');
tokenInput.value = localStorage.getItem('quickshare_token') || '';
function showAuth(forceOpen) {
  const hasToken = !!localStorage.getItem('quickshare_token');
  const open = forceOpen || !hasToken;
  authBox.style.display = open ? 'flex' : 'none';
  if (open) tokenInput.focus();
}
showAuth(false);
$('saveToken').onclick = () => {
  localStorage.setItem('quickshare_token', tokenInput.value);
  showBanner('Saved.', false);
  showAuth(false);
};
function authHeaders() { return { 'x-upload-token': localStorage.getItem('quickshare_token') || '' }; }
function copyToClipboard(btn, url) {
  navigator.clipboard.writeText(url);
  const orig = btn.textContent;
  btn.textContent = 'Copied!';
  setTimeout(() => (btn.textContent = orig), 1500);
}
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
`;

const PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>quickshare</title>
<style>${STYLE}</style>
</head>
<body>
  <h1>quickshare</h1>
  <p class="sub">Drop files, get a link.</p>

  <div id="banner"></div>

  ${AUTH_BLOCK_HTML}

  <label class="field-label" for="tagsInput">Tags (comma separated)</label>
  <input type="text" id="tagsInput" class="meta-input" placeholder="e.g. tech, read-later">

  <label class="field-label" for="captionInput">Caption (optional)</label>
  <input type="text" id="captionInput" class="meta-input" placeholder="Add a note…">

  <div id="drop" style="margin-top:20px;">Drop files here, or click to choose</div>
  <input type="file" id="fileInput" multiple>

  <div id="list"></div>

  <p class="sub" style="margin-top:40px;"><a class="footer-link" href="/admin">Admin →</a></p>

<script>
const $ = (id) => document.getElementById(id);
const drop = $('drop'), fileInput = $('fileInput'), list = $('list'), banner = $('banner');
const tagsInput = $('tagsInput'), captionInput = $('captionInput');

function showBanner(msg, isError) {
  banner.textContent = msg;
  banner.className = isError ? 'error' : '';
  banner.style.display = msg ? 'block' : 'none';
}

${AUTH_JS}

drop.onclick = () => fileInput.click();
drop.ondragover = (e) => { e.preventDefault(); drop.classList.add('hover'); };
drop.ondragleave = () => drop.classList.remove('hover');
drop.ondrop = (e) => {
  e.preventDefault();
  drop.classList.remove('hover');
  handleFiles(e.dataTransfer.files);
};
fileInput.onchange = () => handleFiles(fileInput.files);

function handleFiles(files) {
  showBanner('', false);
  const arr = [...files];
  if (!arr.length) return;

  const rows = arr.map((f) => {
    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = '<div class="name">' + escapeHtml(f.name) + '</div><div class="status">Uploading…</div>';
    list.prepend(row);
    return row;
  });

  const fd = new FormData();
  arr.forEach((f) => fd.append('file', f, f.name));
  fd.append('tags', tagsInput.value);
  fd.append('caption', captionInput.value);

  fetch('/upload', {
    method: 'POST',
    headers: authHeaders(),
    body: fd,
  })
    .then(async (r) => {
      if (r.status === 401) { showAuth(true); throw new Error('Wrong password'); }
      if (!r.ok) throw new Error('Upload failed');
      return r.json();
    })
    .then(({ files: uploaded, batchUrl }) => {
      uploaded.forEach((u, i) => {
        const row = rows[i];
        const full = location.origin + u.url;
        row.className = 'row';
        row.innerHTML =
          '<div class="name">' + escapeHtml(u.name) + '</div>' +
          '<a href="' + escapeHtml(full) + '" target="_blank">open</a>' +
          '<button class="secondary copy-btn" data-url="' + escapeHtml(full) + '">Copy</button>';
        row.querySelector('.copy-btn').onclick = (e) => copyToClipboard(e.target, e.target.dataset.url);
      });
      if (batchUrl) {
        const full = location.origin + batchUrl;
        const brow = document.createElement('div');
        brow.className = 'row batch';
        brow.innerHTML =
          '<div class="name">📦 these ' + uploaded.length + ' files together</div>' +
          '<a href="' + full + '" target="_blank">open</a>' +
          '<button class="secondary copy-btn" data-url="' + full + '">Copy</button>';
        brow.querySelector('.copy-btn').onclick = (e) => copyToClipboard(e.target, e.target.dataset.url);
        list.prepend(brow);
      }
      tagsInput.value = '';
      captionInput.value = '';
    })
    .catch((err) => {
      rows.forEach((row) => {
        row.className = 'row error';
        row.innerHTML = row.innerHTML.replace(/<div class="status">.*<\\/div>/, '<div class="status">' + err.message + '</div>');
      });
    });
}
</script>
</body>
</html>`;

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function batchPage(id, manifest) {
  const items = manifest
    .map((m) => {
      const url = '/f/' + id + '/' + encodeURIComponent(m.name);
      const preview = m.type.startsWith('image/') ? '<img class="preview" src="' + url + '">' : '';
      return (
        '<div class="row" style="flex-direction:column;align-items:stretch;">' +
        preview +
        '<div style="display:flex;align-items:center;gap:10px;">' +
        '<div class="name">' + escapeHtml(m.name) + '</div>' +
        '<a href="' + url + '" target="_blank">open</a>' +
        '</div></div>'
      );
    })
    .join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>quickshare — ${manifest.length} files</title>
<style>${STYLE}</style>
</head>
<body>
  <h1>${manifest.length} shared files</h1>
  <p class="sub">Uploaded together via quickshare.</p>
  <div id="list">${items}</div>
</body>
</html>`;
}

const ADMIN_PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>quickshare admin</title>
<style>${STYLE}</style>
</head>
<body>
  <h1>quickshare admin</h1>
  <p class="sub">All uploaded files.</p>

  <div id="banner"></div>

  ${AUTH_BLOCK_HTML}

  <input type="search" id="searchBox" placeholder="Search filenames and captions…">

  <div id="tagFilters"></div>

  <div id="toolbar">
    <label><input type="checkbox" id="selectAll"> Select all on page</label>
    <button id="bulkDelete" class="secondary" style="display:none;">Delete selected</button>
    <button id="refresh" class="secondary">Refresh</button>
  </div>

  <p class="sub" id="resultsSummary"></p>

  <div id="groups"></div>

  <div id="pagination"></div>

  <a href="/" class="fab" title="Upload files">+</a>

  <div id="lightbox"><img id="lightboxImg" alt=""></div>

<script>
const $ = (id) => document.getElementById(id);
const banner = $('banner'), groupsEl = $('groups'), bulkBtn = $('bulkDelete'), selectAllBox = $('selectAll');
const searchBox = $('searchBox'), paginationEl = $('pagination'), resultsSummary = $('resultsSummary');
const tagFiltersEl = $('tagFilters');
const lightbox = $('lightbox'), lightboxImg = $('lightboxImg');

function openLightbox(url) {
  lightboxImg.src = url;
  lightbox.classList.add('open');
}
lightbox.onclick = () => { lightbox.classList.remove('open'); lightboxImg.src = ''; };
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { lightbox.classList.remove('open'); lightboxImg.src = ''; }
});

function showBanner(msg, isError) {
  banner.textContent = msg;
  banner.className = isError ? 'error' : '';
  banner.style.display = msg ? 'block' : 'none';
}

${AUTH_JS}

let allFiles = [];
let batchIds = [];
let pendingByKey = {};
let searchTerm = '';
let activeTag = null;
let currentPage = 1;
const PAGE_SIZE = 20;
const selected = new Set();

function renderTagFilters() {
  const tagSet = new Set();
  allFiles.forEach((f) => (f.tags || []).forEach((t) => tagSet.add(t)));
  const tags = [...tagSet].sort();
  if (!tags.length) { tagFiltersEl.innerHTML = ''; return; }
  tagFiltersEl.innerHTML = tags.map((t) =>
    '<button type="button" class="tag-chip' + (activeTag === t ? ' active' : '') + '" data-tag="' + escapeHtml(t) + '">' + escapeHtml(t) + '</button>'
  ).join('') + (activeTag ? '<button type="button" class="tag-chip" id="clearTag">✕ clear</button>' : '');
  tagFiltersEl.querySelectorAll('.tag-chip[data-tag]').forEach((btn) => {
    btn.onclick = () => {
      activeTag = activeTag === btn.dataset.tag ? null : btn.dataset.tag;
      currentPage = 1;
      render();
    };
  });
  const clearBtn = $('clearTag');
  if (clearBtn) clearBtn.onclick = () => { activeTag = null; currentPage = 1; render(); };
}

function fmtSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1024 / 1024).toFixed(1) + ' MB';
}
function fmtDate(iso) {
  return new Date(iso).toLocaleString();
}
function fmtExpiry(deleteAt) {
  const ms = deleteAt - Date.now();
  if (ms <= 0) return 'expiring now';
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  if (days > 0) return 'expires in ' + days + 'd ' + hours + 'h';
  const mins = Math.floor((ms % 3600000) / 60000);
  return 'expires in ' + hours + 'h ' + mins + 'm';
}

function load() {
  groupsEl.innerHTML = '';
  showBanner('', false);
  fetch('/admin/list', { headers: authHeaders() })
    .then(async (r) => {
      if (r.status === 401) { showAuth(true); throw new Error('Wrong password'); }
      if (!r.ok) throw new Error('Failed to load');
      return r.json();
    })
    .then(({ files, batchIds: bids, pending }) => {
      allFiles = files;
      batchIds = bids;
      pendingByKey = {};
      (pending || []).forEach((p) => { pendingByKey[p.key] = p.deleteAt; });
      selected.clear();
      render();
    })
    .catch((err) => showBanner(err.message, true));
}

function computeView() {
  const byId = {};
  allFiles.forEach((f) => { (byId[f.id] = byId[f.id] || []).push(f); });

  let ids = Object.keys(byId).sort((a, b) => {
    const da = Math.max(...byId[a].map((f) => new Date(f.uploaded).getTime()));
    const db = Math.max(...byId[b].map((f) => new Date(f.uploaded).getTime()));
    return db - da;
  });

  if (searchTerm) {
    ids = ids.filter((id) => byId[id].some((f) =>
      f.name.toLowerCase().includes(searchTerm) ||
      (f.caption && f.caption.toLowerCase().includes(searchTerm))
    ));
  }

  if (activeTag) {
    ids = ids.filter((id) => byId[id].some((f) => (f.tags || []).includes(activeTag)));
  }

  const totalGroups = ids.length;
  const totalPages = Math.max(1, Math.ceil(totalGroups / PAGE_SIZE));
  currentPage = Math.min(Math.max(currentPage, 1), totalPages);

  const pageIds = ids.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const visibleFiles = pageIds.flatMap((id) => byId[id]);
  const totalFileCount = ids.reduce((sum, id) => sum + byId[id].length, 0);

  return { byId, pageIds, visibleFiles, totalGroups, totalPages, totalFileCount };
}

function render() {
  renderTagFilters();

  if (!allFiles.length) {
    groupsEl.innerHTML = '<p class="sub">No files yet.</p>';
    paginationEl.innerHTML = '';
    resultsSummary.textContent = '';
    updateBulkButton([]);
    return;
  }

  const { byId, pageIds, visibleFiles, totalGroups, totalPages, totalFileCount } = computeView();

  const filterLabel = [
    searchTerm ? '"' + searchBox.value.trim() + '"' : null,
    activeTag ? 'tag "' + activeTag + '"' : null,
  ].filter(Boolean).join(' + ');
  resultsSummary.textContent = filterLabel
    ? totalFileCount + ' file(s) match ' + filterLabel
    : allFiles.length + ' file(s) total';

  if (!totalGroups) {
    groupsEl.innerHTML = '<p class="sub">No files match your search.</p>';
    paginationEl.innerHTML = '';
    updateBulkButton([]);
    return;
  }

  groupsEl.innerHTML = pageIds.map((id) => {
    const files = byId[id];
    const isBatch = batchIds.includes(id);
    const head = isBatch
      ? '<div class="group-head"><span>📦 batch of ' + files.length + '</span>' +
        '<a href="/b/' + id + '" target="_blank">open batch</a>' +
        '<button class="secondary small copy-batch" data-url="' + location.origin + '/b/' + id + '">Copy batch link</button></div>'
      : '<div class="group-head"><span>single file</span></div>';

    const rows = files.map((f) => {
      const full = location.origin + f.url;
      const key = escapeHtml(f.key);
      const expiry = pendingByKey[f.key]
        ? '<span class="meta expiring">⏳ ' + fmtExpiry(pendingByKey[f.key]) + '</span>'
        : '';
      const thumb = f.contentType && f.contentType.startsWith('image/')
        ? '<img class="thumb" loading="lazy" src="' + escapeHtml(full) + '" data-full="' + escapeHtml(full) + '">'
        : '';
      const captionInner = f.caption
        ? '<span class="caption-text">📝 ' + escapeHtml(f.caption) + '</span>' +
          '<button type="button" class="small-icon-btn caption-edit-btn" data-key="' + key + '" data-caption="' + escapeHtml(f.caption) + '" title="Edit caption">✎</button>'
        : '<button type="button" class="caption-add-btn" data-key="' + key + '" data-caption="" title="Add caption">+ caption</button>';
      const caption = '<div class="meta caption">' + captionInner + '</div>';
      const tagPills = (f.tags || []).map((t) =>
        '<span class="file-tag">' + escapeHtml(t) +
        '<button type="button" class="tag-remove" data-key="' + key + '" data-tag="' + escapeHtml(t) + '" title="Remove tag">×</button>' +
        '</span>'
      ).join('');
      const addTagSlot = '<span class="tag-add-slot"><button type="button" class="caption-add-btn add-tag-btn" data-key="' + key + '" title="Add tag">+ tag</button></span>';
      return (
        '<div class="file-row">' +
        '<div class="file-row-top">' +
        '<input type="checkbox" class="file-check" data-key="' + key + '">' +
        thumb +
        '<div class="name">' + escapeHtml(f.name) + '</div>' +
        '</div>' +
        '<div class="file-row-actions">' +
        caption +
        expiry +
        tagPills +
        addTagSlot +
        '<div class="meta">' + fmtSize(f.size) + ' · ' + fmtDate(f.uploaded) + '</div>' +
        '<a href="' + escapeHtml(full) + '" target="_blank">open</a>' +
        '<button class="secondary small copy-file" data-url="' + escapeHtml(full) + '">Copy links</button>' +
        '<button class="secondary small regen" data-key="' + key + '">Regenerate links</button>' +
        '<button class="secondary small del" data-key="' + key + '">Delete</button>' +
        '</div>' +
        '</div>'
      );
    }).join('');

    return '<div class="group">' + head + rows + '</div>';
  }).join('');

  groupsEl.querySelectorAll('.file-check').forEach((cb) => {
    cb.checked = selected.has(cb.dataset.key);
    cb.onchange = () => {
      if (cb.checked) selected.add(cb.dataset.key); else selected.delete(cb.dataset.key);
      updateBulkButton(visibleFiles);
    };
  });
  groupsEl.querySelectorAll('.copy-batch, .copy-file').forEach((btn) => {
    btn.onclick = (e) => copyToClipboard(e.target, e.target.dataset.url);
  });
  groupsEl.querySelectorAll('.del').forEach((btn) => {
    btn.onclick = (e) => deleteKeys([e.target.dataset.key]);
  });
  groupsEl.querySelectorAll('.regen').forEach((btn) => {
    btn.onclick = (e) => regenerate(e.target.dataset.key, e.target);
  });
  groupsEl.querySelectorAll('.thumb').forEach((img) => {
    img.onclick = (e) => openLightbox(e.target.dataset.full);
  });
  groupsEl.querySelectorAll('.tag-remove').forEach((btn) => {
    btn.onclick = (e) => removeTag(e.target.dataset.key, e.target.dataset.tag);
  });
  groupsEl.querySelectorAll('.caption-edit-btn, .caption-add-btn').forEach((btn) => {
    btn.onclick = (e) => {
      const container = e.target.closest('.caption');
      startCaptionEdit(container, e.target.dataset.key, e.target.dataset.caption);
    };
  });
  groupsEl.querySelectorAll('.add-tag-btn').forEach((btn) => {
    btn.onclick = (e) => {
      const container = e.target.closest('.tag-add-slot');
      startTagAdd(container, e.target.dataset.key);
    };
  });

  paginationEl.innerHTML = totalPages > 1
    ? '<button class="secondary small" id="prevPage"' + (currentPage <= 1 ? ' disabled' : '') + '>← Prev</button>' +
      '<span>Page ' + currentPage + ' of ' + totalPages + '</span>' +
      '<button class="secondary small" id="nextPage"' + (currentPage >= totalPages ? ' disabled' : '') + '>Next →</button>'
    : '';
  if (totalPages > 1) {
    $('prevPage').onclick = () => { currentPage--; render(); };
    $('nextPage').onclick = () => { currentPage++; render(); };
  }

  updateBulkButton(visibleFiles);
}

function updateBulkButton(visibleFiles) {
  bulkBtn.style.display = selected.size ? 'inline-block' : 'none';
  bulkBtn.textContent = 'Delete selected (' + selected.size + ')';
  const keys = visibleFiles.map((f) => f.key);
  selectAllBox.checked = keys.length > 0 && keys.every((k) => selected.has(k));
}

selectAllBox.onchange = () => {
  const { visibleFiles } = computeView();
  if (selectAllBox.checked) visibleFiles.forEach((f) => selected.add(f.key));
  else visibleFiles.forEach((f) => selected.delete(f.key));
  render();
};

bulkBtn.onclick = () => {
  if (!confirm('Delete ' + selected.size + ' file(s)? This cannot be undone.')) return;
  deleteKeys([...selected]);
};

searchBox.oninput = () => {
  searchTerm = searchBox.value.trim().toLowerCase();
  currentPage = 1;
  render();
};

$('refresh').onclick = load;

function deleteKeys(keys) {
  fetch('/admin/delete', {
    method: 'POST',
    headers: Object.assign({ 'content-type': 'application/json' }, authHeaders()),
    body: JSON.stringify({ keys }),
  })
    .then((r) => { if (!r.ok) throw new Error('Delete failed'); })
    .then(() => { keys.forEach((k) => selected.delete(k)); load(); })
    .catch((err) => showBanner(err.message, true));
}

function regenerate(key, btn) {
  const orig = btn.textContent;
  btn.disabled = true;
  fetch('/admin/regenerate', {
    method: 'POST',
    headers: Object.assign({ 'content-type': 'application/json' }, authHeaders()),
    body: JSON.stringify({ key }),
  })
    .then(async (r) => {
      if (!r.ok) throw new Error('Regenerate failed');
      return r.json();
    })
    .then(({ url }) => {
      const full = location.origin + url;
      navigator.clipboard.writeText(full);
      btn.textContent = 'Generated!';
      showBanner('New link copied: ' + full + ' — old link stays live for 7 more days.', false);
      setTimeout(load, 1200);
    })
    .catch((err) => {
      btn.disabled = false;
      btn.textContent = orig;
      showBanner(err.message, true);
    });
}

function removeTag(key, tag) {
  fetch('/admin/remove-tag', {
    method: 'POST',
    headers: Object.assign({ 'content-type': 'application/json' }, authHeaders()),
    body: JSON.stringify({ key, tag }),
  })
    .then((r) => { if (!r.ok) throw new Error('Failed to remove tag'); })
    .then(load)
    .catch((err) => showBanner(err.message, true));
}

function startCaptionEdit(container, key, currentCaption) {
  container.innerHTML =
    '<input type="text" class="caption-input" value="' + escapeHtml(currentCaption) + '" placeholder="Add a note…" maxlength="500">' +
    '<button type="button" class="secondary small caption-save">Save</button>' +
    '<button type="button" class="secondary small caption-cancel">Cancel</button>';
  const input = container.querySelector('.caption-input');
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
  container.querySelector('.caption-save').onclick = () => saveCaption(key, input.value);
  container.querySelector('.caption-cancel').onclick = () => load();
  input.onkeydown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); saveCaption(key, input.value); }
    if (e.key === 'Escape') load();
  };
}

function saveCaption(key, caption) {
  fetch('/admin/set-caption', {
    method: 'POST',
    headers: Object.assign({ 'content-type': 'application/json' }, authHeaders()),
    body: JSON.stringify({ key, caption }),
  })
    .then((r) => { if (!r.ok) throw new Error('Failed to save caption'); })
    .then(load)
    .catch((err) => showBanner(err.message, true));
}

function startTagAdd(container, key) {
  container.innerHTML =
    '<input type="text" class="caption-input tag-add-input" placeholder="tag name">' +
    '<button type="button" class="secondary small tag-add-save">Add</button>' +
    '<button type="button" class="secondary small tag-add-cancel">Cancel</button>';
  const input = container.querySelector('.tag-add-input');
  input.focus();
  container.querySelector('.tag-add-save').onclick = () => addTag(key, input.value);
  container.querySelector('.tag-add-cancel').onclick = () => load();
  input.onkeydown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addTag(key, input.value); }
    if (e.key === 'Escape') load();
  };
}

function addTag(key, tag) {
  const trimmed = tag.trim();
  if (!trimmed) { load(); return; }
  fetch('/admin/add-tag', {
    method: 'POST',
    headers: Object.assign({ 'content-type': 'application/json' }, authHeaders()),
    body: JSON.stringify({ key, tag: trimmed }),
  })
    .then((r) => { if (!r.ok) throw new Error('Failed to add tag'); })
    .then(load)
    .catch((err) => showBanner(err.message, true));
}

load();
</script>
</body>
</html>`;

function randomId() {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function sanitizeFilename(name) {
  return name.replace(/[\/\\]/g, '_').slice(-150) || 'file';
}

function dedupeFilename(used, filename) {
  let name = filename;
  let i = 2;
  while (used.has(name)) {
    const dot = filename.lastIndexOf('.');
    name = dot > 0 ? filename.slice(0, dot) + ' (' + i + ')' + filename.slice(dot) : filename + ' (' + i + ')';
    i++;
  }
  used.add(name);
  return name;
}

function checkToken(request, env) {
  const token = request.headers.get('x-upload-token') || '';
  return !!env.UPLOAD_TOKEN && token === env.UPLOAD_TOKEN;
}

async function listAllObjects(bucket) {
  let cursor;
  const objects = [];
  do {
    const res = await bucket.list({ cursor, limit: 1000, include: ['httpMetadata', 'customMetadata'] });
    objects.push(...res.objects);
    cursor = res.truncated ? res.cursor : undefined;
  } while (cursor);
  return objects;
}

const GRACE_MS = 7 * 24 * 60 * 60 * 1000;
const PENDING_KEY = '_system/pending-deletes.json';

async function getPendingDeletes(bucket) {
  const obj = await bucket.get(PENDING_KEY);
  if (!obj) return [];
  try {
    return JSON.parse(await obj.text());
  } catch {
    return [];
  }
}

async function putPendingDeletes(bucket, list) {
  if (!list.length) {
    await bucket.delete(PENDING_KEY);
    return;
  }
  await bucket.put(PENDING_KEY, JSON.stringify(list), {
    httpMetadata: { contentType: 'application/json' },
  });
}

async function runCleanup(env) {
  const pending = await getPendingDeletes(env.SHARE_R2);
  const now = Date.now();
  const due = pending.filter((p) => p.deleteAt <= now);
  const remaining = pending.filter((p) => p.deleteAt > now);
  if (due.length) {
    const dueKeys = due.map((p) => p.key);
    await env.SHARE_R2.delete(dueKeys);
    await cleanupManifests(env.SHARE_R2, dueKeys);
  }
  await putPendingDeletes(env.SHARE_R2, remaining);
}

async function cleanupManifests(bucket, deletedKeys) {
  const ids = new Set();
  for (const key of deletedKeys) {
    if (key.endsWith('/_manifest.json')) continue;
    const slash = key.indexOf('/');
    if (slash > 0) ids.add(key.slice(0, slash));
  }
  for (const id of ids) {
    const manifestKey = id + '/_manifest.json';
    const obj = await bucket.get(manifestKey);
    if (!obj) continue;
    const manifest = JSON.parse(await obj.text());
    const remaining = manifest.filter((m) => !deletedKeys.includes(id + '/' + m.name));
    if (remaining.length <= 1) {
      await bucket.delete(manifestKey);
    } else if (remaining.length !== manifest.length) {
      await bucket.put(manifestKey, JSON.stringify(remaining), {
        httpMetadata: { contentType: 'application/json' },
      });
    }
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;

    if (request.method === 'GET' && pathname === '/') {
      return new Response(PAGE, { headers: { 'content-type': 'text/html; charset=utf-8' } });
    }

    if (request.method === 'POST' && pathname === '/upload') {
      if (!checkToken(request, env)) {
        return Response.json({ error: 'unauthorized' }, { status: 401 });
      }

      const form = await request.formData();
      const incoming = form.getAll('file').filter((f) => typeof f !== 'string');
      if (!incoming.length) {
        return Response.json({ error: 'no file' }, { status: 400 });
      }

      const tagsRaw = form.get('tags');
      const captionRaw = form.get('caption');
      const tags = typeof tagsRaw === 'string'
        ? [...new Set(tagsRaw.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean))]
        : [];
      const caption = typeof captionRaw === 'string' ? captionRaw.trim().slice(0, 500) : '';
      const customMetadata = {};
      if (tags.length) customMetadata.tags = tags.join(',');
      if (caption) customMetadata.caption = caption;

      const id = randomId();
      const used = new Set(['_manifest.json']);
      const manifest = [];

      for (const file of incoming) {
        const name = dedupeFilename(used, sanitizeFilename(file.name || 'file'));
        const type = file.type || 'application/octet-stream';
        await env.SHARE_R2.put(id + '/' + name, file.stream(), {
          httpMetadata: { contentType: type },
          customMetadata: Object.keys(customMetadata).length ? customMetadata : undefined,
        });
        manifest.push({ name, type, size: file.size });
      }

      if (manifest.length > 1) {
        await env.SHARE_R2.put(id + '/_manifest.json', JSON.stringify(manifest), {
          httpMetadata: { contentType: 'application/json' },
        });
      }

      return Response.json({
        files: manifest.map((m) => ({ name: m.name, url: '/f/' + id + '/' + encodeURIComponent(m.name) })),
        batchUrl: manifest.length > 1 ? '/b/' + id : null,
      });
    }

    if (request.method === 'GET' && pathname === '/admin') {
      return new Response(ADMIN_PAGE, { headers: { 'content-type': 'text/html; charset=utf-8' } });
    }

    if (request.method === 'GET' && pathname === '/admin/list') {
      if (!checkToken(request, env)) {
        return Response.json({ error: 'unauthorized' }, { status: 401 });
      }
      ctx.waitUntil(runCleanup(env));
      const objects = await listAllObjects(env.SHARE_R2);
      const files = objects
        .filter((o) => !o.key.endsWith('/_manifest.json') && !o.key.startsWith('_system/'))
        .map((o) => {
          const slash = o.key.indexOf('/');
          const id = o.key.slice(0, slash);
          const name = o.key.slice(slash + 1);
          const cm = o.customMetadata || {};
          return {
            key: o.key,
            id,
            name,
            size: o.size,
            uploaded: o.uploaded,
            contentType: o.httpMetadata && o.httpMetadata.contentType,
            url: '/f/' + id + '/' + encodeURIComponent(name),
            tags: cm.tags ? cm.tags.split(',').filter(Boolean) : [],
            caption: cm.caption || '',
          };
        });
      const batchIds = objects
        .filter((o) => o.key.endsWith('/_manifest.json'))
        .map((o) => o.key.slice(0, o.key.indexOf('/')));
      const pending = await getPendingDeletes(env.SHARE_R2);
      return Response.json({ files, batchIds, pending });
    }

    if (request.method === 'POST' && pathname === '/admin/delete') {
      if (!checkToken(request, env)) {
        return Response.json({ error: 'unauthorized' }, { status: 401 });
      }
      const { keys } = await request.json();
      if (!Array.isArray(keys) || !keys.length) {
        return Response.json({ error: 'no keys' }, { status: 400 });
      }
      await env.SHARE_R2.delete(keys);
      await cleanupManifests(env.SHARE_R2, keys);
      return Response.json({ ok: true });
    }

    if (request.method === 'POST' && pathname === '/admin/regenerate') {
      if (!checkToken(request, env)) {
        return Response.json({ error: 'unauthorized' }, { status: 401 });
      }
      const { key } = await request.json();
      if (!key) return Response.json({ error: 'no key' }, { status: 400 });

      const object = await env.SHARE_R2.get(key);
      if (!object) return Response.json({ error: 'not found' }, { status: 404 });

      const slash = key.indexOf('/');
      const name = key.slice(slash + 1);
      const newId = randomId();
      const newKey = newId + '/' + name;

      await env.SHARE_R2.put(newKey, object.body, {
        httpMetadata: object.httpMetadata,
        customMetadata: object.customMetadata,
      });

      const pending = await getPendingDeletes(env.SHARE_R2);
      pending.push({ key, deleteAt: Date.now() + GRACE_MS });
      await putPendingDeletes(env.SHARE_R2, pending);

      return Response.json({ url: '/f/' + newId + '/' + encodeURIComponent(name), oldExpiresAt: Date.now() + GRACE_MS });
    }

    if (request.method === 'POST' && pathname === '/admin/remove-tag') {
      if (!checkToken(request, env)) {
        return Response.json({ error: 'unauthorized' }, { status: 401 });
      }
      const { key, tag } = await request.json();
      if (!key || !tag) return Response.json({ error: 'missing key or tag' }, { status: 400 });

      const object = await env.SHARE_R2.get(key);
      if (!object) return Response.json({ error: 'not found' }, { status: 404 });

      const target = String(tag).trim().toLowerCase();
      const cm = Object.assign({}, object.customMetadata);
      const tags = cm.tags ? cm.tags.split(',').filter((t) => t && t !== target) : [];
      if (tags.length) cm.tags = tags.join(',');
      else delete cm.tags;

      await env.SHARE_R2.put(key, object.body, {
        httpMetadata: object.httpMetadata,
        customMetadata: cm,
      });

      return Response.json({ ok: true, tags });
    }

    if (request.method === 'POST' && pathname === '/admin/set-caption') {
      if (!checkToken(request, env)) {
        return Response.json({ error: 'unauthorized' }, { status: 401 });
      }
      const { key, caption } = await request.json();
      if (!key) return Response.json({ error: 'no key' }, { status: 400 });

      const object = await env.SHARE_R2.get(key);
      if (!object) return Response.json({ error: 'not found' }, { status: 404 });

      const trimmed = typeof caption === 'string' ? caption.trim().slice(0, 500) : '';
      const cm = Object.assign({}, object.customMetadata);
      if (trimmed) cm.caption = trimmed;
      else delete cm.caption;

      await env.SHARE_R2.put(key, object.body, {
        httpMetadata: object.httpMetadata,
        customMetadata: cm,
      });

      return Response.json({ ok: true, caption: trimmed });
    }

    if (request.method === 'POST' && pathname === '/admin/add-tag') {
      if (!checkToken(request, env)) {
        return Response.json({ error: 'unauthorized' }, { status: 401 });
      }
      const { key, tag } = await request.json();
      if (!key || !tag) return Response.json({ error: 'missing key or tag' }, { status: 400 });

      const target = String(tag).trim().toLowerCase();
      if (!target) return Response.json({ error: 'empty tag' }, { status: 400 });

      const object = await env.SHARE_R2.get(key);
      if (!object) return Response.json({ error: 'not found' }, { status: 404 });

      const cm = Object.assign({}, object.customMetadata);
      const tags = cm.tags ? cm.tags.split(',').filter(Boolean) : [];
      if (!tags.includes(target)) tags.push(target);
      cm.tags = tags.join(',');

      await env.SHARE_R2.put(key, object.body, {
        httpMetadata: object.httpMetadata,
        customMetadata: cm,
      });

      return Response.json({ ok: true, tags });
    }

    if (request.method === 'GET' && pathname.startsWith('/b/')) {
      const id = pathname.slice(3).replace(/\/$/, '');
      const manifestObj = await env.SHARE_R2.get(id + '/_manifest.json');
      if (!manifestObj) return new Response('Not found', { status: 404 });
      const manifest = JSON.parse(await manifestObj.text());
      return new Response(batchPage(id, manifest), {
        headers: { 'content-type': 'text/html; charset=utf-8' },
      });
    }

    if (request.method === 'GET' && pathname.startsWith('/f/')) {
      const key = decodeURIComponent(pathname.slice(3));
      if (key.endsWith('/_manifest.json') || key.startsWith('_system/')) {
        return new Response('Not found', { status: 404 });
      }

      const pending = await getPendingDeletes(env.SHARE_R2);
      const entry = pending.find((p) => p.key === key);
      if (entry && entry.deleteAt <= Date.now()) {
        return new Response('Not found', { status: 404 });
      }

      const object = await env.SHARE_R2.get(key);
      if (!object) return new Response('Not found', { status: 404 });

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set('cache-control', entry ? 'private, no-store' : 'public, max-age=31536000, immutable');
      headers.set('etag', object.httpEtag);
      return new Response(object.body, { headers });
    }

    return new Response('Not found', { status: 404 });
  },
};
