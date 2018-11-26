import { Directions, Opposites, DeltaColumn, DeltaRow } from './directions.js';

export class Maze {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = [];

        this.initializeGrid();
    }

    initializeGrid() {
        for (let row = 0; row < this.height; row++) {
            this.grid.push([]);

            for (let column = 0; column < this.width; column++) {
                this.grid[row].push(0);
            }
        }
    }

    connect(location, direction) {
        let connectedLocation = this.delta(location, direction);
        this.open(location, direction);
        this.open(connectedLocation, Opposites[direction]);
    }

    open(location, direction) {
        this.grid[location.row][location.column] |= direction;
    }

    delta(location, direction) {
        return {
            row: location.row + DeltaRow[direction],
            column: location.column + DeltaColumn[direction]
        };
    }

    valid(location, direction) {
        if (location.row < 0 || location.row >= this.height) {
            return false;
        }

        if (location.column < 0 || location.column >= this.width) {
            return false;
        }

        return true;
    }

    directions(location) {
        return Directions.filter(direction => this.valid(this.delta(location, direction)));
    }

    output() {
        let result = "";

        for (let row = 0; row < this.height; row++) {
            for (let pass = 0; pass < 3; pass++) {
                for (let column = 0; column < this.width; column++) {
                    let room = this.room({ row, column });
                    if (pass == 0) {
                        result += "##";
                        result += room.isOpen(1) ? ".." : "##";
                        result += "##";
                    }

                    if (pass == 1) {
                        result += room.isOpen(8) ? ".." : "##";
                        result += "..";
                        result += room.isOpen(2) ? ".." : "##";
                    }

                    if (pass == 2) {
                        result += "##";
                        result += room.isOpen(4) ? ".." : "##";
                        result += "##";
                    }
                }
                result += "\n";
            }
        }

        console.log(result);
    }
}