import { navigateTo } from '../state/router.js';
import {
  buyStoreItem,
  getCoins,
  getHearts,
  getInventory,
  getStoreItems,
  updateSidebarStats,
} from '../state/gamificationState.js';

function createSummaryCard(icon, title, value) {
  const card = document.createElement('article');
  card.className = 'store-summary-card';
  card.innerHTML = `
    <div class="store-summary-icon">${icon}</div>
    <div class="store-summary-text">
      <span class="store-summary-title">${title}</span>
      <strong class="store-summary-value">${value}</strong>
    </div>
  `;
  return card;
}

function createStoreItemCard(item, onPurchase) {
  const card = document.createElement('article');
  card.className = 'store-item-card';

  const icon = document.createElement('div');
  icon.className = 'store-item-icon';
  icon.textContent = item.icon;

  const content = document.createElement('div');
  content.className = 'store-item-content';

  const title = document.createElement('h3');
  title.className = 'store-item-title';
  title.textContent = item.title;

  const desc = document.createElement('p');
  desc.className = 'store-item-description';
  desc.textContent = item.description;

  const footer = document.createElement('div');
  footer.className = 'store-item-footer';

  const price = document.createElement('span');
  price.className = 'store-item-price';
  price.textContent = `${item.price} 🪙`;

  const buyButton = document.createElement('button');
  buyButton.type = 'button';
  buyButton.className = 'btn store-item-buy';
  buyButton.textContent = 'Buy';
  buyButton.addEventListener('click', () => onPurchase(item));

  footer.appendChild(price);
  footer.appendChild(buyButton);

  content.appendChild(title);
  content.appendChild(desc);
  content.appendChild(footer);

  card.appendChild(icon);
  card.appendChild(content);

  return card;
}

function showShopRewardModal(reward, { title = 'Reward Box 🎰' } = {}) {
  if (!reward) return;

  const overlay = document.createElement('div');
  overlay.className = 'post-lesson-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Reward box');

  const frame = document.createElement('div');
  frame.className = 'lesson-flow-frame';

  const slide = document.createElement('div');
  slide.className = 'lesson-slide slide-visible';

  const card = document.createElement('div');
  card.className = 'lesson-slide__card';

  const h2 = document.createElement('h2');
  h2.className = 'lesson-slide__title';
  h2.textContent = title;

  const body = document.createElement('div');
  body.className = 'lesson-slide__body';
  body.innerHTML = `
    <div class="reward-box-wrap">
      <button class="reward-box" aria-label="Open reward box">
        <span class="reward-box__icon">🎁</span>
        <span class="reward-box__hint">Tap to reveal!</span>
      </button>
      <div class="reward-reveal" hidden></div>
    </div>
  `;

  const footer = document.createElement('footer');
  footer.className = 'lesson-slide__footer';

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'btn btn-primary lesson-slide__continue';
  closeBtn.textContent = 'Close';
  closeBtn.hidden = true;
  closeBtn.addEventListener('click', () => {
    overlay.remove();
    document.body.classList.remove('overlay-open');
  });

  footer.appendChild(closeBtn);
  card.appendChild(h2);
  card.appendChild(body);
  card.appendChild(footer);
  slide.appendChild(card);
  frame.appendChild(slide);
  overlay.appendChild(frame);

  const box = body.querySelector('.reward-box');
  const reveal = body.querySelector('.reward-reveal');

  if (box && reveal) {
    function openNow() {
      box.classList.add('is-opening');
      box.disabled = true;

      setTimeout(() => {
        const wrap = box.parentElement;
        if (wrap) {
          wrap.insertBefore(reveal, box);
          box.remove();
        }
        reveal.hidden = false;
        reveal.innerHTML = `
          <div class="reward-item rarity-${reward.rarity}">
            <span class="reward-item__icon">${reward.icon || '🎁'}</span>
            <span class="reward-item__label">${reward.label}</span>
            <span class="reward-item__rarity">${reward.rarity.toUpperCase()}</span>
          </div>
        `;
        reveal.classList.add('is-visible');
        closeBtn.hidden = false;
      }, 750);
    }

    box.addEventListener('click', function handler() {
      box.removeEventListener('click', handler);
      openNow();
    });

    setTimeout(openNow, 200);
  }

  document.body.classList.add('overlay-open');
  document.body.appendChild(overlay);
}

export function renderStoreView(screenRootEl) {
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
  title.textContent = 'Shop';

  const subtitle = document.createElement('p');
  subtitle.className = 'screen-header-subtitle';
  subtitle.textContent = 'Spend coins on boosts and streak protection.';

  mainHeader.appendChild(title);
  mainHeader.appendChild(subtitle);
  header.appendChild(backButton);
  header.appendChild(mainHeader);

  const body = document.createElement('div');
  body.className = 'screen-body store-body';

  const summaryGrid = document.createElement('div');
  summaryGrid.className = 'store-summary-grid';

  const list = document.createElement('div');
  list.className = 'store-item-grid';

  const status = document.createElement('div');
  status.className = 'store-status';
  status.setAttribute('aria-live', 'polite');

  function refresh() {
    const hearts = getHearts();
    const inv = getInventory();
    const coins = getCoins();

    summaryGrid.innerHTML = '';
    summaryGrid.appendChild(createSummaryCard('🪙', 'Coins', String(coins)));
    summaryGrid.appendChild(createSummaryCard('❤️', 'Hearts', `${hearts.current}/${hearts.max}`));
    summaryGrid.appendChild(createSummaryCard('🧊', 'Streak freezes', String(inv.streakFreezes || 0)));
    summaryGrid.appendChild(createSummaryCard('🚀', '2x XP boosts', String(inv.doubleXp || 0)));

    list.innerHTML = '';
    getStoreItems().forEach((item) => {
      list.appendChild(createStoreItemCard(item, (selected) => {
        const result = buyStoreItem(selected.id);
        if (!result.success) {
          status.textContent = result.error || 'Purchase failed.';
          status.classList.add('is-error');
          status.classList.remove('is-success');
          return;
        }

        if (result.reward) {
          status.textContent = `Opened ${selected.title}: ${result.reward.label}`;
          showShopRewardModal(result.reward, { title: selected.title });
        } else {
          status.textContent = `Purchased ${selected.title}!`;
        }
        status.classList.add('is-success');
        status.classList.remove('is-error');
        updateSidebarStats();
        refresh();
      }));
    });
  }

  refresh();

  body.appendChild(summaryGrid);
  body.appendChild(list);
  body.appendChild(status);

  screen.appendChild(header);
  screen.appendChild(body);
  screenRootEl.appendChild(screen);
}
