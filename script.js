const sketchContainer = document.querySelector('.sketch-container');
const MAIN_HEIGHT = sketchContainer.offsetHeight - 18;

const sizeSelector = document.querySelector('#sizeSelect');
const clearButton = document.querySelector('#clearSketch');
const blackButton = document.querySelector('#blackTiles');
const colorButton = document.querySelector('#colorTiles');
const eraserButton = document.querySelector('#eraser');

sizeSelector.addEventListener('click', () => {
    let newSize = prompt('Enter the number of tiles per side');
    if (newSize > 100) {
        newSize = 100;
    } else if (newSize <= 0) {
        newSize = 1
    }
    sketchContainer.style.gridTemplateColumns = `repeat(${newSize}, 1fr)`

    createGrid(newSize);
})

clearButton.addEventListener('click', clearGrid);

blackButton.addEventListener('click', useBlack);
colorButton.addEventListener('click', useColor);
eraserButton.addEventListener('click', useEraser);


function createGrid(sideCount) {
    deleteGrid();

    let sideSize = MAIN_HEIGHT / sideCount;
    sideSize = sideSize.toString() + 'px';
    console.log(sideSize);
    

    for (let i = 1; i <= sideCount**2; i++) {
        let newDiv = document.createElement('div');
        newDiv.className = 'square';
        newDiv.style.height=sideSize;
        newDiv.style.width = sideSize;
        sketchContainer.appendChild(newDiv);
    }

    useColor();

    
}


function clearGrid() {
    sketchContainer.childNodes.forEach(div => div.style.backgroundColor = 'white');
}



function deleteGrid() {
    while (sketchContainer.firstChild) {
        sketchContainer.removeChild(sketchContainer.firstChild);
    }
}


function useBlack() {
    sketchContainer.childNodes.forEach((div) => {
        div.removeEventListener('mouseover', colorSquare);
        div.removeEventListener('mouseover', eraseSquare);
        div.addEventListener('mouseover', blackSquare);
    });
}

function useColor() {
    sketchContainer.childNodes.forEach((div) => {
        div.removeEventListener('mouseover', blackSquare);
        div.removeEventListener('mouseover', eraseSquare);
        div.addEventListener('mouseover', colorSquare);
    });
}

function useEraser() {
    sketchContainer.childNodes.forEach((div) => {
        div.removeEventListener('mouseover', blackSquare);
        div.removeEventListener('mouseover', colorSquare);
        div.addEventListener('mouseover', eraseSquare);
    });
}


const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

function colorSquare(square) {
    let r = randomBetween(0, 255);
    let g = randomBetween(0, 255);
    let b = randomBetween(0, 255);
    let rgb = `rgb(${r},${g},${b})`; // Collect all to a css color string

    square.target.style.backgroundColor = rgb;
}

function blackSquare(square) {
    square.target.style.backgroundColor = 'black';
}

function eraseSquare(square) {
    square.target.style.backgroundColor = 'white';
}


createGrid(4);