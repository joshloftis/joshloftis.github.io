//Global variables
//=============================================================================
//var(s) for questions and answers
var questionData = {
  question: ["What is Harry's last name?", "In to which house was Harry placed?", "Who tried to kill Harry in the first book?", "Who is Harry's godfather?", "How many Harry Potter books are there?", "Who is Harry's ancestor?", "Who was Ron's first girlfriend?", "Who killed Sirius Black?"],
  answer: [["Potter", "Dursley", "Weasley", "Granger"],["Slytherin", "Ravenclaw", "Gryffndor", "Hufflepuff"], ["Professor Dumbledore", "Ron Weasley", "Reubeus Hagrid", "Lord Voldemort"], ["James Potter", "Sirius Black", "Peter Pettigrew", "Alastor Moody"], [1, 4, 5, 7], ["Salazar Slytherin", "Godric Gryffndor", "Helga Hufflepuff", "Rowena Ravenclaw"], ["Hermione Graner", "Lavendar Brown", "Parvati Patel", "Milicent Boulstrod"], ["Severus Snape", "Lily Potter", "Narcissa Malfoy", "Belatrix Lestrange"]],
  correctAns: ["Potter", "Gryffndor", "Lord Voldemort", "Sirius Black", 7, "Godric Gryffndor", "Lavendar Brown", "Belatrix Lestrange"]
};
//var for correct count
var correctCount = 0;
//var for incorrect count
var incorrectCount = 0;
//var for current question count
var currentQuestion = 0;
var questions = function() {
  $('#question').html(questionData.question[currentQuestion]);
};
var answers = function() {
  for (var i=0; i < questionData.answer[currentQuestion].length; i++) {
    $('#answers').append('<li class="anAnswer">' + questionData.answer[currentQuestion][i] + '</li>');
  }
};

console.log(questionData.question.length);

//Functions
//=============================================================================
function initGame() {
  currentQuestion = 0;
  return questions(), answers();
}

function nextQuestion() {
  $('#answers').empty();
  currentQuestion++;
  console.log(currentQuestion);
  if (currentQuestion == questionData.question.length) {
    evalGame();
  } else {
    return questions(), answers();
  }
}

function evalAnswer() {
    if ($(this).html() == questionData.correctAns[currentQuestion]) {
      correctCount++;
      nextQuestion();
    } else {
      incorrectCount++;
      nextQuestion();
    }
}

function evalGame() {
  $('#question, #answers').empty();
  $('#gameOver').html('<div> You answered ' + correctCount + ' questions correctly!</div><div>You answered ' + incorrectCount + ' questions incorrectly!</div>');
}

//Game Logic
//=============================================================================
$(document).ready(function() {
  initGame();
  $(document).on('click', '.anAnswer', evalAnswer);
});
