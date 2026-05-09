(function () {
  const API_BASE = 'https://itlearn.pythonanywhere.com/api';
  const MAINTENANCE_DISCORD_URL = 'https://discord.gg/rKgF9s32EV';
  const OVERLAY_ID = 'site-maintenance-overlay';
  const STYLE_ID = 'site-maintenance-style';
  const LOCAL_FLAG_KEY = 'site_maintenance_enabled';

  document.documentElement.setAttribute('data-maintenance-checking', '1');

  function isAdminPanelPage() {
    const path = (window.location.pathname || '').split('?')[0].split('#')[0];
    const adminPaths = ['/admin-panel.html', '/admin-panel'];
    const authPaths = ['/login', '/login.html', '/signup', '/signup.html', '/oauth-callback', '/oauth-callback.html'];

    // Allow admin panel and authentication pages to bypass the maintenance overlay
    const matches = p => p === path || path.endsWith(p);

    if (adminPaths.some(matches)) return true;
    if (authPaths.some(matches)) return true;
    return false;
  }

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      html[data-maintenance-checking="1"] body {
        visibility: hidden !important;
      }

      #${OVERLAY_ID} {
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        display: grid;
        place-items: center;
        padding: 24px;
        background: var(--overlay-bg, linear-gradient(180deg, rgba(4,10,22,0.96), rgba(8,16,32,0.98)));
        color: var(--color-text, #ecf2ff);
        backdrop-filter: blur(12px);
      }

      #${OVERLAY_ID} .maintenance-card {
        width: min(720px, 100%);
        border: 1px solid var(--border-color, rgba(255,255,255,0.16));
        border-radius: 24px;
        background: linear-gradient(180deg, var(--dialog-card-bg-start, rgba(13,23,49,0.94)), var(--dialog-card-bg-end, rgba(13,23,49,0.94)));
        box-shadow: var(--shadow-elevated, 0 24px 80px rgba(0, 0, 0, 0.45));
        padding: clamp(24px, 4vw, 40px);
        display: grid;
        gap: 18px;
        text-align: left;
      }

      #${OVERLAY_ID} h1 {
        margin: 0;
        font-size: clamp(2rem, 5vw, 3.4rem);
        line-height: 1;
        color: var(--color-text, #ecf2ff);
      }

      #${OVERLAY_ID} p {
        margin: 0;
        color: var(--color-text-soft, #b9c7e6);
        font-size: 1rem;
        line-height: 1.6;
      }

      #${OVERLAY_ID} .maintenance-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      #${OVERLAY_ID} .maintenance-link,
      #${OVERLAY_ID} .maintenance-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        min-height: 46px;
        padding: 0 18px;
        border-radius: 999px;
        text-decoration: none;
        font-weight: 700;
        transition: transform 120ms ease, opacity 120ms ease;
      }

      #${OVERLAY_ID} .maintenance-link:hover,
      #${OVERLAY_ID} .maintenance-button:hover {
        transform: translateY(-1px);
      }

      #${OVERLAY_ID} .maintenance-link {
        background: var(--button-primary-bg, linear-gradient(140deg, #155e75, #164e63));
        color: var(--color-text, #ecf2ff);
        border: 1px solid var(--button-primary-border, rgba(34, 211, 238, 0.35));
      }

      #${OVERLAY_ID} .maintenance-button {
        background: rgba(255, 255, 255, 0.06);
        color: var(--color-text, #ecf2ff);
        border: 1px solid var(--border-color, rgba(255,255,255,0.14));
      }

      #${OVERLAY_ID} .maintenance-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        color: var(--color-text-muted, #93a3c7);
        font-size: 0.9rem;
      }

      #${OVERLAY_ID} .maintenance-chip {
        border: 1px solid var(--border-color, rgba(255,255,255,0.12));
        border-radius: 999px;
        padding: 6px 10px;
        background: rgba(255, 255, 255, 0.04);
      }
    `;
    document.head.appendChild(style);
  }

  function renderOverlay(config) {
    if (document.getElementById(OVERLAY_ID)) return;

    injectStyles();

    const overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;

    const card = document.createElement('div');
    card.className = 'maintenance-card';

    const title = document.createElement('h1');
    title.textContent = 'Website under maintenance';

    const description = document.createElement('p');
    description.textContent = config.maintenance_message || 'The website is currently under maintenance and temporarily unavailable.';

    const extra = document.createElement('p');
    extra.textContent = 'The site is not working right now. Please check our Discord server for updates and announcements.';

    const meta = document.createElement('div');
    meta.className = 'maintenance-meta';
    const chip = document.createElement('span');
    chip.className = 'maintenance-chip';
    chip.textContent = 'Maintenance mode is enabled';
    meta.appendChild(chip);

    const actions = document.createElement('div');
    actions.className = 'maintenance-actions';

    const discordLink = document.createElement('a');
    discordLink.className = 'maintenance-link';
    discordLink.href = MAINTENANCE_DISCORD_URL;
    discordLink.target = '_blank';
    discordLink.rel = 'noopener noreferrer';
    discordLink.textContent = 'Open Discord server';

    const staffButton = document.createElement('button');
    staffButton.type = 'button';
    staffButton.className = 'maintenance-button';
    staffButton.textContent = 'Staff sign-in';
    staffButton.title = 'Sign in as staff (redirects to login)';
    staffButton.addEventListener('click', () => {
      try {
        localStorage.setItem('staff_login', '1');
      } catch (e) {}
      // redirect to login page; include origin-aware path
      window.location.href = '/login.html';
    });

    const refreshButton = document.createElement('button');
    refreshButton.type = 'button';
    refreshButton.className = 'maintenance-button';
    refreshButton.textContent = 'Check again';
    refreshButton.addEventListener('click', () => window.location.reload());

    actions.appendChild(discordLink);
    actions.appendChild(staffButton);
    actions.appendChild(refreshButton);

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(extra);
    card.appendChild(meta);
    card.appendChild(actions);
    overlay.appendChild(card);

    document.body.appendChild(overlay);
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.documentElement.removeAttribute('data-maintenance-checking');
    document.body.style.visibility = 'visible';
  }

  function clearLocalMaintenanceFlag() {
    try {
      localStorage.removeItem(LOCAL_FLAG_KEY);
    } catch (error) {
      return;
    }
  }

  function readLocalMaintenanceFlag() {
    try {
      return localStorage.getItem(LOCAL_FLAG_KEY) === 'true';
    } catch (error) {
      return false;
    }
  }

  async function isAdminSession() {
    try {
      const response = await fetch(`${API_BASE}/session`, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
      });
      const data = await response.json();
      return Boolean(data.logged_in && data.is_bio_admin);
    } catch (error) {
      return false;
    }
  }

  async function init() {
    if (isAdminPanelPage()) return;

    try {
      const localFlag = readLocalMaintenanceFlag();
      const response = await fetch(`${API_BASE}/site/status`, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
      });
      const data = await response.json();

      const maintenanceEnabled = Boolean(response.ok && data.maintenance_enabled) || localFlag;

      if (!maintenanceEnabled) {
        document.documentElement.removeAttribute('data-maintenance-checking');
        document.body.style.visibility = 'visible';
        return;
      }

      if (await isAdminSession()) {
        document.documentElement.removeAttribute('data-maintenance-checking');
        document.body.style.visibility = 'visible';
        return;
      }

      renderOverlay({
        maintenance_message: data.maintenance_message,
      });
    } catch (error) {
      document.documentElement.removeAttribute('data-maintenance-checking');
      document.body.style.visibility = 'visible';
      return;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    void init();
  }
})();