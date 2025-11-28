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

// ---------------------------- State ----------------------------
let currentUser = null;
let currentModule = null;
let currentLessonIndex = 0;
let progress = null;
let xp = null;
let streak = null;
let lastActive = null;
let missions = null;
let mistakes = null;

const HOST = "https://itlearn.pythonanywhere.com";

// ---------------------------- Helper: Mascot Bubble ----------------------------
function showMascotMessage(message, duration = 4000) {
    if (!mascotBubble) return;
    mascotBubble.textContent = message;
    mascotBubble.classList.add("visible");
    setTimeout(() => mascotBubble.classList.remove("visible"), duration);
}

// ---------------------------- Backend API helpers ----------------------------
async function loadProgressFromAPI() {
    if (!currentUser) return;
    try {
        const res = await fetch(`${HOST}/api/progress/load`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: currentUser.id }),
            credentials: "include"
        });
        const data = await res.json();
        if (data.error) {
            console.error("Load progress error:", data.error);
            // fallback: empty progress
            progress = {};
            xp = 0;
            streak = 0;
            lastActive = null;
            missions = {};
            mistakes = [];
            return;
        }
        // Als nested progress_data aanwezig is
        if (data.progress_data) Object.assign(data, data.progress_data);

        progress = data.progress || {};
        xp = typeof data.xp === "number" ? data.xp : 0;
        streak = typeof data.streak === "number" ? data.streak : 0;
        lastActive = data.last_active || null;
        missions = data.missions || {};
        mistakes = data.mistakes || [];
    } catch (err) {
        console.error("Failed to load progress from API:", err);
        progress = {};
        xp = 0;
        streak = 0;
        lastActive = null;
        missions = {};
        mistakes = [];
    }
}

async function saveProgressToAPI() {
    if (!currentUser) return;
    try {
        const payload = {
            progress,
            xp,
            streak,
            last_active: new Date().toISOString().split("T")[0],
            missions,
            mistakes
        };
        const res = await fetch(`${HOST}/api/progress/save`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: currentUser.id, progress_data: payload }),
            credentials: "include"
        });
        const data = await res.json();
        if (data.error) console.error("Save progress error:", data.error);
    } catch (err) {
        console.error("Failed to save progress to API:", err);
    }
}

// ---------------------------- Auth ----------------------------
async function login(email, password) {
    try {
        const res = await fetch(`${HOST}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include"
        });
        const data = await res.json();
        if (data.user_id) {
            currentUser = { id: data.user_id };
            await loadProgressFromAPI();
            updateProgressUI();
            updateStreak();
            showModules();
        } else {
            console.error("Login failed:", data.error);
        }
    } catch (err) {
        console.error("Login error:", err);
    }
}

async function signup(email, password) {
    try {
        const res = await fetch(`${HOST}/api/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include"
        });
        const data = await res.json();
        if (data.user_id) {
            currentUser = { id: data.user_id };
            await loadProgressFromAPI();
            updateProgressUI();
            updateStreak();
            showModules();
        } else {
            console.error("Signup failed:", data.error);
        }
    } catch (err) {
        console.error("Signup error:", err);
    }
}

// ---------------------------- Streak & Level ----------------------------
function updateStreak() {
    const today = new Date().toISOString().split("T")[0];

    if (!lastActive) {
        lastActive = today;
        saveProgressToAPI();
        return;
    }

    if (lastActive !== today) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        if (lastActive === yesterday) {
            streak += 1;
        } else {
            streak = 1;
        }
        lastActive = today;
        console.log(`Streak updated → ${streak} (last active: ${lastActive})`);
        saveProgressToAPI();
    }
}
function getLevel() {
    return Math.floor(xp / 50) + 1;
}

// ---------------------------- UI Updates ----------------------------
function updateProgressUI() {
    if (!progress) return;

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
    if (!missions) missions = {};
    const totalLessonsDone = Object.values(progress).reduce((acc, modObj) => acc + Object.keys(modObj).length, 0);
    const allMissions = [
        { id: "lessons10", text: "Behaal 10 lessen", condition: totalLessonsDone >= 10 },
        { id: "xp100", text: "Verdien 100 XP", condition: xp >= 100 },
        { id: "streak3", text: "Leer 3 dagen achter elkaar", condition: streak >= 3 }
    ];
    missionsInfo.innerHTML = "<strong>Missions:</strong><br>";
    allMissions.forEach(m => {
        if (!missions[m.id] && m.condition) {
            missions[m.id] = true;
            showMascotMessage(`🎉 Je hebt de missie "${m.text}" voltooid!`);
            saveProgressToAPI();
        }
        missionsInfo.innerHTML += `${missions[m.id] ? "✅" : "❌"} ${m.text}<br>`;
    });
}

// ---------------------------- Lessons & Modules ----------------------------
function isLessonCompleted(moduleId, lessonId) { 
    return progress[moduleId]?.[lessonId]; 
}

function markLessonCompleted(moduleId, lessonId) { 
    progress[moduleId] = progress[moduleId] || {}; 
    progress[moduleId][lessonId] = true; 
    saveProgressToAPI(); 
}

function isModuleUnlocked(moduleId) {
    return true;
}

function showModules() {
    lessonSection.classList.add("hidden");
    const header = document.querySelector("header");
    if (header) header.style.display = "grid";
    document.getElementById("modules-list").classList.remove("hidden");
    quizSection.classList.add("hidden");
    quizFeedback.textContent = "";
    nextLessonBtn.classList.add("hidden");
    backToModulesBtn.style.display = "none";
    showMascotMessage("Kies een module om te starten!");
    renderModuleButtons();
    updateProgressUI();
}

    const sidebar = document.querySelector("nav.sidebar");
    if (sidebar) sidebar.style.display = "flex";

    const discordBtn = document.querySelector(".discord-button");
    if (discordBtn) discordBtn.style.left = "calc(260px + 1rem + 12px)";

    updateProgressUI();
}

function showLessonsList(moduleId) {
    currentModule = modulesData.find(m => m.id === moduleId);
    if (!currentModule) return;
    if (quizSection) quizSection.classList.add("hidden");
    if (submitQuizBtn) submitQuizBtn.style.display = "none";
    if (quizFeedback) quizFeedback.textContent = "";
    if (nextLessonBtn) nextLessonBtn.classList.add("hidden");
    if (backToModulesBtn) backToModulesBtn.style.display = "inline-block";


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

function showLesson(moduleId, lessonIndex) {
    currentModule = modulesData.find(m => m.id === moduleId);
    currentLessonIndex = lessonIndex;
    const lesson = currentModule.lessons[lessonIndex];

    const lessonsListSection = document.getElementById("lessons-list");
    const lessonSection = document.getElementById("lesson-section");
    const lessonTitle = document.getElementById("lesson-title");
    const lessonContent = document.getElementById("lesson-content");

    lessonsListSection.classList.add("hidden");
    lessonSection.classList.remove("hidden");

    lessonTitle.textContent = lesson.title;
    lessonContent.innerHTML = lesson.content || "";
 
if (lesson.quiz && lesson.quiz.length) {
    quizSection.classList.remove("hidden");
    submitQuizBtn.style.display = "inline-block";
    buildQuiz(lesson.quiz);
} else {
    quizSection.classList.add("hidden");
    submitQuizBtn.style.display = "none";
}


    const sidebar = document.querySelector("nav.sidebar");
    if (sidebar) sidebar.style.display = "none";
    
    document.querySelector("header").style.display = "none";

    const progressBarContainer = document.querySelector("#progress-section");
    if (progressBarContainer) progressBarContainer.style.display = "none";

    const discordBtn = document.querySelector(".discord-button");
    if (discordBtn) discordBtn.style.left = "12px";

    if (lesson.quiz && lesson.quiz.length) {
        quizSection.classList.remove("hidden");
        submitQuizBtn.style.display = "inline-block";
        buildQuiz(lesson.quiz);
    }
    showMascotMessage(`You are now reading: "${lesson.title}"`);
}

// ---------------------------- Quiz ----------------------------
function buildQuiz(quizArray) {
    quizForm.innerHTML = "";
    quizArray.forEach((q, i) => {
        const fieldset = document.createElement("fieldset");
        const legend = document.createElement("legend");
        legend.textContent = q.question;
        fieldset.appendChild(legend);
        q.options.forEach((opt, idx) => {
            const label = document.createElement("label");
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = `question-${i}`;
            radio.value = idx;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(opt));
            fieldset.appendChild(label);
        });
        quizForm.appendChild(fieldset);
    });
    quizFeedback.textContent = "";
}

submitQuizBtn.addEventListener("click", () => {
    if (!currentModule) return;
    const lesson = currentModule.lessons[currentLessonIndex];
    if (!lesson.quiz) return;

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
        if (!isLessonCompleted(currentModule.id, lesson.id)) { 
            xp += 10; 
            markLessonCompleted(currentModule.id, lesson.id); 
            updateProgressUI(); 
            saveProgressToAPI(); 
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

function addMistake(moduleId, lessonId, questionIndex) { 
    if (!mistakes.some(m => m.moduleId === moduleId && m.lessonId === lessonId && m.questionIndex === questionIndex)) { 
        mistakes.push({ moduleId, lessonId, questionIndex }); 
        saveProgressToAPI(); 
    } 
}

function removeMistake(moduleId, lessonId, questionIndex) { 
    mistakes = mistakes.filter(m => !(m.moduleId === moduleId && m.lessonId === lessonId && m.questionIndex === questionIndex)); 
    saveProgressToAPI(); 
}

// ---------------------------- Knoppen ----------------------------
if (nextLessonBtn) {
    nextLessonBtn.addEventListener("click", () => {
        if (!currentModule) return;
        if (currentLessonIndex + 1 < currentModule.lessons.length) {
            showLesson(currentModule.id, currentLessonIndex + 1);
        } else {
            showModules();
        }
    });
}

if (backToModulesBtn) {
const backToAllBtn = document.getElementById("back-to-all-languages");
backToAllBtn.addEventListener("click", () => {
    window.location.href = "/learn/learn.html";
});
}


// ---------------------------- Code Editor ----------------------------
function runCode(id, expectedOutput = "") {
    const textarea = document.getElementById(`code-editor-${id}`);
    const iframe = document.getElementById(`output-frame-${id}`);
    if (!textarea || !iframe) return;

    const code = textarea.value;
    iframe.srcdoc = `<style>body{background:#0f172a;color:#fff;font-family:sans-serif;}</style>${code}`;

    if (!expectedOutput) return;

    setTimeout(() => {
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        const outputText = (doc.body.innerText || "").trim();
        const lesson = currentModule.lessons[currentLessonIndex];

        if (outputText === expectedOutput) {
            if (!isLessonCompleted(currentModule.id, lesson.id)) {
                xp += 10;
                markLessonCompleted(currentModule.id, lesson.id);
                updateProgressUI();
                saveProgressToAPI();
            }
            correctSound.play();
            nextLessonBtn.classList.remove("hidden");
            showMascotMessage("✅ Correct output! Lesson completed!");
        } else {
            wrongSound.play();
            showMascotMessage("⚠️ Output incorrect, probeer opnieuw!");
        }
    }, 50);
}


document.addEventListener("DOMContentLoaded", async () => {

    try {
        const res = await fetch(`${HOST}/api/session`, { credentials: "include" });
        const data = await res.json();
        if (data.user_id) {
            currentUser = { id: data.user_id };
            await loadProgressFromAPI();
            updateProgressUI();
            updateStreak();
        }
    } catch (err) {
        console.error("Session check failed:", err);
    }

    const lessonsListSection = document.getElementById("lessons-list");
    const lessonButtonsContainer = document.getElementById("lesson-buttons");
    if (!lessonButtonsContainer || !lessonsListSection) return;

    const moduleId = window.location.pathname.split("/").pop().replace(".html","");
    currentModule = modulesData.find(m => m.id === moduleId);
    if (!currentModule) return;

    lessonButtonsContainer.innerHTML = "";
    currentModule.lessons.forEach((lesson, index) => {
        const btn = document.createElement("button");
        btn.classList.add("lesson-button");
        btn.textContent = lesson.title;
        btn.addEventListener("click", () => showLesson(moduleId, index));
        lessonButtonsContainer.appendChild(btn);
    });

    lessonsListSection.classList.remove("hidden");
    const modulesListEl = document.getElementById("modules-list");
    if (modulesListEl) modulesListEl.classList.add("hidden");
    lessonSection.classList.add("hidden");
});


    // ------------------- Buttons -------------------
const backToAllBtn = document.getElementById("back-to-all-languages");
if (backToAllBtn) {
    backToAllBtn.addEventListener("click", () => {
        window.location.href = "/learn/learn.html";
    });
}


    if (nextLessonBtn) {
        nextLessonBtn.addEventListener("click", () => {
            if (!currentModule) return;
            if (currentLessonIndex + 1 < currentModule.lessons.length) {
                showLesson(currentModule.id, currentLessonIndex + 1);
            } else {
                showModules();
            }
        });
    }



//-------------------------html debugger---------------------------
function checkFix(lessonId, exerciseIndex) {
const htmlModule = modulesData.find(m => m.id === "html");
if (!htmlModule) return;
const lesson = htmlModule.lessons.find(l => l.id === lessonId);
if (!lesson) return;

  const exercise = lesson.exercises[exerciseIndex - 1];
  const textarea = document.getElementById(`code-editor-html-debug-${exerciseIndex}`);
  const feedback = document.getElementById(`feedback-html-debug-${exerciseIndex}`);
  const userCode = textarea.value.trim();

  if (userCode.replace(/\s+/g, '') === exercise.expectedFix.replace(/\s+/g, '')) {
    feedback.innerHTML = `<p class="correct">✅ Correct! Nicely done.</p>`;
    
    if (!isLessonCompleted(htmlModule.id, lesson.id)) {
        xp += 10;
        markLessonCompleted(htmlModule.id, lesson.id);
        updateProgressUI();
        saveProgressToAPI();
        showMascotMessage("You completed the exercise and earned 10 XP!");
    }
  } else {
    feedback.innerHTML = `<p class="incorrect">❌ Not quite right.<br>${exercise.hint}</p>`;
  }
}
