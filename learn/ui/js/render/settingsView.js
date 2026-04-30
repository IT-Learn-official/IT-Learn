import { changePassword, deleteAccount, getMyProfile, updateProfile } from '../services/authService.js';
import { navigateTo } from '../state/router.js';

const MAX_AVATAR_FILE_BYTES = 5 * 1024 * 1024;
const AVATAR_MAX_DIMENSION = 320;
const AVATAR_MAX_DATA_URL_LENGTH = 450_000;

function createAvatarPreview(avatarUrl, fallbackText = 'U') {
  if (avatarUrl) {
    const img = document.createElement('img');
    img.className = 'settings-avatar-preview-image';
    img.src = avatarUrl;
    img.alt = 'Profile avatar preview';
    img.loading = 'lazy';
    img.referrerPolicy = 'no-referrer';
    return img;
  }

  const fallback = document.createElement('span');
  fallback.className = 'settings-avatar-preview-fallback';
  fallback.textContent = String(fallbackText || 'U').slice(0, 1).toUpperCase();
  return fallback;
}

function setAvatarPreview(previewEl, avatarUrl, fallbackText = 'U') {
  previewEl.replaceChildren(createAvatarPreview(avatarUrl, fallbackText));
  previewEl.dataset.avatarUrl = avatarUrl || '';
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read file.'));
    reader.onload = () => {
      const value = typeof reader.result === 'string' ? reader.result : '';
      resolve(value);
    };
    reader.readAsDataURL(file);
  });
}

function loadImageFromDataUrl(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Could not decode image.'));
    image.src = dataUrl;
  });
}

async function optimizeAvatarDataUrl(originalDataUrl) {
  const image = await loadImageFromDataUrl(originalDataUrl);
  const sourceWidth = Math.max(1, image.naturalWidth || image.width || 1);
  const sourceHeight = Math.max(1, image.naturalHeight || image.height || 1);
  const scale = Math.min(1, AVATAR_MAX_DIMENSION / Math.max(sourceWidth, sourceHeight));
  const targetWidth = Math.max(1, Math.round(sourceWidth * scale));
  const targetHeight = Math.max(1, Math.round(sourceHeight * scale));

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) return originalDataUrl;

  ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

  const candidates = [
    canvas.toDataURL('image/webp', 0.85),
    canvas.toDataURL('image/webp', 0.7),
    canvas.toDataURL('image/jpeg', 0.82),
    canvas.toDataURL('image/jpeg', 0.68),
  ];

  const fitting = candidates.find((value) => value.length <= AVATAR_MAX_DATA_URL_LENGTH);
  return fitting || candidates[candidates.length - 1] || originalDataUrl;
}

export function renderSettingsView(screenRootEl) {
  const screen = document.createElement('section');
  screen.className = 'screen';

  const header = document.createElement('header');
  header.className = 'screen-header';

  const backButton = document.createElement('button');
  backButton.type = 'button';
  backButton.className = 'back-button';
  backButton.textContent = 'Back to courses';
  backButton.addEventListener('click', () => {
    navigateTo({ route: 'courses' });
  });

  const mainHeader = document.createElement('div');
  mainHeader.className = 'screen-header-main screen-header-main--align-right';

  const title = document.createElement('h2');
  title.className = 'screen-header-title';
  title.textContent = 'Settings';

  const subtitle = document.createElement('p');
  subtitle.className = 'screen-header-subtitle';
  subtitle.textContent = 'Secure your account and manage high-risk actions.';

  mainHeader.appendChild(title);
  mainHeader.appendChild(subtitle);
  header.appendChild(backButton);
  header.appendChild(mainHeader);

  const body = document.createElement('div');
  body.className = 'screen-body settings-body';

  const profileOverview = document.createElement('div');
  profileOverview.className = 'settings-overview';
  profileOverview.innerHTML = `
    <article class="settings-overview-card">
      <h3>Public Profile</h3>
      <p>Pick your unique username so others can visit your profile at itlearn.be/@username.</p>
    </article>
  `;

  const accountOverview = document.createElement('div');
  accountOverview.className = 'settings-overview';
  accountOverview.innerHTML = `
    <article class="settings-overview-card">
      <h3>Account Security</h3>
      <p>Use a strong password and rotate it regularly to keep your account safe.</p>
    </article>
    <article class="settings-overview-card settings-overview-card--danger">
      <h3>Irreversible Actions</h3>
      <p>Deleting your account permanently removes progress, submissions, and profile data.</p>
    </article>
  `;

  const tabs = document.createElement('div');
  tabs.className = 'settings-tabs';
  tabs.setAttribute('role', 'tablist');
  tabs.setAttribute('aria-label', 'Settings sections');

  const profileTab = document.createElement('button');
  profileTab.type = 'button';
  profileTab.className = 'settings-tab is-active';
  profileTab.id = 'settings-tab-profile';
  profileTab.setAttribute('role', 'tab');
  profileTab.setAttribute('aria-controls', 'settings-panel-profile');
  profileTab.setAttribute('aria-selected', 'true');
  profileTab.textContent = 'Profile';

  const accountTab = document.createElement('button');
  accountTab.type = 'button';
  accountTab.className = 'settings-tab';
  accountTab.id = 'settings-tab-account';
  accountTab.setAttribute('role', 'tab');
  accountTab.setAttribute('aria-controls', 'settings-panel-account');
  accountTab.setAttribute('aria-selected', 'false');
  accountTab.setAttribute('tabindex', '-1');
  accountTab.textContent = 'Account';

  tabs.appendChild(profileTab);
  tabs.appendChild(accountTab);

  const profileGroup = document.createElement('section');
  profileGroup.className = 'settings-group';
  profileGroup.id = 'settings-panel-profile';
  profileGroup.setAttribute('role', 'tabpanel');
  profileGroup.setAttribute('aria-labelledby', 'settings-tab-profile');

  const profileGroupContent = document.createElement('div');
  profileGroupContent.className = 'settings-group-content';

  const accountGroup = document.createElement('section');
  accountGroup.className = 'settings-group';
  accountGroup.id = 'settings-panel-account';
  accountGroup.setAttribute('role', 'tabpanel');
  accountGroup.setAttribute('aria-labelledby', 'settings-tab-account');
  accountGroup.hidden = true;

  const accountGroupContent = document.createElement('div');
  accountGroupContent.className = 'settings-group-content';

  const profileSection = document.createElement('div');
  profileSection.className = 'settings-section';

  const profileTitle = document.createElement('h3');
  profileTitle.className = 'settings-title';
  profileTitle.textContent = 'Profile handle';

  const profileInfo = document.createElement('p');
  profileInfo.className = 'settings-info';
  profileInfo.textContent = 'Allowed: lowercase letters, numbers, underscore. 3 to 24 characters.';

  const profileForm = document.createElement('form');
  profileForm.className = 'settings-form';

  const avatarLabel = document.createElement('label');
  avatarLabel.htmlFor = 'profile-avatar';
  avatarLabel.textContent = 'Profile picture';

  const avatarRow = document.createElement('div');
  avatarRow.className = 'settings-avatar-row';

  const avatarPreview = document.createElement('div');
  avatarPreview.className = 'settings-avatar-preview';
  avatarPreview.setAttribute('aria-live', 'polite');
  avatarPreview.dataset.avatarUrl = '';
  setAvatarPreview(avatarPreview, '', 'U');

  const avatarControls = document.createElement('div');
  avatarControls.className = 'settings-avatar-controls';

  const avatarInput = document.createElement('input');
  avatarInput.id = 'profile-avatar';
  avatarInput.type = 'file';
  avatarInput.accept = 'image/png,image/jpeg,image/jpg,image/webp,image/gif';

  const clearAvatarButton = document.createElement('button');
  clearAvatarButton.type = 'button';
  clearAvatarButton.className = 'settings-button settings-button-ghost';
  clearAvatarButton.textContent = 'Remove picture';

  avatarControls.appendChild(avatarInput);
  avatarControls.appendChild(clearAvatarButton);
  avatarRow.appendChild(avatarPreview);
  avatarRow.appendChild(avatarControls);

  const avatarInfo = document.createElement('p');
  avatarInfo.className = 'settings-info';
  avatarInfo.textContent = 'PNG, JPG, WEBP or GIF. Max 5 MB.';

  const usernameLabel = document.createElement('label');
  usernameLabel.htmlFor = 'profile-username';
  usernameLabel.textContent = 'Username';

  const usernameInput = document.createElement('input');
  usernameInput.id = 'profile-username';
  usernameInput.type = 'text';
  usernameInput.placeholder = 'your_username';
  usernameInput.minLength = 3;
  usernameInput.maxLength = 24;
  usernameInput.required = true;

  const usernamePreview = document.createElement('p');
  usernamePreview.className = 'settings-info settings-link-preview';
  usernamePreview.textContent = 'Public link: itlearn.be/@username';

  const bioLabel = document.createElement('label');
  bioLabel.htmlFor = 'profile-bio';
  bioLabel.textContent = 'Bio';

  const bioInput = document.createElement('textarea');
  bioInput.id = 'profile-bio';
  bioInput.placeholder = 'Tell other learners a bit about you...';
  bioInput.maxLength = 280;
  bioInput.rows = 4;

  const bioInfo = document.createElement('p');
  bioInfo.className = 'settings-info';
  bioInfo.textContent = 'Up to 280 characters. This appears on your public profile.';

  const taglineLabel = document.createElement('label');
  taglineLabel.htmlFor = 'profile-tagline';
  taglineLabel.textContent = 'Tagline';

  const taglineInput = document.createElement('input');
  taglineInput.id = 'profile-tagline';
  taglineInput.type = 'text';
  taglineInput.placeholder = 'Short one-liner for your profile';
  taglineInput.maxLength = 60;

  const taglineInfo = document.createElement('p');
  taglineInfo.className = 'settings-info';
  taglineInfo.textContent = 'Optional. Up to 60 characters.';

  const profileStatus = document.createElement('div');
  profileStatus.className = 'settings-status';

  const profileButton = document.createElement('button');
  profileButton.type = 'submit';
  profileButton.className = 'settings-button';
  profileButton.textContent = 'Save profile';

  profileForm.appendChild(avatarLabel);
  profileForm.appendChild(avatarRow);
  profileForm.appendChild(avatarInfo);
  profileForm.appendChild(usernameLabel);
  profileForm.appendChild(usernameInput);
  profileForm.appendChild(usernamePreview);
  profileForm.appendChild(bioLabel);
  profileForm.appendChild(bioInput);
  profileForm.appendChild(bioInfo);
  profileForm.appendChild(taglineLabel);
  profileForm.appendChild(taglineInput);
  profileForm.appendChild(taglineInfo);
  profileForm.appendChild(profileStatus);
  profileForm.appendChild(profileButton);

  profileSection.appendChild(profileTitle);
  profileSection.appendChild(profileInfo);
  profileSection.appendChild(profileForm);

  const passwordSection = document.createElement('div');
  passwordSection.className = 'settings-section';

  const passwordTitle = document.createElement('h3');
  passwordTitle.className = 'settings-title';
  passwordTitle.textContent = 'Change password';

  const passwordInfo = document.createElement('p');
  passwordInfo.className = 'settings-info';
  passwordInfo.textContent = 'Choose a unique password with at least 8 characters.';

  const passwordForm = document.createElement('form');
  passwordForm.className = 'settings-form';
  passwordForm.id = 'change-password-form';

  const newPasswordLabel = document.createElement('label');
  newPasswordLabel.htmlFor = 'new-password';
  newPasswordLabel.textContent = 'New password';

  const newPasswordRow = document.createElement('div');
  newPasswordRow.className = 'settings-input-row';

  const newPasswordInput = document.createElement('input');
  newPasswordInput.type = 'password';
  newPasswordInput.id = 'new-password';
  newPasswordInput.placeholder = 'Enter new password';
  newPasswordInput.required = true;
  newPasswordInput.minLength = 8;

  const toggleNewPasswordButton = document.createElement('button');
  toggleNewPasswordButton.type = 'button';
  toggleNewPasswordButton.className = 'settings-input-toggle';
  toggleNewPasswordButton.textContent = 'Show';
  toggleNewPasswordButton.setAttribute('aria-label', 'Toggle new password visibility');

  newPasswordRow.appendChild(newPasswordInput);
  newPasswordRow.appendChild(toggleNewPasswordButton);

  const strengthWrap = document.createElement('div');
  strengthWrap.className = 'password-strength';

  const strengthMeter = document.createElement('div');
  strengthMeter.className = 'password-strength-meter';
  strengthMeter.setAttribute('aria-hidden', 'true');

  const strengthLabel = document.createElement('p');
  strengthLabel.className = 'password-strength-label';
  strengthLabel.textContent = 'Strength: Too weak';

  strengthWrap.appendChild(strengthMeter);
  strengthWrap.appendChild(strengthLabel);

  const requirements = document.createElement('ul');
  requirements.className = 'password-requirements';
  requirements.innerHTML = `
    <li data-rule="length">At least 8 characters</li>
    <li data-rule="upper">One uppercase letter</li>
    <li data-rule="number">One number</li>
    <li data-rule="special">One special character</li>
  `;

  const confirmPasswordLabel = document.createElement('label');
  confirmPasswordLabel.htmlFor = 'confirm-password';
  confirmPasswordLabel.textContent = 'Confirm password';

  const confirmPasswordRow = document.createElement('div');
  confirmPasswordRow.className = 'settings-input-row';

  const confirmPasswordInput = document.createElement('input');
  confirmPasswordInput.type = 'password';
  confirmPasswordInput.id = 'confirm-password';
  confirmPasswordInput.placeholder = 'Confirm new password';
  confirmPasswordInput.required = true;
  confirmPasswordInput.minLength = 8;

  const toggleConfirmPasswordButton = document.createElement('button');
  toggleConfirmPasswordButton.type = 'button';
  toggleConfirmPasswordButton.className = 'settings-input-toggle';
  toggleConfirmPasswordButton.textContent = 'Show';
  toggleConfirmPasswordButton.setAttribute('aria-label', 'Toggle confirm password visibility');

  confirmPasswordRow.appendChild(confirmPasswordInput);
  confirmPasswordRow.appendChild(toggleConfirmPasswordButton);

  const passwordStatus = document.createElement('div');
  passwordStatus.className = 'settings-status';
  passwordStatus.id = 'password-status';

  const passwordButton = document.createElement('button');
  passwordButton.type = 'submit';
  passwordButton.className = 'settings-button';
  passwordButton.textContent = 'Update password';

  passwordForm.appendChild(newPasswordLabel);
  passwordForm.appendChild(newPasswordRow);
  passwordForm.appendChild(strengthWrap);
  passwordForm.appendChild(requirements);
  passwordForm.appendChild(confirmPasswordLabel);
  passwordForm.appendChild(confirmPasswordRow);
  passwordForm.appendChild(passwordStatus);
  passwordForm.appendChild(passwordButton);

  passwordSection.appendChild(passwordTitle);
  passwordSection.appendChild(passwordInfo);
  passwordSection.appendChild(passwordForm);

  const deleteSection = document.createElement('div');
  deleteSection.className = 'settings-section danger-zone';

  const deleteTitle = document.createElement('h3');
  deleteTitle.className = 'settings-title danger-title';
  deleteTitle.textContent = 'Danger zone';

  const deleteInfo = document.createElement('p');
  deleteInfo.className = 'settings-info danger-info';
  deleteInfo.textContent = 'Deleting your account is permanent and cannot be undone. This action removes all your data and course progress.';

  const deleteChecklist = document.createElement('ul');
  deleteChecklist.className = 'danger-checklist';
  deleteChecklist.innerHTML = `
    <li>Your profile and preferences will be removed.</li>
    <li>Your chapter progress cannot be recovered.</li>
    <li>You will be signed out immediately.</li>
  `;

  const deletePanel = document.createElement('div');
  deletePanel.className = 'danger-confirm-panel';

  const deletePanelTitle = document.createElement('h4');
  deletePanelTitle.className = 'danger-confirm-title';
  deletePanelTitle.textContent = 'Confirm deletion';

  const deletePanelInfo = document.createElement('p');
  deletePanelInfo.className = 'danger-confirm-info';
  deletePanelInfo.textContent = 'Type DELETE to permanently remove your account.';

  const deleteInputLabel = document.createElement('label');
  deleteInputLabel.htmlFor = 'delete-confirm-input';
  deleteInputLabel.textContent = 'Confirmation code';

  const deleteConfirmInput = document.createElement('input');
  deleteConfirmInput.type = 'text';
  deleteConfirmInput.id = 'delete-confirm-input';
  deleteConfirmInput.placeholder = 'Type DELETE';
  deleteConfirmInput.autocomplete = 'off';

  const deleteActions = document.createElement('div');
  deleteActions.className = 'danger-actions';

  const cancelDeleteButton = document.createElement('button');
  cancelDeleteButton.type = 'button';
  cancelDeleteButton.className = 'settings-button settings-button-ghost';
  cancelDeleteButton.textContent = 'Cancel';

  const confirmDeleteButton = document.createElement('button');
  confirmDeleteButton.type = 'button';
  confirmDeleteButton.className = 'settings-button danger-button';
  confirmDeleteButton.textContent = 'Delete account forever';

  deleteActions.appendChild(cancelDeleteButton);
  deleteActions.appendChild(confirmDeleteButton);

  deletePanel.appendChild(deletePanelTitle);
  deletePanel.appendChild(deletePanelInfo);
  deletePanel.appendChild(deleteInputLabel);
  deletePanel.appendChild(deleteConfirmInput);
  deletePanel.appendChild(deleteActions);

  const deleteStatus = document.createElement('div');
  deleteStatus.className = 'settings-status';
  deleteStatus.id = 'delete-status';

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'settings-button danger-button danger-button-outline';
  deleteButton.textContent = 'Start account deletion';
  deleteButton.id = 'delete-account-btn';

  deleteSection.appendChild(deleteTitle);
  deleteSection.appendChild(deleteInfo);
  deleteSection.appendChild(deleteChecklist);
  deleteSection.appendChild(deletePanel);
  deleteSection.appendChild(deleteStatus);
  deleteSection.appendChild(deleteButton);

  profileGroupContent.appendChild(profileOverview);
  profileGroupContent.appendChild(profileSection);
  profileGroup.appendChild(profileGroupContent);

  accountGroupContent.appendChild(accountOverview);
  accountGroupContent.appendChild(passwordSection);
  accountGroupContent.appendChild(deleteSection);
  accountGroup.appendChild(accountGroupContent);

  body.appendChild(tabs);
  body.appendChild(profileGroup);
  body.appendChild(accountGroup);

  screen.appendChild(header);
  screen.appendChild(body);
  screenRootEl.appendChild(screen);

  setupToggleButton(toggleNewPasswordButton, newPasswordInput);
  setupToggleButton(toggleConfirmPasswordButton, confirmPasswordInput);

  profileTab.addEventListener('click', () => {
    activateTab('profile');
  });

  accountTab.addEventListener('click', () => {
    activateTab('account');
  });

  tabs.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      return;
    }
    event.preventDefault();
    const isProfileSelected = profileTab.getAttribute('aria-selected') === 'true';

    if (event.key === 'Home') {
      activateTab('profile', { focusTab: true });
      return;
    }

    if (event.key === 'End') {
      activateTab('account', { focusTab: true });
      return;
    }

    if (event.key === 'ArrowRight') {
      activateTab(isProfileSelected ? 'account' : 'profile', { focusTab: true });
      return;
    }

    activateTab(isProfileSelected ? 'account' : 'profile', { focusTab: true });
  });

  usernameInput.addEventListener('input', () => {
    const candidate = usernameInput.value.trim().toLowerCase();
    if (!candidate) {
      usernamePreview.textContent = 'Public link: itlearn.be/@username';
      return;
    }
    usernamePreview.textContent = `Public link: itlearn.be/@${candidate}`;
    const currentAvatarUrl = avatarPreview.dataset.avatarUrl || '';
    if (!currentAvatarUrl) {
      setAvatarPreview(avatarPreview, '', candidate || 'U');
    }
  });

  avatarInput.addEventListener('change', async () => {
    const file = avatarInput.files && avatarInput.files[0] ? avatarInput.files[0] : null;
    if (!file) return;

    if (!/^image\/(png|jpeg|jpg|webp|gif)$/i.test(file.type)) {
      showProfileStatus('Use a PNG, JPG, WEBP, or GIF image.', 'error');
      avatarInput.value = '';
      return;
    }

    if (file.size > MAX_AVATAR_FILE_BYTES) {
      showProfileStatus('Image is too large. Maximum is 5 MB.', 'error');
      avatarInput.value = '';
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      const optimized = await optimizeAvatarDataUrl(dataUrl);
      if (optimized.length > AVATAR_MAX_DATA_URL_LENGTH) {
        showProfileStatus('Image is still too heavy after optimization. Try another image.', 'error');
        avatarInput.value = '';
        return;
      }
      setAvatarPreview(avatarPreview, optimized, usernameInput.value.trim().toLowerCase() || 'U');
      showProfileStatus('Picture selected. Click Save profile to apply.', 'success');
    } catch (error) {
      showProfileStatus('Could not read image file.', 'error');
    }
  });

  clearAvatarButton.addEventListener('click', () => {
    avatarInput.value = '';
    setAvatarPreview(avatarPreview, '', usernameInput.value.trim().toLowerCase() || 'U');
    showProfileStatus('Profile picture removed. Click Save profile to apply.', 'success');
  });

  void (async () => {
    const profileResult = await getMyProfile();
    if (!profileResult.success) {
      usernamePreview.textContent = profileResult.error
        ? `Could not load profile username: ${profileResult.error}`
        : 'Could not load profile username.';
      return;
    }
    const username = profileResult.profile?.username || '';
    const bio = typeof profileResult.profile?.bio === 'string' ? profileResult.profile.bio : '';
    const avatarUrl = typeof profileResult.profile?.avatar_url === 'string' ? profileResult.profile.avatar_url : '';
    const profileTagline = typeof profileResult.profile?.profile_tagline === 'string' ? profileResult.profile.profile_tagline : '';
    usernameInput.value = username;
    bioInput.value = bio;
    taglineInput.value = profileTagline;
    setAvatarPreview(avatarPreview, avatarUrl, username || 'U');
    usernamePreview.textContent = username
      ? `Public link: itlearn.be/@${username}`
      : 'Public link: itlearn.be/@username';
  })();

  profileForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = usernameInput.value.trim().toLowerCase();
    const bio = bioInput.value.trim();
    const avatarUrl = avatarPreview.dataset.avatarUrl || '';
    const profileTagline = taglineInput.value.trim();
    if (!/^[a-z0-9_]{3,24}$/.test(username)) {
      showProfileStatus('Username must be 3-24 chars with letters, numbers, underscore.', 'error');
      return;
    }

    if (bio.length > 280) {
      showProfileStatus('Bio can be up to 280 characters.', 'error');
      return;
    }

    if (profileTagline.length > 60) {
      showProfileStatus('Tagline can be up to 60 characters.', 'error');
      return;
    }

    setButtonLoading(profileButton, true, 'Save profile', 'Saving...');
    showProfileStatus('Saving profile...', 'loading');
    const result = await updateProfile({ username, bio, avatarUrl, profileTagline });
    setButtonLoading(profileButton, false, 'Save profile', 'Saving...');

    if (!result.success) {
      showProfileStatus(result.error || 'Failed to save profile.', 'error');
      return;
    }
    const savedUsername = result.profile?.username || username;
    const savedBio = typeof result.profile?.bio === 'string' ? result.profile.bio : bio;
    const savedAvatarUrl = typeof result.profile?.avatar_url === 'string' ? result.profile.avatar_url : avatarUrl;
    const savedTagline = typeof result.profile?.profile_tagline === 'string' ? result.profile.profile_tagline : profileTagline;
    usernameInput.value = savedUsername;
    bioInput.value = savedBio;
    taglineInput.value = savedTagline;
    setAvatarPreview(avatarPreview, savedAvatarUrl, savedUsername || 'U');
    usernamePreview.textContent = `Public link: itlearn.be/@${savedUsername}`;
    showProfileStatus('Profile updated successfully.', 'success');
  });

  newPasswordInput.addEventListener('input', () => {
    updatePasswordStrength(newPasswordInput.value);
  });

  deleteButton.addEventListener('click', () => {
    deletePanel.classList.add('is-visible');
    deleteButton.classList.add('is-hidden');
    deleteConfirmInput.focus();
    deleteStatus.textContent = '';
    deleteStatus.className = 'settings-status';
  });

  cancelDeleteButton.addEventListener('click', () => {
    deletePanel.classList.remove('is-visible');
    deleteButton.classList.remove('is-hidden');
    deleteConfirmInput.value = '';
    deleteStatus.textContent = '';
    deleteStatus.className = 'settings-status';
  });

  passwordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    const checks = getPasswordChecks(newPassword);
    const allRequirementsMet = Object.values(checks).every(Boolean);

    updatePasswordStrength(newPassword);

    if (!newPassword) {
      showPasswordStatus('Please enter a new password', 'error');
      return;
    }

    if (!allRequirementsMet) {
      showPasswordStatus('Password must meet all listed requirements', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showPasswordStatus('Passwords do not match', 'error');
      return;
    }

    setButtonLoading(passwordButton, true, 'Update password', 'Updating...');
    showPasswordStatus('Updating password...', 'loading');
    const result = await changePassword(newPassword);
    setButtonLoading(passwordButton, false, 'Update password', 'Updating...');

    if (result.success) {
      showPasswordStatus('Password changed successfully!', 'success');
      newPasswordInput.value = '';
      confirmPasswordInput.value = '';
      updatePasswordStrength('');
      setTimeout(() => {
        passwordStatus.textContent = '';
        passwordStatus.className = 'settings-status';
      }, 3000);
    } else {
      showPasswordStatus(result.error || 'Failed to change password', 'error');
    }
  });

  confirmDeleteButton.addEventListener('click', async () => {
    if (deleteConfirmInput.value.trim() !== 'DELETE') {
      showDeleteStatus('Type DELETE exactly to confirm account deletion', 'error');
      return;
    }

    setButtonLoading(confirmDeleteButton, true, 'Delete account forever', 'Deleting...');
    showDeleteStatus('Deleting account...', 'loading');
    const result = await deleteAccount();
    setButtonLoading(confirmDeleteButton, false, 'Delete account forever', 'Deleting...');

    if (result.success) {
      showDeleteStatus('Account deleted successfully. Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = '/login.html';
      }, 2000);
    } else {
      showDeleteStatus(result.error || 'Failed to delete account', 'error');
    }
  });

  function showPasswordStatus(message, type) {
    passwordStatus.textContent = message;
    passwordStatus.className = `settings-status status-${type}`;
  }

  function showDeleteStatus(message, type) {
    deleteStatus.textContent = message;
    deleteStatus.className = `settings-status status-${type}`;
  }

  function showProfileStatus(message, type) {
    profileStatus.textContent = message;
    profileStatus.className = `settings-status status-${type}`;
  }

  function setupToggleButton(button, input) {
    button.addEventListener('click', () => {
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      button.textContent = isHidden ? 'Hide' : 'Show';
    });
  }

  function setButtonLoading(button, isLoading, defaultLabel, loadingLabel) {
    button.disabled = isLoading;
    button.textContent = isLoading ? loadingLabel : defaultLabel;
  }

  function activateTab(tabName, options = {}) {
    const isProfileTab = tabName === 'profile';

    profileTab.classList.toggle('is-active', isProfileTab);
    profileTab.setAttribute('aria-selected', String(isProfileTab));
    profileTab.setAttribute('tabindex', isProfileTab ? '0' : '-1');

    accountTab.classList.toggle('is-active', !isProfileTab);
    accountTab.setAttribute('aria-selected', String(!isProfileTab));
    accountTab.setAttribute('tabindex', isProfileTab ? '-1' : '0');

    profileGroup.hidden = !isProfileTab;
    accountGroup.hidden = isProfileTab;

    if (options.focusTab) {
      (isProfileTab ? profileTab : accountTab).focus();
    }
  }

  function getPasswordChecks(password) {
    return {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };
  }

  function updatePasswordStrength(password) {
    const checks = getPasswordChecks(password);

    requirements.querySelectorAll('li').forEach((item) => {
      const rule = item.getAttribute('data-rule');
      item.classList.toggle('is-met', Boolean(checks[rule]));
    });

    let score = 0;
    Object.values(checks).forEach((isMet) => {
      if (isMet) score += 1;
    });

    if (!password) {
      strengthMeter.dataset.level = '0';
      strengthLabel.textContent = 'Strength: Too weak';
      return;
    }

    strengthMeter.dataset.level = String(score);
    if (score <= 1) {
      strengthLabel.textContent = 'Strength: Weak';
    } else if (score <= 2) {
      strengthLabel.textContent = 'Strength: Fair';
    } else if (score === 3) {
      strengthLabel.textContent = 'Strength: Good';
    } else {
      strengthLabel.textContent = 'Strength: Strong';
    }
  }
}
