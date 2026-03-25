// Entry point for the SPA.

import { setTrialMode, setOnboardingRequired, setCourseLanguage } from './state/appState.js';
import { initRouter, navigateTo, parseLocation } from './state/router.js';
import { initLayout, handleRouteChange, setGlobalStatus } from './render/layout.js';
import { debugTeacherBotEnv, debugWebLLMConfig } from './services/teacherBotService.js';
import { showWelcomeMessage } from './mascot.js';
import { checkSession, getMyProfile, getNotifications } from './services/authService.js';
import { isTrialModeActive, isTrialCompleted, initializeTrialSession } from './services/trialMode.js';
import { syncGamificationWithProfileProgress, updateSidebarStats } from './state/gamificationState.js';
import { getStoredCourseLanguage } from './services/courseLanguageService.js';
import { loadCoursesDoc } from './services/coursesService.js';

const NOTIFICATIONS_BADGE_CACHE_TTL_MS = 15000;
let notificationsBadgeCache = {
  unreadCount: null,
  expiresAt: 0,
  pendingPromise: null,
};

function requiresProfileOnboarding(profile) {
  const username = String(profile?.username || '').trim().toLowerCase();
  const validUsername = /^[a-z0-9_]{3,24}$/.test(username);
  return !validUsername;
}

async function bootstrap() {
  const screenRootElement = document.getElementById('screen-root');
  const globalStatusElement = document.getElementById('global-status');
  let bootProfile = null;

  // Check if user is logged in
  const sessionData = await checkSession();
  
  const urlParams = new URLSearchParams(window.location.search);
  const startTrial = urlParams.get('trial') === 'start';
  
  if (!sessionData.logged_in && startTrial) {
    initializeTrialSession();
    setTrialMode(true, null, false);
  } else {
    const trialActive = isTrialModeActive();
    const trialCompleted = isTrialCompleted();
    
    if (trialCompleted && !sessionData.logged_in) {
      window.location.href = '/signup.html?trial=completed';
      return;
    }
    
    if (!sessionData.logged_in && !trialActive) {
      window.location.href = '/login.html';
      return;
    } else if (!sessionData.logged_in && trialActive) {
      setTrialMode(true);
    } else if (sessionData.logged_in) {
      setTrialMode(false);
      window.currentUserId = sessionData.user_id;

      const profileResult = await getMyProfile();
      if (!profileResult.success) {
        setOnboardingRequired(true);
      } else {
        bootProfile = profileResult.profile;
        const profileNeedsOnboarding = requiresProfileOnboarding(profileResult.profile);
        setOnboardingRequired(profileNeedsOnboarding);
      }
    }
  }
  
  initLayout({ globalStatusElement, screenRootElement });

  const gamificationSync = await syncGamificationWithProfileProgress(bootProfile);
  if (gamificationSync && typeof gamificationSync === 'object') {
    console.info('Gamification sync source:', gamificationSync.source, {
      chosenTimestamp: gamificationSync.timestamp,
      remoteTimestamp: gamificationSync.remoteTimestamp,
      localTimestamp: gamificationSync.localTimestamp,
    });
  }

  // Populate sidebar gamification stats from synced state
  updateSidebarStats();

  // Initialize course language (defaults to English if not set yet)
  const storedLanguage = getStoredCourseLanguage();
  setCourseLanguage(storedLanguage || 'en');

  setGlobalStatus('Loading courses...');
  try {
    await loadCoursesDoc();
    setGlobalStatus('');
    showWelcomeMessage();
  } catch (error) {
    console.error('Failed to load courses', error);
    setGlobalStatus('Failed to load courses. Please refresh the page.');
  }

  initRouter(async (route) => {
    await handleRouteChange(route);
    updateSidebarActive(route);
    if (route.route === 'settings' || route.route === 'profile' || route.route === 'courses' || route.route === 'chapter') {
      void refreshNotificationsBadgeCached();
    }
  });

  // Allow internal refreshes after changing language without touching the URL.
  window.addEventListener('app:rerender', async () => {
    const route = parseLocation(window.location.hash || '#/courses');
    await handleRouteChange(route);
    updateSidebarActive(route);
  });

  attachSidebarLinks();
  void refreshNotificationsBadgeCached();

  // If no hash present, ensure we start from courses route.
  if (!window.location.hash) {
    window.location.hash = '#/courses';
  }
}

bootstrap();

function updateSidebarActive(route) {
  const dashboardLink = document.getElementById('dashboard-link');
  const storeLink = document.getElementById('store-link');
  const notificationsLink = document.getElementById('notifications-link');
  const profileLink = document.getElementById('profile-link');
  const badgesLink = document.getElementById('badges-link');
  const settingsLink = document.getElementById('settings-link');
  const sidebarLinks = [dashboardLink, storeLink, notificationsLink, profileLink, badgesLink, settingsLink].filter(Boolean);

  let activeLink = null;
  switch (route.route) {
    case 'courses':
    case 'chapter':
      activeLink = dashboardLink;
      break;
    case 'store':
      activeLink = storeLink;
      break;
    case 'profile':
      activeLink = profileLink;
      break;
    case 'badges':
      activeLink = badgesLink;
      break;
    case 'settings':
      activeLink = route.tab === 'notifications' ? notificationsLink : settingsLink;
      break;
    default:
      activeLink = null;
  }

  sidebarLinks.forEach((link) => {
    link.classList.toggle('is-active', link === activeLink);
  });
}

function attachSidebarLinks() {
  const notificationsLink = document.getElementById('notifications-link');
  const profileLink = document.getElementById('profile-link');
  const settingsLink = document.getElementById('settings-link');
  const badgesLink = document.getElementById('badges-link');
  const storeLink = document.getElementById('store-link');

  if (notificationsLink) {
    notificationsLink.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo({ route: 'settings', tab: 'notifications' });
    });
  }

  if (profileLink) {
    profileLink.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo({ route: 'profile' });
    });
  }

  if (badgesLink) {
    badgesLink.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo({ route: 'badges' });
    });
  }

  if (settingsLink) {
    settingsLink.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo({ route: 'settings' });
    });
  }

  if (storeLink) {
    storeLink.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo({ route: 'store' });
    });
  }
}

async function refreshNotificationsBadge() {
  const badge = document.getElementById('notifications-badge');
  if (!badge) return;

  const result = await getNotifications({ limit: 1, unreadOnly: false });
  if (!result.success) {
    badge.hidden = true;
    badge.textContent = '0';
    return;
  }

  const unread = Math.max(0, Number(result.unreadCount || 0));
  if (unread <= 0) {
    badge.hidden = true;
    badge.textContent = '0';
    return;
  }

  badge.hidden = false;
  badge.textContent = unread > 99 ? '99+' : String(unread);
}

function applyNotificationsBadgeCount(unreadCount) {
  const badge = document.getElementById('notifications-badge');
  if (!badge) return;

  const unread = Math.max(0, Number(unreadCount || 0));
  if (unread <= 0) {
    badge.hidden = true;
    badge.textContent = '0';
    return;
  }

  badge.hidden = false;
  badge.textContent = unread > 99 ? '99+' : String(unread);
}

async function refreshNotificationsBadgeCached({ force = false } = {}) {
  const now = Date.now();
  if (!force && notificationsBadgeCache.unreadCount !== null && now < notificationsBadgeCache.expiresAt) {
    applyNotificationsBadgeCount(notificationsBadgeCache.unreadCount);
    return;
  }

  if (notificationsBadgeCache.pendingPromise) {
    await notificationsBadgeCache.pendingPromise;
    return;
  }

  notificationsBadgeCache.pendingPromise = (async () => {
    const result = await getNotifications({ limit: 1, unreadOnly: false });
    const unread = result.success ? Math.max(0, Number(result.unreadCount || 0)) : 0;
    notificationsBadgeCache.unreadCount = unread;
    notificationsBadgeCache.expiresAt = Date.now() + NOTIFICATIONS_BADGE_CACHE_TTL_MS;
    applyNotificationsBadgeCount(unread);
  })();

  try {
    await notificationsBadgeCache.pendingPromise;
  } finally {
    notificationsBadgeCache.pendingPromise = null;
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('notifications:unread-count', (event) => {
    const badge = document.getElementById('notifications-badge');
    if (!badge) return;

    const unread = Math.max(0, Number(event?.detail?.unreadCount || 0));
    notificationsBadgeCache.unreadCount = unread;
    notificationsBadgeCache.expiresAt = Date.now() + NOTIFICATIONS_BADGE_CACHE_TTL_MS;
    badge.hidden = unread <= 0;
    badge.textContent = unread > 99 ? '99+' : String(unread || 0);
  });
}

// Expose debug helper for manual inspection in browser console.
if (typeof window !== 'undefined') {
  // eslint-disable-next-line no-console
  console.info('[TeacherBot] debugTeacherBotEnv is available on window.debugTeacherBotEnv');
  window.debugTeacherBotEnv = debugTeacherBotEnv;
  window.debugWebLLMConfig = debugWebLLMConfig;
}
