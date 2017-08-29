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

$(document).ready(function(){
  //generates a random number for the user to try to match
  randomNumber = Math.floor(Math.random() * (120-19+1)) + 19;
  $('#random-number').html(randomNumber);
  //Initalize wins and losses on screen
  $('#wins').html(wins);
  $('#losses').html(wins);
  $('#user-score').html(score);
  //generates a random number for each crystal with which the user can interact
  for (var i = 0; i < 4; i++) {
    crystalValues[i] = Math.floor(Math.random() * (12-1+1)) + 1;
  }
  console.log(crystalValues);

  function evaluateGame() {
    if (score === randomNumber) {
      wins++;
      $('#game-alert').html("You won!").addClass('green').removeClass('red');
      $('#wins').html(wins);
      resetGame();
    } else if (score > randomNumber) {
      losses++;
      $('#game-alert').html("You lost!").addClass('red').removeClass('green');
      $('#losses').html(losses);
      resetGame();
    }
  }

  //MUST DRY UP
  $('#crystalOne').on("click", function () {
    $('#user-score').html(score += crystalValues[0]);
    evaluateGame();
  });
  $('#crystalTwo').on("click", function () {
    $('#user-score').html(score += crystalValues[1]);
    evaluateGame();
  });
  $('#crystalThree').on("click", function () {
    $('#user-score').html(score += crystalValues[2]);
    evaluateGame();
  });
  $('#crystalFour').on("click", function () {
    $('#user-score').html(score += crystalValues[3]);
    evaluateGame();
  });

  function resetGame() {
    score = 0;
    randomNumber = Math.floor(Math.random() * (120-19+1)) + 19;
    $('#random-number').html(randomNumber);
    crystalValues = [];
    for (var i = 0; i < 4; i++) {
      crystalValues[i] = Math.floor(Math.random() * (12-1+1)) + 1;
    }
    $('#user-score').html(score);
    console.log(crystalValues);
  }
});
