// Global Variables
//-----------------------------------------------------------------------------
  //object to hold characters, attack power, hp, and counter attack power
  var charAttr = {
    image: ['src="assets/images/Luke_Skywalker.png"', 'src="assets/images/Darthvader3.png"', 'src="assets/images/rey.png"', 'src="assets/images/kyloren.png"' ],
    name: ["Luke Skywalker", "Darth Vader", "Rey Skywalker", "Kylo Ren"],
    attack: [8, 10, 5, 4],
    health: [120, 100, 150, 180],
    counter: [10, 15, 8, 22]
  };
  var playerChosen = false;
  var enemyChosen = false;
  var gameOver = false;
  var chosenPlayer;
  var chosenEnemy;




// Functions
//-----------------------------------------------------------------------------

  $('.charDiv').each(function(i) {
    $(this).data({"name" : charAttr.name[i], "attack" : charAttr.attack[i], "health" : charAttr.health[i], "counter" : charAttr.counter[i]})
    .append('<div class="name">' + charAttr.name[i] + "</div>")
    .append('<img class="img-responsive center-block charImg" ' + charAttr.image[i] + '>')
    .append('<div class="health">' + charAttr.health[i] + "</div>");
  });


  

// Game Logic
//-----------------------------------------------------------------------------
$(document).ready(function() {

  $('.charDiv').on('click', function () {
    if (playerChosen == false) {
      chosenPlayer = $(this);
      $('#playerArea').append(this);
      $(this).unbind('click');
      $('.charDiv').not(this).appendTo('#holdingBin');
      playerChosen = true;
    } else if (enemyChosen == true){
    } else {
      $('#defenderArea').html(this);
      $(this).unbind('click');
      enemyChosen = true;
      chosenEnemy = $(this);
    }
  });


});
