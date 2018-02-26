//Array that holds the FontAwesome icon codes for SVG icons
const icons = [
    "fab fa-android fa-lg bigText",
    "fab fa-apple fa-lg bigText",
    "fab fa-angular fa-lg bigText",
    "fab fa-react fa-lg bigText",
    "fab fa-vuejs fa-lg bigText",
    "fas fa-code fa-lg bigText",
    "fas fa-code-branch fa-lg bigText",
    "fas fa-anchor fa-lg bigText",
    "fab fa-android fa-lg bigText",
    "fab fa-apple fa-lg bigText",
    "fab fa-angular fa-lg bigText",
    "fab fa-react fa-lg bigText",
    "fab fa-vuejs fa-lg bigText",
    "fas fa-code fa-lg bigText",
    "fas fa-code-branch fa-lg bigText",
    "fas fa-anchor fa-lg bigText"
];

//Set score counter to initialize it
let bestScoreCounter = 1000;
let wins = [];
let timerInt;

//Event listener on start new game button
const startButton = document.querySelector("#start");
startButton.addEventListener("click",makeGrid);

//Main function to set up the grid & logic
function makeGrid() {
    //Initialize function variables
    const height = 4;
    const width = 4;
    const newCanvas = document.getElementById("grid");
    const arrayIcons = shuffleArray(icons);
    let counter = 0;
    let clicked = false;
    let classMatch = "";
    let anotherClassMatch = "";
    let ifMatch;
    let isComplete = true;
    let winCounter = 0;
    let scoreCounter = 0;

    //Stops and resets all timeouts currently.
    stopAllTimeouts();

    //Resets the table if a current grid is in place
    if(newCanvas.hasChildNodes()){
      newCanvas.removeChild(newCanvas.firstChild);
    }
    //Resets winningText if exists
    if(document.querySelector("#winningText") != null){
      document.querySelector("#winningText").remove();
    }

    //Resets LeaderBoard
    if(document.querySelector(".pop-up") != null){
      document.querySelector(".pop-up").remove();
    }

    //Resets Score on new game
    if(document.querySelector("#gameScore").textContent != "0"){
      scoreCounter = 0;
      document.querySelector("#gameScore").textContent = 0;
    }

    //Resets Timer on new game
    if(document.querySelector("#seconds").textContent != "00"){
      //NEED TO ADD STOP FEATURE
      stopTimer(timerInt);
      document.querySelector("#seconds").textContent = "00";
      document.querySelector("#minutes").textContent = "00";
      startTimer();

    }else{
      startTimer();
    }

    //Resets Stars on new Game
    if(document.querySelectorAll(".removeStar") != null){
      const starsClass = document.querySelectorAll(".removeStar");
      for(let i = 0; i<starsClass.length; i++){
        starsClass[i].classList.remove("removeStar");
      }
    }
    //Create Grid
    //Create a for loop to build the rows, and set the attribute for the row
    for(let i = 0; i < height; i++){
      const row = newCanvas.insertRow();
      row.setAttribute("id","row"+i);
      //Create a nested for loop to target the row number and build the # of columns for each rows
      for(let x=0; x < width; x++){
        row.insertCell().setAttribute("id","r"+i+"_c"+x);
        //Add event listener for each of the cells added
        const cell = document.querySelector("#r"+i+"_c"+x);
        cell.setAttribute("class","flip");

        const content = document.createElement("i");
        content.setAttribute("class",arrayIcons[counter]);
        counter+=1;
        content.setAttribute("id","r"+i+"_c"+x+"_icon");

        //parent of svg images
        const span = document.createElement("span");
        span.setAttribute("class","text");
        span.appendChild(content);

        //Creates card
        const divContainer = document.createElement("div");
        divContainer.setAttribute("class","cardContainer");

        const backOfCard = document.createElement("div");
        backOfCard.setAttribute("class","back");

        const frontOfCard = document.createElement("div");
        frontOfCard.setAttribute("class","front");

        //put together elements in dom
        backOfCard.appendChild(span);
        divContainer.appendChild(backOfCard);
        divContainer.appendChild(frontOfCard);

        cell.appendChild(divContainer)

        //Add Card Click Event Listener
        divContainer.addEventListener("click",function(evt){

          //Prevents further clicks until card animations are complete
          if(isComplete){
            //flips target card
            flipCard(evt);

            //Sets the notice that a click happened and records the class of the first card to match against (using classes)
            if(!clicked){
              clicked = isClicked();

              //Recording the first click class
              classMatch = recordMatch(evt);

            }
            //Else, this is the second click and a match logic should be performed
            else {
              //Recording second click
              anotherClassMatch = recordMatch(evt);
              //Checking if the match is made
              ifMatch = checkIfMatch(classMatch, anotherClassMatch);

              //Updates Score & updates DOM
              scoreCounter += 1;
              updateScoreCounter(scoreCounter);

              //Checks wheter to take star ratings away
              if(scoreCounter >= 10 && scoreCounter<20){
                //Take one star away
                remove1Star();
              }else if(scoreCounter >= 20 && scoreCounter < 30){
                //Take two stars away
                remove2Stars();
              }else if(scoreCounter >= 30){
                //Take all stars away
                remove3Stars();
              }

              //If the match is made (true)!
              if(ifMatch){
                //Increase the match counter (called winCounter)
                winCounter += 1;

                //Set variable to false to prevent continuation of event clicks until animations have completed
                isComplete = false;

                //Match Animation
                tadaAnimation();

                //To Run after animation has completed
                setTimeout(function(){
                  //Remove flipped class from 'flipped' cards
                  //removeFlippedClass();
                  while(document.querySelectorAll('.flipped').length != 0){
                    removeFlippedClass();
                  }

                  //Remove tada class so that we can call this again if needed
                  removeTada();
                  //Allow a continuation of flipping cards
                  isComplete = true;
                },1000);

                //Check if we won the game! (16 cards and 8 pairs.)
                if(winCounter == 8){
                  //Run game win animation
                  // winGameAnimation();


                  //Set in local memory (in an array) of our win {player, score, time} object
                  wins = winGame(wins,timerInt);

                  //Set best score counter in DOM if we made a new best score
                  if(scoreCounter < bestScoreCounter){
                    bestScoreCounter = scoreCounter;
                    document.querySelector("#bestScore").textContent = bestScoreCounter;
                  }

                }

              }
              //If Match is not made
              else{
                //Set to false to allow animations to complete before continuing to flip cards
                isComplete = false;

                //No Match Made Animation
                wobbleAnimation();

                //After enough time for animation to complete.
                setTimeout(function(){
                  //Remove wobble class in order to allow these cards to reuse animation
                  removeWobble();
                  removeWobble();

                  //UnFlipCards (reset back to front facing)
                  unFlipCard();
                  removeFlippedClass();

                  unFlipCard();
                  removeFlippedClass();

                  //Allow new flips to be made.
                  isComplete = true;
                },3900);


              }

              //Reset our click variable in order to represent a new pair of cards to be selected
              clicked = false;
            }
            //Prevents default action to be taken.
            evt.preventDefault;
        }

      });


    }
  }
}

//Flips card to show back
function flipCard(event) {
  const card = event.currentTarget;
  card.style.transform = "rotatey(" + 180 + "deg)";
  card.style.transitionDuration = "1s";
  card.style.transformStyle = "preserve-3d";

  return card;
}

//Flips card from back facing to front facing
function unFlipCard() {
  const card1 = document.querySelectorAll(".flipped")[0];
  const element1 = document.querySelectorAll(".flipped")[0].parentNode.parentNode.parentNode;

  element1.style.transform = "rotatey(" + 0 + "deg)";
  element1.style.transitionDuration = "1s";
}

//Shuffle Randomly the array in which the icons are ordered and pulled from
function shuffleArray(array) {
  let currentIndex = array.length, tempVal, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    tempVal = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempVal;
  }

  return array;
}

//Returns boolean
function isClicked() {
  clicked = true;
  return clicked;
}

//Checks a match of classes to see if icons are same
function checkIfMatch(classMatch, classes) {

  if(classes === classMatch){
    return true;
  }
  else{
    return false;
  }

}

//Records the flipped card classes in order to match later
function recordMatch(event) {
  const classes = event.currentTarget.children[0].children[0].children[0].classList.value;

  const newClass = event.currentTarget.children[0].children[0].children[0].classList.value = classes+" flipped";

  return classes;
}

//Removes the flipped class
function removeFlippedClass() {
  const card1 = document.querySelectorAll(".flipped")[0];

  card1.classList.remove("flipped");
}

//Animation for all the cards to flash and turn yellow (not currently in use)
function winGameAnimation(){
  //Animates the win
  const length = document.getElementsByClassName("back").length;
  for(var i = 0; i<length; i++){
    const winningElements = document.getElementsByClassName("back")[i].style.cssText = "background-color: yellow";
    document.getElementsByClassName("back")[i].classList.add("flash");
  }
}

//Function to hold all the win logic
function winGame(wins,timerInt) {
  //Wins is an array of scores w/ player names
  //Stop timer
  stopTimer(timerInt);

  //Clear out the grid and Create a new pop up leaderboard
  const grid = document.querySelector("#grid");
  grid.textContent = "";
  grid.insertAdjacentHTML("afterend",popUpLeaderBoard);

  //Add win message
  addWinMessage();

  //If this is the first win made
  if(wins.length === 0){
    const newPlayer = createPlayerProfile();
    const newPlayerScore = getPlayerScore(newPlayer);
    const newPlayerName = getPlayerName(newPlayer);

    const newArray = updateWinsArray(wins,newPlayer);
    updateLeaderBoard(newArray, newArray);

    //Returns the array with the new Player Object attached
    return newArray;
  }
  //Already one score stored within leaderboard
  else if(wins.length === 1){
    const newPlayer = createPlayerProfile();
    const newPlayerScore = getPlayerScore(newPlayer);
    const newPlayerName = getPlayerName(newPlayer);

    const player1 = wins[0];
    const player1Score = getPlayerScore(wins[0]);
    const player1Name = getPlayerName(wins[0]);

    if(player1Score < newPlayerScore){
      //Append new player
      let newArray = [player1, newPlayer];
      newArray = sortArray(newArray);
      let newTimeArray = sortArrayByTime(newArray);
      updateLeaderBoard(newArray, newTimeArray);
      return newArray;
    }
    else{
      let newArray = [newPlayer, player1];
      newArray = sortArray(newArray);
      let newTimeArray = sortArrayByTime(newArray);
      updateLeaderBoard(newArray, newTimeArray);
      return newArray;
    }
  }
  //If there are 2 current scores stored
  else if(wins.length === 2){
    const newPlayer = createPlayerProfile();
    const newPlayerScore = getPlayerScore(newPlayer);
    const newPlayerName = getPlayerName(newPlayer);

    //It's inherit that player 1 score is better than player 2 score
    const player1 = wins[0];
    const player1Score = getPlayerScore(wins[0]);
    const player1Name = getPlayerName(wins[0]);

    const player2 = wins[1];
    const player2Score = getPlayerScore(wins[1]);
    const player2Name = getPlayerName(wins[1]);

    if(newPlayerScore < player1Score){
      //Set newplayer score as #1
      let newArray = [player2, player1, newPlayer];
      newArray = sortArray(newArray);
      let newTimeArray = sortArrayByTime(newArray);
      updateLeaderBoard(newArray, newTimeArray);
      return newArray;
    }else if(newPlayerScore < player2Score){
      //Set newplayer score as #2
      let newArray = [player2, newPlayer, player1];
      newArray = sortArray(newArray);
      let newTimeArray = sortArrayByTime(newArray);
      updateLeaderBoard(newArray, newTimeArray);
      return newArray;
    }else {
      //Set newplayer score as #3
      let newArray = [newPlayer, player2, player1];
      newArray = sortArray(newArray);
      let newTimeArray = sortArrayByTime(newArray);
      updateLeaderBoard(newArray, newTimeArray);
      return newArray;
    }
  }
  //If there are 3 leaderboards
  else {
    const newPlayer = createPlayerProfile();
    const newPlayerScore = getPlayerScore(newPlayer);
    const newPlayerName = getPlayerName(newPlayer);

    //It's inherit that player 1 score is better than player 2 score
    const player1 = wins[0];
    const player1Score = getPlayerScore(wins[0]);
    const player1Name = getPlayerName(wins[0]);
    //It's inherit that player 2 score is better than player 3 score
    const player2 = wins[1];
    const player2Score = getPlayerScore(wins[1]);
    const player2Name = getPlayerName(wins[1]);
    //It's inherit that player 3 score is the lowest score of the bunch
    const player3 = wins[2];
    const player3Score = getPlayerScore(wins[2]);
    const player3Name = getPlayerName(wins[2]);

    if(newPlayerScore < player1Score || newPlayerScore < player2Score || newPlayerScore < player3Score){
      //Set new player as the new number 1 and bump off the player 3
      //newplayer is added into the array
      if(player1Score <= player2Score && player1Score <= player3Score){
        //Player1 is added into array
        if(player2Score < player3Score){
          //Player2 added into array
          let newArray = [newPlayer, player1, player2];
          newArray = sortArray(newArray);
          let newTimeArray = sortArrayByTime(newArray);
          updateLeaderBoard(newArray, newTimeArray);
          return newArray;
        }
        else{
          //Player 3 added into array
          let newArray = [newPlayer, player1, player3];
          newArray = sortArray(newArray);
          let newTimeArray = sortArrayByTime(newArray);
          updateLeaderBoard(newArray, newTimeArray);
          return newArray;
        }
      }
      else if(player2Score <= player1Score && player2Score <= player3Score){
        //Player 2 added to array
        if(player1Score < player3Score){
          //Player 1 added to array
          let newArray = [newPlayer, player2, player1];
          newArray = sortArray(newArray);
          let newTimeArray = sortArrayByTime(newArray);
          updateLeaderBoard(newArray, newTimeArray);
          return newArray;
        }
        else {
          //Player 3 added to array
          let newArray = [newPlayer, player2, player3];
          newArray = sortArray(newArray);
          let newTimeArray = sortArrayByTime(newArray);
          updateLeaderBoard(newArray, newTimeArray);
          return newArray;
        }
      }
      else {
        //Player 3 added to array
        if(player1Score < player2Score){
          //Player 1 added to array
          let newArray = [newPlayer, player1, player3];
          newArray = sortArray(newArray);
          let newTimeArray = sortArrayByTime(newArray);
          updateLeaderBoard(newArray, newTimeArray);
          return newArray;
        }
        else {
          //Player 2 added to array
          let newArray = [newPlayer, player2, player3];
          newArray = sortArray(newArray);
          let newTimeArray = sortArrayByTime(newArray);
          updateLeaderBoard(newArray, newTimeArray);
          return newArray;
        }
      }

    }else{
      //return the original players
      let newArray = [player3, player2, player1];
      newArray = sortArray(newArray);
      let newTimeArray = sortArrayByTime(newArray);
      updateLeaderBoard(newArray, newTimeArray);
      return newArray;
    }

  }


}

//Sorts the array of objects based on score
function sortArray(arrayOfObj) {
  let newArray = [];
  if(arrayOfObj.length > 2){
    if(arrayOfObj[0].score <= arrayOfObj[1].score && arrayOfObj[0].score <= arrayOfObj[2].score){
      //Array obj 0 is the smallest
      if(arrayOfObj[1].score <= arrayOfObj[2].score){
        //Array Obj 1 is #2
        //Array obj 2 is #3
        newArray = [arrayOfObj[0], arrayOfObj[1], arrayOfObj[2]];
      } else {
        //Array obj 2 is #2
        //Array Obj 1 is #3
        newArray = [arrayOfObj[0], arrayOfObj[2], arrayOfObj[1]];
      }
    }else if(arrayOfObj[1].score <= arrayOfObj[0].score && arrayOfObj[1].score <= arrayOfObj[2].score){
      //Array obj 1 is the smallest
      if(arrayOfObj[0].score <= arrayOfObj[2].score){
        //Array Obj 0 is #2
        //Array obj 2 is #3
        newArray = [arrayOfObj[1], arrayOfObj[0], arrayOfObj[2]];
      } else {
        //Array obj 2 is #2
        //Array Obj 0 is #3
        newArray = [arrayOfObj[1], arrayOfObj[2], arrayOfObj[0]];

      }
    }else if(arrayOfObj[2].score <= arrayOfObj[0].score && arrayOfObj[2].score <= arrayOfObj[1].score){
      //Array obj 2 is the smallest
      if(arrayOfObj[0].score <= arrayOfObj[1].score){
        //Array Obj 0 is #2
        //Array obj 1 is #3
        newArray = [arrayOfObj[2], arrayOfObj[0], arrayOfObj[1]];

      } else {
        //Array obj 1 is #2
        //Array Obj 0 is #3
        newArray = [arrayOfObj[2], arrayOfObj[1], arrayOfObj[0]];

      }
    }

    return newArray;
  }
  else {
    const newArray = arrayOfObj.sort(function(a, b) {
      return a.score - b.score;
    });
    return newArray;
  }
}

//Sorts the array of objects based on time
function sortArrayByTime(arrayOfObj) {

  let newArray = [];
  if(arrayOfObj.length > 2){
    if(arrayOfObj[0].time <= arrayOfObj[1].time && arrayOfObj[0].time <= arrayOfObj[2].time){
      //Array obj 0 is the smallest
      if(arrayOfObj[1].time <= arrayOfObj[2].time){
        //Array Obj 1 is #2
        //Array obj 2 is #3
        newArray = [arrayOfObj[0], arrayOfObj[1], arrayOfObj[2]];
      } else {
        //Array obj 2 is #2
        //Array Obj 1 is #3
        newArray = [arrayOfObj[0], arrayOfObj[2], arrayOfObj[1]];
      }
    }else if(arrayOfObj[1].time <= arrayOfObj[0].time && arrayOfObj[1].time <= arrayOfObj[2].time){
      //Array obj 1 is the smallest
      if(arrayOfObj[0].time <= arrayOfObj[2].time){
        //Array Obj 0 is #2
        //Array obj 2 is #3
        newArray = [arrayOfObj[1], arrayOfObj[0], arrayOfObj[2]];
      } else {
        //Array obj 2 is #2
        //Array Obj 0 is #3
        newArray = [arrayOfObj[1], arrayOfObj[2], arrayOfObj[0]];

      }
    }else if(arrayOfObj[2].time <= arrayOfObj[0].time && arrayOfObj[2].time <= arrayOfObj[1].time){
      //Array obj 2 is the smallest
      if(arrayOfObj[0].time <= arrayOfObj[1].time){
        //Array Obj 0 is #2
        //Array obj 1 is #3
        newArray = [arrayOfObj[2], arrayOfObj[0], arrayOfObj[1]];

      } else {
        //Array obj 1 is #2
        //Array Obj 0 is #3
        newArray = [arrayOfObj[2], arrayOfObj[1], arrayOfObj[0]];

      }
    }

    return newArray;
  }
  else if(arrayOfObj.length === 2){
    if(arrayOfObj[0].time < arrayOfObj[1].time){
      newArray = [arrayOfObj[0], arrayOfObj[1]];
    }
    else {
      newArray = [arrayOfObj[1], arrayOfObj[0]];
    }

    return newArray;
  }

}

//Adds a congratulations message with a flash animation
function addWinMessage() {
  const h1 = document.querySelector(".title");
  h1.insertAdjacentHTML("afterend",'<h2 id="winningText" class="flash">You\'ve won the game! >> Play Again?');

  document.querySelector("#winningText").style.cssText = "color: lime;";
}

//Helper function to get the player name from object
function getPlayerName(object) {
  const name = object.player;
  return name;
}

//Helper function to get the player score from object
function getPlayerScore(object) {
  const score = Number(object.score);
  return score;
}

//Helper function to create the player object
function createPlayerProfile() {
  const newP = document.querySelector("#pName").value;
  const newPScore = Number(document.querySelector("#gameScore").textContent);
  const newPTime = document.querySelector("#time").textContent;

  const newObj = {
    player: newP,
    score: newPScore,
    time: newPTime
  }

  return newObj;
}

//helper function to return a single object array
function updateWinsArray(wins,newPlayer) {
  if(wins.length === 0){
    return [newPlayer];
  }
}

//Updates the leaderboard with winners and scores/time
function updateLeaderBoard(toPrint, timeArray) {
  const newArrayShuffle = toPrint;
  const playerNames = document.querySelector(".player-name");
  const playerScores = document.querySelector(".leader-score");
  const playerNameTime = document.querySelector(".player-name-time");
  const playerTime = document.querySelector(".leader-time");

  for(let i = newArrayShuffle.length-1; i >= 0; i--){
    playerNames.insertAdjacentHTML("afterbegin",'<h3 style="color: lime" class="player">'+newArrayShuffle[i].player+'</h3>');
    playerScores.insertAdjacentHTML("afterbegin",'<h3 class="lb_score">'+newArrayShuffle[i].score+'</h3>');
    playerNameTime.insertAdjacentHTML("afterbegin",'<h3 style="color: lime" class="player">'+timeArray[i].player+'</h3>');
    playerTime.insertAdjacentHTML("afterbegin",'<h3 class="lb_score">'+timeArray[i].time+'</h3>');
  }
}

//Updates the scores counter to the actual score count
function updateScoreCounter(scoreCounter){
  document.querySelector("#gameScore").textContent = scoreCounter;

}

//adds the wobble animation to a no match pair
function wobbleAnimation() {
  // const wobble1 = document.querySelectorAll(".flipped")[0].parentNode.parentNode.parentNode;
  // const wobble2 = document.querySelectorAll(".flipped")[1].parentNode.parentNode.parentNode;
  //
  // wobble1.classList.add("animated", "wobble");
  // wobble2.classList.add("animated", "wobble");

  //New Method For Submission 3:
  const length = document.querySelectorAll('.flipped').length;
  let i = 0;


  while(i != length){
    let wobble = document.querySelectorAll(".flipped")[i].parentNode.parentNode.parentNode;
    wobble.classList.add("animated", "wobble");
    i += 1;
  }

  return true;
}

//Removes the wobble animation class
function removeWobble() {
  const wobble1 = document.querySelectorAll(".wobble");

  wobble1[0].classList.remove("wobble");
  wobble1[0].classList.remove("animated");

}

//Adds the tada animation class to a match pair
function tadaAnimation() {
  // const tada1 = document.querySelectorAll(".flipped")[0].parentNode.parentNode.parentNode;
  // const tada2 = document.querySelectorAll(".flipped")[1].parentNode.parentNode.parentNode;
  //
  // tada1.classList.add("animated", "tada");
  // tada2.classList.add("animated", "tada");

  //New Method For Submission 3:
  const length = document.querySelectorAll('.flipped').length;
  let i = 0;


  while(i != length){
    let tada = document.querySelectorAll(".flipped")[i].parentNode.parentNode.parentNode;
    tada.classList.add("animated", "tada");
    i += 1;
  }
}

//Removes the tada animation class
function removeTada() {
  const tada1 = document.querySelectorAll(".tada")[0];
  const tada2 = document.querySelectorAll(".tada")[1];

  while(document.querySelectorAll(".tada").length != 0){
    tada1.classList.remove("animated", "tada");
    tada2.classList.remove("animated", "tada");
  }
  //tada2.classList.remove("animated", "tada");
}

//Template for the leaderboard (injects HTML)
function popUpLeaderBoard(){

  return
  `<div class='pop-up'>
    <h3 style="color: black">Top 3 Scores Leader Board:</h3>
    <hr>
    <div class='leader-board'>
      <div class='player-name'>

      </div>

      <div class='leader-score'>

      </div>
    </div>
    <h3 style="color: black">Top 3 Time Leader Board:</h3>
    <hr>
    <div class='leader-board'>
      <div class='player-name-time'>

      </div>

      <div class='leader-time'>

      </div>
    </div>
  </div>`
}

//Function to begin the timer
function startTimer() {
  const timer = document.querySelector("#time");
  const seconds = document.querySelector("#seconds");
  const minutes = document.querySelector("#minutes");
  let count = 0;

  timerInt = setInterval(function(){
    count += 1;
    if(count<60){
      //Add Padding to time numbers
      if(count < 10){
        seconds.textContent = '0'+count;
      }
      else {
        seconds.textContent = count;
      }

    }
    else{
        const newMin = Math.floor(count/60);
        const newSec = count%60;
        if(newMin < 10){
          minutes.textContent = "0"+newMin;
        }
        else {
          minutes.textContent = newMin;
        }

        if(newSec < 10){
          seconds.textContent = "0"+newSec;
        }
        else {
          seconds.textContent = newSec;
        }


    }
  },1000);

}

//Function to stop the timer
function stopTimer(timerInt) {
  clearInterval(timerInt);
}

//Toggle the stars display class
function toggle1Star() {
  const star = document.querySelector("#star1");
  star.classList.toggle("removeStar");
}

//Toggle the stars display class
function toggle2Stars() {
  const star = document.querySelector("#star1");
  const star2 = document.querySelector("#star2");
  star.classList.toggle("removeStar");
  star2.classList.toggle("removeStar");
}

//Toggle the stars display class
function toggle3Stars() {
  const star = document.querySelector("#star1");
  const star2 = document.querySelector("#star2");
  const star3 = document.querySelector("#star3");
  star.classList.toggle("removeStar");
  star2.classList.toggle("removeStar");
  star3.classList.toggle("removeStar");
}

//Adds the stars display:none class
function remove1Star() {
  const star = document.querySelector("#star1");
  star.classList.add("removeStar");
}

//Adds the stars display:none class
function remove2Stars() {
  const star = document.querySelector("#star1");
  const star2 = document.querySelector("#star2");
  star.classList.add("removeStar");
  star2.classList.add("removeStar");
}

//Adds the stars display:none class
function remove3Stars() {
  const star = document.querySelector("#star1");
  const star2 = document.querySelector("#star2");
  const star3 = document.querySelector("#star3");
  star.classList.add("removeStar");
  star2.classList.add("removeStar");
  star3.classList.add("removeStar");
}

//Provided with help of http://activelab.io/
function stopAllTimeouts()
{
    var id = window.setTimeout(null,0);
    while (id--)
    {
        window.clearTimeout(id);
    }
}
