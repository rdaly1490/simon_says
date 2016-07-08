$(document).ready(function() {
    var isGameInProgress = false;
    var isHardMode = false;
    var patternArray = [];
    var numUserGuesses = 0;

    // handlers
    $('.game-btns').click(function() {
        console.log($(this).attr('data-tile'), '  ', $(this).attr('id'));
    });
    $('button').click(function() {
        if (!isGameInProgress) {
            isGameInProgress = true;
            init();
        }
    });

    function init() {
        var countDown = 3;
        var currPatternLength = $('<h2>').html('Pattern Length: ' + patternArray.length);
        var numCorrectGuesses = $('<h2>').html('Number of Correct Guesses: ' + numUserGuesses);
        var gameStartsIn = $('<h2 id="countdown">').html('Game Starts In: ' + countDown);

        $('#score').append(currPatternLength, numCorrectGuesses, gameStartsIn);

        var countdownInterval = setInterval(function() {
            countDown--;
            $('#countdown').html('Game Starts In: ' + countDown);
            if (countDown === 0) {
                clearInterval(countdownInterval);
                $('#countdown').remove();
                startGame()
            }
        }, 1000);
    }

    function startGame() {
        console.log('game starting...');
    }
});






