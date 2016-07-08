$(document).ready(function() {
    var isGameInProgress = false;
    var isHardMode = false;
    var isGameOver = false;
    var isPlayersTurn = false;
    var patternArray = [1, 2];
    var numUserGuesses = 0;

    // handlers
    $('.game-btns').click(function() {
        if (isPlayersTurn) {
            console.log($(this).attr('data-lightup'), patternArray[numUserGuesses])
            var selectedColor = $(this).attr('data-lightup');

            if (selectedColor !== patternArray[numUserGuesses].toString()) {
                // if any wrong guess before getting to end of sequence end game
                resetGame();
                return;
            }

            numUserGuesses++

            if (numUserGuesses === patternArray.length) {

                // if click happens and we're at end of array user guessed correct pattern
                patternArray.push(generateRandomNumber());
                numUserGuesses = 0;
                highlightPattern();
            }
        }
    });
    $('button').click(function() {
        if (!isGameInProgress) {
            isGameInProgress = true;
            init();
        }
    });

    function init() {
        var countdownInterval, countDown = 1;
        var currPatternLength = $('<h2>').html('Pattern Length: ' + patternArray.length);
        var numCorrectGuesses = $('<h2>').html('Number of Correct Guesses: ' + numUserGuesses);
        var gameStartsIn = $('<h2 id="countdown">').html('Game Starts In: ' + countDown);

        $('#score').append(currPatternLength, numCorrectGuesses, gameStartsIn);

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
        var i = 0;
        var interval = setInterval(function() {
            var currColor = $('[data-lightup=' + patternArray[i] + ']').css('opacity', '1.0');
            window.setTimeout(function() {
                currColor.css('opacity', '0.6');
            }, 700);

            i++;
            if (i >= patternArray.length) {
                clearInterval(interval);
                isPlayersTurn = true;
            }
        }, 1000);
    }

    function resetGame() {
        console.log('game over...');
    }

});






