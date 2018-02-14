
const startButton = document.querySelector('#start');
startButton.addEventListener('click',makeGrid);

function makeGrid() {
    const height = 5;
    const width = 5;
    const newCanvas = document.getElementById('grid');

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
        content.setAttribute('class','fas fa-anchor');
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
  card.style.transitionDuration = "0.5s";
  const toggleCard = card.firstChild;
  toggleCard.classList.toggle('toggleClass');
}

function unFlipCard() {
  const card = document.querySelector('#r0_c0');
  card.style.transform = "rotatey(" + 0 + "deg)";
  card.style.transitionDuration = "0.5s";
}
