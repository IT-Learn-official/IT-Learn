// Entry point for the SPA.

import { fetchCourses } from './services/apiClient.js';
import { setCoursesDoc, setTrialMode, setOnboardingRequired } from './state/appState.js';
import { initRouter, navigateTo } from './state/router.js';
import { initLayout, handleRouteChange, setGlobalStatus } from './render/layout.js';
import { debugTeacherBotEnv, debugWebLLMConfig } from './services/teacherBotService.js';
import { showWelcomeMessage } from './mascot.js';
import { checkSession, getMyProfile } from './services/authService.js';
import { isTrialModeActive, isTrialCompleted, initializeTrialSession } from './services/trialMode.js';
import { syncGamificationWithProfileProgress, updateSidebarStats } from './state/gamificationState.js';

function requiresProfileOnboarding(profile) {
  const username = String(profile?.username || '').trim().toLowerCase();
  const validUsername = /^[a-z0-9_]{3,24}$/.test(username);
  return !validUsername;
}

function hasForcedOnboardingFlag() {
  return localStorage.getItem('itlearn_force_onboarding') === '1';
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
        setOnboardingRequired(hasForcedOnboardingFlag() || requiresProfileOnboarding(profileResult.profile));
      }
    }
  }
  
  initLayout({ globalStatusElement, screenRootElement });

  await syncGamificationWithProfileProgress(bootProfile);

  // Populate sidebar gamification stats from localStorage
  updateSidebarStats();

  setGlobalStatus('Loading courses...');

  try {
    const coursesDoc = await fetchCourses();
    setCoursesDoc(coursesDoc);
    setGlobalStatus('');
    
    showWelcomeMessage();
  } catch (error) {
    console.error('Failed to load courses', error);
    setGlobalStatus('Failed to load courses. Please refresh the page.');
  }

  initRouter(async (route) => {
    await handleRouteChange(route);
    updateSidebarActive(route);
  });

  attachSidebarLinks();

  // If no hash present, ensure we start from courses route.
  if (!window.location.hash) {
    window.location.hash = '#/courses';
  }
}

bootstrap();

function updateSidebarActive(route) {
  const dashboardLink = document.getElementById('dashboard-link');
  const storeLink = document.getElementById('store-link');
  const profileLink = document.getElementById('profile-link');
  const badgesLink = document.getElementById('badges-link');
  const settingsLink = document.getElementById('settings-link');
  const sidebarLinks = [dashboardLink, storeLink, profileLink, badgesLink, settingsLink].filter(Boolean);

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
      activeLink = settingsLink;
      break;
    default:
      activeLink = null;
  }

  sidebarLinks.forEach((link) => {
    link.classList.toggle('is-active', link === activeLink);
  });
}

function attachSidebarLinks() {
  const profileLink = document.getElementById('profile-link');
  const settingsLink = document.getElementById('settings-link');
  const badgesLink = document.getElementById('badges-link');
  const storeLink = document.getElementById('store-link');

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

// Expose debug helper for manual inspection in browser console.
if (typeof window !== 'undefined') {
  // eslint-disable-next-line no-console
  console.info('[TeacherBot] debugTeacherBotEnv is available on window.debugTeacherBotEnv');
  window.debugTeacherBotEnv = debugTeacherBotEnv;
  window.debugWebLLMConfig = debugWebLLMConfig;
}
