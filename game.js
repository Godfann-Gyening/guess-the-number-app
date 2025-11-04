// Game variables
let targetNumber;
let selectedRange;
let guessesLeft;
const maxGuesses = { 10: 3, 100: 7, 1000: 10 };

// DOM elements
const gameSetup = document.getElementById("game-setup");
const gamePlay = document.getElementById("game-play");
const startBtn = document.getElementById("start-btn");
const rangeRadios = document.querySelectorAll('input[name="range"]');
const rangeDisplay = document.getElementById("range-display");
const guessInput = document.getElementById("guess-input");
const checkBtn = document.getElementById("check-btn");
const guessesLeftDisplay = document.getElementById("guesses-left");
const guessesList = document.getElementById("guesses");
const gameOverModal = document.getElementById("game-over-modal");
const gameOverMessage = document.getElementById("game-over-message");
const playAgainBtn = document.getElementById("play-again-btn");
const statusEl = document.getElementById("status");

// Helpers
function setStatus(msg, cls = "") {
  statusEl.textContent = msg || "";
  statusEl.className = `status ${cls}`.trim();
}

function isValidNumber(n) {
  return Number.isInteger(n) && n >= 1 && n <= selectedRange;
}

function enableCheckIfValid() {
  const val = parseInt(guessInput.value, 10);
  checkBtn.disabled = !isValidNumber(val);
}

// Event listeners
rangeRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    selectedRange = parseInt(radio.value, 10);
    startBtn.disabled = false;
  });
});

startBtn.addEventListener("click", () => {
  targetNumber = Math.floor(Math.random() * selectedRange) + 1;
  guessesLeft = maxGuesses[selectedRange];
  gameSetup.style.display = "none";
  gamePlay.style.display = "block";
  rangeDisplay.textContent = selectedRange;
  guessesLeftDisplay.textContent = guessesLeft;

  // Reset UI
  guessesList.innerHTML = "";
  setStatus(`Game started! Enter a number between 1 and ${selectedRange}.`, "ok");

  // Prepare input
  guessInput.value = "";
  guessInput.min = 1;
  guessInput.max = selectedRange;
  checkBtn.disabled = true;
  guessInput.focus();
});

function handleGuessSubmit() {
  const guess = parseInt(guessInput.value, 10);
  if (!isValidNumber(guess)) {
    setStatus(`Please enter a whole number between 1 and ${selectedRange}.`, "err");
    enableCheckIfValid();
    guessInput.focus();
    return;
  }

  guessesLeft--;
  guessesLeftDisplay.textContent = guessesLeft;

  const li = document.createElement("li");
  li.textContent = guess;
  guessesList.appendChild(li);

  if (guess === targetNumber) {
    endGame(true);
  } else if (guessesLeft === 0) {
    endGame(false);
  } else {
    const hint = guess > targetNumber ? "Too high. Try again!" : "Too low. Try again!";
    setStatus(hint, "warn");
    guessInput.value = "";
    enableCheckIfValid();
    guessInput.focus();
  }
}

checkBtn.addEventListener("click", handleGuessSubmit);

// Enable/disable Check dynamically and submit on Enter
guessInput.addEventListener("input", () => {
  enableCheckIfValid();
  setStatus("");
});

guessInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !checkBtn.disabled) {
    handleGuessSubmit();
  }
});

// Play again
playAgainBtn.addEventListener("click", () => {
  location.reload();
});

function endGame(isWin) {
  setStatus("", "");
  gameOverMessage.textContent = isWin
    ? "Congratulations! You guessed the number!"
    : `No more guesses left. The number was ${targetNumber}.`;
  gameOverModal.style.display = "flex";
}
