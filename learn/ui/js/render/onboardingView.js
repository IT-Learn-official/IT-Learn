import { getMyProfile, updateProfile } from '../services/authService.js';
import { getState } from '../state/appState.js';

function showStatus(element, message, type) {
  element.textContent = message;
  element.className = `settings-status status-${type}`;
}

const MASCOT_IMAGE_URL = 'https://files.itlearn.be/images/branding/logo/IT_Learn.png';

const LEARNING_CHOICES = [
  { id: 'help-me-choose', icon: '...', label: 'Help me choose', learners: 'Smart match' },
  { id: 'python', icon: '🐍', label: 'Python', learners: '1.45M learners' },
  { id: 'html', icon: '🌐', label: 'HTML', learners: '221K learners' },
  { id: 'sql', icon: '🗃️', label: 'SQL', learners: '107K learners' },
  { id: 'css', icon: '🎨', label: 'CSS', learners: '32K learners' },
  { id: 'git', icon: '🧭', label: 'Git & GitHub', learners: '95K learners' },
];

const GOAL_CHOICES = [
  { id: 'explore', icon: '🔎', label: 'Explore what coding is' },
  { id: 'challenge', icon: '🧠', label: 'Challenge my brain' },
  { id: 'career', icon: '🏫', label: 'Boost my career' },
  { id: 'fun', icon: '🎮', label: 'Just for fun' },
  { id: 'education', icon: '🖼️', label: 'Support my education' },
  { id: 'apps', icon: '💻', label: 'Build my own apps' },
  { id: 'creative', icon: '🐙', label: 'Expand creative skills' },
  { id: 'other', icon: '...', label: 'Other' },
];

const LEVEL_CHOICES = [
  { id: 'beginner', icon: '▁▂▃', label: 'Complete beginner' },
  { id: 'refresh', icon: '▂▃▄', label: 'Some experience, need a refresher' },
  { id: 'confident', icon: '▃▄▅', label: 'Confident in my coding skills' },
  { id: 'expert', icon: '▄▅▆', label: 'Expert at coding' },
];

const COMMITMENT_CHOICES = [
  { id: '5', label: '5 min per day', badge: 'Easygoing' },
  { id: '15', label: '15 min per day', badge: 'Standard' },
  { id: '30', label: '30 min per day', badge: 'Committed' },
  { id: '60', label: '60 min per day', badge: 'Immersive' },
];

function findCourseIdForChoice(choiceId, courses) {
  const map = {
    python: ['python'],
    html: ['html'],
    css: ['css'],
    sql: ['sql'],
    git: ['git'],
    javascript: ['javascript', 'js'],
    java: ['java'],
    cpp: ['c++', 'cpp'],
  };

  const keywords = map[choiceId] || [];
  if (!keywords.length) return null;
  const list = Array.isArray(courses) ? courses : [];

  const found = list.find((course) => {
    const text = `${course?.id || ''} ${course?.title || ''}`.toLowerCase();
    return keywords.some((kw) => text.includes(kw));
  });

  return found ? String(found.id) : null;
}

function createOptionGrid(options, selectedValue, className = 'onboarding-grid') {
  const grid = document.createElement('div');
  grid.className = className;

  options.forEach((option) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `onboarding-option${selectedValue === option.id ? ' is-selected' : ''}`;
    btn.dataset.value = option.id;
    btn.innerHTML = `
      <span class="onboarding-option-icon">${option.icon || ''}</span>
      <span class="onboarding-option-main">${option.label}</span>
      ${option.learners ? `<span class="onboarding-option-meta">${option.learners}</span>` : ''}
      ${option.badge ? `<span class="onboarding-option-meta">${option.badge}</span>` : ''}
    `;
    grid.appendChild(btn);
  });

  return grid;
}

export async function renderOnboardingView(screenRootEl, { onComplete } = {}) {
  const state = {
    step: 0,
    learningPath: null,
    goal: null,
    level: null,
    commitment: null,
    username: '',
    bio: '',
  };

  const stepPrompts = [
    "Hi there, I'm your IT Learn mascot!",
    'What do you want to learn first?',
    'Why are you learning to code?',
    'What is your current experience level?',
    'How much are you ready to commit?',
    'Pick your username to finish setup.',
  ];

  const stepsCount = stepPrompts.length;
  const screen = document.createElement('section');
  screen.className = 'screen onboarding-screen';

  const body = document.createElement('div');
  body.className = 'screen-body onboarding-screen-body';

  const shell = document.createElement('div');
  shell.className = 'onboarding-shell';

  const topBar = document.createElement('div');
  topBar.className = 'onboarding-topbar';
  topBar.innerHTML = `
    <button type="button" class="onboarding-close" aria-label="Close onboarding">✕</button>
    <div class="onboarding-progress-track"><div class="onboarding-progress-fill"></div></div>
  `;

  const mascotRow = document.createElement('div');
  mascotRow.className = 'onboarding-mascot-row';
  mascotRow.innerHTML = `
    <img src="${MASCOT_IMAGE_URL}" alt="IT Learn mascot" class="onboarding-mascot-img" />
    <div class="onboarding-speech"></div>
  `;

  const stage = document.createElement('div');
  stage.className = 'onboarding-stage';

  const footer = document.createElement('div');
  footer.className = 'onboarding-footer';
  footer.innerHTML = `
    <button type="button" class="onboarding-btn onboarding-btn--ghost">Back</button>
    <button type="button" class="onboarding-btn onboarding-btn--primary">Continue</button>
  `;

  shell.appendChild(topBar);
  shell.appendChild(mascotRow);
  shell.appendChild(stage);
  shell.appendChild(footer);

  body.appendChild(shell);
  screen.appendChild(body);
  screenRootEl.appendChild(screen);

  const progressFill = topBar.querySelector('.onboarding-progress-fill');
  const speech = mascotRow.querySelector('.onboarding-speech');
  const closeBtn = topBar.querySelector('.onboarding-close');
  const backBtn = footer.querySelector('.onboarding-btn--ghost');
  const nextBtn = footer.querySelector('.onboarding-btn--primary');

  const profile = await getMyProfile();
  if (profile.success && profile.profile) {
    state.username = String(profile.profile.username || '').toLowerCase();
    state.bio = String(profile.profile.bio || '');
  }

  function saveOnboardingPreferences() {
    const userId = String(window.currentUserId || 'unknown');
    const key = `itlearn_onboarding_prefs_${userId}`;
    const payload = {
      learningPath: state.learningPath,
      goal: state.goal,
      level: state.level,
      commitment: state.commitment,
      updatedAt: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(payload));
    localStorage.removeItem('itlearn_force_onboarding');
  }

  function isStepValid(step) {
    if (step === 0) return true;
    if (step === 1) return Boolean(state.learningPath);
    if (step === 2) return Boolean(state.goal);
    if (step === 3) return Boolean(state.level);
    if (step === 4) return Boolean(state.commitment);
    if (step === 5) return /^[a-z0-9_]{3,24}$/.test(String(state.username || '').trim().toLowerCase());
    return false;
  }

  function renderStep() {
    const progressPercent = Math.round((state.step / (stepsCount - 1)) * 100);
    progressFill.style.width = `${Math.min(100, Math.max(0, progressPercent))}%`;
    speech.textContent = stepPrompts[state.step];
    stage.innerHTML = '';

    backBtn.disabled = state.step === 0;
    nextBtn.disabled = !isStepValid(state.step);
    nextBtn.textContent = state.step === stepsCount - 1 ? 'Finish' : 'Continue';

    if (state.step === 0) {
      const intro = document.createElement('div');
      intro.className = 'onboarding-intro';
      intro.innerHTML = `
        <h2>Welcome to IT Learn</h2>
        <p>We will tailor your learning path in less than a minute.</p>
      `;
      stage.appendChild(intro);
      return;
    }

    if (state.step === 1) {
      const grid = createOptionGrid(LEARNING_CHOICES, state.learningPath, 'onboarding-grid onboarding-grid--wide');
      grid.addEventListener('click', (event) => {
        const btn = event.target.closest('.onboarding-option');
        if (!btn) return;
        state.learningPath = btn.dataset.value;
        renderStep();
      });
      stage.appendChild(grid);
      return;
    }

    if (state.step === 2) {
      const grid = createOptionGrid(GOAL_CHOICES, state.goal, 'onboarding-grid');
      grid.addEventListener('click', (event) => {
        const btn = event.target.closest('.onboarding-option');
        if (!btn) return;
        state.goal = btn.dataset.value;
        renderStep();
      });
      stage.appendChild(grid);
      return;
    }

    if (state.step === 3) {
      const grid = createOptionGrid(LEVEL_CHOICES, state.level, 'onboarding-grid onboarding-grid--compact');
      grid.addEventListener('click', (event) => {
        const btn = event.target.closest('.onboarding-option');
        if (!btn) return;
        state.level = btn.dataset.value;
        renderStep();
      });
      stage.appendChild(grid);
      return;
    }

    if (state.step === 4) {
      const grid = createOptionGrid(COMMITMENT_CHOICES, state.commitment, 'onboarding-grid onboarding-grid--compact');
      grid.addEventListener('click', (event) => {
        const btn = event.target.closest('.onboarding-option');
        if (!btn) return;
        state.commitment = btn.dataset.value;
        renderStep();
      });
      stage.appendChild(grid);
      return;
    }

    const card = document.createElement('div');
    card.className = 'settings-card onboarding-profile-card';

    const form = document.createElement('form');
    form.className = 'settings-form';

    const usernameLabel = document.createElement('label');
    usernameLabel.htmlFor = 'onboarding-username';
    usernameLabel.textContent = 'Username';

    const usernameInput = document.createElement('input');
    usernameInput.id = 'onboarding-username';
    usernameInput.type = 'text';
    usernameInput.placeholder = 'your_username';
    usernameInput.required = true;
    usernameInput.minLength = 3;
    usernameInput.maxLength = 24;
    usernameInput.value = state.username;

    const usernameInfo = document.createElement('p');
    usernameInfo.className = 'settings-info';
    usernameInfo.textContent = 'Allowed: lowercase letters, numbers, underscore (3-24 chars).';

    const bioLabel = document.createElement('label');
    bioLabel.htmlFor = 'onboarding-bio';
    bioLabel.textContent = 'Bio (optional)';

    const bioInput = document.createElement('textarea');
    bioInput.id = 'onboarding-bio';
    bioInput.rows = 4;
    bioInput.maxLength = 180;
    bioInput.placeholder = 'Tell other learners a bit about you...';
    bioInput.value = state.bio;

    const bioInfo = document.createElement('p');
    bioInfo.className = 'settings-info';
    bioInfo.textContent = 'Bio is optional (max 180 chars).';

    const status = document.createElement('div');
    status.className = 'settings-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.setAttribute('aria-atomic', 'true');

    form.appendChild(usernameLabel);
    form.appendChild(usernameInput);
    form.appendChild(usernameInfo);
    form.appendChild(bioLabel);
    form.appendChild(bioInput);
    form.appendChild(bioInfo);
    form.appendChild(status);

    card.appendChild(form);
    stage.appendChild(card);

    usernameInput.addEventListener('input', () => {
      state.username = usernameInput.value.trim().toLowerCase();
      state.bio = bioInput.value.trim();
      nextBtn.disabled = !isStepValid(state.step);
      status.textContent = '';
      status.className = 'settings-status';
    });

    bioInput.addEventListener('input', () => {
      state.username = usernameInput.value.trim().toLowerCase();
      state.bio = bioInput.value.trim();
      nextBtn.disabled = !isStepValid(state.step);
    });
  }

  async function completeOnboarding() {
    const username = String(state.username || '').trim().toLowerCase();
    const bio = String(state.bio || '').trim();
    const status = stage.querySelector('.settings-status');

    if (!/^[a-z0-9_]{3,24}$/.test(username)) {
      showStatus(status, 'Username must be 3-24 chars with letters, numbers, underscore.', 'error');
      return;
    }

    if (bio.length > 180) {
      showStatus(status, 'Bio can be up to 180 characters.', 'error');
      return;
    }

    nextBtn.disabled = true;
    showStatus(status, 'Saving profile...', 'loading');

    const result = await updateProfile({ username, bio });
    if (!result.success) {
      nextBtn.disabled = false;
      showStatus(status, result.error || 'Failed to save your profile.', 'error');
      return;
    }

    saveOnboardingPreferences();
    showStatus(status, 'Profile completed. Redirecting...', 'success');

    const courses = getState()?.coursesDoc?.courses || [];
    const selectedCourseId = findCourseIdForChoice(state.learningPath, courses);

    if (typeof onComplete === 'function') {
      onComplete({ selectedCourseId });
    }
  }

  closeBtn.addEventListener('click', () => {
    if (state.step > 0) {
      state.step = Math.max(0, state.step - 1);
      renderStep();
    }
  });

  backBtn.addEventListener('click', () => {
    state.step = Math.max(0, state.step - 1);
    renderStep();
  });

  nextBtn.addEventListener('click', async () => {
    if (state.step === stepsCount - 1) {
      await completeOnboarding();
      return;
    }

    if (!isStepValid(state.step)) return;
    state.step = Math.min(stepsCount - 1, state.step + 1);
    renderStep();
  });

  renderStep();
}
