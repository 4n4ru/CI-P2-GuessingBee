/**
 * Generates alphabet buttons for the main game screen
 */

function generateAbcBtns () {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let html = '';
    for (const letter of alphabet) {
        html += `<button class="btn btn-primary m-1 col-1 p-1">${letter}</button>`;
    }
    document.getElementById('abc-btns').innerHTML = html;
}

generateAbcBtns();

function startEasy () {

}

function getTheme () {

}

function getPhrase () {

}

function generateUnderscores () {

}

function checkGuess () {

}

function addLetters () {

}

function nextImage () {

}

function checkWordComplete () {

}

function correctGuess () {

}

function outOfMoves () {

}

function increaseScore () {

}

function increaseHighScore () {

}