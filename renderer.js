let timerInterval;
let timeLeft = 25 * 60; // Initial work time (25 minute)
let isWorking = true; // Flag to track if it's work time or break time
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("startBtn");
const resetButton = document.getElementById("resetBtn");
const statusDisplay = document.getElementById("statusDisplay");
const testNotifications = document.getElementById("test-notifications");

// Function to play audio when the timer exhausts
function playAudio() {
  const audioElement = document.getElementById("notificationAudio");
  if (audioElement) {
    audioElement.play();
  } else {
    console.error("Audio element not found!");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const musicButton = document.getElementById("study-music");

  if (musicButton) {
    musicButton.addEventListener("click", playStudyAudio);
  } else {
    console.error("Music button not found!");
  }
});

// Function to play/stop study music
let isAudioPlaying = false;

function playStudyAudio() {
  const audioElement = document.getElementById("studyAudio");
  if (audioElement) {
    if (isAudioPlaying) {
      audioElement.pause();
      isAudioPlaying = false;
    } else {
      audioElement.play();
      isAudioPlaying = true;
    }
  } else {
    console.error("Audio element not found!");
  }
}

function updateStatusDisplay() {
  if (isWorking) {
    statusDisplay.textContent = "Work Time";
  } else {
    statusDisplay.textContent = "Break Time";
  }
  playAudio();
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

function startWorkTimer() {
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timerDisplay.textContent = formatTime(timeLeft);
    } else {
      clearInterval(timerInterval);
      timeLeft = 5 * 60; // Set break time to 5 minutes
      isWorking = false;
      timerDisplay.textContent = formatTime(timeLeft);
      startBreakTimer();
    }
  }, 1000);
  isRunning = true;
  updateStatusDisplay();
}

function startBreakTimer() {
  const workCounter = document.getElementById("work-counter");
    // console.log(workCounter.textContent);
    workCounter.textContent = Number(workCounter.textContent) + 1;
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timerDisplay.textContent = formatTime(timeLeft);
    } else {
      clearInterval(timerInterval);
      timeLeft = 25 * 60; // Set work time back to 25 minute
      isWorking = true;
      timerDisplay.textContent = formatTime(timeLeft);
      startWorkTimer();
    }
  }, 1000);
  updateStatusDisplay();
}

function startTimer() {
  if (!isRunning) {
    if (isWorking) {
      startWorkTimer();
    } else {
      startBreakTimer();
    }
  }
  updateStatusDisplay();
}

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 25 * 60; // Reset work time to 25 minute
  timerDisplay.textContent = formatTime(timeLeft);
  isRunning = false;
  isWorking = true; // Reset to work time
  updateStatusDisplay();
}

startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);
testNotifications.addEventListener("click", playAudio);

updateStatusDisplay();
