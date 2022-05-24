const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

export const Direction = {
    UP,
    RIGHT,
    DOWN,
    LEFT,
};

class Cell {
    neighbors: Cell[] = new Array(4).fill(null);
    openings: boolean[] = new Array(4).fill(false);
}

export function blankMaze(rows: number, cols: number): Cell[] {
    let cells: Cell[] = [];

    for (let cellIndex: number = 0; cellIndex < rows * cols; cellIndex++) {
        cells.push(new Cell());
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let currentIndex = (row * cols) + col;
            let currentCell = cells[currentIndex];

            if (row > 0) {
                currentCell.neighbors[UP] = cells[currentIndex - cols];
            }

            if (col < cols - 1) {
                currentCell.neighbors[RIGHT] = cells[currentIndex + 1];
            }

            if (row < rows - 1) {
                currentCell.neighbors[DOWN] = cells[currentIndex + cols];
            }

            if (col > 0) {
                currentCell.neighbors[LEFT] = cells[currentIndex - 1];
            }
        }
    }

    return cells;
}

export function* mazeGen(cells: Cell[]) {
    let stack: Cell[] = [cells[0]];
    let visited: Cell[] = [cells[0]];

    let currentCell: Cell = cells[0];
    
    while (stack.length > 0) {
        currentCell = stack.pop()!;
        yield currentCell;
        let unvisitedNeighbors = currentCell.neighbors.filter(cell => cell && visited.indexOf(cell) === -1);
        
        if (unvisitedNeighbors.length === 0) {
            continue;
        }

        let nextIndex = Math.floor(Math.random() * unvisitedNeighbors.length);
        let nextCell = unvisitedNeighbors[nextIndex];
        stack.push(currentCell);
        stack.push(nextCell);
        visited.push(nextCell);
        currentCell.openings[currentCell.neighbors.indexOf(nextCell)] = true;
        nextCell.openings[nextCell.neighbors.indexOf(currentCell)] = true;
    }

    return currentCell;
}

export function logMaze(cells: Cell[], rows: number, cols: number) {
    console.log(" _".repeat(cols));

    for (let row: number = 0; row < rows; row++) {
        let line: string = "";

        for (let col: number = 0; col < cols; col++) {
            let cell: Cell = cells[(row * cols) + col];
            line += (cell.openings[LEFT]) ? " " : "|";
            line += (cell.openings[DOWN]) ? " " : "_";
        }

        console.log(line + "|");
    }
}
