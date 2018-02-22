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

const startButton = document.querySelector('#start');
startButton.addEventListener('click',makeGrid);

function makeGrid() {
    const height = 4;
    const width = 4;
    const newCanvas = document.getElementById('grid');
    const arrayIcons = shuffleArray(icons);
    let counter = 0;
    let clicked = false;
    let classMatch = "";
    let anotherClassMatch = "";
    let ifMatch;
    let isComplete = true;
    let winCounter = 0;
    let scoreCounter = 0;







    //Resets the table if a current grid is in place
    if(newCanvas.hasChildNodes()){
      newCanvas.removeChild(newCanvas.firstChild);
    }
    //Resets winningText if exists
    if(document.querySelector('#winningText') != null){
      document.querySelector('#winningText').remove();
    }

    //Resets LeaderBoard
    if(document.querySelector('.pop-up') != null){
      document.querySelector('.pop-up').remove();
    }

    //Resets Score on new game
    if(document.querySelector('#gameScore').textContent != '0'){
      scoreCounter = 0;
      document.querySelector('#gameScore').textContent = 0;
    }

    //Resets Timer on new game
    if(document.querySelector('#seconds').textContent != "00"){
      //NEED TO ADD STOP FEATURE
      stopTimer(timerInt);
      document.querySelector('#seconds').textContent = "00"
      document.querySelector('#minutes').textContent = "00";
      startTimer();

    }else{
      startTimer();
    }

    for(let i = 0; i < height; i++){
      //Create a for loop to build the rows, and set the attribute for the row
      const row = newCanvas.insertRow();
      row.setAttribute('id','row'+i);
      for(let x=0; x < width; x++){
        //Create a nested for loop to target the row number and build the # of columns for each rows

        row.insertCell().setAttribute('id','r'+i+'_c'+x);
        //Add event listener for each of the cells added
        const cell = document.querySelector('#r'+i+'_c'+x);
        cell.setAttribute('class','flip');

        const content = document.createElement('i');
        content.setAttribute('class',arrayIcons[counter]);
        counter+=1;
        content.setAttribute('id','r'+i+'_c'+x+'_icon');

        const span = document.createElement('span');
        span.setAttribute('class','text');
        span.appendChild(content);


        const divContainer = document.createElement('div');
        divContainer.setAttribute('class','cardContainer');

        const backOfCard = document.createElement('div');
        backOfCard.setAttribute('class','back');

        const frontOfCard = document.createElement('div');
        frontOfCard.setAttribute('class','front');


        backOfCard.appendChild(span);
        divContainer.appendChild(backOfCard);
        divContainer.appendChild(frontOfCard);


        cell.appendChild(divContainer)




        //Card Listener
        divContainer.addEventListener('click',function(evt){

          //Prevents further clicks until animation is complete
          if(isComplete){
          flipCard(evt);

          if(!clicked){
            clicked = isClicked();

            //Recording the first click
            classMatch = recordMatch(evt);

          }
          else {
            //Recording second click
            anotherClassMatch = recordMatch(evt);
            //Checking if the match is made
            ifMatch = checkIfMatch(classMatch, anotherClassMatch);

            //Updates Score
            console.log('scoreCounter is '+scoreCounter);
            scoreCounter += 1;
            updateScoreCounter(scoreCounter);
            console.log('scoreCounter is '+scoreCounter);

            console.log("ifMatch is now set to "+ifMatch);

            //If the match is true!
            if(ifMatch){
              console.log("IT IS OFFICIAL, A MATCH HAS BEEN FOUND!!!!");
              winCounter += 1;
              console.log("win counter is now = "+winCounter);
              isComplete = false;

              //Match Animation
              tadaAnimation();

              // setTimeout(function(){
                removeFlippedClass();
                removeFlippedClass();
                removeTada();
                isComplete = true;
              // },1000);
              //Check if we won the game!
              if(winCounter == 1){
                console.log('YOU HAVE WON THE GAME!');
                winGameAnimation();
                stopTimer(timerInt);
                // setTimeout(function(){
                console.log('wins before the win function');
                console.log(wins);
                wins = winGame(wins);

                  console.log("wins after the winGameFunction ");
                  console.log(wins);
                // },5000);



                if(scoreCounter < bestScoreCounter){
                  bestScoreCounter = scoreCounter;
                  document.querySelector('#bestScore').textContent = bestScoreCounter;
                }

              }
              else{
                console.log('Keep Matching');
              }
            }
            else{
              isComplete = false;
              //Unflip the cards
              console.log("No Match Found! Resetting cards now! ");
              console.log("STARTING TIMEOUT NOW!");

              wobbleAnimation();

              setTimeout(function(){
                //TODO Add a No Match Animation
                removeWobble();
                removeWobble();

                console.log("TimeOut");

                unFlipCard();
                removeFlippedClass();
                console.log('second unflip');
                unFlipCard();
                removeFlippedClass();

                isComplete = true;






              },3900);


            }

            console.log("Now Resetting Click To False");

            clicked = false;
          }

          console.log('the VALUE of click is '+clicked);

          evt.preventDefault;
        }

      });


      }
    }
}

function flipCard(event) {
  const card = event.currentTarget;
  card.style.transform = "rotatey(" + 180 + "deg)";
  card.style.transitionDuration = "1s";
  card.style.transformStyle = 'preserve-3d';

  return card;
}


function unFlipCard() {
  console.dir(document.querySelectorAll('.flipped'));
  const card1 = document.querySelectorAll('.flipped')[0];

  console.log(card1);

  const element1 = document.querySelectorAll('.flipped')[0].parentNode.parentNode.parentNode;

  element1.style.transform = "rotatey(" + 0 + "deg)";
  element1.style.transitionDuration = "1s";
}

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

function isClicked() {
  clicked = true;
  console.log('Click Variable is now set to '+clicked);
  return clicked;
}

function checkIfMatch(classMatch, classes) {

  console.log('--> checking '+classMatch);
  console.log('--> with '+classes);

  if(classes === classMatch){
    return true;
  }
  else{
    return false;
  }

}

function recordMatch(event) {
  const classes = event.currentTarget.children[0].children[0].children[0].classList.value;

  const newClass = event.currentTarget.children[0].children[0].children[0].classList.value = classes+" flipped";

  console.log("- recording a match and adding a flipped class to -> ");
  console.log(event.currentTarget.children[0].children[0].children[0]);
  return classes;
}

function removeFlippedClass() {
  console.log('removing flipped class from ->>> ');
  console.log(document.querySelectorAll('.flipped')[0]);

  const card1 = document.querySelectorAll('.flipped')[0];
  card1.classList.remove('flipped');

}

function winGameAnimation(){
  //Animates the win
  const length = document.getElementsByClassName('back').length;
  for(var i = 0; i<length; i++){
    const winningElements = document.getElementsByClassName('back')[i].style.cssText = 'background-color: yellow';
    document.getElementsByClassName('back')[i].classList.add('flash');
  }
}

function winGame(wins) {
  //Wins is an array of scores w/ player names



  //Delay Add The Congrats Message PopUp
  // setTimeout(function(){
    //Create new pop up
    const grid = document.querySelector('#grid');
    grid.textContent = "";
    grid.insertAdjacentHTML('afterend',popUpLeaderBoard);

    //Add win message
    addWinMessage();

    if(wins.length === 0){
      const newPlayer = createPlayerProfile();
      const newPlayerScore = getPlayerScore(newPlayer);
      const newPlayerName = getPlayerName(newPlayer);

      const newArray = updateWinsArray(wins,newPlayer);
      updateLeaderBoard(newArray, newArray);
      console.log(newArray);
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
  else {
    console.log("Something went wrong in the sortArrayByTime function");
  }

}


function addWinMessage() {
  const h1 = document.querySelector('.title');
  h1.insertAdjacentHTML('afterend','<h2 id="winningText">You\'ve won the game! >> Play Again?');

  document.querySelector('#winningText').style.cssText = 'color: lime;';
}
function getPlayerName(object) {
  const name = object.player;
  return name;
}

function getPlayerScore(object) {
  const score = Number(object.score);
  return score;
}

function createPlayerProfile() {
  const newP = document.querySelector('#pName').value;
  const newPScore = Number(document.querySelector('#gameScore').textContent);
  const newPTime = document.querySelector('#time').textContent;

  const newObj = {
    player: newP,
    score: newPScore,
    time: newPTime
  }

  return newObj;
}

function updateWinsArray(wins,newPlayer) {
  if(wins.length === 0){
    return [newPlayer];
  }
}

function updateLeaderBoard(toPrint, timeArray) {
  const newArrayShuffle = toPrint;
  const playerNames = document.querySelector('.player-name');
  const playerScores = document.querySelector('.leader-score');
  const playerNameTime = document.querySelector('.player-name-time');
  const playerTime = document.querySelector('.leader-time');

  for(let i = newArrayShuffle.length-1; i >= 0; i--){
    playerNames.insertAdjacentHTML('afterbegin','<h3 style="color: lime" class="player">'+newArrayShuffle[i].player+'</h3>');
    playerScores.insertAdjacentHTML('afterbegin','<h3 class="lb_score">'+newArrayShuffle[i].score+'</h3>');
    playerNameTime.insertAdjacentHTML('afterbegin','<h3 style="color: lime" class="player">'+timeArray[i].player+'</h3>');
    playerTime.insertAdjacentHTML('afterbegin','<h3 class="lb_score">'+timeArray[i].time+'</h3>');
  }
}

function updateScoreCounter(scoreCounter){
  document.querySelector('#gameScore').textContent = scoreCounter;

}

function wobbleAnimation() {
  const wobble1 = document.querySelectorAll('.flipped')[0].parentNode.parentNode.parentNode;
  const wobble2 = document.querySelectorAll('.flipped')[1].parentNode.parentNode.parentNode;
//FIX THIS
  wobble1.classList.add('animated', 'wobble');
  wobble2.classList.add('animated', 'wobble');

  // wobble1.classList.remove('animated', 'wobble');
  // wobble2.classList.remove('animated', 'wobble');
  return true;

  console.log("end of wobble function");

}

function removeWobble() {
  const wobble1 = document.querySelectorAll('.wobble');
  // // const wobble2 = document.querySelectorAll('.wobble')[1];
  //
  // wobble1.classList.remove('animated', 'wobble');
  // // wobble2.classList.remove('animated', 'wobble');
  console.log('inside while loop');
  wobble1[0].classList.remove('wobble');
  wobble1[0].classList.remove('animated');


  // document.querySelector('.wobble').classList.remove('wobble');
  // document.querySelector('.wobble').classList.remove('animated');

}

function tadaAnimation() {
  const tada1 = document.querySelectorAll('.flipped')[0].parentNode.parentNode.parentNode;
  const tada2 = document.querySelectorAll('.flipped')[1].parentNode.parentNode.parentNode;

  tada1.classList.add('animated', 'tada');
  tada2.classList.add('animated', 'tada');


  console.log("end of tada function");

}

function removeTada() {
  const tada1 = document.querySelectorAll('.tada')[0];
  const tada2 = document.querySelectorAll('.tada')[1];

  tada1.classList.remove('animated', 'tada');
  tada2.classList.remove('animated', 'tada');
}

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
  </div>

    `
}

function startTimer() {
  const timer = document.querySelector('#time');
  const seconds = document.querySelector('#seconds');
  const minutes = document.querySelector('#minutes');
  console.log(timer.textContent);
  let count = 0;

  timerInt = setInterval(function(){
    count += 1;
    if(count<60){
      seconds.textContent = count;
    }
    else{
        const newMin = Math.floor(count/60);
        const newSec = count%60;
        minutes.textContent = newMin;
        seconds.textContent = newSec;
    }
  },1000);

}

function stopTimer(timerInt) {
  clearInterval(timerInt);
}
