//author: https://github.com/nhermab
//licence: MIT
//edited by: https://github.com/broodje565
import { getState } from '../state/appState.js';
import { navigateTo } from '../state/router.js';
import { renderChapterView } from './chapterRenderer.js';
import { getCurrentPracticeEditor } from './practice/practiceEditor.js';

export { getCurrentPracticeEditor };

let onChapterCompleteCallback = null;
let onLessonCompleteCallback  = null;

export function setChapterCompleteCallback(callback) {
  onChapterCompleteCallback = callback;
}

export function triggerChapterComplete() {
  if (onChapterCompleteCallback) {
    onChapterCompleteCallback();
  }
}

export function setLessonCompleteCallback(callback) {
  onLessonCompleteCallback = callback;
}

export function triggerLessonComplete(stats) {
  if (onLessonCompleteCallback) {
    onLessonCompleteCallback(stats);
  }
}

export async function renderChapterScreenContent({ headerTitleElement, headerSubtitleElement, tabButtons: providedTabButtons, tabContentElement, onChapterComplete, onLessonComplete }) {
  const headerTitleEl = headerTitleElement;
  const headerSubtitleEl = headerSubtitleElement;
  const tabButtons = providedTabButtons;
  const tabContentEl = tabContentElement;

  if (onChapterComplete)  setChapterCompleteCallback(onChapterComplete);
  if (onLessonComplete)   setLessonCompleteCallback(onLessonComplete);

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const tab = button.dataset.tab || 'theory';
      const state = getState();
      const { selectedCourseId, selectedChapterId } = state;
      if (!selectedCourseId || !selectedChapterId) return;
      navigateTo({ route: 'chapter', courseId: selectedCourseId, chapterId: selectedChapterId, tab });
    });
  });

  await renderChapterView({ headerTitleEl, headerSubtitleEl, tabButtons, tabContentEl });
}
