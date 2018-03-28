import { Directions } from './directions.js';

export class RecursiveBacktracker {
    constructor(maze, row = 0, column = 0) {
        this.maze = maze;
        this.stack = [];
    }

    generate(row = 0, column = 0) {
        this.stack.push(this.maze.rooms[row][column]);
        
        while (this.stack.length > 0) {
            let room = this.stack[this.stack.length - 1];
            let direction = this.chooseRandomDirection(room);
            
            if (direction === null) {
                this.stack.pop();
                continue;
            }

            this.maze.connect(room, direction);
            room = room.neighbors[direction];
            this.stack.push(room);
        }

        this.output();
    }

    chooseRandomDirection(room) {
        let directions = this.possibleDirections(room);
        
        if (directions.length === 0) {
            return null;
        }

        let randomIndex = Math.floor(Math.random() * directions.length);
        return directions[randomIndex];
    }

    possibleDirections(room) {
        return Object.keys(room.neighbors).filter((direction) => !room.neighbors[direction].connected);
    }

    output() {
        let result = "";

        for (let row = 0; row < this.maze.height; row++) {
            for (let pass = 0; pass < 3; pass++) {
                for (let column = 0; column < this.maze.width; column++) {
                    let room = this.maze.rooms[row][column];
                    if (pass == 0) {
                        result += "##";
                        result += room.openings[Directions.UP] ? ".." : "##";
                        result += "##";
                    }

                    if (pass == 1) {
                        result += (room.openings[Directions.LEFT]) ? ".." : "##";
                        result += "..";
                        result += (room.openings[Directions.RIGHT]) ? ".." : "##";
                    }

                    if (pass == 2) {
                        result += "##";
                        result += (room.openings[Directions.DOWN]) ? ".." : "##";
                        result += "##";
                    }
                }
                result += "\n";
            }
        }

        console.log(result);
    }
}