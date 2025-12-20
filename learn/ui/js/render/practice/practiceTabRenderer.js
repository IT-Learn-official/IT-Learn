import { getState, setChapterContent, getChapterContent, setSelectedPracticeAssignment, setSelectedPracticeTemplatePath } from '../../state/appState.js';
import { fetchChapterPractice } from '../../services/apiClient.js';
import { createAssignmentPanel } from './assignmentPanel.js';
import { createEditorPanel, initializeAceEditor, createConsolePanel, createChatPanel } from './editorPanel.js';
import { createRunHandler } from './runHandler.js';
import { createValidateHandler } from './validateHandler.js';
import { initTeacherBotPanel } from '../teacherBotPanel.js';
import { destroyPracticeEditor, setPracticeEditor, getCurrentPracticeEditor } from './practiceEditor.js';
import { loadTemplateSource } from './templateLoader.js';

export async function renderPracticeTab(course, chapter, tabContentEl) {
  const state = getState();
  const { selectedCourseId, selectedChapterId, selectedPracticeAssignmentId, selectedPracticeTemplatePath } = state;

  // Tear down any existing editor tied to an old DOM node before we re-render.
  destroyPracticeEditor();

  tabContentEl.innerHTML = '<p class="muted">Loading practice...</p>';

  const cached = getChapterContent(selectedCourseId, selectedChapterId);
  let practice = cached.practice;

  if (!practice) {
    try {
      practice = await fetchChapterPractice(course.id, chapter);
      // extend practice object to hold per-assignment markdown and template contents caches
      practice = { ...practice, assignmentMarkdown: {}, templateSources: {} };
      setChapterContent(selectedCourseId, selectedChapterId, { practice });
    } catch (error) {
      console.error(error);
      tabContentEl.innerHTML = '<p class="quiz-feedback is-incorrect">Failed to load practice data.</p>';
      return;
    }
  }

  // Ensure the practice object has the required properties for caching
  if (!practice.assignmentMarkdown) practice.assignmentMarkdown = {};
  if (!practice.templateSources) practice.templateSources = {};
  setChapterContent(selectedCourseId, selectedChapterId, { practice });

  if (!practice.practices || !practice.practices.length) {
    tabContentEl.innerHTML = '<p class="muted">No practice assignments available for this chapter.</p>';
    return;
  }

  let activeAssignmentId = selectedPracticeAssignmentId || practice.practices[0].id;
  const activeAssignment = practice.practices.find((p) => p.id === activeAssignmentId) || practice.practices[0];
  if (!selectedPracticeAssignmentId) {
    setSelectedPracticeAssignment(activeAssignment.id);
  }

  const activeTemplates = activeAssignment.templates || [];
  const activeTemplate = activeTemplates.find((t) => t.path === selectedPracticeTemplatePath) || activeTemplates[0] || null;
  if (activeTemplate && activeTemplate.path !== selectedPracticeTemplatePath) {
    setSelectedPracticeTemplatePath(activeTemplate.path);
  }

  // Build 4-panel layout container
  const container = document.createElement('div');
  container.className = 'practice-container';

  // Panel 1: Assignment
  const assignmentPanel = createAssignmentPanel({
    practice,
    activeAssignment,
    course,
    chapter,
    courseId: selectedCourseId,
    chapterId: selectedChapterId,
    onAssignmentChange: (newId) => {
      setSelectedPracticeAssignment(newId);
      setSelectedPracticeTemplatePath(null);
      renderPracticeTab(course, chapter, tabContentEl);
    },
  });

  // Panel 2: Editor
  const { panel: editorPanel, editorHost, runButton, validateButton, runStatus } = createEditorPanel({
    activeTemplates,
    activeTemplate,
    onTemplateChange: (newPath) => {
      setSelectedPracticeTemplatePath(newPath);
      renderPracticeTab(course, chapter, tabContentEl);
    },
    onRun: () => {}, // Will be set later
    onValidate: () => {}, // Will be set later
  });

  // Panel 3: Console
  const { panel: consolePanel, consoleEl } = createConsolePanel();

  // Panel 4: Chat
  const { panel: chatPanel, chatBody } = createChatPanel();

  // Assemble all panels into the container
  container.appendChild(assignmentPanel);
  container.appendChild(editorPanel);
  container.appendChild(chatPanel);
  container.appendChild(consolePanel);

  // Replace tab content with the freshly built practice view.
  tabContentEl.innerHTML = '';
  tabContentEl.appendChild(container);

  // Initialize Ace editor
  const editorLanguage = activeTemplate?.language || 'python';
  setPracticeEditor(initializeAceEditor(editorHost, editorLanguage));
  const practiceEditor = getCurrentPracticeEditor();

  // Create run handler
  const { handler: runHandler, getLastRunResult } = createRunHandler({
    practiceEditor,
    activeTemplate,
    consoleEl,
    runStatus,
    runButton,
  });

  // Add Ctrl+Enter shortcut to Ace Editor
  if (practiceEditor) {
    practiceEditor.commands.addCommand({
      name: 'runCode',
      bindKey: { win: 'Ctrl-Enter', mac: 'Command-Enter' },
      exec: runHandler
    });
  }

  // Create validate handler
  const { handler: validateHandler } = createValidateHandler({
    practiceEditor,
    activeTemplate,
    activeAssignment,
    course,
    chapter,
    practice,
    consoleEl,
    runStatus,
    runButton,
    validateButton,
    chatBody,
    getLastRunResult,
  });

  // Attach handlers (replace the placeholder no-op handlers)
  runButton.onclick = runHandler;
  validateButton.onclick = validateHandler;

  // Initialize TeacherBot panel with context provider
  const markdownKey = activeAssignment.id;
  initTeacherBotPanel({
    container: chatBody,
    getContext: () => {
      const languageId = activeTemplate?.language || 'python';
      const code = practiceEditor ? practiceEditor.getValue() : '';
      const codeFiles = [];
      if (activeTemplate) {
        codeFiles.push({
          path: activeTemplate.path,
          languageId,
          source: code,
        });
      }

      const lastRunResult = getLastRunResult();
      const lastRun = {
        status: lastRunResult ? 'completed' : 'not_run',
        stdout: lastRunResult?.stdout || '',
        stderr: lastRunResult?.stderr || '',
        error: lastRunResult?.error || '',
        summary: runStatus.textContent || '',
        consoleDisplay: consoleEl.textContent || '',
      };

      return {
        courseId: String(course.id),
        chapterId: String(chapter.id || chapter.chapterId || 'chapter_1'),
        assignmentId: String(activeAssignment.id),
        templatePath: activeTemplate ? activeTemplate.path : '',
        languageId,
        codeFiles,
        assignment: {
          title: activeAssignment.title || '',
          descriptionMarkdown: practice.assignmentMarkdown[markdownKey] || '',
        },
        environment: { lastRun },
      };
    },
  });

  // Load template source
  await loadTemplateSource({
    activeTemplate,
    practice,
    course,
    chapter,
    selectedCourseId,
    selectedChapterId,
    practiceEditor,
  });
}
