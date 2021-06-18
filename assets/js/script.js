(function () {

    let easyImages = [
        'assets/images/flower-easy-1.png',
        'assets/images/flower-easy-2.png',
        'assets/images/flower-easy-3.png',
        'assets/images/flower-easy-4.png',
        'assets/images/flower-easy-5.png',
        'assets/images/flower-easy-6.png',
        'assets/images/flower-easy-7.png',
        'assets/images/flower-easy-8.png'
    ];

    let normalImages = [
        'assets/images/flower-medium-1.png',
        'assets/images/flower-medium-2.png',
        'assets/images/flower-medium-3.png',
        'assets/images/flower-medium-4.png',
        'assets/images/flower-medium-5.png',
        'assets/images/flower-medium-6.png'
    ]

    let hardImages = [
        'assets/images/flower-hard-1',
        'assets/images/flower-hard-2',
        'assets/images/flower-hard-3',
        'assets/images/flower-hard-4'
    ]

    let score = 0;
    let hScore = 0;
    let wrongAnswersLeft = 0;

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

    /**
     * Show startScreen and add event listeners to buttons
     */
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

    /**
     * Show Game screen
     */
    function showGame() {
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'flex';
    }

    /**
     * Generates the game screen by adding all the content to the html elements
     */
    function generateGameScreen(gameType) {
        let difficulty = document.getElementById('difficulty');
        difficulty.innerHTML = gameType;
        difficulty.style.textTransform = 'uppercase';
        document.getElementById('score').innerHTML = score;
        document.getElementById('h-score').innerHTML = hScore;
        let theme = getTheme ();
        let phrase = getPhrase (theme);
        document.getElementById('theme').innerHTML = theme;
        let guessingPhrase = generateUnderscores(phrase);
        document.getElementById('phrase').innerHTML = guessingPhrase;
        if (gameType === 'easy') {
            document.getElementById('flower-image').src = easyImages[7];
            wrongAnswersLeft = 8;
        } else if (gameType === 'normal') {
            document.getElementById('flower-image').src = normalImages[5];
            wrongAnswersLeft = 6;
        } else {
            document.getElementById('flower-image').src = hardImages[3];
            wrongAnswersLeft = 4;
        }
        generateAbcBtns();
        showGame();
    }

    /**
     * Randomly picks a theme for the game
     */
    function getTheme() {

    }
    /**
     * Randomly picks a phrase from the given theme
     */
    function getPhrase(theme) {

    }

    /**
     * Generates underscores for the Phrase provided 
     */
    function generateUnderscores(phrase) {

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