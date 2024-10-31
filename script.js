// Max antal gånger man kan gissa fel innan spelet är slut
const maxWrongGuesses = 6;
// Ordningen som gubbens delar visas vid fel gissning
const hangmanParts = ["ground", "scaffold", "head", "body", "arms", "legs"];
// Orden som kan slumpas fram som det valda ordet i spelet
const hangmanWords = ["äpple", "lampa", "kaffe", "fågel", "mössa"];

// Hämtar HTML-element som behövs för att kunna iteragera med spelet
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

//Modal för att visa vinst/förlust-meddelanden
const modal = document.getElementById("game-modal");
const modalMessage = document.getElementById("modal-message");
const playAgainButton = document.getElementById("play-again");

// Väljer ett slumpmässigt ord från hangmanWords och startar ett nytt spel
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
// Visar det valda ordet och döljer bokstäver som ännu inte är gissade
function displayWord() {
  const display = gameStatus.chosenWord
    .split("")
    .map((letter) =>
      gameStatus.guessedLetters.includes(letter)
        ? `<span>${letter}</span>`
        : `<span class="underscore">_</span>`)
    .join("");
  wordDisplay.innerHTML = display;
}

// Visar nästa del av gubben vid fel gissning
function showHangmanPart() {
  if (gameStatus.wrongGuesses <= maxWrongGuesses) {
    document.getElementById(
      hangmanParts[gameStatus.wrongGuesses - 1]
    ).style.display = "block";
  }
}

// Funktion som döljer alla delar av gubben för att återställa inför ett nytt spel
function resetHangman() {
  hangmanParts.forEach((part) => {
    document.getElementById(part).style.display = "none";
  });
}

// Funktion som hanterar spelarens gissning och uppdaterar spelets status
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

// Visar en modal med ett meddelande när spelet är över
function showModal(titleText, messageText) {
  const modalTitle = document.getElementById("modal-title"); 
  const modalMessage = document.getElementById("modal-message");

  modalTitle.textContent = titleText;  
  modalMessage.textContent = messageText;  
  modal.style.display = "block";   
}

// Stänger ner modalen när spelaren klickan utanför modalen eller på "Spela igen"
function closeModalPopup() {
  modal.style.display = "none";
}

// Startar ett nytt spel när spelaren klickar på "Spela igen"
function handlePlayAgain() {
  closeModalPopup();
  chooseRandomWord();
  guessButton.disabled = false;
}

 // Stänger modalen om spelaren klickar utanför modalfönstret
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModalPopup();
  }
});

playAgainButton.addEventListener("click", handlePlayAgain);

// Kontrollerar om spelaren har vunnit eller förlorat och visar upp svaret på en modal-popup
function checkGameStatus() {
  if (gameStatus.wrongGuesses >= maxWrongGuesses) {
    showModal("Du förlorade..", `Ordet var: ${gameStatus.chosenWord}`);
    guessButton.disabled = true;
  } else if (!wordDisplay.textContent.includes("_")) {
    showModal("Du vann!", `Ordet var: ${gameStatus.chosenWord}`);
    guessButton.disabled = true;
  }
}
// Event listeners för att hantera klick på knappar och enter-tagenten för gissa-knappen
guessButton.addEventListener("click", handleGuess);
startButton.addEventListener("click", startGame);
letterInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    guessButton.click();
  }})

// Startar spelet när spelaren trycker på "Starta spel"
function startGame() {
  chooseRandomWord();
  guessButton.disabled = false;
}
