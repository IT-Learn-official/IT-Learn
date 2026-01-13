//Author: https://github.com/broodje565
import { getTrialStats } from '../services/trialMode.js';

export function showTrialCompletionModal(container, onRegister, onDismiss) {
  const existing = container.querySelector('.trial-modal-overlay');
  if (existing) existing.remove();
  
  const trialStats = getTrialStats();
  
  const overlay = document.createElement('div');
  overlay.className = 'trial-modal-overlay';
  
  const modal = document.createElement('div');
  modal.className = 'trial-modal';
  
  const header = document.createElement('div');
  header.className = 'trial-modal-header';
  
  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'trial-modal-close';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.innerHTML = '×';
  closeBtn.addEventListener('click', () => {
    overlay.remove();
    if (onDismiss) onDismiss();
  });
  
  header.appendChild(closeBtn);
  
  const content = document.createElement('div');
  content.className = 'trial-modal-content';
  
  const titleEl = document.createElement('h2');
  titleEl.className = 'trial-modal-title';
  titleEl.textContent = '🎉 Excellent Progress!';
  
  const messageEl = document.createElement('p');
  messageEl.className = 'trial-modal-message';
  messageEl.textContent = 'You\'ve completed the trial chapter! To continue learning and track your progress, please create your free account.';
  
  const benefitsEl = document.createElement('div');
  benefitsEl.className = 'trial-modal-benefits';
  
  const benefitsTitle = document.createElement('p');
  benefitsTitle.className = 'trial-modal-benefits-title';
  benefitsTitle.textContent = 'Your account will include:';
  
  const benefitsList = document.createElement('ul');
  benefitsList.className = 'trial-modal-benefits-list';
  
  const benefits = [
    'Access to all courses and chapters',
    'Progress tracking and achievements',
    'Practice exercises and quizzes',
    'XP and streak system',
    'Certificate of completion',
  ];
  
  benefits.forEach(benefit => {
    const li = document.createElement('li');
    li.className = 'trial-modal-benefit-item';
    li.textContent = '✓ ' + benefit;
    benefitsList.appendChild(li);
  });
  
  benefitsEl.appendChild(benefitsTitle);
  benefitsEl.appendChild(benefitsList);
  
  const statsEl = document.createElement('div');
  statsEl.className = 'trial-modal-stats';
  
  const statText = document.createElement('p');
  statText.textContent = `You've completed ${trialStats.chaptersCompleted} chapter(s) in trial mode`;
  
  statsEl.appendChild(statText);
  
  content.appendChild(titleEl);
  content.appendChild(messageEl);
  content.appendChild(benefitsEl);
  content.appendChild(statsEl);
  
  const actions = document.createElement('div');
  actions.className = 'trial-modal-actions';
  
  const registerBtn = document.createElement('button');
  registerBtn.type = 'button';
  registerBtn.className = 'trial-modal-button trial-modal-button--primary';
  registerBtn.textContent = 'Create Account Now';
  registerBtn.addEventListener('click', () => {
    overlay.remove();
    if (onRegister) onRegister();
  });
  
  const laterBtn = document.createElement('button');
  laterBtn.type = 'button';
  laterBtn.className = 'trial-modal-button trial-modal-button--secondary';
  laterBtn.textContent = 'Maybe later';
  laterBtn.addEventListener('click', () => {
    overlay.remove();
    if (onDismiss) onDismiss();
  });
  
  actions.appendChild(registerBtn);
  actions.appendChild(laterBtn);
  
  content.appendChild(actions);
  
  modal.appendChild(header);
  modal.appendChild(content);
  overlay.appendChild(modal);

  container.appendChild(overlay);

  setTimeout(() => {
    overlay.classList.add('is-visible');
  }, 10);
}

export function createTrialInfoBanner(container, courseTitle) {
  const banner = document.createElement('div');
  banner.className = 'trial-info-banner';
  
  const badgeEl = document.createElement('span');
  badgeEl.className = 'trial-info-badge';
  badgeEl.textContent = 'TRIAL MODE';
  
  const messageEl = document.createElement('span');
  messageEl.className = 'trial-info-message';
  messageEl.textContent = `You're trying "${courseTitle}" for free. Finish this chapter, then create a free account to unlock every chapter.`;
  
  banner.appendChild(badgeEl);
  banner.appendChild(messageEl);
  
  container.appendChild(banner);
  
  return banner;
}

export function createTrialBadge(isTrialActive) {
  if (!isTrialActive) return null;
  
  const badge = document.createElement('span');
  badge.className = 'trial-badge';
  badge.title = 'Trial mode - Free lesson';
  badge.innerHTML = '<span class="trial-badge-icon">🎓</span> Trial';
  
  return badge;
}
