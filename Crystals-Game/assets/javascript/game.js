//Global variables
//-----------------------------------------------------------------------
//var to hold randomly generated number to match
var randomNumber;
//var to hold crystal 1 value
var score = 0;
//var to hold number of wins
var wins = 0;
//var to hold number of losses
var losses = 0;
// var of array to hold values of crystals
var crystalValues = [];

//functions
//-----------------------------------------------------------------------
function startGame() {
  randomNumber = Math.floor(Math.random() * (120-19+1)) + 19;
  score = 0;
  //Initalize values on screen
  $('#random-number').html(randomNumber);
  $('#wins').html(wins);
  $('#losses').html(losses);
  $('#user-score').html(score);
  //generates a random number for each crystal with which the user can interact
  $('.crystal').each(function(i) {
    crystalValues[i] = Math.floor(Math.random() * (12-1+1)) + 1;
  });
  console.log(crystalValues);
}

function evaluateGame() {
  if (score == randomNumber) {
    wins++;
    $('#game-alert').html("You won!").addClass('green').removeClass('red');
    $('#wins').html(wins);
    startGame();
  } else if (score > randomNumber) {
    losses++;
    $('#game-alert').html("You lost!").addClass('red').removeClass('green');
    $('#losses').html(losses);
    startGame();
  }
}

//Game Logic
//-----------------------------------------------------------------------

$(document).ready(function(){
  startGame();
  //when clicking any individual crystal, the value of the crystal is added to the user score
  $('.crystal').each(function(i) {
    $(this).on("click", function() {
      $('#user-score').html(score += crystalValues[i]);
      evaluateGame();
    });
  });
});
