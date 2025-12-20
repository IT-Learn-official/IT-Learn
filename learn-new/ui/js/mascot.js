let mascotBubble = null;
let correctSound = null;
let wrongSound = null;

function initMascotElements() {
    if (!mascotBubble) {
        mascotBubble = document.getElementById("mascot-bubble");
        correctSound = document.getElementById("audio-correct");
        wrongSound = document.getElementById("audio-wrong");
    }
}

export function showMascotMessage(message, duration = 4000) {
    initMascotElements();
    if (!mascotBubble) return;
    
    if (mascotBubble.hideTimeout) {
        clearTimeout(mascotBubble.hideTimeout);
    }
    
    mascotBubble.textContent = message;
    mascotBubble.classList.add('visible');
    
    if (duration > 0) {
        mascotBubble.hideTimeout = setTimeout(() => {
            mascotBubble.textContent = "Hi! Ready to code?";
        }, duration);
    }
}

export function playCorrectSound() {
    initMascotElements();
    if (correctSound) {
        correctSound.currentTime = 0;
        correctSound.play().catch(err => console.log("Audio play failed:", err));
    }
}

export function playWrongSound() {
    initMascotElements();
    if (wrongSound) {
        wrongSound.currentTime = 0;
        wrongSound.play().catch(err => console.log("Audio play failed:", err));
    }
}

export function showSuccess(message = "Correct! Well done! 🎉") {
    showMascotMessage(message);
    playCorrectSound();
}

export function showError(message = "Not quite right. Try again! 💪") {
    showMascotMessage(message);
    playWrongSound();
}

export function showWelcomeMessage() {
    setTimeout(() => {
        showMascotMessage("Hi! Ready to code?", 0);
    }, 1000);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showWelcomeMessage);
} else {
    showWelcomeMessage();
}
