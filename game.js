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

// Event listeners
rangeRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    selectedRange = parseInt(radio.value);
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
});

checkBtn.addEventListener("click", () => {
  const guess = parseInt(guessInput.value);
  if (isNaN(guess) || guess < 1 || guess > selectedRange) {
    alert("Please enter a valid number within the range.");
    return;
  }

  guessesLeft--;
  guessesLeftDisplay.textContent = guessesLeft;

  const listItem = document.createElement("li");
  listItem.textContent = guess;
  guessesList.appendChild(listItem);

  if (guess === targetNumber) {
    endGame(true);
  } else if (guessesLeft === 0) {
    endGame(false);
  } else {
    const hint = guess > targetNumber ? "Too high. Try again!" : "Too low. Try again!";
    alert(hint);
  }

  guessInput.value = "";
});

playAgainBtn.addEventListener("click", () => {
  location.reload();
});

function endGame(isWin) {
  gameOverMessage.textContent = isWin ? "Congratulations! You guessed the number!" : "No more guesses left. The number was " + targetNumber + ".";
  gameOverModal.style.display = "flex";
}