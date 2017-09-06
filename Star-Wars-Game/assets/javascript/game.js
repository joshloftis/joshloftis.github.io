// Global Variables
//-----------------------------------------------------------------------------
  //object to hold characters, attack power, hp, and counter attack power
  var charAttr = {
    image: ['src="assets/images/Luke_Skywalker.png"', 'src="assets/images/Darthvader3.png"', 'src="assets/images/rey.png"', 'src="assets/images/kyloren.png"' ],
    name: ["Luke Skywalker", "Darth Vader", "Rey Skywalker", "Kylo Ren"],
    attack: [8, 10, 5, 4],
    health: [120, 100, 150, 180],
    counter: [10, 15, 8, 22],
    baseAttack: [8, 10, 5, 4]
  };
  //playerChosen false until the player initally selects a player, serves as lock
  var playerChosen = false;
  // enemyChosen false until player selects an enemy, serves as lock so only one enemy can be chosen
  var enemyChosen = false;
  // set to true initally so if user clicks attack they get a message
  var enemyDefeated = true;
  // the player the user chooses
  var chosenPlayer;
  // the health of the player the user chose
  var playerHP;
  //the attack of the player the user chose
  var playerAttack;
  //the base attack of the player the user chose
  var playerBaseAttack;
  //the enemy the player chose, will reset when enemies are defeated
  var chosenEnemy;
  //the counter attack of the enemy chosen by user
  var enemyCounter;
  // the health of the enemy chosen by user
  var enemyHP;
  //var to hold the number of enemies defeated
  var enemiesDefeated = 0;
// Functions
//-----------------------------------------------------------------------------
  //iterates through the divs in the HTML with the .charDiv class, and then writes the information from the charAttr object to jQuery data and populates images, name, and health on screen
  $('.charDiv').each(function(i) {
    $(this).data({"name" : charAttr.name[i], "attack" : charAttr.attack[i], "health" : charAttr.health[i], "counter" : charAttr.counter[i], "baseAttack" : charAttr.baseAttack[i]})
    .append('<div class="name">' + charAttr.name[i] + "</div>")
    .append('<img class="img-responsive center-block charImg" ' + charAttr.image[i] + '>')
    .append('<div class="health">' + charAttr.health[i] + "</div>");
  });
// Game Logic
//-----------------------------------------------------------------------------
$(document).ready(function() {

  // when user selects an image///
  $('.charDiv').on('click', function () {
    //if playerChosen is set to false (which it is initally)...
    if (playerChosen == false) {
      //the image the user selects is assigned to the chosenPlayer var
      chosenPlayer = $(this);
      //the playerHP var is assigned the health of chosenPlayer
      playerHP = $(chosenPlayer).data("health");
      //playerAttack is assigned the attack of chosenPlayer
      playerAttack = $(chosenPlayer).data("attack");
      //playerBaseAttack is assigned the baseAttack of chosenPlayer
      playerBaseAttack = $(chosenPlayer).data("baseAttack");
      //once clicked, add the clicked image to the playerArea div
      $('#playerArea').append(this);
      //remove the ability to click the image again (keeps the game from selecting a different player)
      $(this).off('click');
      //after player is selected, all non-selected images are moved to the holding bin div
      $('.charDiv').not(this).appendTo('#holdingBin');
      //setting playerChosen to true to unlock
      //remove starting area div
      $('#startingArea').empty();
      playerChosen = true;
      // else if does nothing to keep the user from clicking holding bin enemies multiple times
    } else if (enemyChosen == true){
    // when playerChosen is true...
    } else {
      // add the next clicked image to the defenderArea (i.e., the chosen enemy)
      $('#defender').html(this);
      //remove the ability to click the image again
      $(this).off('click');
      //setting enemyChosen to true to act as lock
      enemyChosen = true;
      //the image the user selects is assigned to the chosenEnemy var
      chosenEnemy = $(this);
      //the enemyHP var is assigned the health of the enemy chosen
      enemyHP = $(chosenEnemy).data("health");
      //the enemyCounter var is assigned the counter attack of the enemy chosen
      enemyCounter = $(chosenEnemy).data("counter");
      //set to false to act as lock to allow attack button to attack rather than HTML a message
      enemyDefeated = false;
    }
    });
    //When the user clicks the attack button...
    $('#attackBtn').on('click', function() {
      // if enemyDefeated is set to false...
      if (enemyDefeated == false && playerChosen == true) {
        // subtract the enemyCounter from the playerHP
        playerHP -= enemyCounter;
        //substact the playerAttack from the enemyHP
        enemyHP -= playerAttack;
        //add playerBaseAttack to playerAttack as power up
        playerAttack += playerBaseAttack;
        //replace player HP on screen for user info
        $('#playerArea > .charDiv > .health').html(playerHP);
        //replace enemy HP on screen for user info
        $('#defender > .charDiv > .health').html(enemyHP);
        // add the amount of damage player chosen is doing and enemy is doing on screen
        $('#alert').html('<div class="alerts col-xs-4"><div class="row"><div class="col-xs-12">You attacked ' + chosenEnemy.data('name') + ' for ' + playerAttack + ' damage.</div><div class="col-xs-12">' + chosenEnemy.data('name') + ' attack you back for ' + enemyCounter + ' damage.</div></div></div>');
        //if the playerHP gets to be less than or equal to 0...
          if (playerHP <= 0) {
            //replace all content on screen, sans logo, with loser text
            $('#content').html('<div class="endText">YOU LOSE! Refresh page to play again.</div>');
            //while attacking enemy, if enemy HP is less than or equal to 0...
          } else if (enemyHP <= 0) {
             enemiesDefeated += 1;
             //clear damage alerts area
             $('.alerts').empty();
             //remove class to remove border and background
             $('.alerts').addClass('alert-no-border');
             console.log(enemiesDefeated);
             //set enemyDefeated to true so if user clicks attack button a message tells them to select an enemy
             enemyDefeated = true;
             //set enemyChosen to false so the user can select another enemy to attack
             enemyChosen = false;
             //remove the defeated enemy
             $('#defender').empty();
             //of the enemiesDefeated count equals three (meaning, all enemies defeated)///
             if (enemiesDefeated === 3) {
               //rempve all content on page, sans logo, and replace with win message
                 $('#content').html('<div class="endText">Wisely you chose, young padawan. You win. Refresh the page to play again.</div>');
               }
           }
        // if enemyChosen is false
      } else if (enemyChosen == false) {
        //when the user clicks the attack button, print message to screen
        alert("An enemy you must choose! Master Yoda requires it!");
      }
    });
});
