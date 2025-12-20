//author: https://github.com/nhermab
//licence: MIT
import { getState } from '../state/appState.js';
import { navigateTo } from '../state/router.js';
import { renderChapterView } from './chapterRenderer.js';
import { getCurrentPracticeEditor } from './practice/practiceEditor.js';

export { getCurrentPracticeEditor };

export async function renderChapterScreenContent({ headerTitleElement, headerSubtitleElement, tabButtons: providedTabButtons, tabContentElement }) {
  const headerTitleEl = headerTitleElement;
  const headerSubtitleEl = headerSubtitleElement;
  const tabButtons = providedTabButtons;
  const tabContentEl = tabContentElement;

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
