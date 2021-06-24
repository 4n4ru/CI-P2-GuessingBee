let gameSettings = (function () {
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
    ];

    let hardImages = [
        'assets/images/flower-hard-1.png',
        'assets/images/flower-hard-2.png',
        'assets/images/flower-hard-3.png',
        'assets/images/flower-hard-4.png'
    ];

    let phrases = {
        book: [
            'Pride and Prejudice',
            'To Kill A Mockingbird',
            'The Great Gatsby',
            'One Hundred Years of Solitude',
            'Brave New World',
            'Jane Eyre',
            'Crime and Punishment',
            'The Call of the Wild',
            'The Master and Margarita',
            'The Grapes of Wrath ',
            'The Adventures of Huckleberry Finn'
        ],
        movie: [
            'Titanic',
            'Good Will Hunting',
            'Lost In Translation',
            'The Terminator',
            'The Prestige',
            'No Country For Old Men',
            'Indiana Jones And The Last Crusade',
            'Some Like It Hot',
            'The Lion King',
            'Ghostbusters',
            'Forrest Gump',
            'The Silence Of The Lambs',
            'The Big Lebowski',
            'Jurassic Park',
            'Back To The Future',
            'The Shawshank Redemption',
            'The Empire Strikes Back'
        ],
        proverbs: [
            'A cat has nine lives',
            'Actions speak louder than words',
            'All good things come to an end',
            'An apple a day keeps the doctor away',
            'A picture is worth a thousand words',
            'Best things in life are free',
            'Better late than never',
            'Blood is thicker than water',
            'Curiosity killed the cat',
            'Every dog has his day',
            'Fortune favors the brave',
            'Good things come to those who wait',
            'Ignorance is bliss',
            'Laughter is the best medicine',
            'Necessity is the mother of invention',
            'Once bitten twice shy',
            'Practice makes perfect',
            'Slow and steady wins the race',
            'There is no time like the present'
        ],
        'programing language': [
            'Python',
            'JavaScript',
            'Java',
            'PHP',
            'Scala',
        ]
    };

    function getImages(gameType) {
        if (gameType === 'easy') {
            return easyImages;
        } else if (gameType === 'normal') {
            return normalImages;
        } else if (gameType === 'hard') {
            return hardImages;
        } else {
            throw new Error(`Images for ${gameType} do not exist.`);
        }
    }

    /**
     * Randomly picks a theme for the game
     */
    function getTheme() {
        let themes = Object.keys(phrases);
        let num = Math.floor(Math.random() * themes.length);
        return themes[num];
    }

    /**
     * Randomly picks a phrase from the given theme
     */
    function getPhrase(theme) {
        let themePhrases = phrases[theme];
        let num = Math.floor(Math.random() * themePhrases.length);
        return themePhrases[num];
    }

    return {
        getImages,
        getPhrase,
        getTheme
    };
})();