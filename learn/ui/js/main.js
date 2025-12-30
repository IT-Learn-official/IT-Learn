// Entry point for the SPA.

import { fetchCourses } from './services/apiClient.js';
import { setCoursesDoc, setTrialMode } from './state/appState.js';
import { initRouter, navigateTo } from './state/router.js';
import { initLayout, handleRouteChange, setGlobalStatus } from './render/layout.js';
import { debugTeacherBotEnv, debugWebLLMConfig } from './services/teacherBotService.js';
import { showWelcomeMessage } from './mascot.js';
import { checkSession } from './services/authService.js';
import { isTrialModeActive, isTrialCompleted, initializeTrialSession } from './services/trialMode.js';

async function bootstrap() {
  const screenRootElement = document.getElementById('screen-root');
  const globalStatusElement = document.getElementById('global-status');

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
    }
  }
  
  initLayout({ globalStatusElement, screenRootElement });

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
  });

  attachSidebarLinks();

  // If no hash present, ensure we start from courses route.
  if (!window.location.hash) {
    window.location.hash = '#/courses';
  }
}

bootstrap();

function attachSidebarLinks() {
  const settingsLink = document.getElementById('settings-link');
  if (settingsLink) {
    settingsLink.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo({ route: 'settings' });
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
