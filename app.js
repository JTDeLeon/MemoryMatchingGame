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
    //Resets the table if a current grid is in place
    if(newCanvas.hasChildNodes()){
      newCanvas.removeChild(newCanvas.firstChild);
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

          //console.dir(firstFlip);
          if(!clicked){
            clicked = isClicked();
            classMatch = recordMatch(evt);
            //Recording the first click
          }
          else {

            anotherClassMatch = recordMatch(evt);
            //Recording the second click
            //console.log('Class 1 = '+classMatch+' and Class 2 = '+anotherClassMatch);
            //Checking if the match is made
            ifMatch = checkIfMatch(classMatch, anotherClassMatch);

            console.log("ifMatch is now set to "+ifMatch);

            //If the match is true!
            if(ifMatch){
              console.log("IT IS OFFICIAL, A MATCH HAS BEEN FOUND!!!!");
              winCounter += 1;
              console.log("win counter is now = "+winCounter);


              removeFlippedClass();
              removeFlippedClass();
              //Check if we won the game!
              if(winCounter == 8){
                console.log('YOU HAVE WON THE GAME!');
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
                console.log("TimeOut");
                unFlipCard();
                removeFlippedClass();
                console.log('second unflip');
                unFlipCard();
                removeFlippedClass();
                isComplete = true;
              },1000);


              // unFlipCard(anotherClassMatch);
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
  // const card = document.querySelector('#r0_c0');
  const card = event.currentTarget;
  // console.dir(card);
  card.style.transform = "rotatey(" + 180 + "deg)";
  //console.log("just rotated Y!");
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
  // console.log("now checking if this is a match");
  // console.log('I can access Class Match : '+classMatch);
  //
  // const classes = event.currentTarget.children[0].children[0].children[0].classList.value;
  // console.dir(classes);
  console.log('--> checking '+classMatch);
  console.log('--> with '+classes);
  if(classes === classMatch){
    //console.log("Match is found within checking function!");
    return true;
  }
  else{
    //console.log("Match is NOT found within checking function!");
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
  // const card2 = document.querySelectorAll('.flipped')[1];
  card1.classList.remove('flipped');
  // card2.classList.remove('flipped');

}
