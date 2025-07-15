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
const toggleButton = document.getElementById("darkmode-toggle");

let currentModule = null;
let currentLessonIndex = 0;

// Progress stored in localStorage
// progress: { moduleId: { lessonId: true } }
// xp: integer
// level: integer (derived from xp)
// streak: number (dagen achter elkaar actief)
// missions: object { missionId: done(bool) }
// mistakes: array of {moduleId, lessonId, questionIndex} to practice later

let progress = JSON.parse(localStorage.getItem("progress")) || {};
let xp = parseInt(localStorage.getItem("xp")) || 0;
let streak = parseInt(localStorage.getItem("streak")) || 0;
let lastActive = localStorage.getItem("lastActive") || null;
let missions = JSON.parse(localStorage.getItem("missions")) || {};
let mistakes = JSON.parse(localStorage.getItem("mistakes")) || [];

// darkmode button

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('darkmode-toggle');

  const isDarkMode = localStorage.getItem('theme') === 'dark';
  document.body.classList.toggle('dark-mode', isDarkMode);

  toggleButton.textContent = isDarkMode ? '🌞' : '🌙';

  toggleButton.addEventListener('click', () => {
    const isNowDark = document.body.classList.toggle('dark-mode');
    toggleButton.textContent = isNowDark ? '🌞' : '🌙';
    localStorage.setItem('theme', isNowDark ? 'dark' : 'light');
  });
});



// --- Helper functies ---

function saveProgress() {
  localStorage.setItem("progress", JSON.stringify(progress));
  localStorage.setItem("xp", xp);
  localStorage.setItem("streak", streak);
  localStorage.setItem("missions", JSON.stringify(missions));
  localStorage.setItem("mistakes", JSON.stringify(mistakes));
  localStorage.setItem("lastActive", new Date().toDateString());
}

function updateStreak() {
  const today = new Date().toDateString();
  if (lastActive !== today) {
    const yesterday = new Date(Date.now() - 864e5).toDateString();
    if (lastActive === yesterday) {
      streak++;
    } else {
      streak = 1;
    }
    lastActive = today;
    saveProgress();
  }
}

function getLevel() {
  return Math.floor(xp / 50) + 1;
}

function updateProgressUI() {
  let totalLessons = 0;
  let completedLessons = 0;
  for (const mod of modulesData) {
    totalLessons += mod.lessons.length;
    if (progress[mod.id]) {
      completedLessons += Object.keys(progress[mod.id]).length;
    }
  }
  progressInfo.textContent = `Je hebt ${completedLessons} van de ${totalLessons} lessen afgerond.`;
  const percent = (completedLessons / totalLessons) * 100;
  progressBar.style.width = percent + "%";
  xpInfo.textContent = `XP: ${xp}`;
  levelInfo.textContent = `Level: ${getLevel()}`;
  streakInfo.textContent = `Streak: ${streak} dag${streak !== 1 ? "en" : ""} achter elkaar`;
  
  // Badges: 1 badge per 5 lessen afgerond
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
  const currentLevel = getLevel();

  // Missies om te checken
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
    if(moduleId === "fouten-oefenen") {
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
    btn.addEventListener("click", () => {
      showLesson(mod.id, 0);
    });
    li.appendChild(btn);
    moduleButtons.appendChild(li);
  });
}

function buildQuiz(quiz) {
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

function buildMistakesQuiz() {
  if(mistakes.length === 0) {
    quizForm.innerHTML = "<p>Je hebt geen fouten om te oefenen! Ga terug naar modules.</p>";
    submitQuizBtn.style.display = "none";
    return;
  }

  quizForm.innerHTML = "";
  mistakes.forEach((m, i) => {
    const moduleObj = modulesData.find(mod => mod.id === m.moduleId);
    if(!moduleObj) return;
    const lessonObj = moduleObj.lessons.find(les => les.id === m.lessonId);
    if(!lessonObj) return;
    if(!lessonObj.quiz || !lessonObj.quiz[m.questionIndex]) return;

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

submitQuizBtn.addEventListener("click", () => {
  if (!currentModule) return;

  if(currentModule.id === "fouten-oefenen") {
    let allCorrect = true;
    let mistakesToRemove = [];

    for(let i=0; i<mistakes.length; i++) {
      const radios = document.getElementsByName(`question-${i}`);
      let answered = false;
      let correct = false;
      for(const radio of radios) {
        if(radio.checked) {
          answered = true;
          if(parseInt(radio.value) === getMistakeCorrectAnswer(i)) {
            correct = true;
          }
          break;
        }
      }
      if(!answered) {
        alert(`Beantwoord vraag ${i+1} eerst.`);
        return;
      }
      if(!correct) allCorrect = false;
      else mistakesToRemove.push(i);
    }

    if(allCorrect) {
      quizFeedback.textContent = "Top! Je hebt alle fouten goed beantwoord. Goed bezig!";
      correctSound.play();
      mistakes = [];
      saveProgress();
      updateProgressUI();
      nextLessonBtn.classList.remove("hidden");
      submitQuizBtn.style.display = "none";
      showMascotMessage("Fouten goed geoefend, ga zo door!");
    } else {
      quizFeedback.textContent = `Je had een of meer fouten. Probeer het nog eens!`;
      wrongSound.play();
    }

    return;
  }

  // Normale quiz beoordeling
  const lesson = currentModule.lessons[currentLessonIndex];
  const quiz = lesson.quiz;
  let correctCount = 0;
  let answeredCount = 0;

  for (let i = 0; i < quiz.length; i++) {
    const radios = document.getElementsByName(`question-${i}`);
    let answered = false;
    for (const radio of radios) {
      if (radio.checked) {
        answered = true;
        answeredCount++;
        if (parseInt(radio.value) === quiz[i].correct) {
          correctCount++;
          removeMistake(currentModule.id, lesson.id, i);
        } else {
          addMistake(currentModule.id, lesson.id, i);
        }
      }
    }
    if (!answered) {
      alert(`Beantwoord vraag ${i + 1} eerst.`);
      return;
    }
  }

  if (correctCount === quiz.length) {
    quizFeedback.textContent = "Goed gedaan! Alle antwoorden kloppen.";
    if (!progress[currentModule.id]) progress[currentModule.id] = {};
    if (!progress[currentModule.id][lesson.id]) {
      progress[currentModule.id][lesson.id] = true;
      xp += 10;
      updateStreak();
    }
    saveProgress();
    updateProgressUI();
    nextLessonBtn.classList.remove("hidden");
    submitQuizBtn.style.display = "none";
    correctSound.play();
    showMascotMessage("Je hebt de quiz gehaald! Goed zo!");
  } else {
    quizFeedback.textContent = `Je had ${correctCount} van de ${quiz.length} goed. Probeer het nog eens!`;
    wrongSound.play();
    showMascotMessage("Niet opgegeven! Probeer de vragen nog een keer.");
  }
});

backToModulesBtn.addEventListener("click", () => {
  showModules();
});

nextLessonBtn.addEventListener("click", () => {
  if (!currentModule) return;
  if (currentLessonIndex + 1 < currentModule.lessons.length) {
    showLesson(currentModule.id, currentLessonIndex + 1);
  } else {
    alert("🎉 Je hebt alle lessen in deze module afgerond!");
    showModules();
  }
});

function addMistake(moduleId, lessonId, questionIndex) {
  const exists = mistakes.find(m => m.moduleId === moduleId && m.lessonId === lessonId && m.questionIndex === questionIndex);
  if (!exists) {
    mistakes.push({ moduleId, lessonId, questionIndex });
    saveProgress();
  }
}

function removeMistake(moduleId, lessonId, questionIndex) {
  mistakes = mistakes.filter(m => !(m.moduleId === moduleId && m.lessonId === lessonId && m.questionIndex === questionIndex));
  saveProgress();
}

function getMistakeCorrectAnswer(index) {
  const mistake = mistakes[index];
  if (!mistake) return null;
  const moduleObj = modulesData.find(mod => mod.id === mistake.moduleId);
  if (!moduleObj) return null;
  const lessonObj = moduleObj.lessons.find(les => les.id === mistake.lessonId);
  if (!lessonObj) return null;
  if (!lessonObj.quiz || !lessonObj.quiz[mistake.questionIndex]) return null;
  return lessonObj.quiz[mistake.questionIndex].correct;
}

// Mascotte berichten

const mascotMessages = [
  "Hoi! Klaar om iets te leren vandaag?",
  "Goed bezig, hou vol!",
  "Vergeet niet pauzes te nemen.",
  "Elke dag een beetje beter!",
  "Leer vandaag iets nieuws!",
  "Super! Ga zo door!",
  "Heb je vragen? Stel ze gerust.",
  "Fouten maken mag, daarvan leer je!",
  "Top dat je terug bent!",
  "Blijf nieuwsgierig!"
];

function showMascotMessage(message) {
  mascotBubble.textContent = message;
}

function randomMascotMessage() {
  const msg = mascotMessages[Math.floor(Math.random() * mascotMessages.length)];
  showMascotMessage(msg);
}

updateProgressUI();
updateStreak();
showModules();
randomMascotMessage();
