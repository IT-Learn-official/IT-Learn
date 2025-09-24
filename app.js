// ---------------------------- Elementen ----------------------------
const moduleButtons = document.getElementById("module-buttons");
const lessonSection = document.getElementById("lesson-section");
const lessonTitle = document.getElementById("lesson-title");
const lessonContent = document.getElementById("lesson-content");
const quizSection = document.getElementById("quiz-section");
const quizForm = document.getElementById("quiz-form");
const submitQuizBtn = document.getElementById("submit-quiz");
const quizFeedback = document.getElementById("quiz-feedback");
const backToModulesBtn = document.getElementById("back-to-modules");
const nextLessonBtn = document.getElementById("next-lesson");
const progressInfo = document.getElementById("progress-info");
const badgesInfo = document.getElementById("badges-info");
const progressBar = document.getElementById("progress-bar");
const xpInfo = document.getElementById("xp-info");
const levelInfo = document.getElementById("level-info");
const streakInfo = document.getElementById("streak-info");
const missionsInfo = document.getElementById("missions-info");
const mascotBubble = document.getElementById("mascot-bubble");
const correctSound = document.getElementById("audio-correct");
const wrongSound = document.getElementById("audio-wrong");

// ---------------------------- Supabase setup (vervang hieronder) ----------------------------
// Zet je eigen Supabase URL en anon key hieronder (vervang de placeholders)
const SUPABASE_URL = "https://otgkiqornzlqceurjnse.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90Z2tpcW9ybnpscWNldXJqbnNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMDc1OTAsImV4cCI6MjA2OTY4MzU5MH0.FYiilcpzRscaCEQNqKTBhpIOY1uynGS-exv6eUy90VI";
let supabase = null;
let currentUser = null;

// laadt de supabase client (script moet in HTML aanwezig zijn: @supabase/supabase-js)
if (window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  console.warn("Supabase not initialized — zorg dat je de URL & ANON key hebt ingevuld en de supabase-js script tag in je HTML.");
}

// ---------------------------- Lokale state ----------------------------
let currentModule = null;
let currentLessonIndex = 0;

// ---------------------------- Opslag ----------------------------
// Local fallback (wordt gesynchroniseerd met Supabase als gebruiker ingelogd is)
let progress = JSON.parse(localStorage.getItem("progress")) || {};
let xp = parseInt(localStorage.getItem("xp")) || 0;
let streak = parseInt(localStorage.getItem("streak")) || 0;
let lastActive = localStorage.getItem("lastActive") || null;
let missions = JSON.parse(localStorage.getItem("missions")) || {};
let mistakes = JSON.parse(localStorage.getItem("mistakes")) || [];

// ---------------------------- Mascot Bubble ----------------------------
function showMascotMessage(message, duration = 4000) {
  if (!mascotBubble) return;
  mascotBubble.textContent = message;
  mascotBubble.classList.add("visible");
  setTimeout(() => {
    mascotBubble.classList.remove("visible");
  }, duration);
}

// ---------------------------- Helper functies ----------------------------

// NOTE: saveProgress is uitgebreid om ook naar Supabase te schrijven wanneer ingelogd.
// Het houdt lokale storage voor offline-first werking.
async function saveProgress() {
  // Update localStorage first
  localStorage.setItem("progress", JSON.stringify(progress));
  localStorage.setItem("xp", xp);
  localStorage.setItem("streak", streak);
  localStorage.setItem("missions", JSON.stringify(missions));
  localStorage.setItem("mistakes", JSON.stringify(mistakes));
  localStorage.setItem("lastActive", new Date().toDateString());

  // If supabase available and user logged in, persist there too
  if (supabase && currentUser) {
    try {
      const payload = {
        user_id: currentUser.id,
        progress: progress,
        xp: xp,
        streak: streak,
        last_active: new Date().toISOString().split("T")[0],
        missions: missions,
        mistakes: mistakes
      };
      // Use upsert on user_id to insert or update row (onConflict requires PostgREST configured; supabase supports upsert)
      const { error } = await supabase
        .from('user_progress')
        .upsert([payload], { onConflict: 'user_id' });
      if (error) console.error("Supabase save error:", error);
    } catch (err) {
      console.error("Failed to save to Supabase:", err);
    }
  }
}

// Load user progress from Supabase if logged in; otherwise keep localStorage
async function loadProgressFromSupabase() {
  if (!supabase || !currentUser) return;

  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', currentUser.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows returned (depends on PG REST error codes) — handle gracefully
      console.error("Error reading user_progress:", error);
    }

    if (data) {
      // Overwrite local variables with remote values (but keep fallback)
      progress = data.progress || {};
      xp = typeof data.xp === 'number' ? data.xp : (xp || 0);
      streak = typeof data.streak === 'number' ? data.streak : (streak || 0);
      lastActive = data.last_active || lastActive;
      missions = data.missions || {};
      mistakes = data.mistakes || [];
      // persist locally for offline use
      localStorage.setItem("progress", JSON.stringify(progress));
      localStorage.setItem("xp", xp);
      localStorage.setItem("streak", streak);
      localStorage.setItem("missions", JSON.stringify(missions));
      localStorage.setItem("mistakes", JSON.stringify(mistakes));
      localStorage.setItem("lastActive", lastActive || new Date().toDateString());
    } else {
      // No row yet — create one so next saves will update the row
      const insertPayload = {
        user_id: currentUser.id,
        progress: progress,
        xp: xp,
        streak: streak,
        last_active: lastActive || new Date().toISOString().split("T")[0],
        missions: missions,
        mistakes: mistakes
      };
      const { error: insertErr } = await supabase.from('user_progress').insert([insertPayload]);
      if (insertErr) console.error("Error creating user_progress row:", insertErr);
    }
  } catch (err) {
    console.error("loadProgressFromSupabase failed:", err);
  }
}

// Call this during init to set up auth listener and load remote data if logged in.
async function initAuthAndData() {
  if (!supabase) {
    // nothing to init, keep localStorage-only mode
    updateProgressUI();
    updateStreak();
    showModules();
    return;
  }

  try {
    // get current session/user
    const userRes = await supabase.auth.getUser();
    const user = userRes?.data?.user || null;

    if (user) {
      currentUser = user;
      // load progress from Supabase (or create row)
      await loadProgressFromSupabase();
    } else {
      // if not logged in, but localStorage has saved userProgress use that
      // (we already loaded localStorage into variables at top)
    }

    // Setup auth state change listener to react to login/logout
    supabase.auth.onAuthStateChange(async (event, session) => {
      // event examples: "SIGNED_IN", "SIGNED_OUT"
      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        currentUser = session?.user || (await supabase.auth.getUser()).data.user;
        await loadProgressFromSupabase();
        updateProgressUI();
      } else if (event === "SIGNED_OUT") {
        currentUser = null;
        // keep local copy, do not delete localStorage — user might want offline data
      }
      // update UI (auth button text, etc.) if you have an auth btn
      updateAuthButtonUI();
    });

    updateAuthButtonUI();
  } catch (err) {
    console.error("initAuthAndData error:", err);
  }

  updateProgressUI();
  updateStreak();
  showModules();
}

function updateAuthButtonUI() {
  const authBtn = document.getElementById("auth-btn");
  if (!authBtn) return;
  if (currentUser) {
    authBtn.textContent = "Logout";
    authBtn.onclick = async () => {
      await supabase.auth.signOut();
      currentUser = null;
      updateAuthButtonUI();
      // remain on page (or redirect if desired)
    };
  } else {
    authBtn.textContent = "Login";
    authBtn.onclick = async () => {
      // redirect to provider (Google). Make sure you set redirect URLs in Google Console and Supabase settings.
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + window.location.pathname } // keep user on same page after login
      });
      if (error) console.error("OAuth error:", error);
    };
  }
}

// ---------------------------- updateStreak helper (keeps same semantics) ----------------------------
function updateStreak() {
  const today = new Date().toDateString();
  if (lastActive !== today) {
    const yesterday = new Date(Date.now() - 864e5).toDateString();
    if (lastActive === yesterday) streak++;
    else streak = 1;
    lastActive = today;
    // When streak changes, save both locally and remotely
    saveProgress();
  }
}

function getLevel() {
  return Math.floor(xp / 50) + 1;
}

// ---------------------------- UI Updates ----------------------------
function updateProgressUI() {
  let totalLessons = 0;
  let completedLessons = 0;
  for (const mod of modulesData) {
    totalLessons += mod.lessons.length;
    if (progress[mod.id]) completedLessons += Object.keys(progress[mod.id]).length;
  }
  progressInfo.textContent = `Je hebt ${completedLessons} van de ${totalLessons} lessen afgerond.`;
  const percent = totalLessons === 0 ? 0 : (completedLessons / totalLessons) * 100;
  progressBar.style.width = percent + "%";
  xpInfo.textContent = `XP: ${xp}`;
  levelInfo.textContent = `Level: ${getLevel()}`;
  streakInfo.textContent = `Streak: ${streak} dag${streak !== 1 ? "en" : ""} achter elkaar`;

  // Badges
  const badgesCount = Math.floor(completedLessons / 5);
  badgesInfo.innerHTML = "";
  for (let i = 0; i < badgesCount; i++) {
    const img = document.createElement("img");
    img.src = "icons/badge.png";
    img.alt = "Badge";
    img.className = "badge";
    badgesInfo.appendChild(img);
  }

  updateMissionsUI();
}

function updateMissionsUI() {
  const totalLessonsDone = Object.values(progress).reduce((acc, modObj) => acc + Object.keys(modObj).length, 0);

  const allMissions = [
    { id: "lessons10", text: "Behaal 10 lessen", condition: totalLessonsDone >= 10 },
    { id: "xp100", text: "Verdien 100 XP", condition: xp >= 100 },
    { id: "streak3", text: "Leer 3 dagen achter elkaar", condition: streak >= 3 }
  ];

  missionsInfo.innerHTML = "<strong>Missies:</strong><br>";
  allMissions.forEach(m => {
    if (!missions[m.id] && m.condition) {
      missions[m.id] = true;
      showMascotMessage(`🎉 Je hebt de missie "${m.text}" voltooid!`);
      // Save immediately when mission unlocked
      saveProgress();
    }
    const done = missions[m.id] ? "✅" : "❌";
    missionsInfo.innerHTML += `${done} ${m.text}<br>`;
  });
}

function isModuleUnlocked(moduleId) {
  const index = modulesData.findIndex(m => m.id === moduleId);
  if (index === 0) return true;
  const prev = modulesData[index - 1];
  return progress[prev.id] && Object.keys(progress[prev.id]).length === prev.lessons.length;
}

// ---------------------------- Modules & Lessen ----------------------------
function showLessonsList(moduleId) {
  currentModule = modulesData.find(m => m.id === moduleId);
  if (!currentModule) return;

  document.getElementById("modules-list").classList.add("hidden");
  quizSection.classList.add("hidden");
  lessonSection.classList.remove("hidden");
  submitQuizBtn.style.display = "none";
  quizFeedback.textContent = "";
  nextLessonBtn.classList.add("hidden");
  backToModulesBtn.style.display = "inline-block";

  lessonTitle.textContent = `Lessen in ${currentModule.title}`;
  lessonContent.innerHTML = "";
  const ul = document.createElement("ul");

  currentModule.lessons.forEach((lesson, index) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = lesson.title;
    btn.addEventListener("click", () => showLesson(moduleId, index));
    li.appendChild(btn);
    ul.appendChild(li);
  });

  lessonContent.appendChild(ul);
  showMascotMessage(`Kies een les in module "${currentModule.title}"`);
}

function showModules() {
  lessonSection.classList.add("hidden");
  document.getElementById("modules-list").classList.remove("hidden");
  quizSection.classList.add("hidden");
  quizFeedback.textContent = "";
  nextLessonBtn.classList.add("hidden");
  backToModulesBtn.style.display = "none";
  showMascotMessage("Kies een module om te starten!");
  renderModuleButtons();
  updateProgressUI();
}

function showLesson(moduleId, lessonIndex) {
  currentModule = modulesData.find(m => m.id === moduleId);
  currentLessonIndex = lessonIndex;
  const lesson = currentModule.lessons[lessonIndex];

  lessonTitle.textContent = lesson.title;
  lessonContent.innerHTML = lesson.content;
  quizFeedback.textContent = "";
  quizSection.classList.add("hidden");
  submitQuizBtn.style.display = "none";
  nextLessonBtn.classList.add("hidden");
  backToModulesBtn.style.display = "inline-block";
  document.getElementById("modules-list").classList.add("hidden");
  lessonSection.classList.remove("hidden");

  if (lesson.quiz && lesson.quiz.length > 0) {
    quizSection.classList.remove("hidden");
    submitQuizBtn.style.display = "inline-block";

    // Als het een mail-quiz is
    if (lesson.quiz[0].type === "mail") {
      // MAIL QUIZ root moet in HTML staan in lesson.content
      // Zorg dat er een <div id="mail-exercise-root"></div> in lesson.content zit
      buildQuiz(lesson.quiz);
    } else if (moduleId === "fouten-oefenen") {
      buildMistakesQuiz();
    } else {
      buildQuiz(lesson.quiz);
    }
  }


  showMascotMessage(`Je leest nu: "${lesson.title}"`);
}

function renderModuleButtons() {
  moduleButtons.innerHTML = "";
  modulesData.forEach(mod => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = mod.title;
    btn.disabled = false;
    btn.addEventListener("click", () => showLessonsList(mod.id));
    li.appendChild(btn);
    moduleButtons.appendChild(li);
  });
}

// ---------------------------- Quiz ----------------------------
function buildQuiz(quizArray) {
  if (quizArray[0].type === "mail") {
    buildMailExercise(quizArray);
    return;
  }

  quizForm.innerHTML = "";
  quiz.forEach((q, i) => {
    const questionEl = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = q.question;
    questionEl.appendChild(legend);

    q.options.forEach((opt, idx) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${i}`;
      radio.value = idx;
      label.appendChild(radio);
      label.appendChild(document.createTextNode(opt));
      questionEl.appendChild(label);
    });

    quizForm.appendChild(questionEl);
  });
  quizFeedback.textContent = "";
}



// ---------------------------- Mail-view Quiz ----------------------------
function buildMailExercise(quizArray) {
  const quiz = quizArray[0]; // eerste mail-quiz
  const root = document.getElementById("mail-exercise-root");
  if (!root) return;

  root.innerHTML = quiz.mailHtml;

  quiz.elements.forEach(el => {
    const element = root.querySelector(el.selector);
    if (!element) return;

    element.classList.remove("selected", "correct", "incorrect");
    element.addEventListener("click", () => {
      element.classList.toggle("selected");
    });

  });

  submitQuizBtn.style.display = "inline-block";
  quizFeedback.textContent = "";

  submitQuizBtn.onclick = () => {
    let allCorrect = true;

    quiz.elements.forEach(el => {
      const element = root.querySelector(el.selector);
      if (!element) return;
      const selected = element.classList.contains("selected");

      if (selected !== el.correct) allCorrect = false;

      element.classList.remove("correct", "incorrect");
      if (selected && el.correct) element.classList.add("correct");
      if (selected && !el.correct) element.classList.add("incorrect");
      if (!selected && el.correct) element.classList.add("incorrect");
    });

    if (allCorrect) {
      quizFeedback.textContent = "Goed gedaan! Alle verdachte elementen correct geselecteerd.";
      correctSound.play();
      xp += 10;
      markLessonCompleted(currentModule.id, currentModule.lessons[currentLessonIndex].id);
      updateProgressUI();
      saveProgress();
      nextLessonBtn.classList.remove("hidden");
      submitQuizBtn.style.display = "none";
      showMascotMessage("Je hebt deze les succesvol afgerond!");
    } else {
      quizFeedback.textContent = "Er is een of meer foutieve keuzes. Probeer opnieuw!";
      wrongSound.play();
    }
  };
}






function buildMistakesQuiz() {
  if (mistakes.length === 0) {
    quizForm.innerHTML = "<p>Je hebt geen fouten om te oefenen! Ga terug naar modules.</p>";
    submitQuizBtn.style.display = "none";
    return;
  }

  quizForm.innerHTML = "";
  mistakes.forEach((m, i) => {
    const moduleObj = modulesData.find(mod => mod.id === m.moduleId);
    if (!moduleObj) return;
    const lessonObj = moduleObj.lessons.find(les => les.id === m.lessonId);
    if (!lessonObj) return;
    if (!lessonObj.quiz || !lessonObj.quiz[m.questionIndex]) return;

    const questionData = lessonObj.quiz[m.questionIndex];
    const questionEl = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = questionData.question;
    questionEl.appendChild(legend);

    questionData.options.forEach((opt, idx) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${i}`;
      radio.value = idx;
      label.appendChild(radio);
      label.appendChild(document.createTextNode(opt));
      questionEl.appendChild(label);
    });

    quizForm.appendChild(questionEl);
  });
  quizFeedback.textContent = "";
  submitQuizBtn.style.display = "inline-block";
}

// ---------------------------- Quiz beoordeling ----------------------------
submitQuizBtn.addEventListener("click", () => {
  if (!currentModule) return;

  const lesson = currentModule.lessons[currentLessonIndex];

  // Normale quiz beoordeling (geen mail-quiz meer hier)
  if (!lesson.quiz || lesson.quiz[0].type === "mail") return;

  const quiz = lesson.quiz;
  let correctCount = 0;

  for (let i = 0; i < quiz.length; i++) {
    const radios = document.getElementsByName(`question-${i}`);
    let answered = false;
    for (const radio of radios) {
      if (radio.checked) {
        answered = true;
        if (parseInt(radio.value) === quiz[i].correct) {
          correctCount++;
          removeMistake(currentModule.id, lesson.id, i);
        } else addMistake(currentModule.id, lesson.id, i);
      }
    }
    if (!answered) { alert(`Beantwoord vraag ${i + 1} eerst.`); return; }
  }

  if (correctCount === quiz.length) {
    quizFeedback.textContent = "Goed gedaan! Alle antwoorden kloppen.";
    if (!isLessonCompleted(currentModule.id, lesson.id)) {
      xp += 10;
      markLessonCompleted(currentModule.id, lesson.id);
      updateProgressUI();
      saveProgress();
    }
    correctSound.play();
    nextLessonBtn.classList.remove("hidden");
    submitQuizBtn.style.display = "none";
    showMascotMessage("Je hebt deze les succesvol afgerond!");
  } else {
    quizFeedback.textContent = `Je had ${quiz.length - correctCount} fout${quiz.length - correctCount !== 1 ? "en" : ""}. Probeer het nog eens!`;
  wrongSound.play();
  }
});

function getMistakeCorrectAnswer(mistakeIndex) {
  const m = mistakes[mistakeIndex];
  const moduleObj = modulesData.find(mod => mod.id === m.moduleId);
  if (!moduleObj) return null;
  const lessonObj = moduleObj.lessons.find(les => les.id === m.lessonId);
  if (!lessonObj) return null;
  if (!lessonObj.quiz || !lessonObj.quiz[m.questionIndex]) return null;
  return lessonObj.quiz[m.questionIndex].correct;
}

function addMistake(moduleId, lessonId, questionIndex) {
  if (!mistakes.some(m => m.moduleId === moduleId && m.lessonId === lessonId && m.questionIndex === questionIndex)) {
    mistakes.push({ moduleId, lessonId, questionIndex });
    saveProgress();
  }
}

function removeMistake(moduleId, lessonId, questionIndex) {
  mistakes = mistakes.filter(m => !(m.moduleId === moduleId && m.lessonId === lessonId && m.questionIndex === questionIndex));
  saveProgress();
}

// ---------------------------- Les status ----------------------------
function isLessonCompleted(moduleId, lessonId) {
  return progress[moduleId] && progress[moduleId][lessonId];
}

function markLessonCompleted(moduleId, lessonId) {
  if (!progress[moduleId]) progress[moduleId] = {};
  progress[moduleId][lessonId] = true;
}

// ---------------------------- Knoppen ----------------------------
nextLessonBtn.addEventListener("click", () => {
  if (!currentModule) return;
  if (currentLessonIndex + 1 < currentModule.lessons.length) showLesson(currentModule.id, currentLessonIndex + 1);
  else showModules();
});

backToModulesBtn.addEventListener("click", () => showModules());

// ---------------------------- Beveiliging ----------------------------
document.addEventListener('keydown', function (e) {
  if (e.key === 'F12') e.preventDefault();
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') e.preventDefault();
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'j') e.preventDefault();
  if (e.ctrlKey && e.key.toLowerCase() === 'u') e.preventDefault();
});

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

// ---------------------------- Code Editor ---------------------------- 
function runCode(id) {
  const code = document.getElementById(`code-editor-${id}`).value;
  const iframe = document.getElementById(`output-frame-${id}`);

  iframe.srcdoc = `
    <style>
      body {
        background: #0f172a;
        color: #fff; /* tekst in output wit */
        font-family: sans-serif;
      }
    </style>
    ${code}
  `;
}
// ---------------------------- Init ----------------------------
// Ensure UI and streak updated from whichever source (localStorage or Supabase)
updateProgressUI();
updateStreak();
showModules();
initAuthAndData();

