var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor, gamePattern = [],
  userClickedPattern = [];
var level = 0, counter = 0;
let gameOn = true;
$(document).on("keypress", function () {
  if(counter===0){
    nextSequence();
  }
  counter += 1;
})

$(document).on("tap", function (){
  if(counter===0){
    nextSequence();
  }
})

function winCheck(currentLevel) {
  if (gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {
    gameOn = false;
    gameOver();
  }
  if (currentLevel + 1 === gamePattern.length && gameOn) {
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }

}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  level += 1;
  $("#level-title").text("level " + level);

  $("div#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

  gamePattern.push(randomChosenColor);
  userClickedPattern = [];
}

function playSound(name) {
  var colorSound = new Audio("sounds/" + name + ".mp3");
  colorSound.play();
}

function animatePress(currentColor) {
  $("div#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("div#" + currentColor).removeClass("pressed");
  }, 100);
}

$("div.btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  animatePress(userChosenColor);
  playSound(userChosenColor);
  // console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);
  var userIndex = userClickedPattern.length - 1;
  // console.log(userClickedPattern);
  winCheck(userIndex);

})

function gameOver() {
  $("body").addClass("game-over");
  $("#level-title").text("GAME OVER !!");
}
