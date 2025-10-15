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
            progress = {};
            xp = 0;
            streak = 0;
            lastActive = null;
            missions = {};
            mistakes = [];
            return;
        }
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


// ---------------------------- Log Out ----------------------------
const authBtn = document.getElementById("auth-btn");

authBtn.addEventListener("click", async () => {
    try {
        const res = await fetch(`${HOST}/api/logout`, {
            method: "POST",
            credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
            currentUser = null;
            progress = {};
            xp = 0;
            streak = 0;
            lastActive = null;
            missions = {};
            mistakes = [];

            window.location.href = "/login.html";
        } else {
            console.error("Logout failed:", data.error);
        }
    } catch (err) {
        console.error("Logout error:", err);
    }
});

// ---------------------------- Streak & Level ----------------------------
function updateStreak() {
    const today = new Date().toDateString();
    if (!lastActive) lastActive = today;

    if (lastActive !== today) {
        const yesterday = new Date(Date.now() - 864e5).toDateString();
        streak = lastActive === yesterday ? streak + 1 : 1;
        lastActive = today;
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
    progressInfo.textContent = `You have completed ${completedLessons} of the ${totalLessons} lessons.`;
    const percent = totalLessons === 0 ? 0 : (completedLessons / totalLessons) * 100;
    progressBar.style.width = percent + "%";
    xpInfo.textContent = `XP: ${xp}`;
    levelInfo.textContent = `Level: ${getLevel()}`;
    streakInfo.textContent = `Streak: ${streak} day${streak !== 1 ? "s" : ""} in a row`;

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
        { id: "lessons10", text: "Complete 10 lessons", condition: totalLessonsDone >= 10 },
        { id: "xp100", text: "Earn 100 XP", condition: xp >= 100 },
        { id: "streak3", text: "Study for 3 days in a row", condition: streak >= 3 }
    ];
    missionsInfo.innerHTML = "<strong>Missions:</strong><br>";
    allMissions.forEach(m => {
        if (!missions[m.id] && m.condition) {
            missions[m.id] = true;
            showMascotMessage(`🎉 You completed the mission "${m.text}"!`);
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
    document.getElementById("modules-list").classList.remove("hidden");
    quizSection.classList.add("hidden");
    quizFeedback.textContent = "";
    nextLessonBtn.classList.add("hidden");
    backToModulesBtn.style.display = "none";
    showMascotMessage("Choose a module to get started!");
    renderModuleButtons();

    const sidebar = document.querySelector("nav.sidebar");
    if (sidebar) sidebar.style.display = "flex";

    const discordBtn = document.querySelector(".discord-button");
    if (discordBtn) discordBtn.style.left = "calc(260px + 1rem + 12px)";

    updateProgressUI();
}


function renderModuleButtons() {
    moduleButtons.innerHTML = "";
    modulesData.forEach(mod => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.textContent = mod.title;
        btn.disabled = !isModuleUnlocked(mod.id);
        btn.addEventListener("click", () => showLessonsList(mod.id));
        li.appendChild(btn);
        moduleButtons.appendChild(li);
    });
}

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
    showMascotMessage(`Choose a lesson in module "${currentModule.title}"`);
}

function showLesson(moduleId, lessonIndex) {
    currentModule = modulesData.find(m => m.id === moduleId);
    currentLessonIndex = lessonIndex;
    const lesson = currentModule.lessons[lessonIndex];

    lessonTitle.textContent = lesson.title;
    lessonContent.innerHTML = lesson.content || "";
    quizFeedback.textContent = "";
    quizSection.classList.add("hidden");
    submitQuizBtn.style.display = "none";
    nextLessonBtn.classList.add("hidden");
    backToModulesBtn.style.display = "inline-block";
    document.getElementById("modules-list").classList.add("hidden");
    lessonSection.classList.remove("hidden");

    const sidebar = document.querySelector("nav.sidebar");
    if (sidebar) sidebar.style.display = "none";

    
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
    quizFeedback.textContent = "";

    quizArray.forEach((q, i) => {
        if (q.type === "mail") {
            const mailContainer = document.createElement("div");
            mailContainer.innerHTML = q.mailHtml;
            quizForm.appendChild(mailContainer);


            const feedbackBox = document.createElement("div");
            feedbackBox.className = "mail-feedback";
            quizForm.appendChild(feedbackBox);


            q.elements.forEach(el => {
                const target = mailContainer.querySelector(el.selector);
                if (target) {
                    target.addEventListener("click", () => {
                        if (target.classList.contains("correct") || target.classList.contains("incorrect")) return;

                        target.classList.add(el.correct ? "correct" : "incorrect");

                        // Toon uitleg subtiel onder de mail
                        const p = document.createElement("p");
                        p.className = el.correct ? "correct-text" : "incorrect-text";
                        p.textContent = el.explain;
                        feedbackBox.appendChild(p);
                    });
                }
            });
            return;
        }

        
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
}



submitQuizBtn.addEventListener("click", () => {
    if (!currentModule) return;
    const lesson = currentModule.lessons[currentLessonIndex];
    if (!lesson.quiz) return;

    const quiz = lesson.quiz;
    let correctCount = 0;

    for (let i = 0; i < quiz.length; i++) {
        const q = quiz[i];

        if (q.type === "mail") {
            const mailContainer = quizForm.querySelector(".mail-view");
            let allCorrectClicked = true;

            q.elements.forEach(el => {
                if (el.correct) {
                    const elNode = mailContainer.querySelector(el.selector);
                    if (!elNode.classList.contains("correct")) allCorrectClicked = false;
                }
            });

            if (allCorrectClicked) correctCount++;
        } else {
            // Standaard multiple-choice vragen
            const radios = document.getElementsByName(`question-${i}`);
            let answered = false;

            for (const radio of radios) {
                if (radio.checked) {
                    answered = true;
                    if (parseInt(radio.value) === q.correct) {
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
    }

    // Resultaat tonen
    if (correctCount === quiz.length) {
        quizFeedback.textContent = "Well done! All answers are correct.";
        if (!isLessonCompleted(currentModule.id, lesson.id)) {
            xp += 10;
            markLessonCompleted(currentModule.id, lesson.id);
            updateProgressUI();
            saveProgressToAPI();
        }
        correctSound.play();
        nextLessonBtn.classList.remove("hidden");
        submitQuizBtn.style.display = "none";
        showMascotMessage("You have successfully completed this lesson!");
    } else {
        quizFeedback.textContent = `You got ${quiz.length - correctCount} wrong. Please try again!`;
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
nextLessonBtn.addEventListener("click", () => {
    if (!currentModule) return;
    if (currentLessonIndex + 1 < currentModule.lessons.length) showLesson(currentModule.id, currentLessonIndex + 1);
    else showModules();
});
backToModulesBtn.addEventListener("click", () => showModules());

// ---------------------------- Security ----------------------------
document.addEventListener('keydown', e => { if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['i','j'].includes(e.key.toLowerCase())) || (e.ctrlKey && e.key.toLowerCase() === 'u')) e.preventDefault(); });
document.addEventListener('contextmenu', e => e.preventDefault());

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


// ---------------------------- Init ----------------------------
async function initApp() {
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
    showModules();
}

initApp();

//-------------------------html debugger---------------------------
function checkFix(lessonId, exerciseIndex) {
  const lesson = modulesData
    .find(m => m.id === "html")
    .lessons.find(l => l.id === lessonId);
  
  const exercise = lesson.exercises[exerciseIndex - 1];
  const textarea = document.getElementById(`code-editor-html-debug-${exerciseIndex}`);
  const feedback = document.getElementById(`feedback-html-debug-${exerciseIndex}`);
  const userCode = textarea.value.trim();

  if (userCode.replace(/\s+/g, '') === exercise.expectedFix.replace(/\s+/g, '')) {
    feedback.innerHTML = `<p class="correct">✅ Correct! Nicely done.</p>`;
  } else {
    feedback.innerHTML = `<p class="incorrect">❌ Not quite right.<br>${exercise.hint}</p>`;
  }
}

