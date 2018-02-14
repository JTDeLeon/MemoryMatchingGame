const icons = [
    "fab fa-android fa-lg",
    "fab fa-apple fa-lg",
    "fab fa-angular fa-lg",
    "fab fa-react fa-lg",
    "fab fa-vuejs fa-lg",
    "fas fa-code fa-lg",
    "fas fa-code-branch fa-lg",
    "fas fa-anchor fa-lg",
    "fab fa-android fa-lg",
    "fab fa-apple fa-lg",
    "fab fa-angular fa-lg",
    "fab fa-react fa-lg",
    "fab fa-vuejs fa-lg",
    "fas fa-code fa-lg",
    "fas fa-code-branch fa-lg",
    "fas fa-anchor fa-lg"
];

const startButton = document.querySelector('#start');
startButton.addEventListener('click',makeGrid);

function makeGrid() {
    const height = 4;
    const width = 4;
    const newCanvas = document.getElementById('grid');
    const arrayIcons = shuffleArray(icons);
    let counter = 0;
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

        const content = document.createElement('i');
        content.setAttribute('class',arrayIcons[counter]);
        counter+=1;
        content.setAttribute('id','r'+i+'_c'+x+'_icon');

        const divContainer = document.createElement('div');
        divContainer.setAttribute('class','toggleClass');

        divContainer.appendChild(content);
        cell.appendChild(divContainer);


        cell.addEventListener('click',function(evt){
        	console.log("A cell #r"+i+'_c'+x+" has been clicked");
          flipCard(evt);
          evt.preventDefault;
        })
      }
    }
}

function flipCard(event) {
  // const card = document.querySelector('#r0_c0');
  const card = event.currentTarget;
  card.style.transform = "rotatey(" + 180 + "deg)";
  card.style.transitionDuration = "1s";
  const toggleCard = card.firstChild;
  toggleCard.classList.toggle('toggleClass');
}

function unFlipCard() {
  const card = document.querySelector('#r0_c0');
  card.style.transform = "rotatey(" + 0 + "deg)";
  card.style.transitionDuration = "0.5s";
}

function shuffleArray(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
