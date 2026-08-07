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
    input[type=password], input[type=search], .meta-input { background: #2c2c2e; color: #f5f5f7; border-color: #48484a; }
    .row { background: #2c2c2e !important; }
    .row.batch { background: #1c2e42 !important; }
    .field-label { color: #f5f5f7; }
    .tag-chip, .file-tag { background: #2c2c2e !important; color: #f5f5f7 !important; }
  }
  h1 { font-size: 22px; font-weight: 600; margin-bottom: 4px; }
  p.sub { color: #86868b; margin-top: 0; font-size: 14px; }
  #auth { display: flex; gap: 8px; margin: 20px 0; }
  input[type=password], input[type=search], .meta-input {
    flex: 1; padding: 10px 12px; border-radius: 10px; border: 1px solid #d2d2d7;
    font-size: 14px; width: 100%;
  }
  textarea.meta-input { font-family: inherit; resize: vertical; min-height: 44px; }
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
  .file-row .caption .caption-text { font-style: italic; white-space: pre-line; }
  button.caption-add-btn {
    background: none; border: none; padding: 0; color: #0071e3; font-size: 12px;
    font-weight: 500; cursor: pointer;
  }
  button.caption-add-btn:hover { background: none; text-decoration: underline; }
  .caption-input {
    flex: 1; min-width: 140px; padding: 6px 10px; border-radius: 8px;
    border: 1px solid #d2d2d7; font-size: 12px; font-family: inherit;
  }
  textarea.caption-input { resize: vertical; min-height: 40px; }
  .tag-add-slot { display: inline-flex; align-items: center; gap: 4px; }
  .tag-add-slot input.tag-add-input { flex: none; width: 100px; min-width: 0; }
  .field-wrap, .tag-add-wrap { display: inline-block; }
  .field-wrap { display: block; }
  .tag-suggest {
    position: fixed; background: #fff;
    border: 1px solid #d2d2d7; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.14);
    max-height: 180px; overflow-y: auto; z-index: 1500; min-width: 140px;
  }
  .tag-suggest div { padding: 6px 10px; font-size: 13px; cursor: pointer; white-space: nowrap; }
  .tag-suggest div:hover, .tag-suggest div.active { background: #0071e3; color: #fff; }
  @media (prefers-color-scheme: dark) {
    .caption-input { background: #2c2c2e; color: #f5f5f7; border-color: #48484a; }
    .tag-suggest { background: #2c2c2e; border-color: #48484a; }
  }
  button {
    padding: 10px 16px; border-radius: 10px; border: none; background: #0071e3;
    color: #fff; font-size: 14px; font-weight: 500; cursor: pointer;
  }
  button:hover { background: #0077ed; }
  button.secondary { background: #e8e8ed; color: #1d1d1f; }
  #drop {
    border: 2px dashed #d2d2d7; border-radius: 16px; padding: 72px 20px;
    text-align: center; color: #86868b; cursor: pointer; transition: border-color .15s;
    font-size: 17px;
  }
  #drop.hover { border-color: #0071e3; color: #0071e3; }
  #fileInput { display: none; }
  #list { margin-top: 24px; display: flex; flex-direction: column; gap: 10px; }
  .row {
    display: flex; align-items: center; gap: 12px; row-gap: 10px; flex-wrap: wrap;
    background: #f5f5f7; border-radius: 10px; padding: 14px 16px; font-size: 13px;
  }
  .row.batch { background: #eaf3ff; font-weight: 600; }
  .row .copy-btn { padding: 16px 32px; font-size: 17px; font-weight: 700; border-radius: 12px; }
  .row .name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .row .status { color: #86868b; flex-shrink: 0; }
  .row a { color: #0071e3; text-decoration: none; flex-shrink: 0; }
  .row.error .status { color: #ff3b30; }
  #banner { display: none; margin-bottom: 16px; padding: 10px 14px; border-radius: 10px; font-size: 13px; }
  #banner.error { display: block; background: #ffebe9; color: #cf222e; }
  img.preview { max-width: 100%; border-radius: 10px; display: block; margin-bottom: 6px; }
  #toolbar { display: flex; align-items: center; gap: 10px; margin: 20px 0; }
  #toolbar label { display: flex; align-items: center; gap: 6px; font-size: 13px; }
  #bulkDelete { margin-left: auto; background: #ff3b30; }
  button.delete-batch { background: #ff3b30; color: #fff; }
  button.delete-batch:hover { background: #ff2d1f; }
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
  #lightboxContent {
    display: flex; flex-direction: column; align-items: center; gap: 12px;
    max-width: 100%; max-height: 100%; cursor: default;
  }
  #lightbox img { max-width: 100%; max-height: 74vh; border-radius: 10px; display: block; }
  #lightboxInfo {
    background: rgba(28,28,30,0.85); color: #fff; border-radius: 10px;
    padding: 10px 16px; max-width: 90vw; text-align: center; font-size: 13px; cursor: text;
  }
  #lightboxName { font-weight: 600; word-break: break-all; user-select: text; }
  #lightboxCaption { font-style: italic; opacity: 0.85; margin-top: 4px; user-select: text; white-space: pre-line; }
  #lightboxDate { opacity: 0.6; font-size: 12px; margin-top: 4px; }
  #lightboxCopyName { margin-top: 8px; }
  #confirmOverlay {
    display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.45);
    align-items: center; justify-content: center; z-index: 3000; padding: 20px;
  }
  #confirmOverlay.open { display: flex; }
  #confirmBox {
    background: #fff; color: #1d1d1f; border-radius: 14px; padding: 20px 22px;
    max-width: 380px; width: 100%; box-shadow: 0 10px 40px rgba(0,0,0,0.28);
  }
  @media (prefers-color-scheme: dark) { #confirmBox { background: #2c2c2e; color: #f5f5f7; } }
  #confirmMessage { font-size: 14px; line-height: 1.5; margin: 0 0 18px; }
  #confirmActions { display: flex; justify-content: flex-end; gap: 8px; }
  #confirmOk { background: #ff3b30; }
  #confirmOk:hover { background: #ff2d1f; }
  .lightbox-nav {
    position: fixed; top: 50%; transform: translateY(-50%);
    width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.15);
    color: #fff; border: none; font-size: 22px; line-height: 1; cursor: pointer; z-index: 2001;
    display: flex; align-items: center; justify-content: center; padding: 0;
  }
  .lightbox-nav:hover { background: rgba(255,255,255,0.28); }
  .lightbox-nav:disabled { opacity: 0.2; cursor: default; }
  .lightbox-nav:disabled:hover { background: rgba(255,255,255,0.15); }
  #lightboxPrev { left: 16px; }
  #lightboxNext { right: 16px; }
  @media (max-width: 600px) {
    .lightbox-nav { width: 36px; height: 36px; font-size: 18px; }
    #lightboxPrev { left: 6px; }
    #lightboxNext { right: 6px; }
  }
  #siteFooter {
    margin: 48px 0 24px; padding-top: 20px; border-top: 1px solid #d2d2d7;
    color: #86868b; font-size: 12px; line-height: 1.6; max-width: 640px;
  }
  #siteFooter p { margin: 0 0 6px; }
  #siteFooter a { color: #86868b; }
  #siteFooter strong { color: #1d1d1f; }
  @media (prefers-color-scheme: dark) {
    #siteFooter { border-top-color: #38383a; }
    #siteFooter strong { color: #f5f5f7; }
  }
  .file-row-actions { display: flex; align-items: center; gap: 8px; row-gap: 6px; flex-wrap: wrap; margin-top: 6px; padding-left: 26px; }
  .file-row .meta { color: #86868b; font-size: 12px; flex-shrink: 0; }
  .file-row .meta.expiring { color: #ff9500; font-weight: 600; }
  .file-row .meta.link-target { width: 100%; flex-basis: 100%; word-break: break-all; }
  .file-row .meta.link-target a { color: #0071e3; }
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

  body.gallery-page { padding-right: 56px; }
  @media (min-width: 900px) { body.gallery-page { padding-right: 64px; } }
  #typeFilters { display: flex; flex-wrap: wrap; gap: 6px; margin: 16px 0 20px; }
  .type-chip {
    padding: 6px 14px; border-radius: 999px; background: #e8e8ed; color: #1d1d1f;
    font-size: 13px; cursor: pointer; border: none; font-weight: 500;
  }
  .type-chip.active { background: #0071e3; color: #fff; }
  .gallery-day { scroll-margin-top: 8px; }
  .gallery-day-header {
    position: sticky; top: 0; background: #fff; z-index: 10;
    font-size: 14px; font-weight: 600; padding: 10px 0; color: #1d1d1f;
  }
  @media (prefers-color-scheme: dark) { .gallery-day-header { background: #1c1c1e; color: #f5f5f7; } }
  .gallery-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(84px, 1fr)); gap: 4px;
    margin-bottom: 20px;
  }
  @media (min-width: 900px) { .gallery-grid { grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 6px; } }
  #galleryMain.large .gallery-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 6px; }
  @media (min-width: 900px) { #galleryMain.large .gallery-grid { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 8px; } }
  .size-toggle { display: flex; gap: 6px; margin: -10px 0 20px; }
  .gallery-cell {
    position: relative; aspect-ratio: 1; border-radius: 6px; overflow: hidden;
    background: #f5f5f7; display: block; text-decoration: none;
  }
  @media (prefers-color-scheme: dark) { .gallery-cell { background: #2c2c2e; } }
  .gallery-cell img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .gallery-cell .type-tile {
    width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center;
    justify-content: center; gap: 4px;
  }
  .gallery-cell .type-tile .emoji { font-size: 28px; }
  .gallery-cell .type-tile .ext { font-size: 10px; font-weight: 700; text-transform: uppercase; color: #86868b; }
  .gallery-cell .cell-name {
    position: absolute; left: 0; right: 0; bottom: 0; padding: 4px 6px;
    font-size: 10px; color: #fff; background: linear-gradient(transparent, rgba(0,0,0,0.65));
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .scrubber {
    position: fixed; right: 0; top: 0; bottom: 0; width: 52px;
    display: flex; align-items: center; justify-content: center; z-index: 900;
  }
  .scrubber-track {
    position: relative; height: 72vh; width: 100%; touch-action: none; cursor: pointer;
  }
  .scrubber-tick {
    position: absolute; right: 20px; width: 4px; height: 4px; border-radius: 50%;
    background: #d2d2d7; transform: translateY(-50%);
  }
  @media (prefers-color-scheme: dark) { .scrubber-tick { background: #48484a; } }
  .scrubber-label {
    position: absolute; right: 28px; transform: translateY(-50%); font-size: 11px;
    color: #86868b; white-space: nowrap; pointer-events: none;
  }
  .scrubber-label.active { color: #0071e3; font-weight: 700; }
  .scrubber-thumb {
    position: absolute; right: 14px; width: 9px; height: 9px; border-radius: 50%;
    background: #0071e3; transform: translate(50%, -50%); pointer-events: none;
    box-shadow: 0 0 0 4px rgba(0,113,227,0.15);
  }
  #scrollSentinel { height: 1px; }
`;

const AUTH_BLOCK_HTML = `
  <div id="auth">
    <input type="password" id="token" placeholder="Upload password">
    <button id="saveToken">Save</button>
  </div>
`;

const SITE_FOOTER_HTML = `
  <footer id="siteFooter">
    <p><strong>quickshare</strong> — <a href="https://share.1000600.xyz">share.1000600.xyz</a></p>
    <p>A personal file/image upload tool: drop a file, get a link, share it — no account or login needed to view or download. Features drag-and-drop upload with instant shareable links, batch upload links, password-gated uploads, an admin panel for tagging, captioning, search and bulk delete, and a photo-gallery view with date scrubbing and type filters.</p>
  </footer>
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

const LIGHTBOX_JS = `
function fmtDate(iso) {
  return new Date(iso).toLocaleString();
}
let lightboxList = [];
let lightboxIndex = -1;
function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImg.src = '';
}
function showLightboxAt(i) {
  if (i < 0 || i >= lightboxList.length) return;
  lightboxIndex = i;
  const f = lightboxList[i];
  lightboxImg.src = location.origin + f.url;
  $('lightboxName').textContent = f.name || '';
  const capEl = $('lightboxCaption');
  if (f.caption) {
    capEl.textContent = '📝 ' + f.caption;
    capEl.style.display = 'block';
  } else {
    capEl.style.display = 'none';
  }
  $('lightboxDate').textContent = f.uploaded ? fmtDate(f.uploaded) : '';
  $('lightboxPrev').disabled = i <= 0;
  $('lightboxNext').disabled = i >= lightboxList.length - 1;
}
function openLightbox(list, index) {
  lightboxList = list;
  showLightboxAt(index);
  lightbox.classList.add('open');
}
$('lightboxCopyName').onclick = (e) => copyToClipboard(e.target, $('lightboxName').textContent);
$('lightboxPrev').onclick = () => showLightboxAt(lightboxIndex - 1);
$('lightboxNext').onclick = () => showLightboxAt(lightboxIndex + 1);
lightbox.onclick = (e) => { if (e.target === lightbox) closeLightbox(); };
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showLightboxAt(lightboxIndex - 1);
  if (e.key === 'ArrowRight') showLightboxAt(lightboxIndex + 1);
});
`;

const THUMBNAIL_JS = `
async function makeThumbnail(file) {
  if (!file.type.startsWith('image/')) return null;
  try {
    const bitmap = await createImageBitmap(file);
    const maxEdge = 400;
    const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
    if (bitmap.close) bitmap.close();
    return await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.75));
  } catch (e) {
    return null;
  }
}
`;

const TYPE_JS = `
const TYPE_DEFS = [
  { key: 'all', label: 'All' },
  { key: 'image', label: '📷 Photos & images' },
  { key: 'link', label: '🔗 Links' },
  { key: 'pdf', label: '📄 PDFs' },
  { key: 'video', label: '🎬 Videos' },
  { key: 'audio', label: '🎵 Audio' },
  { key: 'document', label: '📝 Documents' },
  { key: 'archive', label: '📦 Archives' },
  { key: 'other', label: '📁 Other' },
];
const TYPE_TILE = { link: '🔗', pdf: '📄', video: '🎬', audio: '🎵', document: '📝', archive: '📦', other: '📁' };

function classifyType(contentType) {
  const ct = (contentType || '').toLowerCase();
  if (ct === 'text/x-quickshare-link') return 'link';
  if (ct.startsWith('image/')) return 'image';
  if (ct === 'application/pdf') return 'pdf';
  if (ct.startsWith('video/')) return 'video';
  if (ct.startsWith('audio/')) return 'audio';
  if (ct.startsWith('text/') || ct.includes('word') || ct.includes('document') || ct === 'application/rtf' || ct.includes('opendocument')) return 'document';
  if (ct.includes('zip') || ct.includes('tar') || ct.includes('rar') || ct.includes('7z') || ct.includes('gzip')) return 'archive';
  return 'other';
}

function renderTypeChips(container, activeType, onSelect) {
  container.innerHTML = TYPE_DEFS.map((t) =>
    '<button type="button" class="type-chip' + (activeType === t.key ? ' active' : '') + '" data-type="' + t.key + '">' + t.label + '</button>'
  ).join('');
  container.querySelectorAll('.type-chip').forEach((btn) => {
    btn.onclick = () => onSelect(btn.dataset.type);
  });
}
`;

const TAG_AUTOCOMPLETE_JS = `
let __tagSuggestBox = null;
function getTagSuggestBox() {
  if (!__tagSuggestBox) {
    __tagSuggestBox = document.createElement('div');
    __tagSuggestBox.className = 'tag-suggest';
    __tagSuggestBox.style.display = 'none';
    document.body.appendChild(__tagSuggestBox);
  }
  return __tagSuggestBox;
}

function attachTagAutocomplete(input, getTags, opts) {
  const multi = !!(opts && opts.multi);
  let items = [];
  let activeIndex = -1;
  let blurTimer = null;

  function currentTerm() {
    if (!multi) return input.value.trim().toLowerCase();
    const parts = input.value.split(',');
    return parts[parts.length - 1].trim().toLowerCase();
  }
  function usedTags() {
    if (!multi) return [];
    return input.value.split(',').slice(0, -1).map((t) => t.trim().toLowerCase()).filter(Boolean);
  }
  function close() {
    const box = getTagSuggestBox();
    if (box.__owner === input) {
      box.style.display = 'none';
      box.__owner = null;
    }
    items = [];
    activeIndex = -1;
  }
  function positionBox(box) {
    const rect = input.getBoundingClientRect();
    box.style.top = (rect.bottom + 4) + 'px';
    box.style.left = rect.left + 'px';
    box.style.minWidth = Math.max(140, rect.width) + 'px';
  }
  function renderItems() {
    const box = getTagSuggestBox();
    box.__owner = input;
    positionBox(box);
    box.innerHTML = items.map((t, i) =>
      '<div class="' + (i === activeIndex ? 'active' : '') + '" data-i="' + i + '">' + escapeHtml(t) + '</div>'
    ).join('');
    box.querySelectorAll('div[data-i]').forEach((el) => {
      el.onmousedown = (e) => { e.preventDefault(); pick(items[Number(el.dataset.i)]); };
    });
    box.style.display = items.length ? 'block' : 'none';
  }
  function pick(tag) {
    if (multi) {
      const parts = input.value.split(',');
      parts[parts.length - 1] = (parts.length > 1 ? ' ' : '') + tag;
      input.value = parts.join(',').trim() + ', ';
    } else {
      input.value = tag;
    }
    close();
    input.focus();
  }
  function update() {
    const term = currentTerm();
    if (!term) { close(); return; }
    const exclude = new Set(usedTags());
    const matches = (getTags() || []).filter((t) =>
      t.toLowerCase().includes(term) && t.toLowerCase() !== term && !exclude.has(t.toLowerCase())
    );
    items = matches.slice(0, 8);
    activeIndex = -1;
    renderItems();
  }
  input.addEventListener('input', update);
  input.addEventListener('focus', () => {
    if (blurTimer) { clearTimeout(blurTimer); blurTimer = null; }
    update();
  });
  input.addEventListener('blur', () => { blurTimer = setTimeout(close, 150); });
  input.addEventListener('keydown', (e) => {
    if (!items.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); activeIndex = Math.min(activeIndex + 1, items.length - 1); renderItems(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); activeIndex = Math.max(activeIndex - 1, 0); renderItems(); }
    else if ((e.key === 'Enter' || e.key === 'Tab') && activeIndex >= 0) {
      e.preventDefault();
      e.stopImmediatePropagation();
      pick(items[activeIndex]);
    } else if (e.key === 'Escape') {
      close();
    }
  });
}
`;

function navPill(href, label) {
  const style = 'display:inline-flex;align-items:center;gap:4px;padding:8px 16px;margin:4px 8px 4px 0;' +
    'background:#0071e3;color:#fff;border-radius:20px;font-size:13px;font-weight:600;text-decoration:none;' +
    'box-shadow:0 2px 8px rgba(0,113,227,0.28);transition:background .15s ease,transform .15s ease;';
  return '<a href="' + href + '" style="' + style + '" ' +
    'onmouseover="this.style.background=\'#0077ed\';this.style.transform=\'translateY(-1px)\'" ' +
    'onmouseout="this.style.background=\'#0071e3\';this.style.transform=\'none\'">' + label + '</a>';
}
function navBar(style, ...pills) {
  return '<div style="' + style + '">' + pills.join('') + '</div>';
}

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
  ${navBar('margin-top:12px;', navPill('/admin', 'Admin →'), navPill('/gallery', 'Gallery →'))}

  <div id="banner"></div>

  ${AUTH_BLOCK_HTML}

  <label class="field-label" for="tagsInput">Tags (comma separated)</label>
  <div class="field-wrap"><input type="text" id="tagsInput" class="meta-input" placeholder="e.g. tech, read-later"></div>

  <label class="field-label" for="captionInput">Caption (optional)</label>
  <textarea id="captionInput" class="meta-input" placeholder="Add a note…" rows="2"></textarea>

  <div id="drop" style="margin-top:20px;">Drop files here, or click to choose</div>
  <input type="file" id="fileInput" multiple>

  <p class="sub" style="text-align:center;margin:16px 0;">or</p>

  <label class="field-label" for="linksInput">Share a link instead (one per line)</label>
  <textarea id="linksInput" class="meta-input" placeholder="https://example.com" rows="2"></textarea>
  <button type="button" id="shareLinkBtn" class="secondary" style="margin-top:10px;">Share link(s)</button>

  <div id="list"></div>

  ${SITE_FOOTER_HTML}

<script>
const $ = (id) => document.getElementById(id);
const drop = $('drop'), fileInput = $('fileInput'), list = $('list'), banner = $('banner');
const tagsInput = $('tagsInput'), captionInput = $('captionInput');
const linksInput = $('linksInput'), shareLinkBtn = $('shareLinkBtn');

function showBanner(msg, isError) {
  banner.textContent = msg;
  banner.className = isError ? 'error' : '';
  banner.style.display = msg ? 'block' : 'none';
}

function normalizeLinkUrl(raw) {
  let str = (raw || '').trim();
  if (!str) return null;
  if (!/^https?:\\/\\//i.test(str)) str = 'https://' + str;
  try {
    const u = new URL(str);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    return u.toString();
  } catch (e) {
    return null;
  }
}

${AUTH_JS}
${THUMBNAIL_JS}
${TAG_AUTOCOMPLETE_JS}

let knownTags = [];
fetch('/admin/tags', { headers: authHeaders() })
  .then((r) => (r.ok ? r.json() : { tags: [] }))
  .then(({ tags }) => { knownTags = tags || []; })
  .catch(() => {});
attachTagAutocomplete(tagsInput, () => knownTags, { multi: true });

drop.onclick = () => fileInput.click();
drop.ondragover = (e) => { e.preventDefault(); drop.classList.add('hover'); };
drop.ondragleave = () => drop.classList.remove('hover');
drop.ondrop = (e) => {
  e.preventDefault();
  drop.classList.remove('hover');
  handleFiles(e.dataTransfer.files);
};
fileInput.onchange = () => handleFiles(fileInput.files);

function uploadThumbnailsInBackground(uploaded, originals) {
  uploaded.forEach((u, i) => {
    const original = originals[i];
    if (!original || !original.type.startsWith('image/')) return;
    makeThumbnail(original).then((blob) => {
      if (!blob) return;
      const tfd = new FormData();
      tfd.append('key', u.key);
      tfd.append('thumb', blob, original.name);
      return fetch('/admin/set-thumbnail', { method: 'POST', headers: authHeaders(), body: tfd });
    }).catch(() => {});
  });
}

function renderUploadResults(rows, uploaded, batchUrl, batchLabel) {
  uploaded.forEach((u, i) => {
    const row = rows[i];
    const full = location.origin + u.url;
    row.className = 'row';
    row.innerHTML =
      '<div class="name">' + escapeHtml(u.name) + '</div>' +
      '<a href="' + escapeHtml(full) + '" target="_blank">open</a>' +
      '<button class="secondary copy-btn" data-url="' + escapeHtml(u.linkTarget || full) + '">Copy links</button>';
    row.querySelector('.copy-btn').onclick = (e) => copyToClipboard(e.target, e.target.dataset.url);
  });
  if (batchUrl) {
    const full = location.origin + batchUrl;
    const brow = document.createElement('div');
    brow.className = 'row batch';
    brow.innerHTML =
      '<div class="name">📦 these ' + uploaded.length + ' ' + (batchLabel || 'files') + ' together</div>' +
      '<a href="' + full + '" target="_blank">open</a>' +
      '<button class="secondary copy-btn" data-url="' + full + '">Copy links</button>';
    brow.querySelector('.copy-btn').onclick = (e) => copyToClipboard(e.target, e.target.dataset.url);
    list.prepend(brow);
  }
}

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
      renderUploadResults(rows, uploaded, batchUrl, 'files');
      tagsInput.value = '';
      captionInput.value = '';
      uploadThumbnailsInBackground(uploaded, arr);
    })
    .catch((err) => {
      rows.forEach((row) => {
        row.className = 'row error';
        row.innerHTML = row.innerHTML.replace(/<div class="status">.*<\\/div>/, '<div class="status">' + err.message + '</div>');
      });
    });
}

function handleLinks() {
  showBanner('', false);
  const urls = linksInput.value.split('\\n').map(normalizeLinkUrl).filter(Boolean);
  if (!urls.length) { showBanner('Enter at least one valid link.', true); return; }

  const rows = urls.map((u) => {
    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = '<div class="name">' + escapeHtml(u) + '</div><div class="status">Sharing…</div>';
    list.prepend(row);
    return row;
  });

  const fd = new FormData();
  fd.append('links', urls.join('\\n'));
  fd.append('tags', tagsInput.value);
  fd.append('caption', captionInput.value);

  fetch('/upload', {
    method: 'POST',
    headers: authHeaders(),
    body: fd,
  })
    .then(async (r) => {
      if (r.status === 401) { showAuth(true); throw new Error('Wrong password'); }
      if (!r.ok) throw new Error('Failed to share link');
      return r.json();
    })
    .then(({ files: uploaded, batchUrl }) => {
      renderUploadResults(rows, uploaded, batchUrl, 'links');
      tagsInput.value = '';
      captionInput.value = '';
      linksInput.value = '';
    })
    .catch((err) => {
      rows.forEach((row) => {
        row.className = 'row error';
        row.innerHTML = row.innerHTML.replace(/<div class="status">.*<\\/div>/, '<div class="status">' + err.message + '</div>');
      });
    });
}
shareLinkBtn.onclick = handleLinks;
</script>
</body>
</html>`;

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function batchPage(id, manifest) {
  const urls = manifest.map((m) => '/f/' + id + '/' + encodeURIComponent(m.name));
  const items = manifest
    .map((m, i) => {
      const url = urls[i];
      const isLink = m.type === 'text/x-quickshare-link';
      const preview = m.type.startsWith('image/') ? '<img class="preview" src="' + url + '">' : '';
      const nameDisplay = (isLink ? '🔗 ' : '') + escapeHtml(m.name);
      return (
        '<div class="row" style="flex-direction:column;align-items:stretch;">' +
        preview +
        '<div style="display:flex;align-items:center;gap:10px;">' +
        '<div class="name">' + nameDisplay + '</div>' +
        '<a href="' + url + '" target="_blank">open</a>' +
        '</div></div>'
      );
    })
    .join('\n');
  const openAllBtn = manifest.length > 1
    ? '<button type="button" id="openAllBtn" class="secondary" style="margin-bottom:16px;">Open all (' + manifest.length + ')</button>'
    : '';

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
  ${openAllBtn}
  <div id="list">${items}</div>
<script>
const openAllBtn = document.getElementById('openAllBtn');
if (openAllBtn) {
  const urls = ${JSON.stringify(urls)};
  openAllBtn.onclick = () => {
    urls.forEach((u) => window.open(u, '_blank'));
  };
}
</script>
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
  ${navBar('margin-top:12px;', navPill('/', 'Upload →'), navPill('/gallery', 'Gallery →'))}

  <div id="banner"></div>

  ${AUTH_BLOCK_HTML}

  <input type="search" id="searchBox" placeholder="Search filenames and captions…">

  <div id="typeFilters"></div>

  <div id="tagFilters"></div>

  <div id="toolbar">
    <label><input type="checkbox" id="selectAll"> Select all on page</label>
    <button id="bulkDelete" class="secondary" style="display:none;">Delete selected</button>
    <button id="bulkCombine" class="secondary" style="display:none;">Combine selected</button>
    <button id="backfillThumbs" class="secondary" style="display:none;">Generate missing thumbnails</button>
    <button id="refresh" class="secondary">Refresh</button>
  </div>

  <p class="sub" id="resultsSummary"></p>

  <div id="groups"></div>

  <div id="pagination"></div>

  <a href="/" class="fab" title="Upload files">+</a>

  <div id="lightbox">
    <button type="button" id="lightboxPrev" class="lightbox-nav" title="Previous">‹</button>
    <div id="lightboxContent">
      <img id="lightboxImg" alt="">
      <div id="lightboxInfo">
        <div id="lightboxName"></div>
        <div id="lightboxCaption" style="display:none;"></div>
        <div id="lightboxDate"></div>
        <button type="button" id="lightboxCopyName" class="secondary small">Copy name</button>
      </div>
    </div>
    <button type="button" id="lightboxNext" class="lightbox-nav" title="Next">›</button>
  </div>

  <div id="confirmOverlay">
    <div id="confirmBox">
      <p id="confirmMessage"></p>
      <div id="confirmActions">
        <button type="button" id="confirmCancel" class="secondary small">Cancel</button>
        <button type="button" id="confirmOk" class="small">Delete</button>
      </div>
    </div>
  </div>

  ${SITE_FOOTER_HTML}

<script>
const $ = (id) => document.getElementById(id);
const banner = $('banner'), groupsEl = $('groups'), bulkBtn = $('bulkDelete'), combineBtn = $('bulkCombine'), selectAllBox = $('selectAll');
const searchBox = $('searchBox'), paginationEl = $('pagination'), resultsSummary = $('resultsSummary');
const tagFiltersEl = $('tagFilters');
const typeFiltersEl = $('typeFilters');
const lightbox = $('lightbox'), lightboxImg = $('lightboxImg');
const confirmOverlay = $('confirmOverlay'), confirmMessageEl = $('confirmMessage');
const confirmCancelBtn = $('confirmCancel'), confirmOkBtn = $('confirmOk');

function showBanner(msg, isError) {
  banner.textContent = msg;
  banner.className = isError ? 'error' : '';
  banner.style.display = msg ? 'block' : 'none';
}

function confirmDialog(message, okLabel) {
  return new Promise((resolve) => {
    confirmMessageEl.textContent = message;
    confirmOkBtn.textContent = okLabel || 'Delete';
    confirmOverlay.classList.add('open');
    const finish = (result) => {
      confirmOverlay.classList.remove('open');
      confirmOkBtn.onclick = null;
      confirmCancelBtn.onclick = null;
      confirmOverlay.onclick = null;
      document.removeEventListener('keydown', onKey);
      resolve(result);
    };
    const onKey = (e) => { if (e.key === 'Escape') finish(false); };
    confirmOkBtn.onclick = () => finish(true);
    confirmCancelBtn.onclick = () => finish(false);
    confirmOverlay.onclick = (e) => { if (e.target === confirmOverlay) finish(false); };
    document.addEventListener('keydown', onKey);
  });
}

${AUTH_JS}
${LIGHTBOX_JS}
${THUMBNAIL_JS}
${TYPE_JS}
${TAG_AUTOCOMPLETE_JS}

let allFiles = [];
let batchIds = [];
let pendingByKey = {};
let searchTerm = '';
let activeTag = null;
let activeType = 'all';
let currentPage = 1;
const PAGE_SIZE = 20;
const selected = new Set();

function allKnownTags() {
  const tagSet = new Set();
  allFiles.forEach((f) => (f.tags || []).forEach((t) => tagSet.add(t)));
  return [...tagSet].sort();
}

function renderTypeFilters() {
  renderTypeChips(typeFiltersEl, activeType, (type) => { activeType = type; currentPage = 1; render(); });
}

function renderTagFilters() {
  const tags = allKnownTags();
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

function fileMatchesFilters(f) {
  const matchesSearch = !searchTerm ||
    f.name.toLowerCase().includes(searchTerm) ||
    (f.caption && f.caption.toLowerCase().includes(searchTerm));
  const matchesTag = !activeTag || (f.tags || []).includes(activeTag);
  const matchesType = activeType === 'all' || classifyType(f.contentType) === activeType;
  return matchesSearch && matchesTag && matchesType;
}

function computeView() {
  const byId = {};
  allFiles.forEach((f) => { (byId[f.id] = byId[f.id] || []).push(f); });

  const hasFilter = !!searchTerm || !!activeTag || activeType !== 'all';
  const displayById = {};
  Object.keys(byId).forEach((id) => {
    displayById[id] = hasFilter ? byId[id].filter(fileMatchesFilters) : byId[id];
  });

  let ids = Object.keys(byId).sort((a, b) => {
    const da = Math.max(...byId[a].map((f) => new Date(f.uploaded).getTime()));
    const db = Math.max(...byId[b].map((f) => new Date(f.uploaded).getTime()));
    return db - da;
  });

  if (hasFilter) {
    ids = ids.filter((id) => displayById[id].length > 0);
  }

  const totalGroups = ids.length;
  const totalPages = Math.max(1, Math.ceil(totalGroups / PAGE_SIZE));
  currentPage = Math.min(Math.max(currentPage, 1), totalPages);

  const pageIds = ids.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const visibleFiles = pageIds.flatMap((id) => displayById[id]);
  const allFilteredFiles = ids.flatMap((id) => displayById[id]);
  const totalFileCount = ids.reduce((sum, id) => sum + displayById[id].length, 0);

  return { byId, displayById, pageIds, visibleFiles, allFilteredFiles, totalGroups, totalPages, totalFileCount };
}

function render() {
  renderTypeFilters();
  renderTagFilters();
  updateBackfillButton();

  if (!allFiles.length) {
    groupsEl.innerHTML = '<p class="sub">No files yet.</p>';
    paginationEl.innerHTML = '';
    resultsSummary.textContent = '';
    updateBulkButton([]);
    return;
  }

  const { byId, displayById, pageIds, visibleFiles, totalGroups, totalPages, totalFileCount } = computeView();

  const filterLabel = [
    searchTerm ? '"' + searchBox.value.trim() + '"' : null,
    activeTag ? 'tag "' + activeTag + '"' : null,
    activeType !== 'all' ? (TYPE_DEFS.find((t) => t.key === activeType) || {}).label : null,
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
    const files = displayById[id];
    const fullCount = byId[id].length;
    const shownHint = files.length !== fullCount ? ' · ' + files.length + ' shown' : '';
    const isBatch = batchIds.includes(id);
    const head = isBatch
      ? '<div class="group-head"><span>📦 batch of ' + fullCount + shownHint + '</span>' +
        '<a href="/b/' + id + '" target="_blank">open batch</a>' +
        '<button class="secondary small copy-batch" data-url="' + location.origin + '/b/' + id + '">Copy batch link</button>' +
        '<button class="secondary small copy-batch-all" data-id="' + id + '">Copy all links</button>' +
        '<button class="secondary small delete-batch" data-id="' + id + '">Delete batch</button></div>'
      : '<div class="group-head"><span>single file</span></div>';

    const rows = files.map((f) => {
      const full = location.origin + f.url;
      const key = escapeHtml(f.key);
      const expiry = pendingByKey[f.key]
        ? '<span class="meta expiring">⏳ ' + fmtExpiry(pendingByKey[f.key]) + '</span>'
        : '';
      const thumbSrc = f.thumbUrl ? location.origin + f.thumbUrl : full;
      const thumb = f.contentType && f.contentType.startsWith('image/')
        ? '<img class="thumb" loading="lazy" src="' + escapeHtml(thumbSrc) + '" data-key="' + key + '">'
        : '';
      const isLink = f.contentType === 'text/x-quickshare-link';
      const nameDisplay = (isLink ? '🔗 ' : '') + escapeHtml(f.name);
      const linkMeta = isLink && f.linkTarget
        ? '<div class="meta link-target"><a href="' + escapeHtml(f.linkTarget) + '" target="_blank" rel="noopener">' + escapeHtml(f.linkTarget) + '</a></div>'
        : '';
      const captionInner = f.caption
        ? '<span class="caption-text">📝 ' + escapeHtml(f.caption) + '</span>' +
          '<button type="button" class="caption-add-btn caption-edit-btn" data-key="' + key + '" data-caption="' + escapeHtml(f.caption) + '" title="Edit caption">Edit</button>'
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
        '<div class="name">' + nameDisplay + '</div>' +
        '</div>' +
        '<div class="file-row-actions">' +
        linkMeta +
        caption +
        expiry +
        tagPills +
        addTagSlot +
        '<div class="meta">' + fmtSize(f.size) + ' · ' + fmtDate(f.uploaded) + '</div>' +
        '<a href="' + escapeHtml(full) + '" target="_blank">open</a>' +
        '<button class="secondary small copy-file" data-url="' + escapeHtml(f.linkTarget || full) + '">Copy links</button>' +
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
  groupsEl.querySelectorAll('.copy-batch-all').forEach((btn) => {
    btn.onclick = (e) => {
      const groupFiles = byId[e.target.dataset.id] || [];
      const urls = groupFiles.map((f) => f.linkTarget || (location.origin + f.url)).join('\\n');
      copyToClipboard(e.target, urls);
    };
  });
  groupsEl.querySelectorAll('.delete-batch').forEach((btn) => {
    btn.onclick = async (e) => {
      const groupFiles = byId[e.target.dataset.id] || [];
      if (!groupFiles.length) return;
      const ok = await confirmDialog('Delete all ' + groupFiles.length + ' files in this batch? This cannot be undone.');
      if (!ok) return;
      deleteKeys(groupFiles.map((f) => f.key));
    };
  });
  groupsEl.querySelectorAll('.del').forEach((btn) => {
    btn.onclick = async (e) => {
      const ok = await confirmDialog('Delete this file? This cannot be undone.');
      if (!ok) return;
      deleteKeys([e.target.dataset.key]);
    };
  });
  groupsEl.querySelectorAll('.regen').forEach((btn) => {
    btn.onclick = (e) => regenerate(e.target.dataset.key, e.target);
  });
  groupsEl.querySelectorAll('.thumb').forEach((img) => {
    img.onclick = (e) => {
      const { allFilteredFiles } = computeView();
      const imagesOnly = allFilteredFiles.filter((f) => f.contentType && f.contentType.startsWith('image/'));
      const idx = imagesOnly.findIndex((f) => f.key === e.target.dataset.key);
      openLightbox(imagesOnly, idx);
    };
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

  const touchedIds = new Set([...selected].map((k) => k.slice(0, k.indexOf('/'))));
  if (touchedIds.size >= 2) {
    combineBtn.style.display = 'inline-block';
    combineBtn.textContent = 'Combine selected (' + touchedIds.size + ' entries)';
  } else {
    combineBtn.style.display = 'none';
  }
}

selectAllBox.onchange = () => {
  const { visibleFiles } = computeView();
  if (selectAllBox.checked) visibleFiles.forEach((f) => selected.add(f.key));
  else visibleFiles.forEach((f) => selected.delete(f.key));
  render();
};

bulkBtn.onclick = async () => {
  const ok = await confirmDialog('Delete ' + selected.size + ' file(s)? This cannot be undone.');
  if (!ok) return;
  deleteKeys([...selected]);
};

combineBtn.onclick = async () => {
  const { byId } = computeView();
  const touchedIds = [...new Set([...selected].map((k) => k.slice(0, k.indexOf('/'))))];
  if (touchedIds.length < 2) return;

  const oldestFirst = (a, b) => {
    const ta = Math.min(...byId[a].map((f) => new Date(f.uploaded).getTime()));
    const tb = Math.min(...byId[b].map((f) => new Date(f.uploaded).getTime()));
    return ta - tb;
  };
  const sorted = [...touchedIds].sort(oldestFirst);
  const targetId = sorted[0];
  const sourceIds = sorted.slice(1);
  const totalFiles = touchedIds.reduce((sum, id) => sum + byId[id].length, 0);

  const ok = await confirmDialog(
    'Combine ' + touchedIds.length + ' entries (' + totalFiles + ' file(s) total) into one batch? ' +
    'Everything will be merged into the oldest entry’s link.',
    'Combine'
  );
  if (!ok) return;

  fetch('/admin/combine', {
    method: 'POST',
    headers: Object.assign({ 'content-type': 'application/json' }, authHeaders()),
    body: JSON.stringify({ targetId, sourceIds }),
  })
    .then((r) => { if (!r.ok) throw new Error('Combine failed'); })
    .then(() => { selected.clear(); load(); })
    .catch((err) => showBanner(err.message, true));
};

searchBox.oninput = () => {
  searchTerm = searchBox.value.trim().toLowerCase();
  currentPage = 1;
  render();
};

$('refresh').onclick = load;

function missingThumbFiles() {
  return allFiles.filter((f) => f.contentType && f.contentType.startsWith('image/') && !f.thumbUrl);
}

function updateBackfillButton() {
  const btn = $('backfillThumbs');
  const missing = missingThumbFiles();
  if (missing.length) {
    btn.style.display = 'inline-block';
    btn.textContent = 'Generate ' + missing.length + ' missing thumbnail(s)';
    btn.disabled = false;
  } else {
    btn.style.display = 'none';
  }
}

async function backfillThumbnails() {
  const missing = missingThumbFiles();
  if (!missing.length) return;

  const btn = $('backfillThumbs');
  btn.disabled = true;
  let done = 0;
  showBanner('Generating thumbnails: 0/' + missing.length, false);

  let next = 0;
  async function worker() {
    while (next < missing.length) {
      const f = missing[next++];
      try {
        const resp = await fetch(location.origin + f.url);
        const blob = await resp.blob();
        const file = new File([blob], f.name, { type: f.contentType });
        const thumb = await makeThumbnail(file);
        if (thumb) {
          const tfd = new FormData();
          tfd.append('key', f.key);
          tfd.append('thumb', thumb, f.name);
          await fetch('/admin/set-thumbnail', { method: 'POST', headers: authHeaders(), body: tfd });
        }
      } catch (e) {}
      done++;
      showBanner('Generating thumbnails: ' + done + '/' + missing.length, false);
    }
  }
  await Promise.all([worker(), worker(), worker()]);

  showBanner('Generated ' + done + ' thumbnail(s).', false);
  load();
}
$('backfillThumbs').onclick = backfillThumbnails;

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
    '<textarea class="caption-input" placeholder="Add a note…" rows="2" maxlength="1000">' + escapeHtml(currentCaption) + '</textarea>' +
    '<button type="button" class="secondary small caption-save">Save</button>' +
    '<button type="button" class="secondary small caption-cancel">Cancel</button>';
  const input = container.querySelector('.caption-input');
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
  container.querySelector('.caption-save').onclick = () => saveCaption(key, input.value);
  container.querySelector('.caption-cancel').onclick = () => load();
  input.onkeydown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); saveCaption(key, input.value); }
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
    '<span class="tag-add-wrap"><input type="text" class="caption-input tag-add-input" placeholder="tag name"></span>' +
    '<button type="button" class="secondary small tag-add-save">Add</button>' +
    '<button type="button" class="secondary small tag-add-cancel">Cancel</button>';
  const input = container.querySelector('.tag-add-input');
  input.focus();
  attachTagAutocomplete(input, allKnownTags, { multi: false });
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

const GALLERY_PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>quickshare gallery</title>
<style>${STYLE}</style>
</head>
<body class="gallery-page">
  <h1>Gallery</h1>
  ${navBar('margin-top:8px;', navPill('/', 'Upload →'), navPill('/admin', 'Manage →'))}

  <div id="banner"></div>

  ${AUTH_BLOCK_HTML}

  <div id="typeFilters"></div>

  <div id="sizeToggle" class="size-toggle">
    <button type="button" class="type-chip" data-size="compact">Small</button>
    <button type="button" class="type-chip" data-size="large">Large</button>
  </div>

  <div id="galleryMain"><p class="sub">Loading…</p></div>

  <div class="scrubber" id="scrubber">
    <div class="scrubber-track" id="scrubberTrack"></div>
  </div>

  <div id="lightbox">
    <button type="button" id="lightboxPrev" class="lightbox-nav" title="Previous">‹</button>
    <div id="lightboxContent">
      <img id="lightboxImg" alt="">
      <div id="lightboxInfo">
        <div id="lightboxName"></div>
        <div id="lightboxCaption" style="display:none;"></div>
        <div id="lightboxDate"></div>
        <button type="button" id="lightboxCopyName" class="secondary small">Copy name</button>
      </div>
    </div>
    <button type="button" id="lightboxNext" class="lightbox-nav" title="Next">›</button>
  </div>

  ${SITE_FOOTER_HTML}

<script>
const $ = (id) => document.getElementById(id);
const banner = $('banner'), galleryMain = $('galleryMain'), typeFiltersEl = $('typeFilters');
const scrubberTrack = $('scrubberTrack');
const lightbox = $('lightbox'), lightboxImg = $('lightboxImg');
const sizeToggleEl = $('sizeToggle');

function showBanner(msg, isError) {
  banner.textContent = msg;
  banner.className = isError ? 'error' : '';
  banner.style.display = msg ? 'block' : 'none';
}

${AUTH_JS}
${LIGHTBOX_JS}
${TYPE_JS}

let allFiles = [];
let activeType = 'all';
let gridSize = localStorage.getItem('qs_gallery_size') === 'large' ? 'large' : 'compact';

function applyGridSize() {
  galleryMain.classList.toggle('large', gridSize === 'large');
}

function renderSizeToggle() {
  sizeToggleEl.querySelectorAll('.type-chip').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.size === gridSize);
    btn.onclick = () => {
      gridSize = btn.dataset.size;
      localStorage.setItem('qs_gallery_size', gridSize);
      applyGridSize();
      renderSizeToggle();
    };
  });
}
renderSizeToggle();
applyGridSize();

function renderTypeFilters() {
  renderTypeChips(typeFiltersEl, activeType, (type) => { activeType = type; render(); });
}

function fmtDayHeader(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

function localDayKey(dateStr) {
  const d = new Date(dateStr);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function fmtMonthYear(dateStr) {
  return new Date(dateStr).toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
}

function load() {
  galleryMain.innerHTML = '<p class="sub">Loading…</p>';
  showBanner('', false);
  fetch('/admin/list', { headers: authHeaders() })
    .then(async (r) => {
      if (r.status === 401) { showAuth(true); throw new Error('Wrong password'); }
      if (!r.ok) throw new Error('Failed to load');
      return r.json();
    })
    .then(({ files }) => {
      allFiles = files
        .map((f) => Object.assign({}, f, { type: classifyType(f.contentType) }))
        .sort((a, b) => new Date(b.uploaded) - new Date(a.uploaded));
      render();
    })
    .catch((err) => { showBanner(err.message, true); galleryMain.innerHTML = ''; });
}

function cellHtml(f) {
  const full = location.origin + f.url;
  const safeUrl = escapeHtml(full);
  const title = escapeHtml(f.name);
  if (f.type === 'image') {
    const thumbSrc = escapeHtml(f.thumbUrl ? location.origin + f.thumbUrl : full);
    return '<a class="gallery-cell is-image" href="' + safeUrl + '" target="_blank" title="' + title +
      '" data-key="' + escapeHtml(f.key) + '">' +
      '<img loading="lazy" src="' + thumbSrc + '"></a>';
  }
  const emoji = TYPE_TILE[f.type] || '📁';
  const ext = f.type === 'link' ? '' : escapeHtml((f.name.split('.').pop() || '').slice(0, 4));
  return '<a class="gallery-cell" href="' + safeUrl + '" target="_blank" title="' + title + '">' +
    '<div class="type-tile"><span class="emoji">' + emoji + '</span><span class="ext">' + ext + '</span></div>' +
    '<div class="cell-name">' + title + '</div></a>';
}

function dayGroupHtml(g, gi) {
  return '<div class="gallery-day" data-group-index="' + gi + '">' +
    '<div class="gallery-day-header">' + fmtDayHeader(g.date) + '</div>' +
    '<div class="gallery-grid">' + g.files.map(cellHtml).join('') + '</div>' +
    '</div>';
}

let dayGroups = [];
let renderedCount = 0;
let sentinelObserver = null;
let scrollHandler = null;
const BATCH_GROUPS = 12;

function wireGalleryCells() {
  galleryMain.querySelectorAll('a.is-image').forEach((el) => {
    el.onclick = (e) => {
      e.preventDefault();
      const filtered = activeType === 'all' ? allFiles : allFiles.filter((f) => f.type === activeType);
      const imagesOnly = filtered.filter((f) => f.type === 'image');
      const idx = imagesOnly.findIndex((f) => f.key === el.dataset.key);
      openLightbox(imagesOnly, idx);
    };
  });
}

function renderUpTo(targetCount) {
  if (targetCount <= renderedCount) return;
  const sentinel = document.getElementById('scrollSentinel');
  const temp = document.createElement('div');
  let html = '';
  for (let i = renderedCount; i < targetCount; i++) html += dayGroupHtml(dayGroups[i], i);
  temp.innerHTML = html;
  const frag = document.createDocumentFragment();
  while (temp.firstChild) frag.appendChild(temp.firstChild);
  if (sentinel) galleryMain.insertBefore(frag, sentinel);
  else galleryMain.appendChild(frag);
  renderedCount = targetCount;
  wireGalleryCells();
}

function render() {
  renderTypeFilters();

  const filtered = activeType === 'all' ? allFiles : allFiles.filter((f) => f.type === activeType);

  if (sentinelObserver) sentinelObserver.disconnect();
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler);

  if (!filtered.length) {
    galleryMain.innerHTML = '<p class="sub">No files' + (activeType === 'all' ? ' yet.' : ' of this type.') + '</p>';
    scrubberTrack.innerHTML = '';
    return;
  }

  dayGroups = [];
  let currentKey = null;
  filtered.forEach((f) => {
    const dayKey = localDayKey(f.uploaded);
    if (dayKey !== currentKey) {
      dayGroups.push({ date: f.uploaded, files: [] });
      currentKey = dayKey;
    }
    dayGroups[dayGroups.length - 1].files.push(f);
  });

  renderedCount = 0;
  galleryMain.innerHTML = '';
  renderUpTo(Math.min(BATCH_GROUPS, dayGroups.length));

  const sentinel = document.createElement('div');
  sentinel.id = 'scrollSentinel';
  galleryMain.appendChild(sentinel);
  sentinelObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && renderedCount < dayGroups.length) {
      renderUpTo(Math.min(renderedCount + BATCH_GROUPS, dayGroups.length));
    }
  });
  sentinelObserver.observe(sentinel);

  buildScrubber(dayGroups.length);
}

function buildScrubber(totalGroups) {
  scrubberTrack.innerHTML = '';
  if (totalGroups < 2) return;

  const yearFirstIndex = new Map();
  dayGroups.forEach((g, i) => {
    const year = String(new Date(g.date).getFullYear());
    if (!yearFirstIndex.has(year)) yearFirstIndex.set(year, i);
  });

  const labels = [];
  yearFirstIndex.forEach((idx, year) => {
    const pct = (idx / totalGroups) * 100;
    const tick = document.createElement('div');
    tick.className = 'scrubber-tick';
    tick.style.top = pct + '%';
    scrubberTrack.appendChild(tick);

    const label = document.createElement('div');
    label.className = 'scrubber-label';
    label.textContent = year;
    label.style.top = pct + '%';
    label.dataset.groupIndex = idx;
    label.dataset.year = year;
    scrubberTrack.appendChild(label);
    labels.push(label);
  });

  const thumb = document.createElement('div');
  thumb.className = 'scrubber-thumb';
  scrubberTrack.appendChild(thumb);

  function scrollToGroup(idx) {
    if (idx >= renderedCount) renderUpTo(Math.min(idx + 1, dayGroups.length));
    const el = galleryMain.querySelector('.gallery-day[data-group-index="' + idx + '"]');
    if (el) el.scrollIntoView({ block: 'start' });
  }

  function handlePointer(clientY) {
    const rect = scrubberTrack.getBoundingClientRect();
    let pct = (clientY - rect.top) / rect.height;
    pct = Math.min(Math.max(pct, 0), 1);
    thumb.style.top = (pct * 100) + '%';
    const idx = Math.min(totalGroups - 1, Math.floor(pct * totalGroups));
    scrollToGroup(idx);
  }

  let dragging = false;
  scrubberTrack.onpointerdown = (e) => {
    dragging = true;
    handlePointer(e.clientY);
    scrubberTrack.setPointerCapture(e.pointerId);
  };
  scrubberTrack.onpointermove = (e) => { if (dragging) handlePointer(e.clientY); };
  scrubberTrack.onpointerup = () => { dragging = false; };
  scrubberTrack.onpointercancel = () => { dragging = false; };

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const groups = [...galleryMain.querySelectorAll('.gallery-day')];
      let currentIdx = 0;
      for (const g of groups) {
        if (g.getBoundingClientRect().top <= 60) currentIdx = Number(g.dataset.groupIndex);
        else break;
      }
      thumb.style.top = ((currentIdx / totalGroups) * 100) + '%';
      let best = null, bestIdx = -1;
      labels.forEach((l) => {
        const li = Number(l.dataset.groupIndex);
        l.classList.remove('active');
        l.textContent = l.dataset.year;
        if (li <= currentIdx && li > bestIdx) { bestIdx = li; best = l; }
      });
      if (best) {
        best.classList.add('active');
        best.textContent = fmtMonthYear(dayGroups[currentIdx].date);
      }
    });
  }
  scrollHandler = onScroll;
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
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

const CAPTION_MAX_CHARS = 1000;
const CAPTION_MAX_BYTES = 1500; // stay well under R2's ~2KB total custom-metadata cap

function clampCaption(raw) {
  const str = (raw || '').trim();
  if (!str) return '';
  const encoder = new TextEncoder();
  let result = '';
  let bytes = 0;
  let chars = 0;
  for (const ch of str) {
    if (chars >= CAPTION_MAX_CHARS) break;
    const chBytes = encoder.encode(ch).length;
    if (bytes + chBytes > CAPTION_MAX_BYTES) break;
    result += ch;
    bytes += chBytes;
    chars++;
  }
  return result;
}

const LINK_CONTENT_TYPE = 'text/x-quickshare-link';

function normalizeLinkUrl(raw) {
  let str = (raw || '').trim();
  if (!str) return null;
  if (!/^https?:\/\//i.test(str)) str = 'https://' + str;
  try {
    const u = new URL(str);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    return u.toString();
  } catch (e) {
    return null;
  }
}

function checkToken(request, env) {
  const token = request.headers.get('x-upload-token') || '';
  return !!env.UPLOAD_TOKEN && token === env.UPLOAD_TOKEN;
}

function thumbKeyFor(key) {
  const slash = key.indexOf('/');
  return key.slice(0, slash + 1) + '_thumb/' + key.slice(slash + 1);
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

async function listEntryFiles(bucket, id) {
  let cursor;
  const objects = [];
  do {
    const res = await bucket.list({ prefix: id + '/', cursor, limit: 1000, include: ['httpMetadata', 'customMetadata'] });
    objects.push(...res.objects);
    cursor = res.truncated ? res.cursor : undefined;
  } while (cursor);
  return objects.filter((o) => !o.key.endsWith('/_manifest.json') && !o.key.includes('/_thumb/'));
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
    await env.SHARE_R2.delete(dueKeys.map(thumbKeyFor));
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
      return new Response(PAGE, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } });
    }

    if (request.method === 'POST' && pathname === '/upload') {
      if (!checkToken(request, env)) {
        return Response.json({ error: 'unauthorized' }, { status: 401 });
      }

      const form = await request.formData();
      const incoming = form.getAll('file').filter((f) => typeof f !== 'string');
      const linksRaw = form.get('links');
      const links = typeof linksRaw === 'string'
        ? linksRaw.split('\n').map(normalizeLinkUrl).filter(Boolean)
        : [];
      if (!incoming.length && !links.length) {
        return Response.json({ error: 'nothing to upload' }, { status: 400 });
      }

      const tagsRaw = form.get('tags');
      const captionRaw = form.get('caption');
      const tags = typeof tagsRaw === 'string'
        ? [...new Set(tagsRaw.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean))]
        : [];
      const caption = typeof captionRaw === 'string' ? clampCaption(captionRaw) : '';
      const baseMetadata = { createdAt: new Date().toISOString() };
      if (tags.length) baseMetadata.tags = tags.join(',');
      if (caption) baseMetadata.caption = caption;

      const id = randomId();
      const used = new Set(['_manifest.json']);
      const manifest = [];

      for (let i = 0; i < incoming.length; i++) {
        const file = incoming[i];
        const name = dedupeFilename(used, sanitizeFilename(file.name || 'file'));
        const type = file.type || 'application/octet-stream';
        await env.SHARE_R2.put(id + '/' + name, file.stream(), {
          httpMetadata: { contentType: type },
          customMetadata: baseMetadata,
        });
        manifest.push({ name, type, size: file.size });

        const thumb = form.get('thumb_' + i);
        if (thumb && typeof thumb !== 'string') {
          await env.SHARE_R2.put(id + '/_thumb/' + name, thumb.stream(), {
            httpMetadata: { contentType: 'image/jpeg' },
          });
        }
      }

      for (const url of links) {
        let host;
        try { host = new URL(url).hostname.replace(/^www\./, ''); } catch (e) { host = 'link'; }
        const name = dedupeFilename(used, sanitizeFilename(host || 'link'));
        const customMetadata = Object.assign({}, baseMetadata, { linkTarget: url });
        await env.SHARE_R2.put(id + '/' + name, url, {
          httpMetadata: { contentType: LINK_CONTENT_TYPE },
          customMetadata,
        });
        manifest.push({ name, type: LINK_CONTENT_TYPE, size: url.length, linkTarget: url });
      }

      if (manifest.length > 1) {
        await env.SHARE_R2.put(id + '/_manifest.json', JSON.stringify(manifest), {
          httpMetadata: { contentType: 'application/json' },
        });
      }

      return Response.json({
        files: manifest.map((m) => ({
          name: m.name,
          key: id + '/' + m.name,
          url: '/f/' + id + '/' + encodeURIComponent(m.name),
          linkTarget: m.linkTarget || null,
        })),
        batchUrl: manifest.length > 1 ? '/b/' + id : null,
      });
    }

    if (request.method === 'POST' && pathname === '/admin/set-thumbnail') {
      if (!checkToken(request, env)) {
        return Response.json({ error: 'unauthorized' }, { status: 401 });
      }
      const form = await request.formData();
      const key = form.get('key');
      const thumb = form.get('thumb');
      if (!key || typeof key !== 'string' || !thumb || typeof thumb === 'string') {
        return Response.json({ error: 'missing key or thumb' }, { status: 400 });
      }
      await env.SHARE_R2.put(thumbKeyFor(key), thumb.stream(), {
        httpMetadata: { contentType: 'image/jpeg' },
      });
      return Response.json({ ok: true });
    }

    if (request.method === 'GET' && pathname === '/admin') {
      return new Response(ADMIN_PAGE, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } });
    }

    if (request.method === 'GET' && pathname === '/gallery') {
      return new Response(GALLERY_PAGE, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } });
    }

    if (request.method === 'GET' && pathname === '/admin/tags') {
      if (!checkToken(request, env)) {
        return Response.json({ error: 'unauthorized' }, { status: 401 });
      }
      const objects = await listAllObjects(env.SHARE_R2);
      const tagSet = new Set();
      objects.forEach((o) => {
        const cm = o.customMetadata || {};
        if (cm.tags) cm.tags.split(',').forEach((t) => { if (t) tagSet.add(t); });
      });
      return Response.json({ tags: [...tagSet].sort() });
    }

    if (request.method === 'GET' && pathname === '/admin/list') {
      if (!checkToken(request, env)) {
        return Response.json({ error: 'unauthorized' }, { status: 401 });
      }
      ctx.waitUntil(runCleanup(env));
      const objects = await listAllObjects(env.SHARE_R2);
      const thumbKeys = new Set(objects.filter((o) => o.key.includes('/_thumb/')).map((o) => o.key));
      const files = objects
        .filter((o) => !o.key.endsWith('/_manifest.json') && !o.key.startsWith('_system/') && !o.key.includes('/_thumb/'))
        .map((o) => {
          const slash = o.key.indexOf('/');
          const id = o.key.slice(0, slash);
          const name = o.key.slice(slash + 1);
          const cm = o.customMetadata || {};
          const hasThumb = thumbKeys.has(thumbKeyFor(o.key));
          return {
            key: o.key,
            id,
            name,
            size: o.size,
            uploaded: cm.createdAt || o.uploaded,
            contentType: o.httpMetadata && o.httpMetadata.contentType,
            url: '/f/' + id + '/' + encodeURIComponent(name),
            thumbUrl: hasThumb ? '/f/' + id + '/_thumb/' + encodeURIComponent(name) : null,
            tags: cm.tags ? cm.tags.split(',').filter(Boolean) : [],
            caption: cm.caption || '',
            linkTarget: cm.linkTarget || null,
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
      await env.SHARE_R2.delete(keys.map(thumbKeyFor));
      await cleanupManifests(env.SHARE_R2, keys);
      return Response.json({ ok: true });
    }

    if (request.method === 'POST' && pathname === '/admin/combine') {
      if (!checkToken(request, env)) {
        return Response.json({ error: 'unauthorized' }, { status: 401 });
      }
      const { targetId, sourceIds } = await request.json();
      const ids = Array.isArray(sourceIds) ? [...new Set(sourceIds)].filter((id) => id && id !== targetId) : [];
      if (!targetId || !ids.length) {
        return Response.json({ error: 'targetId and sourceIds required' }, { status: 400 });
      }

      const targetFiles = await listEntryFiles(env.SHARE_R2, targetId);
      const used = new Set(['_manifest.json', ...targetFiles.map((o) => o.key.slice(targetId.length + 1))]);
      const manifest = targetFiles.map((o) => ({
        name: o.key.slice(targetId.length + 1),
        type: o.httpMetadata && o.httpMetadata.contentType,
        size: o.size,
        linkTarget: (o.customMetadata && o.customMetadata.linkTarget) || undefined,
      }));

      for (const id of ids) {
        const sourceFiles = await listEntryFiles(env.SHARE_R2, id);
        for (const o of sourceFiles) {
          const object = await env.SHARE_R2.get(o.key);
          if (!object) continue;

          const oldName = o.key.slice(id.length + 1);
          const newName = dedupeFilename(used, sanitizeFilename(oldName));
          const newKey = targetId + '/' + newName;

          await env.SHARE_R2.put(newKey, object.body, {
            httpMetadata: object.httpMetadata,
            customMetadata: object.customMetadata,
          });

          const thumbObj = await env.SHARE_R2.get(thumbKeyFor(o.key));
          if (thumbObj) {
            await env.SHARE_R2.put(thumbKeyFor(newKey), thumbObj.body, {
              httpMetadata: thumbObj.httpMetadata,
            });
            await env.SHARE_R2.delete(thumbKeyFor(o.key));
          }
          await env.SHARE_R2.delete(o.key);

          manifest.push({
            name: newName,
            type: object.httpMetadata && object.httpMetadata.contentType,
            size: object.size,
            linkTarget: (object.customMetadata && object.customMetadata.linkTarget) || undefined,
          });
        }
        await env.SHARE_R2.delete(id + '/_manifest.json');
      }

      await env.SHARE_R2.put(targetId + '/_manifest.json', JSON.stringify(manifest), {
        httpMetadata: { contentType: 'application/json' },
      });

      return Response.json({ ok: true, batchUrl: '/b/' + targetId, fileCount: manifest.length });
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

      const cm = Object.assign({}, object.customMetadata);
      if (!cm.createdAt) cm.createdAt = object.uploaded.toISOString();

      await env.SHARE_R2.put(newKey, object.body, {
        httpMetadata: object.httpMetadata,
        customMetadata: cm,
      });

      const thumbObj = await env.SHARE_R2.get(thumbKeyFor(key));
      if (thumbObj) {
        await env.SHARE_R2.put(thumbKeyFor(newKey), thumbObj.body, {
          httpMetadata: thumbObj.httpMetadata,
        });
      }

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
      if (!cm.createdAt) cm.createdAt = object.uploaded.toISOString();
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

      const trimmed = typeof caption === 'string' ? clampCaption(caption) : '';
      const cm = Object.assign({}, object.customMetadata);
      if (!cm.createdAt) cm.createdAt = object.uploaded.toISOString();
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
      if (!cm.createdAt) cm.createdAt = object.uploaded.toISOString();
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

      const linkTarget = object.customMetadata && object.customMetadata.linkTarget;
      if (linkTarget) {
        return Response.redirect(linkTarget, 302);
      }

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set('cache-control', entry ? 'private, no-store' : 'public, max-age=31536000, immutable');
      headers.set('etag', object.httpEtag);
      return new Response(object.body, { headers });
    }

    return new Response('Not found', { status: 404 });
  },
};
