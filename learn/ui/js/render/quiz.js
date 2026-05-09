//author: https://github.com/nhermab
//licence: MIT

import { renderMarkdownToHtml } from '../utils/markdown.js';
import { playCorrectSound, playWrongSound, showMascotMessage } from '../mascot.js';
import { loseHeart, getHearts, hasHearts } from '../state/gamificationState.js';

function normalizeQuizMarkdown(text) {
  const s = String(text ?? '');
  // Some quiz JSON files contain double-escaped sequences like "\\n" so they render literally.
  // Decode only the common escapes we expect in prompts/options.
  if (!s.includes('\\n') && !s.includes('\\t') && !s.includes('\\r')) return s;
  return s
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\r/g, '\r');
}

/**
 * Ensure quiz data is loaded, using provided cache helpers.
 *
 * @param {Object} params
 * @param {Object} params.course - Course object
 * @param {Object} params.chapter - Chapter object
 * @param {string|number} params.courseId - Selected course id
 * @param {string|number} params.chapterId - Selected chapter id
 * @param {Function} params.getChapterContent - (courseId, chapterId) => { quiz? }
 * @param {Function} params.setChapterContent - (courseId, chapterId, { quiz }) => void
 * @param {Function} params.fetchChapterQuiz - (courseId, chapter) => Promise<quiz>
 * @returns {Promise<{ quiz: any }>}
 */
export async function ensureQuizLoaded({
  course,
  chapter,
  courseId,
  chapterId,
  getChapterContent,
  setChapterContent,
  fetchChapterQuiz,
}) {
  const cached = getChapterContent(courseId, chapterId);
  let quiz = cached.quiz;

  if (!quiz) {
    quiz = await fetchChapterQuiz(course.id, chapter);
    setChapterContent(courseId, chapterId, { quiz });
  }

  return { quiz };
}

/**
 * Render quiz questions into the provided container.
 *
 * @param {Object}   params
 * @param {HTMLElement} params.container
 * @param {Object}   params.quiz          - Quiz JSON with a `questions` array
 * @param {Function} [params.onComplete]  - Called with { correct, total } when all answered
 */
export function renderQuiz({ container, quiz, onComplete }) {
  if (!container) return;
  let awardXp = true;

  if (!quiz || !Array.isArray(quiz.questions)) {
    container.innerHTML = '<p class="muted">No quiz available for this lesson.</p>';
    return;
  }

  const supported = quiz.questions.filter(q => q.type === 'single-choice');

  if (!supported.length) {
    container.innerHTML = '<p class="muted">No supported quiz questions defined.</p>';
    return;
  }

  const root = document.createElement('div');

  // ── Hearts bar ────────────────────────────────────────────────────────────
  const heartsBar = buildHeartsBar();
  root.appendChild(heartsBar.el);

  // ── Check if already out of hearts before questions render ────────────────
  if (!hasHearts()) {
    showNoHeartsOverlay(root, container, () => {
      awardXp = false;
      renderAllQuestions();
    });
    container.innerHTML = '';
    container.appendChild(root);
    return;
  }

  renderAllQuestions();

  function renderAllQuestions() {
    let answeredCount = 0;
    let correctCount  = 0;
    const total       = supported.length;

    supported.forEach((question) => {
      const questionEl  = document.createElement('div');
      questionEl.className = 'quiz-question';

      const promptEl = document.createElement('div');
      promptEl.innerHTML = renderMarkdownToHtml(normalizeQuizMarkdown(question.prompt || ''));
      questionEl.appendChild(promptEl);

      const optionsList = document.createElement('ul');
      optionsList.className = 'quiz-options';

      const feedbackEl      = document.createElement('div');
      feedbackEl.className  = 'quiz-feedback';

      const explanations = question.explanations || {};
      const byOptionId   = explanations.byOptionId || {};
      const overview     = explanations.overview;

      let questionAnswered = false;

      function lockQuestion() {
        optionsList.querySelectorAll('input[type="radio"]').forEach(inp => { inp.disabled = true; });
      }

      function checkAnswer(selectedInput) {
        if (questionAnswered) return;
        questionAnswered = true;
        lockQuestion();

        // Clear previously highlighted options for this question
        optionsList.querySelectorAll('label.quiz-option').forEach(lbl => {
          lbl.classList.remove('is-correct', 'is-incorrect');
          const orb = lbl.querySelector('.quiz-option-letter');
          if (orb) orb.classList.remove('is-correct', 'is-incorrect');
        });

        const selectedId   = selectedInput.value;
        const chosenOption = (question.options || []).find(opt => opt.id === selectedId);
        const label        = selectedInput.closest('label.quiz-option');
        const orb          = label ? label.querySelector('.quiz-option-letter') : null;
        const correctOption = (question.options || []).find(opt => opt.isCorrect);

        function markCorrectOption() {
          if (!correctOption) return;
          const inputs = optionsList.querySelectorAll('input[type="radio"]');
          let correctInput = null;
          inputs.forEach((input) => {
            if (input.value === correctOption.id) correctInput = input;
          });
          if (!correctInput) return;
          const correctLabel = correctInput.closest('label.quiz-option');
          const correctOrb = correctLabel ? correctLabel.querySelector('.quiz-option-letter') : null;
          if (correctLabel) correctLabel.classList.add('is-correct');
          if (correctOrb) correctOrb.classList.add('is-correct');
          if (correctLabel) correctLabel.classList.add('is-revealed');
          if (correctOrb) correctOrb.classList.add('is-revealed');
        }

        if (chosenOption && chosenOption.isCorrect) {
          const detail = overview || byOptionId[selectedId] || '';
          feedbackEl.textContent = detail ? `Correct! ${detail}` : 'Correct!';
          feedbackEl.className   = 'quiz-feedback is-correct';
          if (label) label.classList.add('is-correct');
          if (orb)   orb.classList.add('is-correct');
          correctCount++;
          playCorrectSound();
          showMascotMessage('✅ Correct! Well done! 🎉', 3000);
        } else {
          feedbackEl.textContent = byOptionId[selectedId] || overview || 'Not quite. Try again!';
          feedbackEl.className   = 'quiz-feedback is-incorrect';
          if (label) label.classList.add('is-incorrect');
          if (orb)   orb.classList.add('is-incorrect');
          markCorrectOption();

          const remaining = loseHeart();
          heartsBar.update(remaining);
          playWrongSound();
          showMascotMessage('❌ Wrong answer — heart lost! 💔', 3000);

          if (remaining === 0 && awardXp) {
            awardXp = false;
            // Slight delay so the heart animation is visible first
            setTimeout(() => {
              showNoHeartsOverlay(root, container, () => {});
            }, 600);
          }
        }

        answeredCount++;
        if (answeredCount === total) {
          showCompleteButton(root, correctCount, total, onComplete, awardXp);
        }
      }

      (question.options || []).forEach((option, index) => {
        const li    = document.createElement('li');
        const label = document.createElement('label');
        label.className = 'quiz-option';

        const input  = document.createElement('input');
        input.type   = 'radio';
        input.name   = question.id;
        input.value  = option.id;
        input.addEventListener('change', e => checkAnswer(e.target));

        const letter = document.createElement('span');
        letter.className = 'quiz-option-letter';
        letter.textContent = String.fromCharCode(65 + index);

        const textSpan = document.createElement('span');
        textSpan.className = 'quiz-option-text';
        textSpan.innerHTML = renderMarkdownToHtml(normalizeQuizMarkdown(option.label || ''));

        label.appendChild(input);
        label.appendChild(letter);
        label.appendChild(textSpan);
        li.appendChild(label);
        optionsList.appendChild(li);
      });

      questionEl.appendChild(optionsList);
      questionEl.appendChild(feedbackEl);
      root.appendChild(questionEl);
    });

    // If the quiz somehow has 0 questions after filtering, offer the button
    if (!supported.length) {
      showCompleteButton(root, 0, 0, onComplete, awardXp);
    }
  }

  container.innerHTML = '';
  container.appendChild(root);
}

// ─── Hearts bar builder ───────────────────────────────────────────────────────
function buildHeartsBar() {
  const { current, max } = getHearts();
  const el = document.createElement('div');
  el.className = 'hearts-bar';

  const label = document.createElement('span');
  label.className = 'hearts-bar__label';
  label.textContent = 'Hearts:';
  el.appendChild(label);

  const icons = [];
  for (let i = 0; i < max; i++) {
    const span = document.createElement('span');
    span.className = 'heart-icon' + (i >= current ? ' is-lost' : '');
    span.setAttribute('aria-hidden', 'true');
    span.textContent = '❤️';
    el.appendChild(span);
    icons.push(span);
  }

  function update(remaining) {
    icons.forEach((ic, i) => {
      const shouldBeLost = i >= remaining;
      if (shouldBeLost && !ic.classList.contains('is-lost')) {
        ic.classList.add('is-shaking');
        setTimeout(() => {
          ic.classList.remove('is-shaking');
          ic.classList.add('is-lost');
        }, 400);
      }
    });
  }

  return { el, update };
}

// ─── No-hearts overlay ────────────────────────────────────────────────────────
function showNoHeartsOverlay(root, container, continueAnyway) {
  // Remove any existing overlay
  root.querySelectorAll('.hearts-empty-overlay').forEach(n => n.remove());

  const overlay = document.createElement('div');
  overlay.className = 'hearts-empty-overlay';
  overlay.style.position = 'relative'; // inside root

  const card = document.createElement('div');
  card.className = 'hearts-empty-card';
  card.innerHTML = `
    <div class="hearts-empty-icon">💔</div>
    <h3>No more hearts!</h3>
    <p>Your hearts refill automatically tomorrow.<br>Come back then to keep scoring!</p>
  `;

  const actions = document.createElement('div');
  actions.className = 'hearts-empty-actions';

  if (continueAnyway) {
    const continueBtn = document.createElement('button');
    continueBtn.className = 'btn btn-outline';
    continueBtn.textContent = 'Continue (0 XP)';
    continueBtn.addEventListener('click', () => {
      overlay.remove();
      continueAnyway();
    });
    actions.appendChild(continueBtn);
  }

  card.appendChild(actions);
  overlay.appendChild(card);

  // Wrap root in relative position so overlay covers it
  root.style.position = 'relative';
  root.appendChild(overlay);
}

// ─── Complete-lesson button ───────────────────────────────────────────────────
function showCompleteButton(root, correct, total, onComplete, awardXp = true) {
  const wrap = document.createElement('div');
  wrap.className = 'complete-lesson-btn-wrap';

  const btn = document.createElement('button');
  btn.className = 'complete-lesson-btn';
  btn.textContent = '🎉 Complete Lesson';
  btn.addEventListener('click', () => {
    btn.disabled = true;
    if (onComplete) onComplete({ correct, total, awardXp });
  });

  wrap.appendChild(btn);
  root.appendChild(wrap);
}
