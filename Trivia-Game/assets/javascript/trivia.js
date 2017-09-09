$(document).ready(function() {
  //Global variables
  //=============================================================================
  //var(s) for questions and answers
  var questionData = {
    question: ["What is Harry's last name?", "In to which house was Harry placed?", "Who tried to kill Harry in the first book?", "Who is Harry's godfather?", "How many Harry Potter books are there?", "Who is Harry's ancestor?", "Who was Ron's first girlfriend?", "Who killed Sirius Black?"],
    answerList: [["Potter", "Dursley", "Weasley", "Granger"],["Slytherin", "Ravenclaw", "Gryffindor", "Hufflepuff"], ["Professor Dumbledore", "Ron Weasley", "Reubeus Hagrid", "Lord Voldemort"], ["James Potter", "Sirius Black", "Peter Pettigrew", "Alastor Moody"], [1, 4, 5, 7], ["Salazar Slytherin", "Godric Gryffindor", "Helga Hufflepuff", "Rowena Ravenclaw"], ["Hermione Graner", "Lavendar Brown", "Parvati Patel", "Milicent Boulstrod"], ["Severus Snape", "Lily Potter", "Narcissa Malfoy", "Belatrix Lestrange"]],
    correctAns: ["Potter", "Gryffindor", "Lord Voldemort", "Sirius Black", 7, "Godric Gryffindor", "Lavendar Brown", "Belatrix Lestrange"]
  };
  //var for correct count
  var correctCount = 0;
  //var for incorrect count
  var incorrectCount = 0;
  //var for no answer
  var blank = 0;
  //var for current question count
  var questionIndex = 0;
  //var to set time for each question - set to 31 so user sees 30 seconds for each question
  var timePerQuestion = 31;
  //undefined var to later hold settimeout for each question
  var remainingTime;
  //undefined var to later hold setinterval to count down remaining time
  var intervalId;
  //undefined var to later hold settimeout for correct, incorrect, or no answer screen
  var nextQuestion;


  //Functions
  //=============================================================================

  // function to display time, questions, and answers on screen
  function gameDisplay() {
    if (questionIndex == questionData.question.length) {
      endGame();
    } else {
      //Set the timerPerQuestion back to orignal time after new question displays
      timePerQuestion = 31;
      //set time out of current question - if time runs out, run the evalAnswerBlank function
      remainingTime = setTimeout(evalAnswerBlank, (timePerQuestion * 1000));
      //run the functions to control time counting down
      questionTimer(); count();
      //display questions
      $('#question').html('<div><p class="questionText">' + questionData.question[questionIndex] + '</p></div>');
      //display answers
      for (var i=0; i<questionData.answerList[questionIndex].length; i++) {
        $('#answers').append('<li class="anAnswer">' + questionData.answerList[questionIndex][i] + '</li>');
      }
      //when user clicks an answer, evaluate the answer
      $('.anAnswer').on('click', evalAnswer);
      //clear the message screen completely when new question displays
      $('#answerScreen').empty();
      //clear the message screen timeout when new question displays
      clearTimeout(nextQuestion);
    }
  }

  //function to evaluate user answer - no answer
  function evalAnswerBlank() {
    //clear the settimeout for quesitons
    clearTimeout(remainingTime);
    //clear the interval counting down timerperquestion
    clearInterval(intervalId);
    blank++;
    //clear out timer div, question div, and answer div
    $('#timeRemaining, #question, #answers').empty();
    //insert on screen information about the user's answer or non-answer
    $('#answerScreen').html('<div><p class="message">Ooh, time\'s up!</p></div><div><p>The correct answer was ' + questionData.correctAns[questionIndex] + '.</p></div>');
    //run the function to load the next question
    loadNext();
  }

  function evalAnswer() {
    //clear the timeout question timeouts
    clearTimeout(remainingTime);
    //clear the count down interval
    clearInterval(intervalId);
    //if the user clicks the correct answer, store answer as correct answer
    if ($(this).html() == questionData.correctAns[questionIndex]) {
      //show screen congratulating the user
      correctCount++;
      //empty the timer div, question div, and answer div
      $('#timeRemaining, #question, #answers').empty();
      //insert on screen information about the user's answer or non-answer
      $('#answerScreen').html('<div><p class="message">Yes! ' + $(this).html() + ' was the correct answer.</p></div><div><p>Great job!</p></div>');
      //run the function to load the next question
      loadNext();
    } //if the user clicks the incorrect answer, store answer as incorrect answer
    else {
      //show screen telling the user their answer was wrong and what the correct answer was
      incorrectCount++;
      //empty the timer div, question div, and answer div
      $('#timeRemaining, #question, #answers').empty();
      //insert on screen information about the user's answer or non-answer
      $('#answerScreen').html('<div><p class="message">Nope! ' + $(this).html() + ' is the wrong answer!</p></div><div><p>The correct answer was ' + questionData.correctAns[questionIndex] + '.</p></div>');
      //run the function to load the next question
      loadNext();
    }
  }

  //evaluate game
  function endGame() {
    //clear the settimeout for correct, incorrect, or no answer screen
    clearTimeout(nextQuestion);
    //clear the timeout question timeouts
    clearTimeout(remainingTime);
    //clear the count down interval
    clearInterval(intervalId);
    //...empty the correct, incorrect, or no answer screen
    $('#answerScreen').empty();
    //show number of correct answers, incorrect answers, and non-answered questions (separated for readability)
    $('#gameOver').append('<div><p class="message">Game Over!</p></div>')
    .append('<div><p>You answered ' + correctCount + ' questions correct.</p></div>')
    .append('<div><p>You answered ' + incorrectCount + ' questions incorrect.</p></div>')
    .append('<div><p>You left  ' + blank + ' question(s) blank.</p></div>')
    .append('<button id="gameAgain">Restart Game</button>');
  }

  //function to queue up the next question after the correct, incorrect, or no answer screen
  function loadNext(){
    nextQuestion = setTimeout(gameDisplay, 3500);
    questionIndex++;
  }

  //function to decrement the timerPerQuestion by 1 every second
  function count() {
    intervalId = setInterval(questionTimer, 1000);
  }
  //function to decrement timerPerQuestion and that time on screen
  function questionTimer() {
    timePerQuestion--;
    $('#timeRemaining').html('<h3>' + timePerQuestion + '</h3>');
  }

  //Game actions
  //=============================================================================

  //on click of start game button, game loads
  $('.startGame').on('click', function() {
    //clear start button
    $('#btnDiv').empty();
    //add question and list of answers
    return gameDisplay();
  });

  //To restart the game, the user can click the restart game button, which...
  $('.container').on('click', '#gameAgain', function() {
    //empties the end screen
    $('#gameOver').empty();
    //sets quesitonIndex back to 0 to pull correct info
    questionIndex = 0;
    //sets correctCount to 0 so end game total will be accurate per game
    correctCount = 0;
    //sets incorrectCount to 0 so end game total will be accurate per game
    incorrectCount = 0;
    //sets blank to 0 so end game total will be accurate per game
    blank = 0;
    //loads the gameDisplay function to load the timer, first quesiton and answers
    return gameDisplay();
  });
});
