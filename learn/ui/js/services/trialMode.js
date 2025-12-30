//author: https://github.com/broodje565
const TRIAL_SESSION_KEY = 'itlearn_trial_session';
const TRIAL_PROGRESS_KEY = 'itlearn_trial_progress';

export function initializeTrialSession() {
  const sessionId = generateSessionId();
  
  const trialSession = {
    sessionId,
    startedAt: Date.now(),
    courseId: null,
    trialCompleted: false,
  };
  
  localStorage.setItem(TRIAL_SESSION_KEY, JSON.stringify(trialSession));
  return sessionId;
}

export function getTrialSession() {
  const stored = localStorage.getItem(TRIAL_SESSION_KEY);
  if (!stored) return null;
  
  try {
    const session = JSON.parse(stored);
    return session;
  } catch (error) {
    console.error('Failed to parse trial session:', error);
    return null;
  }
}

export function isTrialModeActive() {
  const session = getTrialSession();
  return session !== null && !session.trialCompleted;
}

export function startTrialCourse(courseId) {
  const session = getTrialSession();
  if (!session) {
    initializeTrialSession();
  }
  
  const updatedSession = getTrialSession();
  if (updatedSession) {
    updatedSession.courseId = courseId;
    updatedSession.trialStartedAt = Date.now();
    localStorage.setItem(TRIAL_SESSION_KEY, JSON.stringify(updatedSession));
    return true;
  }
  
  return false;
}

export function saveTrialProgress(progressData) {
  let progress = getTrialProgress();
  if (!progress) {
    progress = { chapters: [] };
  }
  
  const existing = progress.chapters.findIndex(
    ch => ch.courseId === progressData.courseId && ch.chapterId === progressData.chapterId
  );
  
  if (existing >= 0) {
    progress.chapters[existing] = {
      ...progress.chapters[existing],
      ...progressData,
      completedAt: Date.now(),
    };
  } else {
    progress.chapters.push({
      ...progressData,
      completedAt: Date.now(),
    });
  }
  
  progress.lastUpdated = Date.now();
  localStorage.setItem(TRIAL_PROGRESS_KEY, JSON.stringify(progress));
}

export function getTrialProgress() {
  const stored = localStorage.getItem(TRIAL_PROGRESS_KEY);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to parse trial progress:', error);
    return null;
  }
}

export function completeTrialCourse() {
  const session = getTrialSession();
  if (!session) return false;
  
  session.trialCompleted = true;
  session.completedAt = Date.now();
  localStorage.setItem(TRIAL_SESSION_KEY, JSON.stringify(session));
  return true;
}

export function isTrialCompleted() {
  const session = getTrialSession();
  return session !== null && session.trialCompleted === true;
}

export function getTrialDataForLinking() {
  const session = getTrialSession();
  const progress = getTrialProgress();
  
  if (!session) return null;
  
  return {
    trialSessionId: session.sessionId,
    trialCourseId: session.courseId,
    trialProgress: progress ? progress.chapters : [],
    trialStartedAt: session.startedAt,
    trialCompletedAt: session.completedAt,
  };
}

export function clearTrialSession() {
  localStorage.removeItem(TRIAL_SESSION_KEY);
  localStorage.removeItem(TRIAL_PROGRESS_KEY);
}

function generateSessionId() {
  return `trial_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

export function getTrialStats() {
  const session = getTrialSession();
  const progress = getTrialProgress();
  
  if (!session) {
    return { isActive: false, chaptersCompleted: 0 };
  }
  
  return {
    isActive: !session.trialCompleted,
    sessionId: session.sessionId,
    courseId: session.courseId,
    chaptersCompleted: progress ? progress.chapters.length : 0,
    started: new Date(session.startedAt),
    completed: session.completedAt ? new Date(session.completedAt) : null,
  };
}
