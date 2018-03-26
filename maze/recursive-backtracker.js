import { Directions, Dx, Dy } from './directions.js';

export class RecursiveBacktracker {
    constructor(maze, row = 0, column = 0) {
        this.maze = maze;
        this.row = 0;
        this.column = 0;
        this.stack = [];
    }

    generate() {
        this.stack.push({row: this.row, column: this.column});
        let i = 0;

        while (this.stack.length > 0) {
            let directions = this.possibleDirections();

            if (directions.length === 0) {
                this.backtrack();
                continue;
            }

            let chosenDirection = directions[Math.floor(Math.random() * directions.length)];
            this.maze.connect(this.row, this.column, chosenDirection);
            this.row += Dy[chosenDirection];
            this.column += Dx[chosenDirection];
            this.stack.push({row: this.row, column: this.column});
        }

        let result = "";

        for (let row = 0; row < this.maze.height; row++) {
            for (let pass = 0; pass < 3; pass++) {
                for (let column = 0; column < this.maze.width; column++) {
                    let room = this.maze.rooms[row][column];
                    if (pass == 0) {
                        result += "##";
                        result += room[Directions.UP] ? ".." : "##";
                        result += "##";
                    }

                    if (pass == 1) {
                        result += (room[Directions.LEFT]) ? ".." : "##";
                        result += "..";
                        result += (room[Directions.RIGHT]) ? ".." : "##";
                    }

                    if (pass == 2) {
                        result += "##";
                        result += (room[Directions.DOWN]) ? ".." : "##";
                        result += "##";
                    }
                }
                result += "\n";
            }
        }

        console.log(result);
    }

    backtrack() {
        do {
            Object.assign(this, this.stack.pop());
        }
        while (this.stack.length > 0 && this.possibleDirections().length === 0);
    }

    possibleDirections() {
        let directions = [];

        Object.values(Directions).forEach(direction => {
            let newRow = this.row + Dy[direction];
            let newColumn = this.column + Dx[direction];

            if (newRow < 0 || newRow >= this.maze.height) {
                return;
            }

            if (newColumn < 0 || newColumn >= this.maze.width) {
                return;
            }

            let newRoom = this.maze.rooms[newRow][newColumn];

            if (newRoom.connected) {
                return;
            }

            directions.push(direction);
        });

        return directions;
    }
}