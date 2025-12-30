//author: https://github.com/nhermab
//licence: MIT
import { getState, setSelection, getTrialMode } from '../state/appState.js';
import { renderCoursesScreen, renderChaptersScreen } from '../render/courseListView.js';
import { renderChapterScreenContent } from '../render/chapterView.js';
import { renderSettingsView } from '../render/settingsView.js';
import { navigateTo } from '../state/router.js';
import { createTrialInfoBanner, showTrialCompletionModal } from './trialRegistrationModal.js';
import { completeTrialCourse, saveTrialProgress, getTrialSession } from '../services/trialMode.js';

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

  const state = getState();
  const { coursesDoc, selectedCourseId, selectedChapterId } = state;

  screenRootEl.innerHTML = '';

  if (route.route === 'settings') {
    renderSettingsView(screenRootEl);
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
  } else if (route.route === 'courses' && selectedCourseId && !selectedChapterId) {
    renderChaptersListScreen(state);
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
    subtitle.textContent = 'Choose a course to try the first chapter for free.';
  } else {
    subtitle.textContent = 'Pick a course to see its chapters.';
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

function renderChaptersListScreen(state) {
  const screen = document.createElement('section');
  screen.className = 'screen';

  const header = document.createElement('header');
  header.className = 'screen-header';

  const backButton = document.createElement('button');
  backButton.type = 'button';
  backButton.className = 'back-button';
  backButton.textContent = 'Back to courses';
  backButton.addEventListener('click', () => {
    navigateTo({ route: 'courses' });
  });

  const mainHeader = document.createElement('div');
  mainHeader.className = 'screen-header-main screen-header-main--align-right';

  const title = document.createElement('h2');
  title.className = 'screen-header-title';
  const course = (state.coursesDoc.courses || []).find((c) => c.id === state.selectedCourseId);
  title.textContent = course ? course.title : 'Chapters';

  const subtitle = document.createElement('p');
  subtitle.className = 'screen-header-subtitle';
  
  const trialMode = getTrialMode();
  if (trialMode.isActive) {
    subtitle.textContent = 'Choose a chapter to complete your free trial';
  } else {
    subtitle.textContent = 'Choose a chapter to start reading or practicing.';
  }

  mainHeader.appendChild(title);
  mainHeader.appendChild(subtitle);

  // Layout: back button on far left, title on far right
  header.appendChild(backButton);
  header.appendChild(mainHeader);

  const body = document.createElement('div');
  body.className = 'screen-body';

  if (trialMode.isActive && course) {
    createTrialInfoBanner(body, course.title);
  }

  const courseForChapters = course || null;
  renderChaptersScreen(body, courseForChapters);

  screen.appendChild(header);
  screen.appendChild(body);
  screenRootEl.appendChild(screen);
}

function renderChapterScreen(route, state) {
  const screen = document.createElement('section');
  screen.className = 'screen';

  const header = document.createElement('header');
  header.className = 'screen-header';

  const backButton = document.createElement('button');
  backButton.type = 'button';
  backButton.className = 'back-button';
  backButton.textContent = 'Back to chapters';
  backButton.addEventListener('click', () => {
    navigateTo({ route: 'courses', courseId: state.selectedCourseId });
  });

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
  tabsNav.setAttribute('aria-label', 'Chapter sections');

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

  // Layout: back button (left) | tabs (middle) | title (right)
  headerContent.appendChild(backButton);
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
  });
}
