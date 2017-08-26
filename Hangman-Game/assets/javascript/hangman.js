//var for Words
var gameWords = ["horror", "fright", "terror", "hangman", "nosferatu", "dracula", "dread", "panic", "monster", "alarm", "scare", "afraid", "fear", "scare"];
//var to hold array of images
var images = ["assets/images/Base-10.png", "assets/images/Base-9.png", "assets/images/Base-8.png", "assets/images/Base-7.png", "assets/images/Base-6.png", "assets/images/Base-5.png", "assets/images/Base-4.png", "assets/images/Base-3.png", "assets/images/Base-2.png", "assets/images/Base-1.png", "assets/images/Base-0.png"];
// var to rightLetter word randomly selected by algorithm
var wordSelected = gameWords[Math.floor(Math.random() * gameWords.length) + 1];
//var for word underscores
var underscores = [];
// var for number of times user has won
var wins = 0;
// var for number of times user has lost
var losses = 0;
// var for letters guessed
var guessedLetter = [];
// var for wrongly guessed letters
var wrongLetter = "";
// var for correctly guessed letters
var rightLetter = "";
// var for number of guesses
var guessesRemaining = 10;
// var for acceptable characters
var alphabet = "abcdefghijklmnopqrstuvwxyz";

//log to the console the wordSelected for debugging
console.log(wordSelected);

//Function to turn random word into underscores
function toUnderscores() {
  //for loop to iterate through the wordSelected to set number of underscores
  for (var i = 0; i < wordSelected.length; i++) {
    // for each each index of the underscores array, add an underscore
    underscores[i] = "_";
  }
  //join rightLetter to underscores to assign letters to the same underscore for later
  rightLetter = underscores.join(" ");
  //write the underscores to the correct html element
  document.getElementById('currentWord').innerHTML = rightLetter;
}
toUnderscores();

//function for correctly guessed letters
function right() {
  //Add letter to correct letter area and replace underscores with letter
  for (var i = 0; i < wordSelected.length; i++) {
    //if the guessed letter matches a letter in the wordSelected...
    if (wordSelected[i] === guessedLetter) {
      //replace underscore with correct letter
      underscores[i] = guessedLetter;
    }
  }
  document.getElementById('currentWord').innerHTML = underscores.join(" ");
}

// function for incorrectly guessed letters
function wrong() {
  //if the letter typed is not already in the wrongLetter string[array], add it to the string
    if (wrongLetter.indexOf(guessedLetter) < 0) {
      wrongLetter = wrongLetter + " " + guessedLetter;
      //Decrease number of remaining guesses for incorrect guesses
      guessesRemaining--;
      // show new guessesRemaining count to user
      var guessesSpan = document.getElementById('guesses-remaining');
      guessesSpan.innerHTML = guessesRemaining;
      // show incorrectly guessed letters to user
      var wrongSpan = document.getElementById('letters-guessed-wrong');
      wrongSpan.innerHTML = wrongLetter;
      // update hangman image for incorrect guesses
      document.getElementById('hangman-img').src = images[guessesRemaining];
    }
  }

//Function for game logic
document.onkeyup = function(event) {
  //Evaluate typed key
  guessedLetter = event.key.toLowerCase();
    //If typed character is a match in the alphabet var
    if (alphabet.indexOf(guessedLetter) > -1) {
      // if the letter typed by the user is in the wordSelected string[array]...
      if (wordSelected.indexOf(guessedLetter) > -1) {
        //then the right() function runs
        right();
        //If user guesses all the correct letters
        if (underscores.join('') == wordSelected) {
          //increase wins count by one
          wins++;
          //show updated wins count to user in correct HTML area
          var winsSpan = document.getElementById('wins');
          winsSpan.innerHTML = wins;
          //alert to the user they've won
          alert("Oooohhh, probably feeling good about yourself huh? Guessing the right word and all. Yeah, that's right, you got it right. Close this message to play again.");
          //function to reset game
          gameGo();
        }
      //otherwise, the wrong() function runs
      } else {
        wrong();
        //If remainingGuesses gets to zero
        if (guessesRemaining == 0) {
          //increase wins/losses
          losses++;
          var lossesSpan = document.getElementById('losses');
          lossesSpan.innerHTML = losses;
          alert("YOU MURDERER! You couldn't guess the right word? Was it really that hard? Well, since you're dumb (and a killer), here's the right word: \"" + wordSelected + "\". Feel free to try again. And maybe this time actually try...");
          gameGo();
        }
      }
    }
  };

//Function that (re)starts game
function gameGo() {
  wordSelected = gameWords[Math.floor(Math.random() * gameWords.length)];
  console.log(wordSelected);
  guessesRemaining = 10;
  underscores = [];
  rightLetter = "";
  wrongLetter = "";
  toUnderscores();
  document.getElementById('hangman-img').src = images[10];
  var guessesSpan = document.getElementById('guesses-remaining');
  guessesSpan.innerHTML = guessesRemaining;
  // show incorrectly guessed letters to user
  var wrongSpan = document.getElementById('letters-guessed-wrong');
  wrongSpan.innerHTML = wrongLetter;
  // update hangman image for incorrect guesses
  document.getElementById('hangman-img').src = images[guessesRemaining];
}

//Function to reset game if user chooses to, with a loss penalty 
function newWord() {
  var areYouSure = confirm("Are you sure you want a new word? If you you continue, any progress on the current word will be lost, and your losses will increase.");
  if (areYouSure) {
    wordSelected = gameWords[Math.floor(Math.random() * gameWords.length)];
    console.log(wordSelected);
    guessesRemaining = 10;
    underscores = [];
    rightLetter = "";
    wrongLetter = "";
    losses++;
    var lossesSpan = document.getElementById('losses');
    lossesSpan.innerHTML = losses;
    toUnderscores();
    document.getElementById('hangman-img').src = images[10];
    var guessesSpan = document.getElementById('guesses-remaining');
    guessesSpan.innerHTML = guessesRemaining;
    // show incorrectly guessed letters to user
    var wrongSpan = document.getElementById('letters-guessed-wrong');
    wrongSpan.innerHTML = wrongLetter;
    // update hangman image for incorrect guesses
    document.getElementById('hangman-img').src = images[guessesRemaining];
  }
}
