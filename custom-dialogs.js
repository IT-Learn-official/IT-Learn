(function () {
  if (window.showAlert && window.showConfirm) {
    return;
  }

  const STYLE_ID = 'custom-dialogs-style';
  const OVERLAY_ID = 'custom-dialogs-overlay';

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #${OVERLAY_ID} {
        position: fixed;
        inset: 0;
        z-index: 2147483646;
        display: none;
        align-items: center;
        justify-content: center;
        background: var(--overlay-bg, rgba(5, 10, 24, 0.72));
        backdrop-filter: blur(8px);
        padding: 16px;
      }

      #${OVERLAY_ID}.open {
        display: flex;
      }

      #${OVERLAY_ID} .dialog-card {
        width: min(520px, 100%);
        border: 1px solid var(--border-color, rgba(255,255,255,0.16));
        border-radius: 16px;
        background: linear-gradient(180deg, var(--dialog-card-bg-start, rgba(16, 26, 51, 0.98)), var(--dialog-card-bg-end, rgba(12, 20, 40, 0.98)));
        color: var(--color-text, #ecf2ff);
        box-shadow: var(--shadow-elevated, 0 24px 80px rgba(0,0,0,0.45));
        padding: 18px;
        display: grid;
        gap: 12px;
      }

      #${OVERLAY_ID} .dialog-title {
        margin: 0;
        font-size: 1.05rem;
        color: var(--color-text, #dbeafe);
      }

      #${OVERLAY_ID} .dialog-message {
        margin: 0;
        color: var(--color-text-soft, #c8d5f2);
        line-height: 1.55;
        white-space: pre-wrap;
      }

      #${OVERLAY_ID} .dialog-actions {
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        gap: 8px;
      }

      #${OVERLAY_ID} .dialog-btn {
        font: inherit;
        color: var(--color-text, #ecf2ff);
        border-radius: 10px;
        border: 1px solid var(--border-color, rgba(255,255,255,0.2));
        padding: 8px 14px;
        cursor: pointer;
        transition: transform 120ms ease, opacity 120ms ease;
      }

      #${OVERLAY_ID} .dialog-btn:hover {
        transform: translateY(-1px);
      }

      #${OVERLAY_ID} .dialog-btn.secondary {
        background: rgba(255, 255, 255, 0.08);
      }

      #${OVERLAY_ID} .dialog-btn.primary {
        background: var(--button-primary-bg, linear-gradient(140deg, #155e75, #164e63));
        border-color: var(--button-primary-border, rgba(34, 211, 238, 0.4));
      }

      #${OVERLAY_ID} .dialog-btn.danger {
        background: var(--danger-soft, rgba(239, 68, 68, 0.22));
        border-color: var(--danger, rgba(239, 68, 68, 0.42));
      }
    `;

    document.head.appendChild(style);
  }

  function ensureOverlay() {
    let overlay = document.getElementById(OVERLAY_ID);
    if (overlay) return overlay;

    overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);
    return overlay;
  }

  function createDialog(opts) {
    const options = opts || {};
    const overlay = ensureOverlay();
    overlay.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'dialog-card';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-modal', 'true');

    const title = document.createElement('h3');
    title.className = 'dialog-title';
    title.textContent = options.title || 'Notice';

    const message = document.createElement('p');
    message.className = 'dialog-message';
    message.textContent = options.message || '';

    const actions = document.createElement('div');
    actions.className = 'dialog-actions';

    card.appendChild(title);
    card.appendChild(message);
    card.appendChild(actions);
    overlay.appendChild(card);

    return { overlay, actions };
  }

  function showAlert(message, options) {
    return new Promise((resolve) => {
      ensureStyles();
      const ui = createDialog({
        title: options && options.title ? options.title : 'Notification',
        message: String(message || ''),
      });

      const okBtn = document.createElement('button');
      okBtn.type = 'button';
      okBtn.className = 'dialog-btn primary';
      okBtn.textContent = (options && options.okText) || 'OK';

      const close = () => {
        ui.overlay.classList.remove('open');
        ui.overlay.setAttribute('aria-hidden', 'true');
        resolve();
      };

      okBtn.addEventListener('click', close);
      ui.actions.appendChild(okBtn);

      ui.overlay.classList.add('open');
      ui.overlay.setAttribute('aria-hidden', 'false');
      okBtn.focus();
    });
  }

  function showConfirm(message, options) {
    return new Promise((resolve) => {
      ensureStyles();
      const ui = createDialog({
        title: options && options.title ? options.title : 'Please confirm',
        message: String(message || ''),
      });

      const cancelBtn = document.createElement('button');
      cancelBtn.type = 'button';
      cancelBtn.className = 'dialog-btn secondary';
      cancelBtn.textContent = (options && options.cancelText) || 'Cancel';

      const confirmBtn = document.createElement('button');
      confirmBtn.type = 'button';
      const kind = options && options.kind === 'danger' ? 'danger' : 'primary';
      confirmBtn.className = `dialog-btn ${kind}`;
      confirmBtn.textContent = (options && options.confirmText) || 'Confirm';

      const close = (value) => {
        ui.overlay.classList.remove('open');
        ui.overlay.setAttribute('aria-hidden', 'true');
        resolve(Boolean(value));
      };

      cancelBtn.addEventListener('click', () => close(false));
      confirmBtn.addEventListener('click', () => close(true));
      ui.overlay.addEventListener('click', (event) => {
        if (event.target === ui.overlay) {
          close(false);
        }
      }, { once: true });

      ui.actions.appendChild(cancelBtn);
      ui.actions.appendChild(confirmBtn);

      ui.overlay.classList.add('open');
      ui.overlay.setAttribute('aria-hidden', 'false');
      confirmBtn.focus();
    });
  }

  window.showAlert = showAlert;
  window.showConfirm = showConfirm;
})();
