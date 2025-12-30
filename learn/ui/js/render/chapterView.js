//author: https://github.com/nhermab
//licence: MIT
import { getState } from '../state/appState.js';
import { navigateTo } from '../state/router.js';
import { renderChapterView } from './chapterRenderer.js';
import { getCurrentPracticeEditor } from './practice/practiceEditor.js';

export { getCurrentPracticeEditor };

let onChapterCompleteCallback = null;

export function setChapterCompleteCallback(callback) {
  onChapterCompleteCallback = callback;
}

export function triggerChapterComplete() {
  if (onChapterCompleteCallback) {
    onChapterCompleteCallback();
  }
}

export async function renderChapterScreenContent({ headerTitleElement, headerSubtitleElement, tabButtons: providedTabButtons, tabContentElement, onChapterComplete }) {
  const headerTitleEl = headerTitleElement;
  const headerSubtitleEl = headerSubtitleElement;
  const tabButtons = providedTabButtons;
  const tabContentEl = tabContentElement;

  if (onChapterComplete) {
    setChapterCompleteCallback(onChapterComplete);
  }

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
