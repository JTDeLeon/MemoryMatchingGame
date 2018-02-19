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

    //Resets Score on new game
    if(document.querySelector('#gameScore').textContent != '0'){
      scoreCounter = 0;
      document.querySelector('#gameScore').textContent = 0;
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
        frontOfCard.textContent = 'Front';

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
            scoreCounter += 1;
            updateScoreCounter(scoreCounter);

            console.log("ifMatch is now set to "+ifMatch);

            //If the match is true!
            if(ifMatch){
              console.log("IT IS OFFICIAL, A MATCH HAS BEEN FOUND!!!!");
              winCounter += 1;
              console.log("win counter is now = "+winCounter);

              //TODO Add a Match Animation

              tadaAnimation();

              setTimeout(function(){
                removeFlippedClass();
                removeFlippedClass();
                removeTada();
              },1000);
              //Check if we won the game!
              if(winCounter == 8){
                console.log('YOU HAVE WON THE GAME!');
                winGame();

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
              setTimeout(function(){
                //TODO Add a No Match Animation
                wobbleAnimation();

                console.log("TimeOut");

                unFlipCard();
                removeFlippedClass();
                console.log('second unflip');
                unFlipCard();
                removeFlippedClass();
                isComplete = true;

                setTimeout(function(){
                  removeWobble();
                },500);

              },1000);


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

function winGame(scoreCounter) {
  const length = document.getElementsByClassName('back').length;
  for(var i = 0; i<length; i++){
    const winningElements = document.getElementsByClassName('back')[i].style.cssText = 'background-color: yellow';
  }
  const h1 = document.querySelector('.title');
  h1.insertAdjacentHTML('afterend','<h2 id="winningText">You\'ve won the game!');

  document.querySelector('#winningText').style.cssText = 'color: green; text-decoration: underline;';

}

function updateScoreCounter(scoreCounter){
  document.querySelector('#gameScore').textContent = scoreCounter;

}

function wobbleAnimation() {
  const wobble1 = document.querySelectorAll('.flipped')[0].parentNode.parentNode.parentNode;
  const wobble2 = document.querySelectorAll('.flipped')[1].parentNode.parentNode.parentNode;

  wobble1.classList.add('animated', 'wobble');
  wobble2.classList.add('animated', 'wobble');

  // wobble1.classList.remove('animated', 'wobble');
  // wobble2.classList.remove('animated', 'wobble');
  return true;

  console.log("end of wobble function");

}

function removeWobble() {
  const wobble1 = document.querySelectorAll('.wobble')[0];
  const wobble2 = document.querySelectorAll('.wobble')[1];

  wobble1.classList.remove('animated', 'wobble');
  wobble2.classList.remove('animated', 'wobble');
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
