const hangmanWords = ["apple", "grape", "peach", "berry", "lemon"];
let chosenWord = "";
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrongGuesses = 6;


const startButton = document.getElementById("start-button"); 

function chooseRandomWord() {
    chosenWord = hangmanWords[Math.floor(Math.random() * hangmanWords.length)]; 
}

chooseRandomWord ()
console.log(chosenWord);


