
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
        cell.addEventListener('click',function(evt){
        	console.log("A cell #r"+i+'_c'+x+" has been clicked");
          evt.preventDefault;
        })
      }
    }
}
