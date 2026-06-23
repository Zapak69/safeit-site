const THEMES = {
  blue:   { accent: '#0A84FF', accent2: '#2563eb', glow: 'rgba(10,132,255,0.4)',  bg: 'rgba(10,132,255,0.12)',  bd: 'rgba(10,132,255,0.25)',  dim: 'rgba(10,132,255,0.18)',  shadow: 'rgba(10,132,255,0.35)',  shadowH: 'rgba(10,132,255,0.55)',  onAccent: 'white',  mesh1: 'rgba(99,102,241,0.18)', mesh2: 'rgba(10,132,255,0.13)', mesh3: 'rgba(139,92,246,0.07)', gradMid: '#5e9fff',  bgBase: 'rgb(5,5,15)',  bgPanel: 'rgba(5,5,15,0.72)' },
  red:    { accent: '#FF453A', accent2: '#dc2626', glow: 'rgba(255,69,58,0.4)',   bg: 'rgba(255,69,58,0.12)',   bd: 'rgba(255,69,58,0.25)',   dim: 'rgba(255,69,58,0.18)',   shadow: 'rgba(255,69,58,0.35)',   shadowH: 'rgba(255,69,58,0.55)',   onAccent: 'white',  mesh1: 'rgba(220,38,38,0.18)',  mesh2: 'rgba(255,69,58,0.13)',  mesh3: 'rgba(239,68,68,0.07)',  gradMid: '#ff8a87',  bgBase: 'rgb(15,4,4)',  bgPanel: 'rgba(15,4,4,0.72)' },
  green:  { accent: '#30D158', accent2: '#16a34a', glow: 'rgba(48,209,88,0.4)',   bg: 'rgba(48,209,88,0.12)',   bd: 'rgba(48,209,88,0.25)',   dim: 'rgba(48,209,88,0.18)',   shadow: 'rgba(48,209,88,0.35)',   shadowH: 'rgba(48,209,88,0.55)',   onAccent: 'white',  mesh1: 'rgba(34,197,94,0.18)',  mesh2: 'rgba(48,209,88,0.13)',  mesh3: 'rgba(16,185,129,0.07)', gradMid: '#6afa8b',  bgBase: 'rgb(4,15,6)',  bgPanel: 'rgba(4,15,6,0.72)' },
  yellow: { accent: '#FFD60A', accent2: '#ca8a04', glow: 'rgba(255,214,10,0.4)',  bg: 'rgba(255,214,10,0.12)',  bd: 'rgba(255,214,10,0.25)',  dim: 'rgba(255,214,10,0.18)',  shadow: 'rgba(255,214,10,0.35)',  shadowH: 'rgba(255,214,10,0.55)',  onAccent: '#1a1000', mesh1: 'rgba(234,179,8,0.18)',  mesh2: 'rgba(255,214,10,0.13)', mesh3: 'rgba(202,138,4,0.07)',  gradMid: '#ffe566',  bgBase: 'rgb(15,12,3)', bgPanel: 'rgba(15,12,3,0.72)' },
  orange: { accent: '#FF9F0A', accent2: '#ea580c', glow: 'rgba(255,159,10,0.4)',  bg: 'rgba(255,159,10,0.12)',  bd: 'rgba(255,159,10,0.25)',  dim: 'rgba(255,159,10,0.18)',  shadow: 'rgba(255,159,10,0.35)',  shadowH: 'rgba(255,159,10,0.55)',  onAccent: 'white',  mesh1: 'rgba(249,115,22,0.18)', mesh2: 'rgba(255,159,10,0.13)', mesh3: 'rgba(234,88,12,0.07)',  gradMid: '#ffbf5e',  bgBase: 'rgb(15,8,3)',  bgPanel: 'rgba(15,8,3,0.72)' },
  white:  { accent: '#D8D8E8', accent2: '#9090A8', glow: 'rgba(216,216,232,0.35)', bg: 'rgba(216,216,232,0.10)', bd: 'rgba(216,216,232,0.22)', dim: 'rgba(216,216,232,0.16)', shadow: 'rgba(216,216,232,0.25)', shadowH: 'rgba(216,216,232,0.45)', onAccent: '#12121E', mesh1: 'rgba(200,200,230,0.12)', mesh2: 'rgba(216,216,232,0.09)', mesh3: 'rgba(180,180,210,0.06)', gradMid: '#e8e8f8', bgBase: 'rgb(0,0,0)', bgPanel: 'rgba(0,0,0,0.75)' },
};

function applyTheme(name) {
  const t = THEMES[name] || THEMES.blue;
  const s = document.documentElement.style;
  s.setProperty('--accent', t.accent);
  s.setProperty('--accent-2', t.accent2);
  s.setProperty('--accent-glow', t.glow);
  s.setProperty('--accent-bg', t.bg);
  s.setProperty('--accent-bd', t.bd);
  s.setProperty('--accent-dim', t.dim);
  s.setProperty('--accent-shadow', t.shadow);
  s.setProperty('--accent-shadow-h', t.shadowH);
  s.setProperty('--on-accent', t.onAccent);
  s.setProperty('--mesh-1', t.mesh1);
  s.setProperty('--mesh-2', t.mesh2);
  s.setProperty('--mesh-3', t.mesh3);
  s.setProperty('--grad-mid', t.gradMid);
  s.setProperty('--bg-base', t.bgBase);
  s.setProperty('--bg-panel', t.bgPanel);

  document.querySelectorAll('.swatch').forEach(sw => sw.classList.toggle('active', sw.dataset.theme === name));
  localStorage.setItem('safeit-theme', name);
}

document.getElementById('themePicker')?.addEventListener('click', e => {
  const btn = e.target.closest('.swatch');
  if (btn) applyTheme(btn.dataset.theme);
});

applyTheme(localStorage.getItem('safeit-theme') || 'blue');

const nav = document.getElementById('nav');
function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 8); }
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
  io.observe(el);
});

const glow = document.getElementById('cursorGlow');
let glowShown = false;
document.addEventListener('mousemove', e => {
  glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  if (!glowShown) { glow.classList.add('show'); glowShown = true; }
});
document.addEventListener('mouseleave', () => glow.classList.remove('show'));

const heroVisual = document.getElementById('heroVisual');
const mockWindow = heroVisual?.querySelector('.mock-window');
heroVisual?.addEventListener('mousemove', e => {
  const r = heroVisual.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - 0.5;
  const py = (e.clientY - r.top) / r.height - 0.5;
  mockWindow.style.transform = `rotateY(${-8 + px * 14}deg) rotateX(${4 - py * 12}deg)`;
});
heroVisual?.addEventListener('mouseleave', () => { mockWindow.style.transform = ''; });

document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    item.parentElement.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

const PAYHIP_BUY_LINK = 'https://payhip.com/buy?s=1&cart_links%5B%5D=2VYNC&qty%5B2VYNC%5D=1';

document.getElementById('buyProBtn')?.addEventListener('click', () => {
  window.open(PAYHIP_BUY_LINK, '_blank', 'noopener');
});

function openModal(overlay) {
  overlay.classList.add('open');
  document.body.classList.add('modal-open');
}
function closeModal(overlay) {
  overlay.classList.remove('open');
  document.body.classList.remove('modal-open');
}
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(overlay); });
  overlay.querySelector('.modal-close')?.addEventListener('click', () => closeModal(overlay));
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.open').forEach(closeModal);
});

const GITHUB_REPO    = 'Zapak69/safeit-site';
const RELEASE_TAG    = 'SafeIt';
const RELEASE_BASE   = `https://github.com/${GITHUB_REPO}/releases/download/${RELEASE_TAG}`;
const DOWNLOAD_LINKS = {
  windows:   `${RELEASE_BASE}/SafeIt.Setup.exe`,
  'mac-arm': `${RELEASE_BASE}/SafeIt-arm64.dmg`,
  'mac-intel': `${RELEASE_BASE}/SafeIt.dmg`,
};
document.querySelectorAll('#downloadModalOverlay .os-choice').forEach(a => { a.href = DOWNLOAD_LINKS[a.dataset.os]; });

const downloadModalOverlay = document.getElementById('downloadModalOverlay');
const downloadChooseView   = document.getElementById('downloadChooseView');
const downloadMacView      = document.getElementById('downloadMacView');

function resetDownloadModal() {
  downloadChooseView.style.display = 'block';
  downloadMacView.style.display = 'none';
}
document.querySelectorAll('.js-download').forEach(btn => {
  btn.addEventListener('click', () => { resetDownloadModal(); openModal(downloadModalOverlay); });
});
document.getElementById('macChoiceBtn')?.addEventListener('click', () => {
  downloadChooseView.style.display = 'none';
  downloadMacView.style.display = 'block';
});
document.getElementById('macBackBtn')?.addEventListener('click', resetDownloadModal);

const EXTENSION_LINKS = {
  chrome:  `${RELEASE_BASE}/safeit-chrome.zip`,
  firefox: `${RELEASE_BASE}/safeit-firefox.xpi`,
};
document.querySelectorAll('#extensionModalOverlay .os-choice').forEach(a => { a.href = EXTENSION_LINKS[a.dataset.browser]; });

const extensionModalOverlay = document.getElementById('extensionModalOverlay');
document.querySelectorAll('.js-install-extension').forEach(btn => {
  btn.addEventListener('click', () => openModal(extensionModalOverlay));
});

const LICENSE_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzc8_Rt7GM_O-ryYgso-Ud3-9Qy-2upiSA4M4_FoTqjlGlMXYf3Bv4euOsP2N79MY8MGQ/exec';

const licenseModalOverlay = document.getElementById('licenseModalOverlay');
const licenseLoginView    = document.getElementById('licenseLoginView');
const licenseDevicesView  = document.getElementById('licenseDevicesView');
const licenseLoginInput   = document.getElementById('licenseLoginInput');
const licenseLoginErr     = document.getElementById('licenseLoginErr');
const licenseLoginBtn     = document.getElementById('licenseLoginBtn');
const deviceErrEl         = document.getElementById('deviceErr');
const deviceCountEl       = document.getElementById('deviceCount');
const deviceListEl        = document.getElementById('deviceList');

let currentLicenseKey = null;

function openLicenseModal() {
  resetLicenseModal();
  openModal(licenseModalOverlay);
  setTimeout(() => licenseLoginInput?.focus(), 150);
}
function resetLicenseModal() {
  currentLicenseKey = null;
  licenseLoginView.style.display = 'block';
  licenseDevicesView.style.display = 'none';
  licenseLoginInput.value = '';
  licenseLoginErr.textContent = '';
  deviceErrEl.textContent = '';
}
document.querySelectorAll('.js-manage-devices').forEach(btn => btn.addEventListener('click', openLicenseModal));
document.getElementById('licenseLogoutBtn')?.addEventListener('click', resetLicenseModal);

licenseLoginInput?.addEventListener('input', e => {
  const v = e.target.value.toUpperCase().replace(/[^0-9A-Z]/g, '').slice(0, 20);
  e.target.value = v.match(/.{1,5}/g)?.join('-') ?? v;
});
licenseLoginInput?.addEventListener('keydown', e => { if (e.key === 'Enter') licenseLoginBtn.click(); });

async function fetchLicenseJson(action, key, extra = {}) {
  const params = new URLSearchParams({ action, key, ...extra });
  const res = await fetch(`${LICENSE_ENDPOINT}?${params.toString()}`);
  return res.json();
}

licenseLoginBtn?.addEventListener('click', async () => {
  const key = licenseLoginInput.value.trim();
  licenseLoginErr.textContent = '';
  if (!key) { licenseLoginErr.textContent = 'Enter your license key.'; return; }

  licenseLoginBtn.disabled = true;
  licenseLoginBtn.textContent = 'Checking…';
  let result = null;
  try { result = await fetchLicenseJson('devices', key); } catch {}
  licenseLoginBtn.disabled = false;
  licenseLoginBtn.textContent = 'Log in';

  if (!result) {
    licenseLoginErr.textContent = "Couldn't reach the license server. Try again in a moment.";
    return;
  }
  if (!result.valid) {
    licenseLoginErr.textContent = 'That license key is not valid or not active.';
    return;
  }

  currentLicenseKey = key;
  renderDevices(result.devices || [], result.limit || 2);
  licenseLoginView.style.display = 'none';
  licenseDevicesView.style.display = 'block';
});

function renderDevices(devices, limit) {
  deviceCountEl.textContent = `${devices.length} / ${limit}`;
  deviceErrEl.textContent = '';
  deviceListEl.innerHTML = '';

  if (!devices.length) {
    deviceListEl.innerHTML = '<li class="device-empty">No devices activated yet.</li>';
    return;
  }

  devices.forEach(d => {
    const li = document.createElement('li');
    li.className = 'device-item';

    const info = document.createElement('div');
    info.className = 'device-info';
    const label = document.createElement('strong');
    label.textContent = d.label || 'Unknown device';
    const date = document.createElement('span');
    date.textContent = d.activatedAt ? `Activated ${new Date(d.activatedAt).toLocaleDateString()}` : 'Activated recently';
    info.append(label, date);

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'btn btn-ghost btn-sm device-remove';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => removeDevice(d.id, removeBtn));

    li.append(info, removeBtn);
    deviceListEl.appendChild(li);
  });
}

async function removeDevice(deviceId, btn) {
  deviceErrEl.textContent = '';
  btn.disabled = true;
  btn.textContent = 'Removing…';

  let result = null;
  try { result = await fetchLicenseJson('release', currentLicenseKey, { device: deviceId }); } catch {}

  if (!result?.ok) {
    btn.disabled = false;
    btn.textContent = 'Remove';
    deviceErrEl.textContent = "Couldn't remove that device. Try again.";
    return;
  }

  let refreshed = null;
  try { refreshed = await fetchLicenseJson('devices', currentLicenseKey); } catch {}
  if (refreshed?.valid) renderDevices(refreshed.devices || [], refreshed.limit || 2);
}
