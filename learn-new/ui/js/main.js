// Entry point for the SPA.

import { fetchCourses } from './services/apiClient.js';
import { setCoursesDoc } from './state/appState.js';
import { initRouter } from './state/router.js';
import { initLayout, handleRouteChange, setGlobalStatus } from './render/layout.js';
import { debugTeacherBotEnv, debugWebLLMConfig } from './services/teacherBotService.js';

async function bootstrap() {
  const screenRootElement = document.getElementById('screen-root');
  const globalStatusElement = document.getElementById('global-status');

  initLayout({ globalStatusElement, screenRootElement });

  setGlobalStatus('Loading courses...');

  try {
    const coursesDoc = await fetchCourses();
    setCoursesDoc(coursesDoc);
    setGlobalStatus('');
  } catch (error) {
    console.error('Failed to load courses', error);
    setGlobalStatus('Failed to load courses. Please refresh the page.');
  }

  initRouter(async (route) => {
    await handleRouteChange(route);
  });

  // If no hash present, ensure we start from courses route.
  if (!window.location.hash) {
    window.location.hash = '#/courses';
  }
}

bootstrap();

// Expose debug helper for manual inspection in browser console.
if (typeof window !== 'undefined') {
  // eslint-disable-next-line no-console
  console.info('[TeacherBot] debugTeacherBotEnv is available on window.debugTeacherBotEnv');
  window.debugTeacherBotEnv = debugTeacherBotEnv;
  window.debugWebLLMConfig = debugWebLLMConfig;
}
