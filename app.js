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





        divContainer.addEventListener('click',function(evt){
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
  console.log("just rotated Y!");
  card.style.transitionDuration = "2s";
  card.style.transformStyle = 'preserve-3d';
}

function unFlipCard() {
  const card = document.querySelector('#r0_c0');
  card.style.transform = "rotatey(" + 0 + "deg)";
  card.style.transitionDuration = "0.5s";
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
