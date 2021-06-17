(function () {

    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'none';
        document.getElementById('correct-screen').style.display = 'none';
        document.getElementById('game-over-screen').style.display = 'none';
        startEasy();
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

    function startEasy() {
        document.getElementById('start-screen').style.display = 'flex';
        document.getElementById('btn-easy').addEventListener('click', playGame('easy'));
        document.getElementById('btn-normal').addEventListener('click', playGame('normal'));
        document.getElementById('btn-hard').addEventListener('click', playGame('hard'));
    }

    function startMedium() {

    }

    function startHard() {

    }

    function playGame() {

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