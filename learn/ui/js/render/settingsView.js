import { changePassword, deleteAccount } from '../services/authService.js';
import { setGlobalStatus } from './layout.js';
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
  subtitle.textContent = 'Manage your account settings';

  mainHeader.appendChild(title);
  mainHeader.appendChild(subtitle);
  header.appendChild(backButton);
  header.appendChild(mainHeader);

  const body = document.createElement('div');
  body.className = 'screen-body settings-body';

  const passwordSection = document.createElement('div');
  passwordSection.className = 'settings-section';

  const passwordTitle = document.createElement('h3');
  passwordTitle.className = 'settings-title';
  passwordTitle.textContent = 'Change Password';

  const passwordForm = document.createElement('form');
  passwordForm.className = 'settings-form';
  passwordForm.id = 'change-password-form';

  const newPasswordLabel = document.createElement('label');
  newPasswordLabel.htmlFor = 'new-password';
  newPasswordLabel.textContent = 'New Password';

  const newPasswordInput = document.createElement('input');
  newPasswordInput.type = 'password';
  newPasswordInput.id = 'new-password';
  newPasswordInput.placeholder = 'Enter new password (min 6 characters)';
  newPasswordInput.required = true;
  newPasswordInput.minLength = 6;

  const confirmPasswordLabel = document.createElement('label');
  confirmPasswordLabel.htmlFor = 'confirm-password';
  confirmPasswordLabel.textContent = 'Confirm Password';

  const confirmPasswordInput = document.createElement('input');
  confirmPasswordInput.type = 'password';
  confirmPasswordInput.id = 'confirm-password';
  confirmPasswordInput.placeholder = 'Confirm new password';
  confirmPasswordInput.required = true;
  confirmPasswordInput.minLength = 6;

  const passwordStatus = document.createElement('div');
  passwordStatus.className = 'settings-status';
  passwordStatus.id = 'password-status';

  const passwordButton = document.createElement('button');
  passwordButton.type = 'submit';
  passwordButton.className = 'settings-button';
  passwordButton.textContent = 'Update Password';

  passwordForm.appendChild(newPasswordLabel);
  passwordForm.appendChild(newPasswordInput);
  passwordForm.appendChild(confirmPasswordLabel);
  passwordForm.appendChild(confirmPasswordInput);
  passwordForm.appendChild(passwordStatus);
  passwordForm.appendChild(passwordButton);

  passwordSection.appendChild(passwordTitle);
  passwordSection.appendChild(passwordForm);

  const deleteSection = document.createElement('div');
  deleteSection.className = 'settings-section danger-zone';

  const deleteTitle = document.createElement('h3');
  deleteTitle.className = 'settings-title danger-title';
  deleteTitle.textContent = 'Danger Zone';

  const deleteInfo = document.createElement('p');
  deleteInfo.className = 'settings-info danger-info';
  deleteInfo.textContent = 'Deleting your account is permanent and cannot be undone. All your data and progress will be lost.';

  const deleteStatus = document.createElement('div');
  deleteStatus.className = 'settings-status';
  deleteStatus.id = 'delete-status';

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'settings-button danger-button';
  deleteButton.textContent = 'Delete Account';
  deleteButton.id = 'delete-account-btn';

  deleteSection.appendChild(deleteTitle);
  deleteSection.appendChild(deleteInfo);
  deleteSection.appendChild(deleteStatus);
  deleteSection.appendChild(deleteButton);

  body.appendChild(passwordSection);
  body.appendChild(deleteSection);

  screen.appendChild(header);
  screen.appendChild(body);
  screenRootEl.appendChild(screen);

  passwordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (!newPassword) {
      showPasswordStatus('Please enter a new password', 'error');
      return;
    }

    if (newPassword.length < 6) {
      showPasswordStatus('Password must be at least 6 characters', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showPasswordStatus('Passwords do not match', 'error');
      return;
    }

    showPasswordStatus('Updating password...', 'loading');
    const result = await changePassword(newPassword);

    if (result.success) {
      showPasswordStatus('Password changed successfully!', 'success');
      newPasswordInput.value = '';
      confirmPasswordInput.value = '';
      setTimeout(() => {
        passwordStatus.textContent = '';
        passwordStatus.className = 'settings-status';
      }, 3000);
    } else {
      showPasswordStatus(result.error || 'Failed to change password', 'error');
    }
  });

  deleteButton.addEventListener('click', async () => {
    const confirmed = confirm(
      'Are you absolutely sure? This will permanently delete your account and all your data.\n\nType "DELETE" to confirm:'
    );

    if (!confirmed) return;

    const confirmText = prompt('Type DELETE to confirm account deletion:');
    if (confirmText !== 'DELETE') {
      showDeleteStatus('Account deletion cancelled', 'error');
      return;
    }

    showDeleteStatus('Deleting account...', 'loading');
    const result = await deleteAccount();

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
}
