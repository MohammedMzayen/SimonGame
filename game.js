var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
        level = 0;
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

  $(".btn").click(function() {
    var buttonId = this.id;
    playSound(buttonId);

    animatePress(buttonId);

    userClickedPattern.push(buttonId);
    console.log(gamePattern);
    console.log(userClickedPattern);

    checkAnswer(userClickedPattern.length-1);

    
  });

function playSound (name) {
    var sound = new Audio("sounds/"+ name + ".mp3");
    sound.play();
}

function animatePress(buttonId) {
    $("#"+buttonId).addClass("pressed");
    setTimeout(
        function() 
        {
            $("#"+buttonId).removeClass("pressed");
        }, 100);
}

function nextSequence () {

    userClickedPattern = [];
    level++;
    $("h1").text("Level "+ level);

    
    var randomNumber = Math.floor(Math.random() * 4 );
    var randomButton = buttonColours[randomNumber];

    
    animatePress(randomButton);
    playSound(randomButton);
    gamePattern.push(randomButton);

}


function checkAnswer (level) {
    if (gamePattern[level] === userClickedPattern[level]){
        console.log("success");

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(
                function(){
                    nextSequence();
                    console.log("successInside");

                }, 1000);
        }
    }
    else {
        console.log("wrong");
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        
        gamePattern = [];
        started = false;
        $("body").addClass("game-over");
        setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      console.log(level);
    }
}