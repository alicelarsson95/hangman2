const hangmanWords = ["apple", "grape", "peach", "berry", "lemon"];
let chosenWord = "";
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrongGuesses = 6;

const wordDisplay = document.getElementById("word-display");
const letterInput = document.getElementById("letter-input");
const guessButton = document.getElementById("guess-button");
const message = document.getElementById("message");
const startButton = document.getElementById("start-button");

function chooseRandomWord() {
  chosenWord = hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
}

chooseRandomWord();
console.log(chosenWord);

function displayWord() {
  const display = chosenWord
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
  wordDisplay.textContent = display;
  console.log(display);
}

displayWord();

function handleGuess() {
    const guess = letterInput.value.toLowerCase();
    letterInput.value = ""; // Rensa inmatningsfältet
  
    if (guess.length !== 1) {
      message.textContent = "Gissa en bokstav!";
      return;
    }
  
    if (guessedLetters.includes(guess)) {
      message.textContent = "Du har redan gissat på denna bokstav!";
      return;
    }
  
    guessedLetters.push(guess);
  
    if (chosenWord.includes(guess)) {
      message.textContent = "Rätt gissning!";
    } else {
      wrongGuesses++;
      message.textContent = "Fel gissning!";
    }
  
    displayWord();
    checkGameStatus();
  }
  
  function checkGameStatus() {
    if (wrongGuesses >= maxWrongGuesses) {
      message.textContent = `Game Over! Ordet var: ${chosenWord}`;
      guessButton.disabled = true; // Inaktivera knappen
    } else if (!wordDisplay.textContent.includes("_")) {
      message.textContent = "Grattis! Du har gissat ordet!";
      guessButton.disabled = true;
    }
  }
  
  guessButton.addEventListener("click", handleGuess);
  startButton.addEventListener("click", () => {
    chooseRandomWord();
    guessButton.disabled = false; // Återaktivera knappen om den är inaktiverad
  });
