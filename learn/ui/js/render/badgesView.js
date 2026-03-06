import { navigateTo } from '../state/router.js';
import { getBadgeStatsFromBackend, syncBadgeUnlocks } from '../services/progressService.js';

function buildBadgeDefinitions(stats) {
  const badges = [
    {
      id: 'first-chapter',
      title: 'First Commit',
      icon: 'C',
      description: 'Open and interact with your first chapter tasks.',
      progress: Math.min(stats.chaptersTouched, 1),
      goal: 1,
    },
    {
      id: 'chapter-runner',
      title: 'Chapter Runner',
      icon: 'R',
      description: 'Work inside 5 different chapters.',
      progress: Math.min(stats.chaptersTouched, 5),
      goal: 5,
    },
    {
      id: 'task-hunter',
      title: 'Task Hunter',
      icon: 'T',
      description: 'Complete 15 chapter tasks.',
      progress: Math.min(stats.tasksCompleted, 15),
      goal: 15,
    },
    {
      id: 'task-master',
      title: 'Task Master',
      icon: 'M',
      description: 'Complete 60 chapter tasks.',
      progress: Math.min(stats.tasksCompleted, 60),
      goal: 60,
    },
    {
      id: 'task-legend',
      title: 'Task Legend',
      icon: 'L',
      description: 'Complete 150 chapter tasks.',
      progress: Math.min(stats.tasksCompleted, 150),
      goal: 150,
    },
    {
      id: 'clean-sweeper',
      title: 'Clean Sweeper',
      icon: 'S',
      description: 'Fully complete all tasks in 3 chapters.',
      progress: Math.min(stats.perfectTaskChapters, 3),
      goal: 3,
    },
    {
      id: 'clean-architect',
      title: 'Clean Architect',
      icon: 'A',
      description: 'Fully complete all tasks in 10 chapters.',
      progress: Math.min(stats.perfectTaskChapters, 10),
      goal: 10,
    },
    {
      id: 'course-explorer',
      title: 'Course Explorer',
      icon: 'E',
      description: 'Complete tasks in 2 different courses.',
      progress: Math.min(stats.exploredCourses, 2),
      goal: 2,
    },
    {
      id: 'course-voyager',
      title: 'Course Voyager',
      icon: 'V',
      description: 'Complete tasks in 3 different courses.',
      progress: Math.min(stats.exploredCourses, 3),
      goal: 3,
    },
    {
      id: 'xp-spark',
      title: 'XP Spark',
      icon: 'X',
      description: 'Reach 50 XP.',
      progress: Math.min(stats.xp, 50),
      goal: 50,
    },
    {
      id: 'xp-engine',
      title: 'XP Engine',
      icon: 'P',
      description: 'Reach 300 XP.',
      progress: Math.min(stats.xp, 300),
      goal: 300,
    },
    {
      id: 'streak-starter',
      title: 'Streak Starter',
      icon: 'K',
      description: 'Build a 3-day streak.',
      progress: Math.min(stats.streak, 3),
      goal: 3,
    },
    {
      id: 'mission-agent',
      title: 'Mission Agent',
      icon: 'N',
      description: 'Complete 3 missions.',
      progress: Math.min(stats.missionsCompleted, 3),
      goal: 3,
    },
  ];

  if (stats.hasTrialData) {
    badges.push(
      {
        id: 'trial-starter',
        title: 'Trial Starter',
        icon: 'Q',
        description: 'Complete at least 1 chapter in trial mode.',
        progress: Math.min(stats.trialChapterCount, 1),
        goal: 1,
      },
      {
        id: 'trial-graduate',
        title: 'Trial Graduate',
        icon: 'G',
        description: 'Finish your full trial flow.',
        progress: stats.trialCompleted ? 1 : 0,
        goal: 1,
      }
    );
  }

  return badges;
}

function createBadgeCard(badge, unlockedByApi) {
  const isUnlocked = Boolean(unlockedByApi) || badge.progress >= badge.goal;
  const percentage = Math.round((badge.progress / badge.goal) * 100);

  const card = document.createElement('article');
  card.className = `badge-card ${isUnlocked ? 'is-unlocked' : 'is-locked'}`;

  card.innerHTML = `
    <header class="badge-head">
      <div class="badge-icon">${badge.icon}</div>
      <div>
        <h3>${badge.title}</h3>
        <p>${isUnlocked ? 'Unlocked' : 'In progress'}</p>
      </div>
    </header>
    <p class="badge-description">${badge.description}</p>
    <div class="badge-progress-row">
      <span>${badge.progress}/${badge.goal}</span>
      <span>${percentage}%</span>
    </div>
    <div class="badge-progress-track" role="presentation">
      <div class="badge-progress-fill" style="width:${percentage}%;"></div>
    </div>
  `;

  return card;
}

export async function renderBadgesView(screenRootEl) {
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
  title.textContent = 'Badges';

  const subtitle = document.createElement('p');
  subtitle.className = 'screen-header-subtitle';
  subtitle.textContent = 'Loading badges...';

  mainHeader.appendChild(title);
  mainHeader.appendChild(subtitle);
  header.appendChild(backButton);
  header.appendChild(mainHeader);

  const body = document.createElement('div');
  body.className = 'screen-body badges-body';

  try {
    const stats = await getBadgeStatsFromBackend();
    const badges = buildBadgeDefinitions(stats);
    const persisted = await syncBadgeUnlocks(badges);
    const unlockedBadges = persisted.unlockedBadges || {};
    const unlockedCount = badges.filter((badge) => unlockedBadges[badge.id] || badge.progress >= badge.goal).length;

    subtitle.textContent = `${unlockedCount}/${badges.length} unlocked`;

    const summary = document.createElement('section');
    summary.className = 'badges-summary';
    summary.innerHTML = `
      <div class="badges-summary-stat">
        <span class="badges-summary-value">${stats.tasksCompleted}</span>
        <span class="badges-summary-label">Tasks completed</span>
      </div>
      <div class="badges-summary-stat">
        <span class="badges-summary-value">${stats.chaptersTouched}</span>
        <span class="badges-summary-label">Chapters touched</span>
      </div>
      <div class="badges-summary-stat">
        <span class="badges-summary-value">${stats.exploredCourses}</span>
        <span class="badges-summary-label">Courses explored</span>
      </div>
    `;

    const grid = document.createElement('section');
    grid.className = 'badges-grid';
    badges.forEach((badge) => {
      grid.appendChild(createBadgeCard(badge, unlockedBadges[badge.id]));
    });

    body.appendChild(summary);
    body.appendChild(grid);
  } catch (error) {
    console.error('Failed to load badges view:', error);

    subtitle.textContent = 'Could not load badge progress';

    const errorState = document.createElement('section');
    errorState.className = 'profile-empty';

    const errorTitle = document.createElement('h3');
    errorTitle.textContent = 'Badges unavailable';

    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'We could not load your badges right now. Please try again.';

    const retryButton = document.createElement('button');
    retryButton.type = 'button';
    retryButton.className = 'settings-button';
    retryButton.textContent = 'Retry';
    retryButton.addEventListener('click', () => {
      screenRootEl.innerHTML = '';
      void renderBadgesView(screenRootEl);
    });

    errorState.appendChild(errorTitle);
    errorState.appendChild(errorMessage);
    errorState.appendChild(retryButton);
    body.appendChild(errorState);
  }

  screen.appendChild(header);
  screen.appendChild(body);
  screenRootEl.appendChild(screen);
}
