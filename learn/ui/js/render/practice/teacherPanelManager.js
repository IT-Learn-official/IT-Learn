//author: https://github.com/nhermab
//licence: MIT
import { initTeacherBot, getTeacherBotStatus } from '../../services/teacherBotService.js';
import { initTeacherBotPanel } from '../teacherBotPanel.js';

export function initFreshTeacherPanel({ container, getContext, showWelcome = true }) {
  return initTeacherBotPanel({ container, getContext, showWelcome });
}

export async function ensureTeacherPanel({
  teacherPanelApi,
  chatBody,
  getContext,
  runStatus,
  consoleEl,
}) {
  let api = teacherPanelApi;

  if (!api) {
    api = initFreshTeacherPanel({ container: chatBody, getContext });
  }

  const status = getTeacherBotStatus();
  if (status.status !== 'ready') {
    if (api && api.showConnectingStatus) {
      api.showConnectingStatus();
    }
    if (runStatus) runStatus.textContent = 'Preparing your teacher for validation...';
    await initTeacherBot();

    const after = getTeacherBotStatus();
    if (after.status !== 'ready') {
      if (consoleEl) consoleEl.textContent += '\n\nYour teacher could not connect on this device right now for validation.';
      if (runStatus) runStatus.textContent = 'Teacher not available for validation';
      throw new Error('Teacher not available');
    }
  }

  if (api && api.showTyping) {
    api.showTyping();
  }

  return api;
}

export function appendVerdictMessages(teacherPanelApi, validation) {
  if (!teacherPanelApi) return;

  if (typeof teacherPanelApi.appendUserMessage === 'function') {
    teacherPanelApi.appendUserMessage('can you validate my assignment?');
  }

  // Display TeacherBot feedback first
  const feedbackText = (validation && validation.feedbackText) || 'No feedback provided.';

  // Add verdict message after the feedback
  let verdictMessage = '';
  if (validation && typeof validation.feedbackText === 'string') {
    const passed = /pass(ed)?|success|congrat/i.test(validation.feedbackText);
    if (passed) {
      verdictMessage = '\n✅ Congratulations! Your assignment passed all checks.';
      playCorrectSound();
      showMascotMessage("🎉 Great job! Assignment completed successfully!", 4000);
    } else {
      verdictMessage = '\n❌ Your assignment did not pass all checks. Please review the feedback above.';
      playWrongSound();
      showMascotMessage("Keep trying! Review the feedback and try again. 💪", 4000);
    }
  }

  // Combine feedback with verdict message
  const finalMessage = feedbackText + verdictMessage;
  if (typeof teacherPanelApi.appendAssistantMessage === 'function') {
    teacherPanelApi.appendAssistantMessage(finalMessage);
  }
}

