// global to allow setting var from console
var isHardMode = false;

$(document).ready(function() {
    var isGameInProgress = false;
    var isGameOver = false;
    var isPlayersTurn = false;
    var patternArray = [];
    var numUserGuesses = 0;
    var roundsWon = 0;

    // intentional console logs for players
    console.log('%cHey There! %c', 'color: green; font-weight: bold; font-size: 20px', 'font-size: 30px');
    console.log('%cLooking for a challenge? Try changing the difficulty --> setDifficulty()', 'font-weight: bold; font-size: 12px');

    // check user guesses
    $('.game-btns').click(function() {
        if (isPlayersTurn) {
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
        var currPatternLength = $('<h4 id="length">').html('Pattern Length: ' + patternArray.length);
        var numCorrectGuesses = $('<h4 id="correct">').html('Number of Correct Guesses: ' + numUserGuesses);
        var numCorrectRounds = $('<h4 id="rounds">').html('Number of Correct Rounds: ' + roundsWon);
        var gameStartsIn = $('<h4 id="countdown">').html('Game Starts In: ' + countDown);

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
        if (isGameOver) {
            resetGame();
        } else {
            highlightPattern();
        }
    }

    function generateRandomNumber() {
        var min = 1, max = 4;

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function highlightPattern() {
        var interval, i = 0, lightUpInterval = 700, outerInterval = 1000;
        $('#length').html('Pattern Length: ' + patternArray.length);
        $('#correct').html('Number of Correct Guesses: ' + numUserGuesses);

        if (isHardMode) {
            lightUpInterval = 200;
            outerInterval = 400;
        }

        interval = setInterval(function() {
            // light up the current array value's corresponding section
            lightUpSection(patternArray[i], lightUpInterval);

            i++;
            if (i >= patternArray.length) {
                clearInterval(interval);
                isPlayersTurn = true;
            }
        }, outerInterval);
    }

    function resetGame() {
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

// easter egg function to access from console
function setDifficulty(diff) {
    switch (diff.toLowerCase()) {
        case 'hard':
            isHardMode = true;
            break;
        case 'normal':
            isHardMode = false;
            break;
        default:
            console.log('Please enter either string "normal" or "hard"');
    }
}






