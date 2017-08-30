$(document).ready(function() {
  //object to hold characters, attack power, hp, and counter attack power
  var charAttr = {
    image: ['src="assets/images/Luke_Skywalker.png"', 'src="assets/images/Darthvader3.png"', 'src="assets/images/rey.png"', 'src="assets/images/kyloren.png"' ],
    name: ["Luke", "Vader", "Rey", "Ren"],
    attack: [8, 10, 5, 4],
    health: [120, 100, 150, 180],
    counter: [10, 15, 8, 22]
  };
  var playerChosen = false;
  var enemyChosen = false;
  var gameOver = false;
  var chosenChar;
  var chosenEnemy;

  //iterates through each .charDiv and applies the corresponding charAttr key and value and then appends the characters name, image and health
  $('.charDiv').each(function(i) {
    $(this).attr({"name" : charAttr.name[i], "attack" : charAttr.attack[i], "health" : charAttr.health[i], "counter" : charAttr.counter[i]})
    .append('<div class="name">' + charAttr.name[i] + "</div>")
    .append('<img class="img-responsive center-block" ' + charAttr.image[i] + '>')
    .append('<div class="health">' + charAttr.health[i] + "</div>");
  });

  console.log($('#char1').attr("name"));

  $('.charDiv').on('click', function () {
    console.log($(this).attr("name"));

    playerChosen = true;
  });
});
