(() => {
  const consentKey = 'itlearn.analyticsConsent';
  const measurementId = 'G-4RL6H7W1C1';
  let analyticsLoaded = false;

  const getConsentState = () => {
    try {
      return localStorage.getItem(consentKey);
    } catch (error) {
      return null;
    }
  };

  const setConsentState = (value) => {
    try {
      localStorage.setItem(consentKey, value);
    } catch (error) {
      return;
    }
  };

  const ensureBanner = () => {
    let banner = document.getElementById('cookie-banner');

    if (!banner) {
      banner = document.createElement('div');
      banner.className = 'cookie-banner';
      banner.id = 'cookie-banner';
      banner.hidden = true;
      banner.innerHTML = `
        <div class="cookie-banner__content">
          <p>We use analytics cookies to understand how people use IT Learn. Choose whether to allow non-essential tracking.</p>
          <a href="/privacy/index.html" target="_blank" rel="noopener noreferrer">Privacy policy</a>
        </div>
        <div class="cookie-banner__actions">
          <button type="button" class="btn btn-secondary" id="cookie-reject">Reject</button>
          <button type="button" class="btn btn-primary" id="cookie-accept">Accept</button>
        </div>
      `;
      document.body.appendChild(banner);
    }

    return banner;
  };

  const showBanner = () => {
    ensureBanner().hidden = false;
  };

  const hideBanner = () => {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.hidden = true;
    }
  };

  const loadAnalytics = () => {
    if (analyticsLoaded) return;

    analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { anonymize_ip: true });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  };

  const acceptAnalytics = () => {
    setConsentState('accepted');
    hideBanner();
    loadAnalytics();
  };

  const rejectAnalytics = () => {
    setConsentState('rejected');
    hideBanner();
  };

  const bindBannerActions = () => {
    document.getElementById('cookie-accept')?.addEventListener('click', acceptAnalytics);
    document.getElementById('cookie-reject')?.addEventListener('click', rejectAnalytics);
  };

  const init = () => {
    const consentState = getConsentState();

    if (consentState === 'accepted') {
      loadAnalytics();
      hideBanner();
      return;
    }

    bindBannerActions();

    if (consentState === 'rejected') {
      hideBanner();
      return;
    }

    showBanner();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  window.ITLearnConsent = {
    acceptAnalytics,
    rejectAnalytics,
    loadAnalytics,
  };
})();