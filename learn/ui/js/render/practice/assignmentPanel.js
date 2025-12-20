//author: https://github.com/nhermab
//licence: MIT
import { renderMarkdownToHtml } from '../../utils/markdown.js';
import { upgradeMarkdownCodeBlocks } from '../../utils/markdownAceEnhancer.js';
import { fetchPracticeAssignmentMarkdown } from '../../services/apiClient.js';
import { setChapterContent } from '../../state/appState.js';

/**
 * Create the assignment panel DOM structure.
 *
 * @param {Object} params
 * @param {Object} params.practice - Practice data object
 * @param {Object} params.activeAssignment - Currently selected assignment
 * @param {Object} params.course - Course object
 * @param {Object} params.chapter - Chapter object
 * @param {string} params.courseId - Course ID
 * @param {string} params.chapterId - Chapter ID
 * @param {Function} params.onAssignmentChange - Callback when assignment selection changes
 * @returns {HTMLElement} The assignment panel element
 */
export function createAssignmentPanel({
  practice,
  activeAssignment,
  course,
  chapter,
  courseId,
  chapterId,
  onAssignmentChange
}) {
  const assignmentPanel = document.createElement('div');
  assignmentPanel.className = 'practice-panel practice-assignment-panel';

  const assignmentHeader = document.createElement('div');
  assignmentHeader.className = 'practice-assignment-header';

  const breadcrumb = document.createElement('div');
  breadcrumb.className = 'practice-assignment-breadcrumb';

  const breadcrumbLabel = document.createElement('span');
  breadcrumbLabel.className = 'practice-assignment-breadcrumb-label muted';
  breadcrumbLabel.textContent = 'Assignment';

  const breadcrumbSelect = document.createElement('select');
  breadcrumbSelect.className = 'practice-assignment-select';

  practice.practices.forEach((p) => {
    const option = document.createElement('option');
    option.value = p.id;
    option.textContent = p.title;
    if (p.id === activeAssignment.id) {
      option.selected = true;
    }
    breadcrumbSelect.appendChild(option);
  });

  breadcrumbSelect.addEventListener('change', (event) => {
    const newId = event.target.value;
    if (!newId || newId === activeAssignment.id) return;
    onAssignmentChange(newId);
  });

  breadcrumb.appendChild(breadcrumbLabel);
  breadcrumb.appendChild(breadcrumbSelect);

  const assignmentTitle = document.createElement('h3');
  assignmentTitle.className = 'practice-assignment-title';
  assignmentTitle.textContent = activeAssignment.title;

  assignmentHeader.appendChild(breadcrumb);
  assignmentHeader.appendChild(assignmentTitle);

  if (practice.description) {
    const chapterDesc = document.createElement('p');
    chapterDesc.className = 'muted';
    chapterDesc.textContent = practice.description;
    assignmentHeader.appendChild(chapterDesc);
  }

  const assignmentBody = document.createElement('div');
  assignmentBody.className = 'practice-assignment-body markdown-body';

  assignmentPanel.appendChild(assignmentHeader);
  assignmentPanel.appendChild(assignmentBody);

  // Load assignment markdown asynchronously
  loadAssignmentMarkdown({
    practice,
    activeAssignment,
    course,
    chapter,
    courseId,
    chapterId,
    assignmentBody,
  });

  return assignmentPanel;
}

/**
 * Load and render assignment markdown into the body element.
 *
 * @param {Object} params
 */
async function loadAssignmentMarkdown({
  practice,
  activeAssignment,
  course,
  chapter,
  courseId,
  chapterId,
  assignmentBody
}) {
  const markdownKey = activeAssignment.id;

  try {
    if (!practice.assignmentMarkdown[markdownKey]) {
      practice.assignmentMarkdown[markdownKey] = await fetchPracticeAssignmentMarkdown(course.id, chapter, activeAssignment);
      setChapterContent(courseId, chapterId, { practice });
    }
    assignmentBody.innerHTML = renderMarkdownToHtml(practice.assignmentMarkdown[markdownKey]);
    upgradeMarkdownCodeBlocks(assignmentBody);
  } catch (err) {
    console.error(err);
    assignmentBody.innerHTML = '<p class="quiz-feedback is-incorrect">Failed to load assignment description.</p>';
  }
}

