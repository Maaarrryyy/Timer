// ===== Countdown Timer =====
let countdownInterval;
let countdownStartTime = 0; // in ms
let countdownEndTime = 0;
let isTimerRunning = false;

const timeDisplay = document.getElementById("time-display");
const startTimerButton = document.getElementById("start-timer");
const resetTimerButton = document.getElementById("reset-timer");
const setTimeInput = document.getElementById("set-time");

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);
  return (
    `${minutes < 10 ? "0" : ""}${minutes}:` +
    `${seconds < 10 ? "0" : ""}${seconds}:` +
    `${milliseconds < 10 ? "0" : ""}${milliseconds}`
  );
}

function updateCountdown() {
  const now = Date.now();
  const timeLeft = countdownEndTime - now;
  if (timeLeft <= 0) {
    clearInterval(countdownInterval);
    timeDisplay.textContent = "00:00:00";
    alert("⏰ Time's up!");
    isTimerRunning = false;
    startTimerButton.classList.add("disabled");
    return;
  }
  timeDisplay.textContent = formatTime(timeLeft);
}

startTimerButton.addEventListener("click", () => {
  if (isTimerRunning) return;
  const minutes = parseInt(setTimeInput.value) || 0;
  if (minutes <= 0) return;

  countdownStartTime = Date.now();
  countdownEndTime = countdownStartTime + minutes * 60 * 1000; // ms
  countdownInterval = setInterval(updateCountdown, 10);
  isTimerRunning = true;
  startTimerButton.classList.add("disabled");
});

resetTimerButton.addEventListener("click", () => {
  clearInterval(countdownInterval);
  isTimerRunning = false;
  timeDisplay.textContent = "00:00:00";
  startTimerButton.classList.remove("disabled");
});

// ===== Stopwatch =====
let stopwatchStart = 0;
let stopwatchElapsed = 0;
let stopwatchInterval;

const stopwatchDisplay = document.getElementById("stopwatch-display");
const startStopwatchButton = document.getElementById("start-stopwatch");
const resetStopwatchButton = document.getElementById("reset-stopwatch");

function formatStopwatchTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);
  return (
    `${hours < 10 ? "0" : ""}${hours}:` +
    `${minutes < 10 ? "0" : ""}${minutes}:` +
    `${seconds < 10 ? "0" : ""}${seconds}:` +
    `${milliseconds < 10 ? "0" : ""}${milliseconds}`
  );
}

function updateStopwatch() {
  const now = Date.now();
  stopwatchDisplay.textContent = formatStopwatchTime(
    stopwatchElapsed + (now - stopwatchStart)
  );
}

startStopwatchButton.addEventListener("click", () => {
  if (!stopwatchInterval) {
    stopwatchStart = Date.now();
    stopwatchInterval = setInterval(updateStopwatch, 10);
    startStopwatchButton.textContent = "Pause Stopwatch";
  } else {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    stopwatchElapsed += Date.now() - stopwatchStart;
    startStopwatchButton.textContent = "Resume Stopwatch";
  }
});

resetStopwatchButton.addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  stopwatchElapsed = 0;
  stopwatchDisplay.textContent = formatStopwatchTime(0);
  startStopwatchButton.textContent = "Start Stopwatch";
});
