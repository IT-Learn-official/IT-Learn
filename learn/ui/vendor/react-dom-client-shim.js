import * as client from 'react-dom/client';
import * as dom from 'react-dom';

const clientShim = {};
for (const k in client) {
  try {
    clientShim[k] = client[k];
  } catch (e) {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn(`[react-dom-client-shim] failed to copy export \"${k}\":`, e && e.message ? e.message : e);
    }
  }
}

if (typeof clientShim.createPortal !== 'function' && typeof dom.createPortal === 'function') {
  // Provide a graceful fallback in environments where `react-dom/client` doesn't expose
  // `createPortal`. This is intended as a developer-side shim; prefer the official
  // `react-dom/client` package with the expected exports for production use.
  clientShim.createPortal = dom.createPortal;
  if (typeof console !== 'undefined' && console.warn) {
    console.warn('[react-dom-client-shim] Using fallback createPortal from react-dom; consider updating to a react-dom/client build that exports createPortal.');
  }
}

export default clientShim;
