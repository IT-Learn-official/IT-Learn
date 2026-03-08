//author: https://github.com/nhermab
//licence: MIT
import { getRunnerForLanguage } from '../../runners/index.js';
import { validateAssignmentWithTeacher, initTeacherBot, getTeacherBotStatus } from '../../services/teacherBotService.js';
import { initTeacherBotPanel } from '../teacherBotPanel.js';
import { formatSqlOutput, formatPythonOutput, getSqlStatusMessage } from './outputFormatter.js';
import { updateConsoleOutput } from './outputUpdater.js';
import { createTeacherContext } from './teacherContext.js';
import { runCode, prepareLastRun } from './runExecutor.js';
import { initFreshTeacherPanel } from './teacherPanelManager.js';

/**
 * Create and attach validate button event handler.
 *
 * @param {Object} params
 * @param {Object} params.practiceEditor - The Ace editor instance
 * @param {Object} params.activeTemplate - Current template with language info
 * @param {Object} params.activeAssignment - Current assignment with expected output
 * @param {Object} params.course - Course object
 * @param {Object} params.chapter - Chapter object
 * @param {Object} params.practice - Practice data with assignment markdown
 * @param {HTMLElement} params.consoleEl - Console output element
 * @param {HTMLElement} params.runStatus - Status text element
 * @param {HTMLElement} params.runButton - Run button element
 * @param {HTMLElement} params.validateButton - Validate button element
 * @param {HTMLElement} params.chatBody - Chat panel body element
 * @param {Function} params.getLastRunResult - Function to get last run result
 * @returns {{ handler: Function, teacherPanelApi: Object }}
 */
export function createValidateHandler({
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
}) {
  let teacherPanelApi = null;
  let lastRunResult = null;
  let lastExecutedCode = null;

  const handler = async () => {
    if (!practiceEditor) return;

    const code = practiceEditor.getValue();
    const editorLanguage = activeTemplate?.language || 'python';

    console.log('[Validation] Starting teacher validation click handler', {
      editorLanguage,
      codeSnippetPreview: code.slice(0, 400),
    });

    validateButton.disabled = true;
    runButton.disabled = true;
    const canReuseRun = !!lastRunResult && lastExecutedCode === code;
    consoleEl.textContent = canReuseRun
      ? 'Reusing previous run result for faster validation...'
      : 'Running code before teacher validation...';
    runStatus.textContent = canReuseRun
      ? `Fast validation (${editorLanguage})...`
      : `Running ${editorLanguage}...`;

    // Clear chat immediately and initialize a fresh panel without welcome
    chatBody.innerHTML = '';
    let freshTeacherApi = initFreshTeacherPanel({
      container: chatBody,
      getContext: () => createTeacherContext({
        course,
        chapter,
        activeAssignment,
        activeTemplate,
        languageId: activeTemplate?.language || 'python',
        codeFiles: [],
        practice,
        markdownKey: activeAssignment.id,
        lastRun: null,
      }),
      showWelcome: false,
    });

    // Disable input while we run and validate so the user can't add messages
    if (freshTeacherApi && typeof freshTeacherApi.disableInput === 'function') {
      freshTeacherApi.disableInput('Teacher is validating your assignment...');
    }

    try {
      if (!canReuseRun) {
        const result = await runCode(code, editorLanguage);
        lastRunResult = result;
        lastExecutedCode = code;

        // Update console output (same logic as run button)
        updateConsoleOutput({
          result,
          editorLanguage,
          consoleEl,
          runStatus,
        });
      }

      // Prepare context for teacher validation
      const languageId = activeTemplate?.language || 'python';
      const codeFiles = [];
      if (activeTemplate) {
        codeFiles.push({
          path: activeTemplate.path,
          languageId,
          source: code,
        });
      }

      const lastRun = prepareLastRun({
        getLastRunResult,
        lastRunResultFromRun: lastRunResult,
        runStatusEl: runStatus,
        consoleEl,
      });

      const markdownKey = activeAssignment.id;

      // Request teacher validation
      const validation = await validateAssignmentWithTeacher({
        assignment: {
          title: activeAssignment.title || '',
          descriptionMarkdown: practice.assignmentMarkdown[markdownKey] || '',
          solution: activeAssignment.solution || null,
        },
        codeFiles,
        environment: { lastRun },
      });

      // Hide typing indicator
      if (teacherPanelApi && teacherPanelApi.hideTyping) {
        teacherPanelApi.hideTyping();
      }
      // Clear any status message after validation is complete
      if (runStatus) runStatus.textContent = '';

      // Replace the panel with a new one that shows validation results (no welcome)
      chatBody.innerHTML = '';
      teacherPanelApi = initTeacherBotPanel({
        container: chatBody,
        getContext: () => createTeacherContext({
          course,
          chapter,
          activeAssignment,
          activeTemplate,
          languageId,
          codeFiles,
          practice,
          markdownKey,
          lastRun,
        }),
        showWelcome: false, // Do not show welcome message on validation
      });

      // Re-enable input after validation completes
      if (teacherPanelApi && typeof teacherPanelApi.enableInput === 'function') {
        teacherPanelApi.enableInput();
      }

      // Insert fake user message before validation result
      if (teacherPanelApi && typeof teacherPanelApi.appendUserMessage === 'function') {
        teacherPanelApi.appendUserMessage('can you validate my assignment?');
      }

      // Display TeacherBot feedback first
      const feedbackText = validation.feedbackText || 'No feedback provided.';

      // Add verdict message after the feedback
      let verdictMessage = '';
      if (validation && typeof validation.feedbackText === 'string') {
        const passed = typeof validation.passed === 'boolean'
          ? validation.passed
          : /pass(ed)?|success|congrat/i.test(validation.feedbackText);
        if (passed) {
          verdictMessage = '\n✅ Congratulations! Your assignment passed all checks.';
        } else {
          verdictMessage = '\n❌ Your assignment did not pass all checks. Please review the feedback above.';
        }
      }

      // Combine feedback with verdict message
      const finalMessage = feedbackText + verdictMessage;
      if (teacherPanelApi && typeof teacherPanelApi.appendAssistantMessage === 'function') {
        teacherPanelApi.appendAssistantMessage(finalMessage);
      }
    } catch (err) {
      console.error('Teacher validation run failed:', err);
      consoleEl.textContent = `Failed to run code for teacher validation. ${err.message || err}`;
      runStatus.textContent = 'Validation run failed';
      // On error, ensure inputs are re-enabled so user can continue
      if (teacherPanelApi && typeof teacherPanelApi.enableInput === 'function') {
        teacherPanelApi.enableInput();
      } else if (freshTeacherApi && typeof freshTeacherApi.enableInput === 'function') {
        freshTeacherApi.enableInput();
      }
    }

    validateButton.disabled = false;
    runButton.disabled = false;
  };

  return {
    handler,
    getTeacherPanelApi: () => teacherPanelApi,
  };
}
