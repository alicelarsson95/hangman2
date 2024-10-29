const maxWrongGuesses = 6;
const hangmanParts = ["head", "body", "arms", "legs", "scaffold", "ground"];
const hangmanWords = ["apple", "grape", "peach", "berry", "lemon"];

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

function chooseRandomWord() {
  gameStatus.chosenWord =
    hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
  gameStatus.guessedLetters = [];
  gameStatus.wrongGuesses = 0;
  displayWord();
  resetHangman();
  message.textContent = "Nytt spel, gissa en bokstav!";
}

function displayWord() {
  const display = gameStatus.chosenWord
      .split("")
      .map(letter => gameStatus.guessedLetters.includes(letter) 
          ? `<span>${letter}</span>` 
          : `<span class="underscore">_</span>`)
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

function checkGameStatus() {
  if (gameStatus.wrongGuesses >= maxWrongGuesses) {
    message.textContent = `Game Over..Ordet var: ${gameStatus.chosenWord}`;
    guessButton.disabled = true;
  } else if (!wordDisplay.textContent.includes("_")) {
    message.textContent = "Grattis, rätt ord!";
    guessButton.disabled = true;
  }
}

guessButton.addEventListener("click", handleGuess);
startButton.addEventListener("click", () => {
  chooseRandomWord();
  guessButton.disabled = false;
});