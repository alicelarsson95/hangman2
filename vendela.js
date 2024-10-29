function displayWord() {
    const display = gameStatus.chosenWord
        .split("")
        .map(letter => gameStatus.guessedLetters.includes(letter) 
            ? <span>${letter}</span> 
            : <span class="underscore">_</span>)
        .join("");
    wordDisplay.innerHTML = display;
}