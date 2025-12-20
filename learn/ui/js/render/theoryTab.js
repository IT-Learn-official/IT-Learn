//author: https://github.com/nhermab
//licence: MIT
import { renderMarkdownToHtml } from '../utils/markdown.js';
import { upgradeMarkdownCodeBlocks } from '../utils/markdownAceEnhancer.js';
import { fetchChapterTheory } from '../services/apiClient.js';
import { getChapterContent, setChapterContent } from '../state/appState.js';
import { loadTaskState, updateTaskState } from '../state/taskState.js';

/**
 * Render theory tab content.
 *
 * @param {Object} params
 * @param {Object} params.course - Course object
 * @param {Object} params.chapter - Chapter object
 * @param {HTMLElement} params.container - Container element to render into
 * @param {string} params.courseId - Course ID
 * @param {string} params.chapterId - Chapter ID
 */
export async function renderTheoryTab({ course, chapter, container, courseId, chapterId }) {
  container.innerHTML = '<p class="muted">Loading theory...</p>';

  function applyTaskStateAndHandlers() {
    const taskState = loadTaskState(courseId, chapterId);
    const markdownContainer = container.querySelector('.markdown-body');
    if (!markdownContainer) return;

    // Apply persisted state
    const checkboxes = markdownContainer.querySelectorAll('input[type="checkbox"][data-task-id]');
    checkboxes.forEach((cb) => {
      const id = cb.dataset.taskId;
      if (Object.prototype.hasOwnProperty.call(taskState, id)) {
        cb.checked = !!taskState[id];
      }
      const li = cb.closest('li');
      if (li) {
        li.classList.toggle('task-done', cb.checked);
        if (!li.classList.contains('task-list-item')) {
          li.classList.add('task-list-item');
        }
      }
    });

    // Event delegation for toggling
    markdownContainer.addEventListener('change', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) return;
      if (target.type !== 'checkbox' || !target.dataset.taskId) return;
      const id = target.dataset.taskId;
      const checked = !!target.checked;
      updateTaskState(courseId, chapterId, id, checked);
      const li = target.closest('li');
      if (li) {
        li.classList.toggle('task-done', checked);
        if (!li.classList.contains('task-list-item')) {
          li.classList.add('task-list-item');
        }
      }
    }, { once: true });
  }

  const cached = getChapterContent(courseId, chapterId);
  if (cached.theory) {
    container.innerHTML = renderMarkdownToHtml(cached.theory);
    upgradeMarkdownCodeBlocks(container);
    applyTaskStateAndHandlers();
    return;
  }

  try {
    const markdown = await fetchChapterTheory(course.id, chapter);
    setChapterContent(courseId, chapterId, { theory: markdown });
    container.innerHTML = renderMarkdownToHtml(markdown);
    upgradeMarkdownCodeBlocks(container);
    applyTaskStateAndHandlers();
  } catch (error) {
    console.error(error);
    container.innerHTML = '<p class="quiz-feedback is-incorrect">Failed to load theory content.</p>';
  }
}

