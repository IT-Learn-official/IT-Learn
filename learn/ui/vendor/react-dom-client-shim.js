import * as client from 'react-dom/client';
import * as dom from 'react-dom';

const clientShim = {};
for (const k in client) {
  try {
    clientShim[k] = client[k];
  } catch (e) {}
}

if (typeof clientShim.createPortal !== 'function' && typeof dom.createPortal === 'function') {
  clientShim.createPortal = dom.createPortal;
}

export default clientShim;
