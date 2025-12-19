//author: https://github.com/nhermab
//licence: MIT
// Teacher chat panel UI (modern chat-style, markdown-based).

import { askTeacherBotQuestion, getTeacherBotStatus, initTeacherBot } from '../services/teacherBotService.js';
import { renderMarkdownToHtml } from '../utils/markdown.js';
import { upgradeMarkdownCodeBlocks } from '../utils/markdownAceEnhancer.js';

/**
 * Initialize the Teacher panel inside the given container.
 *
 * @param {Object} opts
 * @param {HTMLElement} opts.container - The DOM element to render into.
 * @param {() => Object} opts.getContext - Function returning the current
 *   TeacherBotRequest base data (without mode / userQuestion).
 * @param {boolean} [opts.showWelcome=true] - Whether to show the welcome message
 *   from the teacher on initial load. Set to false for validation flows that
 *   don't need the extra guidance.
 * @returns {{appendAssistantMessage(markdown: string): void}} a tiny API
 *   that allows callers to append an assistant message programmatically.
 */
export function initTeacherBotPanel({ container, getContext, showWelcome = true }) {
  if (!container) return { appendAssistantMessage() {} };

  container.innerHTML = '';

  // Use the container as the single frame – no extra nested card to avoid double framing
  // The container already has .practice-chat-panel applied from the layout.

  const statusEl = document.createElement('div');
  statusEl.className = 'teacher-status muted';
  statusEl.style.display = 'none'; // Hidden by default, only shown during loading / connecting

  const messagesEl = document.createElement('div');
  messagesEl.className = 'teacher-messages';

  // Typing indicator (shown while the teacher is composing a response)
  const typingEl = document.createElement('div');
  typingEl.className = 'teacher-typing-indicator';
  typingEl.setAttribute('aria-live', 'polite');
  typingEl.style.display = 'none';
  typingEl.innerHTML = '<span class="teacher-typing-label">Your teacher is responding </span><span class="teacher-typing-dots"><span></span><span></span><span></span></span>';

  const form = document.createElement('form');
  form.className = 'teacher-form';

  const textareaWrapper = document.createElement('div');
  textareaWrapper.className = 'teacher-input-wrapper';

  const textarea = document.createElement('textarea');
  textarea.className = 'teacher-input';
  textarea.rows = 2;
  textarea.placeholder = 'Ask your teacher about this assignment or your code...';

  const sendButton = document.createElement('button');
  sendButton.type = 'submit';
  sendButton.className = 'teacher-send-button icon-only';
  sendButton.setAttribute('aria-label', 'Send message to your teacher');
  sendButton.innerHTML = '<span class="teacher-send-icon">➤</span>';

  textareaWrapper.appendChild(textarea);
  textareaWrapper.appendChild(sendButton);

  form.appendChild(textareaWrapper);

  // Append everything directly to the practice chat panel container
  container.appendChild(statusEl);
  container.appendChild(messagesEl);
  container.appendChild(typingEl);
  container.appendChild(form);

  function appendMessage(role, markdownText) {
    const msg = document.createElement('div');
    msg.className = `teacher-message teacher-message-${role}`;

    const labelEl = document.createElement('div');
    labelEl.className = 'teacher-message-label';
    labelEl.textContent = role === 'user' ? 'You' : 'Teacher';

    const bodyEl = document.createElement('div');
    bodyEl.className = 'teacher-message-body';

    // Use existing markdown renderer to keep look & feel consistent
    bodyEl.innerHTML = renderMarkdownToHtml(markdownText);

    msg.appendChild(labelEl);
    msg.appendChild(bodyEl);

    messagesEl.appendChild(msg);

    // Fade/slide the message in on the next frame to avoid it being hidden by default CSS
    window.requestAnimationFrame(() => {
      msg.classList.add('is-visible');
      // After the frame, ensure the panel scrolls to show the new message.
      window.requestAnimationFrame(() => {
        messagesEl.scrollTop = messagesEl.scrollHeight;
      });
    });

    // Enhance any code blocks in this message with Ace, reusing the global markdown enhancer
    upgradeMarkdownCodeBlocks(bodyEl);
  }

  function setBusy(isBusy, hint) {
    sendButton.disabled = isBusy;
    textarea.disabled = isBusy;
    if (isBusy && hint) {
      statusEl.textContent = hint;
      statusEl.style.display = 'block';
    } else if (!isBusy) {
      statusEl.textContent = '';
      statusEl.style.display = 'none';
    }
  }

  function showConnectingStatus() {
    const { status, progress } = getTeacherBotStatus();
    if (status === 'ready') {
      statusEl.textContent = 'Your teacher is online.';
      statusEl.style.display = 'block';
      statusEl.classList.remove('is-connecting');
      return;
    }

    statusEl.classList.add('is-connecting');

    if (status === 'initializing') {
      const pct = Math.round((progress || 0) * 100);
      const clamped = Math.max(1, Math.min(99, pct || 1));
      statusEl.innerHTML =
        '<span class="teacher-connecting-label">Your teacher will be with you shortly</span>' +
        '<span class="teacher-connecting-dots"><span></span><span></span><span></span></span>' +
        `<span class="teacher-connecting-progress">${clamped}%</span>`;
      statusEl.style.display = 'block';
    } else if (status === 'idle') {
      statusEl.innerHTML =
        '<span class="teacher-connecting-label">Your teacher will be with you shortly</span>' +
        '<span class="teacher-connecting-dots"><span></span><span></span><span></span></span>';
      statusEl.style.display = 'block';
    } else if (status === 'error') {
      statusEl.classList.remove('is-connecting');
      statusEl.textContent = 'Your teacher could not connect on this device right now.';
      statusEl.style.display = 'block';
    }
  }

  // Periodically refresh the connecting status while the model is loading,
  // so console progress updates are reflected in the UI.
  let connectPollTimer = null;

  function startConnectingPoll() {
    if (connectPollTimer) return;
    connectPollTimer = window.setInterval(() => {
      const { status } = getTeacherBotStatus();
      if (status === 'initializing' || status === 'idle') {
        showConnectingStatus();
      } else {
        // Once the teacher is ready or in error, stop polling.
        window.clearInterval(connectPollTimer);
        connectPollTimer = null;
      }
    }, 500);
  }

  async function ensureModelReady() {
    const status = getTeacherBotStatus();
    if (status.status === 'ready') {
      statusEl.textContent = 'Your teacher is online.';
      statusEl.style.display = 'block';
      statusEl.classList.remove('is-connecting');
      return true;
    }

    // Show connecting animation and start polling while we load the model
    showConnectingStatus();
    startConnectingPoll();
    await initTeacherBot();
    const after = getTeacherBotStatus();
    if (after.status !== 'ready') {
      statusEl.classList.remove('is-connecting');
      statusEl.textContent = 'Your teacher could not connect on this device right now.';
      statusEl.style.display = 'block';
      return false;
    }
    statusEl.classList.remove('is-connecting');
    statusEl.textContent = 'Your teacher is online.';
    statusEl.style.display = 'block';
    return true;
  }

  async function handleAsk(event) {
    event.preventDefault();
    const question = textarea.value.trim();
    if (!question) return;

    appendMessage('user', question);
    textarea.value = '';

    // Ensure the teacher is connected / model is ready
    if (!(await ensureModelReady())) {
      appendMessage('assistant', 'I could not connect on this device, but you can still use the normal run button and assignment description.');
      return;
    }

    setBusy(true, 'Your teacher is reading your assignment and code...');
    typingEl.style.display = 'block';

    try {
      const base = getContext();
      const response = await askTeacherBotQuestion({
        ...base,
        mode: 'question',
        userQuestion: question,
      });

      appendMessage('assistant', response.feedbackText || '');
    } catch (err) {
      console.error('Teacher question failed:', err);
      appendMessage('assistant', 'Sorry, I had trouble answering that. Try asking a shorter or more specific question.');
    } finally {
      typingEl.style.display = 'none';
      setBusy(false);
    }
  }

  form.addEventListener('submit', handleAsk);

  textarea.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  });

  // Initial greeting message from Teacher
  if (showWelcome) {
    appendMessage('assistant', `## 💻 Ready to conquer this assignment?

I'm your **course teacher**, here to act as your pair programmer for this specific task.

**Stuck? Here is how I can unblock you:**
* **🐛 Debug:** Ask about your code and i'll help you! 
* **📉 Analyze Output:** Confused by the console output? Ask me to analyse your program output.
* **📘 Clarify:** Don't understand the assignment requirements? I can break them down for you.

> **To get started:**
> *just type your question or message below!* 👇`);
  }
  // If the model happens to already be initializing on first render, start showing
  // the connecting status so the user sees that the teacher is on the way.
  // const initialStatus = getTeacherBotStatus();
  // if (initialStatus.status === 'initializing' || initialStatus.status === 'idle') {
  //   showConnectingStatus();
  //   startConnectingPoll();
  // }

  // Expose a minimal API so other modules (like validation flow) can append
  // assistant messages to this panel after initialization.
  return {
    appendAssistantMessage(markdown) {
      if (!markdown) return;
      appendMessage('assistant', markdown);
    },
    appendUserMessage(markdown) {
      if (!markdown) return;
      appendMessage('user', markdown);
    },
    showConnectingStatus() {
      showConnectingStatus();
    },
    showTyping() {
      typingEl.style.display = 'block';
      setBusy(true, 'Your teacher is writing a response...');
    },
    hideTyping() {
      typingEl.style.display = 'none';
      setBusy(false);
    },
    // Programmatically disable the input (prevent user from sending messages)
    disableInput(hint) {
       // Keep the typing indicator visible to show activity unless caller passed no hint
       if (hint) {
         statusEl.textContent = hint;
         statusEl.style.display = 'block';
       }
       typingEl.style.display = 'block';
       setBusy(true, hint || 'The teacher is reviewing your assignment...');
     },
     enableInput() {
       typingEl.style.display = 'none';
       setBusy(false);
     }
  };
}
