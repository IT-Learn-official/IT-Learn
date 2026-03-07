import { getMyProfile, updateProfile } from '../services/authService.js';

function showStatus(element, message, type) {
  element.textContent = message;
  element.className = `settings-status status-${type}`;
}

export async function renderOnboardingView(screenRootEl, { onComplete } = {}) {
  const screen = document.createElement('section');
  screen.className = 'screen';

  const header = document.createElement('header');
  header.className = 'screen-header';

  const mainHeader = document.createElement('div');
  mainHeader.className = 'screen-header-main screen-header-main--align-right';

  const title = document.createElement('h2');
  title.className = 'screen-header-title';
  title.textContent = 'Welcome to IT Learn';

  const subtitle = document.createElement('p');
  subtitle.className = 'screen-header-subtitle';
  subtitle.textContent = 'Before you continue, choose your username. Bio is optional.';

  mainHeader.appendChild(title);
  mainHeader.appendChild(subtitle);
  header.appendChild(mainHeader);

  const body = document.createElement('div');
  body.className = 'screen-body';

  const card = document.createElement('div');
  card.className = 'settings-card';

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

  const usernameInfo = document.createElement('p');
  usernameInfo.className = 'settings-info';
  usernameInfo.textContent = 'Allowed: lowercase letters, numbers, underscore (3-24 chars).';

  const bioLabel = document.createElement('label');
  bioLabel.htmlFor = 'onboarding-bio';
  bioLabel.textContent = 'Bio';

  const bioInput = document.createElement('textarea');
  bioInput.id = 'onboarding-bio';
  bioInput.rows = 4;
  bioInput.maxLength = 180;
  bioInput.placeholder = 'Tell other learners a bit about you...';

  const bioInfo = document.createElement('p');
  bioInfo.className = 'settings-info';
  bioInfo.textContent = 'Bio is optional (max 180 chars).';

  const status = document.createElement('div');
  status.className = 'settings-status';

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'settings-button';
  submit.textContent = 'Continue';

  form.appendChild(usernameLabel);
  form.appendChild(usernameInput);
  form.appendChild(usernameInfo);
  form.appendChild(bioLabel);
  form.appendChild(bioInput);
  form.appendChild(bioInfo);
  form.appendChild(status);
  form.appendChild(submit);

  card.appendChild(form);
  body.appendChild(card);

  screen.appendChild(header);
  screen.appendChild(body);
  screenRootEl.appendChild(screen);

  const profile = await getMyProfile();
  if (profile.success && profile.profile) {
    usernameInput.value = (profile.profile.username || '').toLowerCase();
    bioInput.value = String(profile.profile.bio || '');
  } else if (!profile.success) {
    console.warn('[onboarding] Failed to prefill profile data from getMyProfile()', {
      error: profile.error || null,
      payload: profile,
    });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim().toLowerCase();
    const bio = bioInput.value.trim();

    if (!/^[a-z0-9_]{3,24}$/.test(username)) {
      showStatus(status, 'Username must be 3-24 chars with letters, numbers, underscore.', 'error');
      return;
    }

    if (bio.length > 180) {
      showStatus(status, 'Bio can be up to 180 characters.', 'error');
      return;
    }

    submit.disabled = true;
    showStatus(status, 'Saving profile...', 'loading');

    const result = await updateProfile({ username, bio });
    submit.disabled = false;

    if (!result.success) {
      showStatus(status, result.error || 'Failed to save your profile.', 'error');
      return;
    }

    showStatus(status, 'Profile completed. Redirecting...', 'success');
    if (typeof onComplete === 'function') {
      onComplete();
    }
  });
}
