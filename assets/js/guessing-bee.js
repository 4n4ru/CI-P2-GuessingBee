/**
 * The file is used by the index.html file to display relevant data and play the game
 */
(function () {
    let score = 0;
    let hScore = 0;
    let wrongAnswersLeft = 0;
    let phrase = '';
    let images;
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    /**
     * Calls a function to toggle the screen shown.
     * Creates a screenIds array with all screen id options, calls the toggleScreen function in a for loop for each of the screenIds
     * @param {string} id [the id of the screen that needs to be shown]
     */
    function showScreen(id) {
        let screenIds = ['start-screen', 'game-screen', 'correct-screen', 'game-over-screen'];
        for (const screenId of screenIds) {
            toggleScreen(screenId, (screenId === id));
        }
    }

    /**
     * Toggles the active screen.
     * If the screen is active the display property is set to 'flex' otherwise to 'none'
     * @param {string} id 
     * @param {boolean} isActive 
     */
    function toggleScreen(id, isActive) {
        document.getElementById(id).style.display = isActive ? 'flex' : 'none';
    }

    /**
     * Adds an event listener to the document, when the event fires the setStartScreen function is called
     */
    document.addEventListener('DOMContentLoaded', function () {
        setStartScreen();
    });

    /**
     * Resets the score, shows setStartScreen and adds an event listener to the element with the id 'start-btns'.
     * The element is a parant of the buttons. When event is fired the gameType is read from the DOM and setGameScreen function is called.
     */
    function setStartScreen() {
        score = 0;
        showScreen('start-screen');
        document.getElementById('start-btns').addEventListener('click', function (event) {
            if (!event.target.className.includes('btn')) return; //makes sure event is only fired if a button is clicked
            let button = event.target; //sets button to the element that fired the event
            let gameType = button.getAttribute('data-type');
            setGameScreen(gameType);
        });
    }

    /**
     * Sets the game screen.
     * Calls the showHowToPlayModal function
     * Sets the html for difficulty, score, h-score, and theme. Sets the guessing phrase and image, generates the abc buttons and calls the showScreen function.
     * @param {string} gameType 
     */
    function setGameScreen(gameType) {
        showHowToPlayModal();

        document.getElementById('difficulty').innerHTML = gameType;
        document.getElementById('score').innerHTML = score;
        document.getElementById('h-score').innerHTML = hScore;

        let guessingParameters = gameSettings.getGuessingParameters(); //gets guessingParameters from gameSettings.js file
        phrase = guessingParameters.phrase;
        document.getElementById('theme').innerHTML = guessingParameters.theme;

        setGuessingPhrase(phrase);
        setImage(gameType);
        generateAbcBtns();
        showScreen('game-screen');
    }

    /**
     * Checks in session storage if the modal was shown before, if it wasn't it is shown.
     * Code for bootstrap modal usage from https://getbootstrap.com/docs/5.0/components/modal/#via-javascript
     */
    function showHowToPlayModal() {
        const key = 'howToPlayModalDisplayed';
        if (!sessionStorage.getItem(key)) {
            let howToPlayModal = new bootstrap.Modal(document.getElementById('how-to-play-modal'));
            howToPlayModal.show();
            sessionStorage.setItem(key, true);
        }
    }

    /**
     * Calls a function to generate underscores for the phrase and sets the phrase element html
     * @param {string} phrase 
     */
    function setGuessingPhrase(phrase) {
        let guessingPhrase = generateUnderscores(phrase);
        document.getElementById('phrase').innerHTML = guessingPhrase;
    }

    /**
     * Generates underscores for each letter in the phrase and retains spaces 
     * @param {string} phrase [the phrase that needs to be guessed]
     * @returns {string} underscores [the phrase that needs to be guessed in underscore form]
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
     * Sets the image for the game and the wrongAnswersLeft.
     * The images variable is set to an array returned after the gameSetting.getImages function call, the image is set to the last element of the array,
     * and the wrongAnswersLeft variable is set to the array length
     * @param {string} gameType [game difficulty]
     */
    function setImage(gameType) {
        images = gameSettings.getImages(gameType);
        document.getElementById('flower-image').src = images[images.length - 1];
        wrongAnswersLeft = images.length;
    }

    /**
     * Generates alphabet buttons for the main game screen and calls the addAbcListeners function
     */
    function generateAbcBtns() {
        let html = '';
        for (const letter of alphabet) {
            html += `<button class="my-btn btn-abc btn btn-primary m-1 col-1 p-1" id="btn-${letter}">${letter}</button>`;
        }
        document.getElementById('abc-btns').innerHTML = html;
        addAbcListeners();
    }

    /**
     * Adds event listeners to alphabet buttons, both for mouse and keyboard
     * The click event listener is added to the parent element and bubbling is used to listen to events. When the event fires the checkGuess function is called
     */
    function addAbcListeners() {
        document.getElementById('abc-btns').addEventListener('click', function (event) {
            if (!event.target.className.includes('btn')) return; // makes sure the element that was clicked is a button
            let button = event.target; //sets button to the element that fired the event
            let letter = button.innerHTML;
            if (!button.className.includes('clicked')) { //checks if the button was clicked before
                button.classList.remove('btn-primary', 'my-btn');
                button.classList.add('btn-secondary', 'clicked'); //toggles classes to make sure the same letter can only be selected once
                checkGuess(letter);
            }
        });
        document.addEventListener('keydown', function logKey(event) {
            let name = event.key.toUpperCase();
            let button = document.getElementById(`btn-${name}`);
            if (alphabet.includes(name) && !button.className.includes('clicked')) { //checks if the key clicked is a letter and was not clicked before
                button.classList.remove('btn-primary', 'my-btn');
                button.classList.add('btn-secondary', 'clicked'); //toggles classes to make sure the same letter can only be selected once
                checkGuess(name);
            }
        });
    }

    /**
     * Checkes if the phrase varibable includes the letter.
     * If the phrase includes the letter, the addLetters function is called, otherwise the worngAnswersLeft varibale is decreased by 1.
     * If there are still wrong answers left, the setNextImage function is called, otherwise the outOfMoves function is called
     * @param {string} letter 
     */
    function checkGuess(letter) {
        if (phrase.includes(letter) || phrase.includes(letter.toLowerCase())) {
            addLetters(letter);
        } else {
            wrongAnswersLeft -= 1;
            if (wrongAnswersLeft) {
                let nextFlowerIndex = wrongAnswersLeft - 1; //the nextFlowerIndex is always by 1 smaller than wrongAnswersLeft because of zero-indexing
                setNextImage(nextFlowerIndex);
            } else {
                outOfMoves();
            }
        }
    }

    /**
     * Reads the guessingPhrase form the DOM and replaces the underscores by the guess parameter and calls the checkWrodComplete function
     * Displays the updated newGuessingPhrase
     * @param {string} guess 
     */
    function addLetters(guess) {
        let guessingPhrase = document.getElementById('phrase').innerHTML;
        let newGuessingPhrase = guessingPhrase.split('')
            .map((x, i) => guess.toLowerCase() === phrase[i].toLowerCase() ? phrase[i] : x)
            .join(''); // if the guess is equal to the phrase[i], take the phrase[i] element, otherwise take the x element
        checkWordComplete(newGuessingPhrase);
        document.getElementById('phrase').innerHTML = newGuessingPhrase;
    }

    /**
     * If the currentPhrase is equal to the phrase that nees to be guessed, calls the correctGuess, otherwise return
     * @param {string} currentPhrase [the phrase as currently displayed in the DOM]
     */
    function checkWordComplete(currentPhrase) {
        if (currentPhrase === phrase) {
            correctGuess();
        } else {
            return;
        }
    }

    /**
     * Sets the flower-image element to image with the nextFlowerIndex index
     * @param {number} nextFlowerIndex 
     */
    function setNextImage(nextFlowerIndex) {
        document.getElementById('flower-image').src = images[nextFlowerIndex];
    }

    /**
     * Increases the score and updates the hScore if the score is highter than the current value of hScore
     * Calls the setCorrectScreen function
     */
    function correctGuess() {
        score += wrongAnswersLeft;
        if (score > hScore) {
            hScore = score;
        }
        setCorrectScreen(wrongAnswersLeft);
    }

    /**
     * Calls the showScreen function with 'correct-screen' parameter and sets all html elements for that screen.
     * Adds event listeners to the buttons.
     * @param {number} roundScore
     */
    function setCorrectScreen(roundScore) {
        showScreen('correct-screen');

        document.getElementById('score-correct').innerHTML = score;
        document.getElementById('h-score-correct').innerHTML = hScore;
        document.getElementById('round-score').innerHTML = roundScore;

        let next = document.getElementById('next');
        next.addEventListener('click', function () {
            let gameType = document.getElementById('difficulty').innerHTML;
            setGameScreen(gameType); // after the event is fired the setGameScreen function is called
        });

        let restart = document.getElementById('restart-correct');
        restart.addEventListener('click', function () {
            setStartScreen(); // after the event is fired the setStartScreen function is called
        });
    }

    /**
     * Calls setGameOverScreen function and sets html elements for it
     */
    function outOfMoves() {
        setGameOverScreen();
        document.getElementById('score-over').innerHTML = score;
        document.getElementById('h-score-over').innerHTML = hScore;
        document.getElementById('answer').innerHTML = phrase;
    }

    /**
     * Calls the showScreen function with 'game-over-screen' parameter and adds event listeners to buttons
     */
    function setGameOverScreen() {
        showScreen('game-over-screen');

        let tryAgain = document.getElementById('try-again');
        tryAgain.addEventListener('click', function () {
            score = 0; // resets the score
            let gameType = document.getElementById('difficulty').innerHTML;
            setGameScreen(gameType); // afer the event fires setGameScreen function is called
        });

        let restart = document.getElementById('restart');
        restart.addEventListener('click', function () {
            setStartScreen(); // after the event fires setStartScreen function is called
        });
    }  
})();