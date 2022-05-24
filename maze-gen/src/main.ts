import { blankMaze, mazeGen, Direction } from "./maze.js";

const rows = 30;
const cols = 30;

const maze = blankMaze(rows, cols);

const mazeDiv = document.getElementById("maze")!;
const cellDivs: Element[] = [];

for (let row = 0; row < rows; row++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    mazeDiv.appendChild(rowDiv);

    for (let col = 0; col < cols; col++) {
        const cell = maze[(row * cols) + col];
        const cellDiv = document.createElement("div");
        rowDiv.appendChild(cellDiv);
        cellDivs.push(cellDiv);
    }
}

const gen = mazeGen(maze);
let currentCell = gen.next();

function nextCell() {
    let currentIndex = maze.indexOf(currentCell.value);
    currentCell = gen.next();
    let nextIndex = maze.indexOf(currentCell.value);
    cellDivs[currentIndex].classList.add("visited");
    cellDivs[currentIndex].classList.remove("active");
    cellDivs[nextIndex].classList.add("active");

    if (!currentCell.done) {
        setTimeout(nextCell, 10);
    }
}

nextCell();