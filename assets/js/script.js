(function () {

    document.addEventListener('DOMContentLoaded', startEasy());

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
        showStart();
        document.getElementById('btn-easy').addEventListener('click', showGame('easy'));
        document.getElementById('btn-normal').addEventListener('click', showGame('normal'));
        document.getElementById('btn-hard').addEventListener('click', showGame('hard'));
    }

    function showStart() {
        let clon = document.getElementById('start-screen').content.cloneNode(true);
        document.body.appendChild(clon);
      }

    function startMedium() {

    }

    function startHard() {

    }

    function showGame() {
        
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