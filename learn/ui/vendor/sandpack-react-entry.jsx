import React, { useState, useEffect, useRef } from 'react';
import ReactDOMClient from './react-dom-client-shim.js';
import * as ReactDOM from 'react-dom';
import { Sandpack, SandpackProvider, SandpackCodeEditor, SandpackPreview } from '@codesandbox/sandpack-react';
import { nightOwl } from '@codesandbox/sandpack-themes';

/*
  Mounts a Sandpack editor + preview into arbitrary DOM nodes using React portals.

  Usage:
    const api = mountSandpack({
      editorHost: editorElement,
      previewHost: previewElement,
      files: { '/index.html': '<html>...</html>' },
      template: 'static',
      onChange: (path, code, files) => { // persist },
      options: { // sandpack options }
    });

    // later to update files externally:
    api.setFiles(newFiles);
    // to destroy:
    api.destroy();
*/

function SandpackApp({ initialFiles = {}, template = 'static', onChange, editorHost, previewHost, options = {} }) {
  const [filesState, setFilesState] = useState(initialFiles || {});
  const firstPathRef = useRef(Object.keys(initialFiles || {})[0] || '/index.html');

  useEffect(() => {
    // keep first path up to date when initialFiles changes
    const keys = Object.keys(initialFiles || {});
    if (keys.length) firstPathRef.current = keys[0];
    setFilesState(initialFiles || {});
  }, [initialFiles]);

  // expose setter via DOM prop so the outer mount function can update files
  useEffect(() => {
    try {
      if (editorHost && typeof editorHost.__sandpack_setFiles__ === 'function') {
        editorHost.__sandpack_setFiles__(setFilesState);
      }
    } catch (e) {
      // no-op
    }
  }, [editorHost]);

  function handleEditorChange(value, path = firstPathRef.current) {
    setFilesState((prev) => {
      const next = { ...prev, [path]: value };
      return next;
    });
    try {
      onChange?.(path, value, { ...filesState, [path]: value });
    } catch (e) {
      // swallow
    }
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Sandpack template={template} files={filesState} theme={nightOwl} options={options} />
    </div>
  );
}

export function mountSandpack({ editorHost, previewHost, files = {}, template = 'static', onChange, options = {} } = {}) {
  if (!editorHost) throw new Error('editorHost is required');

  const rootDiv = document.createElement('div');
  rootDiv.style.width = '100%';
  rootDiv.style.height = '100%';
  rootDiv.style.minHeight = '0';
  // helpful debug marker so the root is easy to find in the DOM
  try {
    rootDiv.dataset.sandpackRoot = '1';
    if (!rootDiv.style.minHeight || rootDiv.style.minHeight === '0px') rootDiv.style.minHeight = '200px';
  } catch (e) {}
  editorHost.appendChild(rootDiv);
  const root = ReactDOMClient.createRoot(rootDiv);

  // holder for internal setter
  let setFilesInternal = null;

  // attach a setter receiver on editorHost so the outer caller can set files later
  editorHost.__sandpack_setFiles__ = (setter) => {
    setFilesInternal = setter;
  };

  root.render(
    <SandpackApp initialFiles={files} template={template} onChange={onChange} editorHost={editorHost} previewHost={previewHost} options={options} />
  );

  const api = {
    destroy() {
      try {
        root.unmount();
      } catch (e) {}
      try {
        rootDiv.remove();
      } catch (e) {}
      try {
        delete editorHost.__sandpack_setFiles__;
      } catch (e) {}
      try {
        delete editorHost.__sandpack_api__;
      } catch (e) {}
    },
    setFiles(newFiles) {
      if (setFilesInternal) setFilesInternal(newFiles || {});
    },
    rootDiv,
  };

  try { window.__lastSandpackMount = api; } catch (e) {}
  try { editorHost.__sandpack_api__ = api; } catch (e) {}

  return api;
}

export default mountSandpack;
