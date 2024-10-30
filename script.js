const maxWrongGuesses = 6;
const hangmanParts = ["ground", "scaffold", "head", "body", "arms", "legs"];
const hangmanWords = ["äpple", "lampa", "kaffe", "fågel", "mössa"];

const wordDisplay = document.getElementById("word-display");
const letterInput = document.getElementById("letter-input");
const guessButton = document.getElementById("guess-button");
const message = document.getElementById("message");
const startButton = document.getElementById("start-button");
const gameStatus = {
  chosenWord: "",
  guessedLetters: [],
  wrongGuesses: 0,
};

const modal = document.getElementById("game-modal");
const modalMessage = document.getElementById("modal-message");
const playAgainButton = document.getElementById("play-again");

function chooseRandomWord() {
  gameStatus.chosenWord =
  hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
  gameStatus.guessedLetters = [];
  gameStatus.wrongGuesses = 0;
  displayWord();
  resetHangman();
  message.textContent = "Nytt spel, gissa en bokstav!";

  letterInput.style.display = "block";
  guessButton.style.display = "block";
}

function displayWord() {
  const display = gameStatus.chosenWord
    .split("")
    .map((letter) =>
      gameStatus.guessedLetters.includes(letter)
        ? `<span>${letter}</span>`
        : `<span class="underscore">_</span>`
    )
    .join("");
  wordDisplay.innerHTML = display;
}

function showHangmanPart() {
  if (gameStatus.wrongGuesses <= maxWrongGuesses) {
    document.getElementById(
      hangmanParts[gameStatus.wrongGuesses - 1]
    ).style.display = "block";
  }
}

function resetHangman() {
  hangmanParts.forEach((part) => {
    document.getElementById(part).style.display = "none";
  });
}

function handleGuess() {
  const guess = letterInput.value.toLowerCase();
  letterInput.value = "";

  if (guess.length !== 1) {
    message.textContent = "Gissa en bokstav!";
    return;
  }

  if (gameStatus.guessedLetters.includes(guess)) {
    message.textContent = "Du har redan gissat på denna bokstav.";
    return;
  }

  gameStatus.guessedLetters.push(guess);

  if (gameStatus.chosenWord.includes(guess)) {
    message.textContent = "Rätt gissning!";
  } else {
    gameStatus.wrongGuesses++;
    showHangmanPart();
    message.textContent = "Fel gissning..";
  }

  displayWord();
  checkGameStatus();
  letterInput.focus();
}

//popup
function showModal(messageText) {
  modalMessage.textContent = messageText;
  modal.style.display = "block";
}

function closeModalPopup() {
  modal.style.display = "none";
}

function handlePlayAgain() {
  closeModalPopup();
  chooseRandomWord();
  guessButton.disabled = false;
}

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModalPopup();
  }
});

playAgainButton.addEventListener("click", handlePlayAgain);

function checkGameStatus() {
  if (gameStatus.wrongGuesses >= maxWrongGuesses) {
    showModal(`Game Over.. Ordet var: ${gameStatus.chosenWord}`);
    guessButton.disabled = true;
  } else if (!wordDisplay.textContent.includes("_")) {
    showModal(`Grattis!! Ordet var: ${gameStatus.chosenWord}`);
    guessButton.disabled = true;
  }
}

guessButton.addEventListener("click", handleGuess);
startButton.addEventListener("click", startGame);
letterInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    guessButton.click();
  }})

function startGame() {
  chooseRandomWord();
  guessButton.disabled = false;
}
