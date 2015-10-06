$(document).ready(function(){
     var answer = Math.floor((Math.random() * 100) + 1);
    console.log("The secret number is: " + answer);
    var numberOfGuesses = 0;
    var guesses = [];
    var distance = null;
    var previousDistance = null;

$('form').submit(function(e){
    function getGuess() {
        event.preventDefault();
        $("#guessButton").click(game);
        $("#userGuess").keydown(function (enter) {
            if (enter.keyCode == 13) {
                game();
            }
        });
    }
     getGuess(); 
})
   

    function game() {
        var guess = parseInt($('#userGuess').val());
        if (guess !== null && $.isNumeric(guess) && (1 < guess < 101)) {
            $('#userGuess').val('');
            numberOfGuesses ++;
            setCount(numberOfGuesses);
            guesses.push(guess);
            distance = Math.abs(answer - guess);
            previousDistance = Math.abs(answer - guesses[guesses.length - 2]);
            if (guess === answer) {
                $('#guessList').html('Congrats! You got it in ' + numberOfGuesses + ' attempts! The secret number was ' + answer);
            } else {
                console.log(guess, answer, previousDistance, distance);
                if (isNaN(previousDistance)) {
                    if (guess > answer) {
                        $('#guessList').html('Getting warmer! Last guess: ' + guess);
                    } else if (guess < answer) {
                        $('#guessList').html('Getting Cold! Last guess: ' + guess);
                    }

                } else if (distance > previousDistance) {
                    if (guess > answer) {
                        $('#guessList').html('You\'re getting colder, guess lower! Last guess: ' + guess);
                    } else if (guess < answer) {
                        $('#guessList').html('You\'re getting colder, guess higher! Last guess: ' + guess);
                    }
                } else if (distance < previousDistance) {
                    if (guess > answer) {
                        $('#guessList').html('You\'re getting warmer, guess lower! Last guess: ' + guess);
                    } else if (guess < answer) {
                        $('#guessList').html('You\'re getting warmer, guess higher! Last guess: ' + guess);
                    }
                } else if (distance === previousDistance) {
                    if (guess > answer) {
                        $('#guessList').html('You\'re on fire, guess lower! Last guess: ' + guess);
                    } else if (guess < answer) {
                        $('#guessList').html('You\'re on fire, guess higher! Last guess: ' + guess);
                    }
                } else {
                    $('#guessList').html('ERROR: Your guess must be a number between 1 and 100').css({
                        color: 'red'
                    });
                }
            }
        }
        $('.what').click(function(){
            $('.overlay').fadeIn(1000);

        });

        /*--- Hide information modal box ---*/
        $('a.close').click(function(){
            $('.overlay').fadeOut(1000);
        });
        $('.new').click(function(event){
            event.preventDefault();
            newGame();
        });

        /*--- Create a New Game! ---*/
            function newGame() {
                guessFlag = true;
                numberOfGuesses = 0;
                found = false;
                $('ul#guessList li').remove();
                setCount(numberOfGuesses);
                answer = Math.floor((Math.random() * 100) + 1);
                console.log(answer);
                setFocus();
                clearText();
                }
                /*--- Set focus to the inputbox ---*/
                function setFocus() {
                    document.getElementById("userGuess").focus();
                }

                /*--- Clear the text box ---*/
                function clearText() {
                    $('#userGuess').val('');
                }
                    function setCount(count) {
                    $('#count').text(numberOfGuesses);
                    }
    }
});