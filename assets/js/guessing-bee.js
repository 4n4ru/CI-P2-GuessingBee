(function () {
    let score = 0;
    let hScore = 0;
    let wrongAnswersLeft = 0;
    let phrase = '';
    let images;
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    document.addEventListener('DOMContentLoaded', function () {
        showStartScreen();
    });

    function showScreen(id) {
        let screenIds = ['start-screen', 'game-screen', 'correct-screen', 'game-over-screen'];
        for (const screenId of screenIds) {
            toggleScreen(screenId, (screenId === id));
        }
    }

    function toggleScreen(id, isActive) {
        document.getElementById(id).style.display = isActive ? 'flex' : 'none';
    }

    /**
     * Generates alphabet buttons for the main game screen
     */

    function generateAbcBtns() {
        let html = '';
        for (const letter of alphabet) {
            html += `<button class="btn-abc btn btn-primary m-1 col-1 p-1" id="btn-${letter}">${letter}</button>`;
        }
        document.getElementById('abc-btns').innerHTML = html;
        addAbcListeners();
    }

    /**
     * Adds event listeners to alphabet buttons
     */
    function addAbcListeners() {
        document.getElementById('abc-btns').addEventListener('click', function (event) {
            if (!event.target.className.includes('btn')) return;
            let button = event.target;
            let letter = button.innerHTML;
            if (!button.className.includes('clicked')) {
                button.classList.remove('btn-primary');
                button.classList.add('btn-secondary', 'clicked');
                checkGuess(letter);
            }
        });
        document.addEventListener('keydown', function logKey(event) {
            let name = event.key.toUpperCase();
            let button = document.getElementById(`btn-${name}`);
            if (alphabet.includes(name) && !button.className.includes('clicked')) {
                button.classList.remove('btn-primary');
                button.classList.add('btn-secondary', 'clicked');
                checkGuess(name);
            }
        });
    }

    /**
     * Show showStartScreen and add event listeners to buttons
     */
    function showStartScreen() {
        score = 0;
        showScreen('start-screen');
        document.getElementById('start-btns').addEventListener('click', function (event){
            if (!event.target.className.includes('btn')) return;
            let button = event.target;
            let gameType = button.getAttribute('data-type');
            generateGameScreen(gameType);
        });
    }

    function setImage(gameType) {
        images = gameSettings.getImages(gameType);
        document.getElementById('flower-image').src = images[images.length - 1];
        wrongAnswersLeft = images.length;
    }

    function setGuessingPhrase(phrase) {
        let guessingPhrase = generateUnderscores(phrase);
        document.getElementById('phrase').innerHTML = guessingPhrase;
    }

    function showHowToPlayModal() {
        const key = 'howToPlayModalDisplayed';
        if (!sessionStorage.getItem(key)) {
            let howToPlayModal = new bootstrap.Modal(document.getElementById('how-to-play-modal'));
            howToPlayModal.show();
            sessionStorage.setItem(key, true);
        }
    }

    /**
     * Generates the game screen by adding all the content to the html elements
     */
    function generateGameScreen(gameType) {
        showHowToPlayModal();

        document.getElementById('difficulty').innerHTML = gameType;
        document.getElementById('score').innerHTML = score;
        document.getElementById('h-score').innerHTML = hScore;

        let guessingParameters = gameSettings.getGuessingParameters();
        phrase = guessingParameters.phrase;
        document.getElementById('theme').innerHTML = guessingParameters.theme;
        
        setGuessingPhrase(phrase);
        console.log(phrase);
        setImage(gameType);
        generateAbcBtns();
        showScreen('game-screen');
    }

    /**
     * Generates underscores for the Phrase provided 
     */
    function generateUnderscores(phrase) {
        let underscores = '';
        for (const symbol of phrase) {
            if (symbol === ' ') {
                underscores += ' ';
            } else {
                underscores += '_';
            }
        }
        return underscores;
    }

    /**
     * Checks if the phrase has the letter clicked
     */
    function checkGuess(letter) {
        if (phrase.includes(letter) || phrase.includes(letter.toLowerCase())) {
            addLetters(letter);
        } else {
            wrongAnswersLeft -= 1;
            if (wrongAnswersLeft) {
                let nextFlowerIndex = wrongAnswersLeft - 1;
                nextImage(nextFlowerIndex);
            } else {
                outOfMoves();
            }
        }
    }

    /**
     * Displays the correctly guessed letters
     */
    function addLetters(guess) {
        let guessingPhrase = document.getElementById('phrase').innerHTML;
        let newGuessingPhrase = guessingPhrase.split('')
            .map((x, i) => guess.toLowerCase() === phrase[i].toLocaleLowerCase() ? phrase[i] : x)
            .join('');
        checkWordComplete(newGuessingPhrase);
        document.getElementById('phrase').innerHTML = newGuessingPhrase;
    }

    function nextImage(nextFlowerIndex) {
        document.getElementById('flower-image').src = images[nextFlowerIndex];
    }

    function checkWordComplete(currentPhrase) {
        if (currentPhrase === phrase) {
            correctGuess();
        } else {
            return;
        }
    }

    function correctGuess() {
        score += wrongAnswersLeft;
        if (score > hScore) {
            hScore = score;
        }
        showCorrectScreen(wrongAnswersLeft);
    }

    function outOfMoves() {
        showGameOver();
        document.getElementById('score-over').innerHTML = score;
        document.getElementById('h-score-over').innerHTML = hScore;
        document.getElementById('answer').innerHTML = phrase;
    }

    function showGameOver() {
        showScreen('game-over-screen');

        let tryAgain = document.getElementById('try-again');
        tryAgain.addEventListener('click', function () {
            score = 0;
            let gameType = document.getElementById('difficulty').innerHTML;
            generateGameScreen(gameType);
        });

        let restart = document.getElementById('restart');
        restart.addEventListener('click', function () {
            showStartScreen();
        });
    }

    function showCorrectScreen(roundScore) {
        showScreen('correct-screen');

        document.getElementById('score-correct').innerHTML = score;
        document.getElementById('h-score-correct').innerHTML = hScore;
        document.getElementById('round-score').innerHTML = roundScore;

        let next = document.getElementById('next');
        next.addEventListener('click', function () {
            let gameType = document.getElementById('difficulty').innerHTML;
            generateGameScreen(gameType);
        });

        let restart = document.getElementById('restart-correct');
        restart.addEventListener('click', function () {
            showStartScreen();
        });
    }
})();