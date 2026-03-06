import { getMyProfile, getPublicProfile } from '../services/authService.js';
import { navigateTo } from '../state/router.js';

function createStatCard(label, value) {
  const card = document.createElement('div');
  card.className = 'profile-stat-card';

  const valueEl = document.createElement('span');
  valueEl.className = 'profile-stat-value';
  valueEl.textContent = String(value);

  const labelEl = document.createElement('span');
  labelEl.className = 'profile-stat-label';
  labelEl.textContent = label;

  card.appendChild(valueEl);
  card.appendChild(labelEl);
  return card;
}

function renderHeader(screen, titleText, subtitleText) {
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
  title.textContent = titleText;

  const subtitle = document.createElement('p');
  subtitle.className = 'screen-header-subtitle';
  subtitle.textContent = subtitleText;

  mainHeader.appendChild(title);
  mainHeader.appendChild(subtitle);
  header.appendChild(backButton);
  header.appendChild(mainHeader);
  screen.appendChild(header);
}

function renderProfileCard(profile, isOwnProfile) {
  const section = document.createElement('section');
  section.className = 'profile-card';

  const username = profile.username || 'no-username';
  const bio = profile.bio || (isOwnProfile ? 'Add a bio in settings so other learners know who you are.' : 'This learner has not added a bio yet.');

  const banner = document.createElement('div');
  banner.className = 'profile-banner';

  const main = document.createElement('div');
  main.className = 'profile-main';

  const avatar = document.createElement('div');
  avatar.className = 'profile-avatar';
  avatar.textContent = username.slice(0, 1).toUpperCase();

  const identity = document.createElement('div');
  identity.className = 'profile-identity';

  const heading = document.createElement('h3');
  heading.textContent = `@${username}`;

  const bioEl = document.createElement('p');
  bioEl.textContent = bio;

  const shareLink = document.createElement('a');
  shareLink.className = 'profile-link-share';
  shareLink.href = `/@${encodeURIComponent(username)}`;
  shareLink.textContent = `itlearn.be/@${username}`;

  identity.appendChild(heading);
  identity.appendChild(bioEl);
  identity.appendChild(shareLink);

  main.appendChild(avatar);
  main.appendChild(identity);

  section.appendChild(banner);
  section.appendChild(main);

  const stats = document.createElement('div');
  stats.className = 'profile-stats-grid';
  stats.appendChild(createStatCard('XP', profile.xp || 0));
  stats.appendChild(createStatCard('Streak', profile.streak || 0));
  stats.appendChild(createStatCard('Badges', profile.badges_unlocked || 0));
  stats.appendChild(createStatCard('Last Active', profile.last_active || 'n/a'));

  section.appendChild(stats);
  return section;
}

export async function renderProfileView(screenRootEl, { username } = {}) {
  const screen = document.createElement('section');
  screen.className = 'screen';

  const isPublicProfile = Boolean(username);
  renderHeader(
    screen,
    isPublicProfile ? 'Public Profile' : 'My Profile',
    isPublicProfile ? 'Duolingo-style learner card' : 'This is what others can see'
  );

  const body = document.createElement('div');
  body.className = 'screen-body profile-body';

  const loading = document.createElement('p');
  loading.className = 'muted';
  loading.textContent = 'Loading profile...';
  body.appendChild(loading);
  screen.appendChild(body);
  screenRootEl.appendChild(screen);

  const response = isPublicProfile ? await getPublicProfile(username) : await getMyProfile();
  body.innerHTML = '';

  if (!response.success) {
    const errorState = document.createElement('div');
    errorState.className = 'profile-empty';

    const errorTitle = document.createElement('h3');
    errorTitle.textContent = 'Profile unavailable';

    const errorMessage = document.createElement('p');
    errorMessage.textContent = response.error || 'Could not load this profile.';

    const goToProfileButton = document.createElement('button');
    goToProfileButton.className = 'settings-button';
    goToProfileButton.type = 'button';
    goToProfileButton.textContent = 'Go to my profile';
    goToProfileButton.addEventListener('click', () => {
      navigateTo({ route: 'profile' });
    });

    errorState.appendChild(errorTitle);
    errorState.appendChild(errorMessage);
    errorState.appendChild(goToProfileButton);
    body.appendChild(errorState);
    return;
  }

  const profile = response.profile || {};
  body.appendChild(renderProfileCard(profile, !isPublicProfile));

  if (!isPublicProfile) {
    const note = document.createElement('p');
    note.className = 'profile-note';
    note.textContent = 'Want to change your username? Open Settings and update your profile handle.';
    body.appendChild(note);
  }
}
