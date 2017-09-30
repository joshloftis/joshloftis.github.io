var choices = ["rock", "paper", "scissors"];
var userAns;
var compAns;
var userWins = 0;
var userLosses= 0;
var compWins = 0;
var compLosses = 0;
var ties = 0;

$('li').on('click', function() {
  userAns = $(this).html();
  console.log(userAns);
  compAns = choices[Math.floor(Math.random() * choices.length)];
  console.log(compAns);
  evalGame();
});

function winComp() {
  console.log("Computer wins");
  compWins++;
  userLosses++;
  $('#compWins').html(compWins);
  $('#userLosses').html(userLosses);
}

function winUser() {
  console.log("User wins");
  userWins++;
  compLosses++;
  $('#userWins').html(userWins);
  $('#compLosses').html(compLosses);
}

function tie() {
  console.log("Tie");
  ties++;
  $('#ties').html(ties);
}

function evalGame() {
  if (userAns == "rock" && compAns == "paper") {
    winComp();
  } else if (userAns == "paper" && compAns == "scissors") {
    winComp();
  } else if (userAns == "scissors" && compAns == "rock") {
    winComp();
  } else if (compAns == "rock" && userAns == "paper") {
    winUser();
  } else if (compAns == "paper" && userAns == "scissors") {
    winUser();
  } else if (compAns == "scissors" && userAns == "rock") {
    winUser();
  } else if (compAns == "rock" && userAns == "rock") {
    tie();
  } else if (compAns == "paper" && userAns == "paper") {
    tie();
  } else if (compAns == "scissors" && userAns == "scissors") {
    tie();
  }
}
