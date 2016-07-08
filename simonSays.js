$(document).ready(function() {
    var isGameInProgress = false;
    var isHardMode = false;
    var isGameOver = false;
    var isPlayersTurn = false;
    var patternArray = [];
    var numUserGuesses = 0;
    var roundsWon = 0;

    // check user guesses
    $('.game-btns').click(function() {
        if (isPlayersTurn) {
            console.log($(this).attr('data-lightup'), patternArray[numUserGuesses]);
            var selectedColor = $(this).attr('data-lightup');

            // light up color here
            lightUpSection(selectedColor, 200);

            if (selectedColor !== patternArray[numUserGuesses].toString()) {

                // if any wrong guess before getting to end of sequence end game
                resetGame();
                $('#score').append($('<h2>').html('GAME OVER'));
                $('#start').html('Play Again?');
                return;
            }

            numUserGuesses++
            $('#correct').html('Number of Correct Guesses: ' + numUserGuesses);

            if (numUserGuesses === patternArray.length) {

                // if click happens and we're at end of array user guessed correct pattern
                console.log('correct...');
                patternArray.push(generateRandomNumber());
                numUserGuesses = 0;
                roundsWon++;
                $('#rounds').html('Number of Correct Rounds: ' + roundsWon);
                isPlayersTurn = false;
                highlightPattern();
            }
        }
    });

    // start the game
    $('button').click(function() {
        if (!isGameInProgress) {
            isGameInProgress = true;
            init();
        }
    });

    function init() {
        var countdownInterval, countDown = 3;
        var currPatternLength = $('<h2 id="length">').html('Pattern Length: ' + patternArray.length);
        var numCorrectGuesses = $('<h2 id="correct">').html('Number of Correct Guesses: ' + numUserGuesses);
        var numCorrectRounds = $('<h2 id="rounds">').html('Number of Correct Rounds: ' + roundsWon);
        var gameStartsIn = $('<h2 id="countdown">').html('Game Starts In: ' + countDown);

        $('#score').empty();
        $('#score').append(currPatternLength, numCorrectGuesses, numCorrectRounds, gameStartsIn);

        // start a countdown so player knows when game will start
        countdownInterval = setInterval(function() {
            countDown--;
            $('#countdown').html('Game Starts In: ' + countDown);
            if (countDown === 0) {
                clearInterval(countdownInterval);
                $('#countdown').remove();
                patternArray.push(generateRandomNumber());
                startGame();
            }
        }, 1000);
    }

    function startGame() {
        console.log('game starting...');
        startRound();
    }

    function generateRandomNumber() {
        var min = 1, max = 4;

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function startRound() {
        if (isGameOver) {
            resetGame();
        } else {
            highlightPattern();
        }
    }

    function highlightPattern() {
        var interval, i = 0;
        $('#length').html('Pattern Length: ' + patternArray.length);
        $('#correct').html('Number of Correct Guesses: ' + numUserGuesses);

        interval = setInterval(function() {
            // light up the current array value's corresponding section
            lightUpSection(patternArray[i], 700);

            i++;
            if (i >= patternArray.length) {
                clearInterval(interval);
                isPlayersTurn = true;
            }
        }, 1000);
    }

    function resetGame() {
        console.log('game over...');
        isGameInProgress = false;
        isHardMode = false;
        isGameOver = false;
        isPlayersTurn = false;
        patternArray = [];
        numUserGuesses = 0;
        roundsWon = 0;
    }

    function lightUpSection(section, interval) {
        var currColor = $('[data-lightup=' + section + ']').css('opacity', '1.0');
        window.setTimeout(function() {
            currColor.css('opacity', '0.6');
        }, interval);
    }
});






