const mainContainer = document.querySelector('.main-container');
const MAIN_HEIGHT = mainContainer.offsetHeight - 2;

const sizeSelector = document.querySelector('#sizeSelect');
console.log(sizeSelector)

sizeSelector.addEventListener('click', () => {
    let newSize = prompt('Enter the number of tiles per side');
    if (newSize > 100) {
        newSize = 100;
    } else if (newSize <= 0) {
        newSize = 1
    }
    mainContainer.style.gridTemplateColumns = `repeat(${newSize}, 1fr)`

    createGrid(newSize);
})

function createGrid(sideCount) {
    console.log(mainContainer.children[0]);
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild);
    }

    let sideSize = MAIN_HEIGHT / sideCount;
    sideSize = sideSize.toString() + 'px';
    console.log(sideSize);
    

    for (let i = 1; i <= sideCount**2; i++) {
        let newDiv = document.createElement('div');
        newDiv.className = 'square';
        newDiv.style.height=sideSize;
        newDiv.style.width = sideSize;
        newDiv.addEventListener('mouseover', colorSquare);
        mainContainer.appendChild(newDiv);
    }
}

const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

function colorSquare(square) {
    let r = randomBetween(0, 255);
    let g = randomBetween(0, 255);
    let b = randomBetween(0, 255);
    let rgb = `rgb(${r},${g},${b})`; // Collect all to a css color string

    square.target.style.backgroundColor = rgb;
}




createGrid(4);