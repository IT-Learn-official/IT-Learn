// Post-lesson slide flow — shown after completing a lesson quiz
// Slides: Overview → Streak → Leaderboard → Daily Quests → Reward Box

import {
  onLessonComplete,
  getLeaderboard,
  getQuests,
  claimAllQuests,
  openBox,
  getCoins,
  spendCoins,
  isBoxReady,
  getBoxUpgradeCost,
  updateSidebarStats,
} from '../state/gamificationState.js';

const LEAGUE_COLORS = {
  Wood: '#8B5E3C', Plastic: '#607D8B', Bronze: '#CD7F32',
  Silver: '#9E9E9E', Gold: '#FFD700', Diamond: '#40E0D0',
  Platina: '#E5E4E2', Master: '#FF6B35',
};

/**
 * Show the post-lesson slide flow over the current page.
 * @param {Object} opts
 * @param {number}   opts.correctAnswers
 * @param {number}   opts.totalQuestions
 * @param {string}   opts.lessonTitle
 * @param {Function} opts.onDone  — called when the user closes the flow
 */
export function showPostLessonFlow({ correctAnswers = 0, totalQuestions = 0, lessonTitle = 'Lesson', awardXp = true, onDone }) {
  // ── Process lesson completion ────────────────────────────────────────────
  const { xpEarned, streak } = onLessonComplete({ correct: correctAnswers, total: totalQuestions, awardXp });
  const leaderboard  = getLeaderboard();
  const quests       = getQuests();
  const questCoins   = awardXp ? claimAllQuests() : 0;
  const boxReady     = awardXp && isBoxReady();

  updateSidebarStats();

  // ── Build overlay ────────────────────────────────────────────────────────
  const overlay = document.createElement('div');
  overlay.className = 'post-lesson-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Lesson complete');

  const slides = [
    buildOverviewSlide({ lessonTitle, correctAnswers, totalQuestions, xpEarned }),
    buildStreakSlide(streak),
    buildLeaderboardSlide(leaderboard),
    buildQuestsSlide(quests, questCoins),
    buildBoxSlide({
      boxReady,
      awardXp,
      upgradeCost: getBoxUpgradeCost(),
    }),
  ];

  let current = 0;

  function advance() {
    current++;
    renderSlide(current);
  }

  // Inject the advance function into each slide object
  slides.forEach(s => { s._advance = advance; });

  function renderSlide(idx) {
    // Detach current child without destroying it (preserves event listeners)
    while (overlay.firstChild) overlay.removeChild(overlay.firstChild);

    if (idx >= slides.length) {
      overlay.remove();
      document.body.classList.remove('overlay-open');
      if (onDone) onDone();
      return;
    }

    const slide = slides[idx];
    const frame = document.createElement('div');
    frame.className = 'lesson-flow-frame';
    frame.appendChild(createFlowHeader(idx, slides.length, () => renderSlide(slides.length)));
    frame.appendChild(slide.el);
    overlay.appendChild(frame);

    slide.el.classList.add('slide-enter');
    requestAnimationFrame(() => {
      slide.el.classList.remove('slide-enter');
      slide.el.classList.add('slide-visible');
      if (slide._onShow) slide._onShow();
    });
  }

  document.body.classList.add('overlay-open');
  document.body.appendChild(overlay);
  renderSlide(0);
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

function makeCard(titleText) {
  const el = document.createElement('div');
  el.className = 'lesson-slide';

  const card = document.createElement('div');
  card.className = 'lesson-slide__card';

  const h2 = document.createElement('h2');
  h2.className = 'lesson-slide__title';
  h2.textContent = titleText;

  const body = document.createElement('div');
  body.className = 'lesson-slide__body';

  const footer = document.createElement('footer');
  footer.className = 'lesson-slide__footer';

  card.appendChild(h2);
  card.appendChild(body);
  card.appendChild(footer);
  el.appendChild(card);
  return { el, body, footer };
}

function continueBtn(footer, slideObj, label = 'Continue →') {
  const btn = document.createElement('button');
  btn.className = 'btn btn-primary lesson-slide__continue';
  btn.textContent = label;
  btn.addEventListener('click', () => slideObj._advance && slideObj._advance());
  footer.appendChild(btn);
  return btn;
}

function createFlowHeader(currentStep, totalSteps, onSkip) {
  const header = document.createElement('div');
  header.className = 'lesson-flow-header';

  const track = document.createElement('div');
  track.className = 'lesson-flow-progress';

  for (let i = 0; i < totalSteps; i += 1) {
    const dot = document.createElement('span');
    dot.className = `lesson-flow-dot${i <= currentStep ? ' is-active' : ''}`;
    track.appendChild(dot);
  }

  const step = document.createElement('span');
  step.className = 'lesson-flow-step';
  step.textContent = `${currentStep + 1}/${totalSteps}`;

  const skip = document.createElement('button');
  skip.type = 'button';
  skip.className = 'lesson-flow-skip';
  skip.textContent = 'Skip';
  skip.addEventListener('click', onSkip);

  header.appendChild(track);
  header.appendChild(step);
  header.appendChild(skip);
  return header;
}

// ─── Slide 1 - Lesson Overview ────────────────────────────────────────────────

function buildOverviewSlide({ lessonTitle, correctAnswers, totalQuestions, xpEarned }) {
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 100;
  const { el, body, footer } = makeCard('Lesson Complete! 🎉');

  body.innerHTML = `
    <p class="lesson-slide__subtitle">${lessonTitle}</p>
    <div class="lesson-overview-stats">
      <div class="stat-card">
        <span class="stat-icon">🎯</span>
        <span class="stat-value">${accuracy}%</span>
        <span class="stat-label">Accuracy</span>
      </div>
      <div class="stat-card">
        <span class="stat-icon">⚡</span>
        <span class="stat-value">+${xpEarned}</span>
        <span class="stat-label">XP Earned</span>
      </div>
      <div class="stat-card">
        <span class="stat-icon">✅</span>
        <span class="stat-value">${correctAnswers}/${totalQuestions || '—'}</span>
        <span class="stat-label">Correct</span>
      </div>
    </div>
  `;

  const obj = { el, _advance: null };
  continueBtn(footer, obj, 'Continue');
  return obj;
}

// ─── Slide 2 - Streak ─────────────────────────────────────────────────────────

function buildStreakSlide(streak) {
  const title  = streak.extended ? '🔥 Streak Extended!' : '🔥 Streak Alive!';
  const { el, body, footer } = makeCard(title);

  let msg;
  if (streak.wasReset)  msg = `New streak started! You're back at ${streak.current} day${streak.current !== 1 ? 's' : ''}.`;
  else if (streak.froze) msg = `Streak freeze used! Your ${streak.current}-day streak is safe. 🧊`;
  else if (streak.extended) msg = `You're on a ${streak.current}-day streak! Keep it going tomorrow!`;
  else msg = `Your ${streak.current}-day streak is still alive!`;

  body.innerHTML = `
    <div class="streak-display">
      <div class="streak-flame">🔥</div>
      <span class="streak-count">${streak.current}</span>
      <span class="streak-unit">day${streak.current !== 1 ? 's' : ''}</span>
    </div>
    <p class="lesson-slide__subtitle">${msg}</p>
  `;

  const obj = { el, _advance: null };
  continueBtn(footer, obj, 'Continue');
  return obj;
}

// ─── Slide 3 - Leaderboard ────────────────────────────────────────────────────

function buildLeaderboardSlide(lb) {
  const color = LEAGUE_COLORS[lb.league] || '#aaa';
  const { el, body, footer } = makeCard(`${lb.league} League 🏆`);

  body.innerHTML = `
    <div class="leaderboard-display">
      <div class="league-badge" style="--league-color: ${color}">
        <span class="league-badge__name">${lb.league}</span>
      </div>
      <div class="league-stats">
        <div class="league-stat-row">
          <span class="league-stat-label">Your rank</span>
          <strong class="league-stat-value">#${lb.rank} / 30</strong>
        </div>
        <div class="league-stat-row">
          <span class="league-stat-label">Weekly XP</span>
          <strong class="league-stat-value">${lb.weeklyXp} XP</strong>
        </div>
      </div>
      <p class="league-tip">Earn more XP to climb the leaderboard!</p>
    </div>
  `;

  const obj = { el, _advance: null };
  continueBtn(footer, obj, 'Continue');
  return obj;
}

// ─── Slide 4 - Daily Quests ───────────────────────────────────────────────────

function buildQuestsSlide(quests, coinsEarned) {
  const { el, body, footer } = makeCard('Daily Quests ⚡');

  const rows = quests.map(q => {
    const pct  = Math.min(100, Math.round((q.progress / q.target) * 100));
    const done = q.completed;
    return `
      <div class="quest-item${done ? ' is-done' : ''}">
        <span class="quest-icon">${q.icon}</span>
        <div class="quest-info">
          <span class="quest-label">${q.label}</span>
          <div class="quest-bar" aria-label="Progress ${pct}%">
            <div class="quest-bar-fill" style="width: ${pct}%"></div>
          </div>
          <span class="quest-progress">${q.progress}/${q.target}</span>
        </div>
        <span class="quest-reward">+${q.reward} 🪙</span>
      </div>
    `;
  }).join('');

  body.innerHTML = `
    ${coinsEarned > 0 ? `<p class="quests-coins-earned">+${coinsEarned} coins earned! 🪙</p>` : ''}
    <div class="quests-list">${rows}</div>
  `;

  const obj = { el, _advance: null };
  continueBtn(footer, obj, 'Continue');
  return obj;
}

// ─── Slide 5 - Reward Box ─────────────────────────────────────────────────────

function buildBoxSlide({ boxReady, awardXp, upgradeCost }) {
  const { el, body, footer } = makeCard('Reward Box 🎰');

  if (!awardXp || !boxReady) {
    body.innerHTML = `
      <p class="lesson-slide__subtitle">No reward box this time. Keep your hearts up to unlock it!</p>
    `;
    const obj = { el, _advance: null };
    continueBtn(footer, obj, 'Continue');
    return obj;
  }

  body.innerHTML = `
    <div class="reward-upgrade">
      <div class="reward-upgrade__info">
        <span class="reward-upgrade__title">Upgrade to BIG BOX</span>
        <span class="reward-upgrade__desc">Higher chance of rare rewards.</span>
      </div>
      <button type="button" class="reward-upgrade__btn" id="rw-upgrade">Upgrade (${upgradeCost} 🪙)</button>
    </div>
    <p class="reward-upgrade__status" id="rw-upgrade-status"></p>
    <div class="reward-box-wrap">
      <button class="reward-box" aria-label="Open reward box" id="rw-box">
        <span class="reward-box__icon">🎁</span>
        <span class="reward-box__hint">Tap to reveal!</span>
      </button>
      <div class="reward-reveal" id="rw-reveal" hidden></div>
    </div>
  `;

  const obj = { el, _advance: null };
  const btn = continueBtn(footer, obj, 'Claim Reward');
  btn.hidden = true;

  obj._onShow = () => {
    const box    = el.querySelector('#rw-box');
    const reveal = el.querySelector('#rw-reveal');
    const upgradeBtn = el.querySelector('#rw-upgrade');
    const upgradeStatus = el.querySelector('#rw-upgrade-status');
    const upgradeWrap = el.querySelector('.reward-upgrade');
    if (!box || !reveal) return;
    let isBig = false;

    function setStatus(message) {
      if (!upgradeStatus) return;
      upgradeStatus.textContent = message || '';
    }

    function refreshUpgradeState() {
      if (!upgradeBtn) return;
      const coins = getCoins();
      upgradeBtn.disabled = isBig || coins < upgradeCost;
      upgradeBtn.textContent = isBig ? 'BIG BOX ready' : `Upgrade (${upgradeCost} 🪙)`;
      if (box) box.classList.toggle('is-big', isBig);
      if (isBig) {
        setStatus('Upgrade complete. Enjoy better rewards!');
      } else if (coins < upgradeCost) {
        setStatus(`Need ${upgradeCost - coins} more coins.`);
      } else {
        setStatus('');
      }
    }

    if (upgradeBtn) {
      upgradeBtn.addEventListener('click', () => {
        if (isBig) return;
        const ok = spendCoins(upgradeCost);
        if (!ok) {
          setStatus('Not enough coins.');
          return;
        }
        isBig = true;
        updateSidebarStats();
        refreshUpgradeState();
      });
    }

    refreshUpgradeState();

    box.addEventListener('click', function handler() {
      box.removeEventListener('click', handler);
      box.classList.add('is-opening');
      box.disabled = true;
      if (upgradeBtn) upgradeBtn.disabled = true;

      setTimeout(() => {
        const wrap = box.parentElement;
        if (wrap) {
          wrap.insertBefore(reveal, box);
          box.remove();
        }
        if (upgradeWrap) upgradeWrap.hidden = true;
        reveal.hidden = false;
        const item = openBox({ isBig });
        const rarityClass = item ? `rarity-${item.rarity}` : 'rarity-common';
        reveal.innerHTML = `
          <div class="reward-item ${rarityClass}">
            <span class="reward-item__icon">${item ? item.icon : '🤷'}</span>
            <span class="reward-item__label">${item ? item.label : 'Nothing this time...'}</span>
            <span class="reward-item__rarity">${item ? item.rarity.toUpperCase() : ''}</span>
          </div>
        `;
        reveal.classList.add('is-visible');
        btn.hidden = false;
        updateSidebarStats();
      }, 750);
    });
  };

  return obj;
}
