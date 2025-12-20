//author: https://github.com/nhermab
//licence: MIT
// Web-LLM engine lifecycle management for TeacherBot

import { CreateMLCEngine } from "../../web-llm-lib/web-llm.esm.js";

// The specialized coding model ID
const modelId = "Qwen2.5-Coder-0.5B-Instruct-q4f16_1-MLC";

// Local model path (currently disabled - Web-LLM's browser cache works great!)
const localModelPath = null;

// Service state
let engine = null;
let status = 'idle';
let initProgress = 0;
let useLocalModel = false;

/**
 * Get the current status of the Teacher engine.
 *
 * @returns {{status: string, progress: number}}
 */
export function getTeacherBotStatus() {
  return {
    status,
    progress: initProgress
  };
}

/**
 * Initialize the Teacher model.
 */
export async function initTeacherBot() {
  if (status === 'ready' && engine) return;
  if (status === 'initializing') return;

  try {
    status = 'initializing';
    initProgress = 0;

    console.log(`Starting to load teacher model ${modelId}...`);

    engine = await CreateMLCEngine(modelId, {
      initProgressCallback: (report) => {
        initProgress = report.progress;
        console.log(`Loading teacher model: ${Math.round(report.progress * 100)}%`);
      }
    });

    status = 'ready';
    initProgress = 1;
    console.log('Teacher is online and ready.');
  } catch (err) {
    status = 'error';
    console.error('Failed to initialize teacher model:', err);
    throw err;
  }
}

/**
 * Get the engine instance (for internal module use only).
 *
 * @returns {Object|null} The engine instance or null
 */
export function getEngine() {
  return engine;
}

/**
 * Check if engine is ready.
 *
 * @returns {boolean} True if engine is ready
 */
export function isEngineReady() {
  return status === 'ready' && engine !== null;
}

/**
 * Debug teacher environment info.
 */
export function debugTeacherBotEnv() {
  console.log('Teacher Environment Info:', {
    status,
    modelId,
    engineInitialized: !!engine,
    webGPUAvailable: !!navigator.gpu
  });
}

/**
 * Debug Web-LLM configuration (placeholder).
 */
export function debugWebLLMConfig() {
  console.warn('debugWebLLMConfig is not implemented.');
}

