(function () {

    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'none';
        document.getElementById('correct-screen').style.display = 'none';
        document.getElementById('game-over-screen').style.display = 'none';
        startScreen();
    });

    /**
     * Generates alphabet buttons for the main game screen
     */

    function generateAbcBtns() {
        let alphabet = 'abcdefghijklmnopqrstuvwxyz';
        let html = '';
        for (const letter of alphabet) {
            html += `<button class="btn btn-primary m-1 col-1 p-1">${letter}</button>`;
        }
        document.getElementById('abc-btns').innerHTML = html;
    }

    function startScreen() {
        document.getElementById('start-screen').style.display = 'flex';
        let buttons = document.getElementsByClassName('start-btn');
        for (const button of buttons) {
            button.addEventListener('click', function () {
                let gameType = this.getAttribute('data-type');
                generateGameScreen(gameType);
            });
        }
    }

    function showGame() {
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'flex';
    }

    function generateGameScreen(gameType) {
        
    }

    function getTheme() {

    }

    function getPhrase() {

    }

    function generateUnderscores() {

    }

    function checkGuess() {

    }

    function addLetters() {

    }

    function nextImage() {

    }

    function checkWordComplete() {

    }

    function correctGuess() {

    }

    function outOfMoves() {

    }

    function increaseScore() {

    }

    function increaseHighScore() {

    }
})();