//author: https://github.com/nhermab
//licence: MIT
//edited by: https://github.com/broodje565
import { getState, getTrialMode, isOnboardingRequired, setOnboardingRequired, setSelection } from '../state/appState.js';
import { renderCoursesScreen } from '../render/courseListView.js';
import { renderChapterScreenContent } from '../render/chapterView.js';
import { renderSettingsView } from '../render/settingsView.js';
import { renderStoreView } from '../render/storeView.js';
import { renderBadgesView } from '../render/badgesView.js';
import { renderProfileView } from '../render/profileView.js';
import { renderOnboardingView } from '../render/onboardingView.js';
import { navigateTo } from '../state/router.js';
import { createTrialInfoBanner, showTrialCompletionModal } from './trialRegistrationModal.js';
import { completeTrialCourse, saveTrialProgress, getTrialSession } from '../services/trialMode.js';
import { showPostLessonFlow } from './postLessonFlow.js';

let globalStatusEl;
let screenRootEl;

export function initLayout({ globalStatusElement, screenRootElement }) {
  globalStatusEl = globalStatusElement;
  screenRootEl = screenRootElement;
}

export function setGlobalStatus(message) {
  if (!globalStatusEl) return;
  if (!message) {
    globalStatusEl.textContent = '';
    globalStatusEl.classList.remove('is-visible');
  } else {
    globalStatusEl.textContent = message;
    globalStatusEl.classList.add('is-visible');
  }
}

export async function handleRouteChange(route) {
  if (isOnboardingRequired() && route.route !== 'onboarding') {
    navigateTo({ route: 'onboarding' });
    return;
  }

  if (route.route === 'chapter') {
    setSelection({
      courseId: route.courseId,
      chapterId: route.chapterId,
      tab: route.tab || 'theory',
    });
  } else if (route.route === 'courses') {
    setSelection({
      courseId: route.courseId || null,
      chapterId: route.chapterId || null,
      tab: route.tab || 'theory',
    });
  } else if (route.route === 'settings') {
    setSelection({ courseId: null, chapterId: null, tab: 'theory' });
  } else if (route.route === 'badges') {
    setSelection({ courseId: null, chapterId: null, tab: 'theory' });
  } else if (route.route === 'store') {
    setSelection({ courseId: null, chapterId: null, tab: 'theory' });
  } else if (route.route === 'profile') {
    setSelection({ courseId: null, chapterId: null, tab: 'theory' });
  } else if (route.route === 'onboarding') {
    setSelection({ courseId: null, chapterId: null, tab: 'theory' });
  } else {
    setSelection({
      courseId: null,
      chapterId: null,
      tab: route.tab || 'theory',
    });
  }

  await renderApp(route);
}

export async function renderApp(route) {
  if (!screenRootEl) return;

  document.body.classList.toggle('onboarding-mode', route.route === 'onboarding');

  const state = getState();
  const { coursesDoc, selectedCourseId, selectedChapterId } = state;

  screenRootEl.innerHTML = '';

  if (route.route === 'settings') {
    renderSettingsView(screenRootEl);
    return;
  }

  if (route.route === 'store') {
    renderStoreView(screenRootEl);
    return;
  }

  if (route.route === 'badges') {
    await renderBadgesView(screenRootEl);
    return;
  }

  if (route.route === 'profile') {
    await renderProfileView(screenRootEl, { username: route.username || null });
    return;
  }

  if (route.route === 'onboarding') {
    await renderOnboardingView(screenRootEl, {
      onComplete: ({ selectedCourseId } = {}) => {
        setOnboardingRequired(false);
        navigateTo({ route: 'courses', courseId: selectedCourseId || null });
      },
    });
    return;
  }

  if (!coursesDoc || !coursesDoc.courses) {
    const loadingScreen = document.createElement('section');
    loadingScreen.className = 'screen';
    const body = document.createElement('div');
    body.className = 'screen-body';
    body.innerHTML = '<p class="muted">Loading courses...</p>';
    loadingScreen.appendChild(body);
    screenRootEl.appendChild(loadingScreen);
    return;
  }

  if (route.route === 'chapter' && selectedCourseId && selectedChapterId) {
    renderChapterScreen(route, state);
  } else if (route.route === 'settings') {
    renderSettingsScreen();
  } else {
    renderCoursesListScreen();
  }
}

function renderSettingsScreen() {
  const screen = document.createElement('section');
  screen.className = 'screen';

  const header = document.createElement('header');
  header.className = 'screen-header';

  const mainHeader = document.createElement('div');
  mainHeader.className = 'screen-header-main screen-header-main--align-right';

  const title = document.createElement('h2');
  title.className = 'screen-header-title';
  title.textContent = 'Settings';

  const subtitle = document.createElement('p');
  subtitle.className = 'screen-header-subtitle';
  subtitle.textContent = 'Manage your account preferences.';

  mainHeader.appendChild(title);
  mainHeader.appendChild(subtitle);
  header.appendChild(mainHeader);

  const body = document.createElement('div');
  body.className = 'screen-body';
  body.innerHTML = `
    <div class="settings-card">
      <h3>Account</h3>
      <p>Profile and account options are coming soon.</p>
      <a class="btn" href="/login.html">Switch account</a>
    </div>
  `;

  screen.appendChild(header);
  screen.appendChild(body);
  screenRootEl.appendChild(screen);
}

function renderCoursesListScreen() {
  const screen = document.createElement('section');
  screen.className = 'screen';

  const header = document.createElement('header');
  header.className = 'screen-header';

  const mainHeader = document.createElement('div');
  mainHeader.className = 'screen-header-main screen-header-main--align-right';

  const title = document.createElement('h2');
  title.className = 'screen-header-title';
  title.textContent = 'Courses';

  const subtitle = document.createElement('p');
  subtitle.className = 'screen-header-subtitle';
  
  const trialMode = getTrialMode();
  if (trialMode.isActive) {
    subtitle.textContent = 'Choose a course to try the first lesson for free.';
  } else {
    subtitle.textContent = 'Pick a course to see its lessons.';
  }

  mainHeader.appendChild(title);
  mainHeader.appendChild(subtitle);
  header.appendChild(mainHeader);

  const body = document.createElement('div');
  body.className = 'screen-body';
  
  if (trialMode.isActive) {
  }

  renderCoursesScreen(body);

  screen.appendChild(header);
  screen.appendChild(body);
  screenRootEl.appendChild(screen);
}

function renderChapterScreen(route, state) {
  const screen = document.createElement('section');
  screen.className = 'screen';

  const header = document.createElement('header');
  header.className = 'screen-header';

  const mainHeader = document.createElement('div');
  mainHeader.className = 'screen-header-main screen-header-main--align-right';

  const title = document.createElement('h2');
  title.className = 'screen-header-title';

  const subtitle = document.createElement('p');
  subtitle.className = 'screen-header-subtitle';

  mainHeader.appendChild(title);
  mainHeader.appendChild(subtitle);

  // Tabs in the middle
  const tabsNav = document.createElement('nav');
  tabsNav.className = 'tabs tabs-in-header';
  tabsNav.setAttribute('aria-label', 'Lesson sections');

  const tabNames = [
    { id: 'theory', label: 'Theory' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'practice', label: 'Practice' },
  ];
  const tabButtons = [];

  tabNames.forEach(({ id, label }) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tab-button';
    btn.dataset.tab = id;
    btn.textContent = label;
    tabsNav.appendChild(btn);
    tabButtons.push(btn);
  });

  const headerContent = document.createElement('div');
  headerContent.className = 'screen-header-content-with-tabs';

  // Layout: tabs (middle) | title (right)
  headerContent.appendChild(tabsNav);
  headerContent.appendChild(mainHeader);

  header.appendChild(headerContent);

  const body = document.createElement('div');
  body.className = 'screen-body';

  const trialMode = getTrialMode();
  if (trialMode.isActive) {
    const course = (state.coursesDoc.courses || []).find((c) => c.id === state.selectedCourseId);
    if (course) {
      createTrialInfoBanner(body, course.title);
    }
  }

  const tabContentEl = document.createElement('div');
  body.appendChild(tabContentEl);

  screen.appendChild(header);
  screen.appendChild(body);

  screenRootEl.appendChild(screen);

  renderChapterScreenContent({
    headerTitleElement: title,
    headerSubtitleElement: subtitle,
    tabButtons,
    tabContentElement: tabContentEl,
    onChapterComplete: () => {
      if (trialMode.isActive) {
        const course = (state.coursesDoc.courses || []).find((c) => c.id === state.selectedCourseId);
        const chapter = (course?.chapters || []).find(ch => {
          const chId = ch.id || ch.chapterId || `chapter_${(course.chapters.indexOf(ch) + 1)}`;
          return String(chId) === String(state.selectedChapterId);
        });
        
        if (course && chapter) {
          const chapterIndex = course.chapters.indexOf(chapter);
          saveTrialProgress({
            courseId: course.id,
            chapterId: state.selectedChapterId,
            chapterIndex,
            chapterTitle: chapter.title,
            courseTitle: course.title,
          });
          
          completeTrialCourse();
          
          showTrialCompletionModal(body, 
            () => {
              window.location.href = '/signup.html?trial=completed&course=' + encodeURIComponent(course.id);
            },
            () => {
              console.log('Trial: User chose to continue exploring');
            }
          );
        }
      }
    },
    onLessonComplete: ({ correct, total, lessonTitle, awardXp }) => {
      if (trialMode.isActive) return; // handled by onChapterComplete
      showPostLessonFlow({
        correctAnswers: correct,
        totalQuestions: total,
        lessonTitle: lessonTitle || 'Lesson',
        awardXp,
        onDone: () => navigateTo({ route: 'courses', courseId: state.selectedCourseId }),
      });
    },
  });
}
