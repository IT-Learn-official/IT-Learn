import { changePassword, deleteAccount, getMyProfile, updateProfile } from '../services/authService.js';
import { navigateTo } from '../state/router.js';

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

  const overview = document.createElement('div');
  overview.className = 'settings-overview';
  overview.innerHTML = `
    <article class="settings-overview-card">
      <h3>Public Profile</h3>
      <p>Pick your unique username so others can visit your profile at itlearn.be/@username.</p>
    </article>
    <article class="settings-overview-card">
      <h3>Account Security</h3>
      <p>Use a strong password and rotate it regularly to keep your account safe.</p>
    </article>
    <article class="settings-overview-card settings-overview-card--danger">
      <h3>Irreversible Actions</h3>
      <p>Deleting your account permanently removes progress, submissions, and profile data.</p>
    </article>
  `;

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

  const profileStatus = document.createElement('div');
  profileStatus.className = 'settings-status';

  const profileButton = document.createElement('button');
  profileButton.type = 'submit';
  profileButton.className = 'settings-button';
  profileButton.textContent = 'Save username';

  profileForm.appendChild(usernameLabel);
  profileForm.appendChild(usernameInput);
  profileForm.appendChild(usernamePreview);
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

  body.appendChild(overview);
  body.appendChild(profileSection);
  body.appendChild(passwordSection);
  body.appendChild(deleteSection);

  screen.appendChild(header);
  screen.appendChild(body);
  screenRootEl.appendChild(screen);

  setupToggleButton(toggleNewPasswordButton, newPasswordInput);
  setupToggleButton(toggleConfirmPasswordButton, confirmPasswordInput);

  usernameInput.addEventListener('input', () => {
    const candidate = usernameInput.value.trim().toLowerCase();
    if (!candidate) {
      usernamePreview.textContent = 'Public link: itlearn.be/@username';
      return;
    }
    usernamePreview.textContent = `Public link: itlearn.be/@${candidate}`;
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
    usernameInput.value = username;
    usernamePreview.textContent = username
      ? `Public link: itlearn.be/@${username}`
      : 'Public link: itlearn.be/@username';
  })();

  profileForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = usernameInput.value.trim().toLowerCase();
    if (!/^[a-z0-9_]{3,24}$/.test(username)) {
      showProfileStatus('Username must be 3-24 chars with letters, numbers, underscore.', 'error');
      return;
    }

    setButtonLoading(profileButton, true, 'Save username', 'Saving...');
    showProfileStatus('Saving username...', 'loading');
    const result = await updateProfile({ username });
    setButtonLoading(profileButton, false, 'Save username', 'Saving...');

    if (!result.success) {
      showProfileStatus(result.error || 'Failed to save username.', 'error');
      return;
    }
    const savedUsername = result.profile?.username || username;
    usernameInput.value = savedUsername;
    usernamePreview.textContent = `Public link: itlearn.be/@${savedUsername}`;
    showProfileStatus('Username updated successfully.', 'success');
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
