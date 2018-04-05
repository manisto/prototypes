import { Directions, Opposites, DeltaColumn, DeltaRow } from './directions.js';
import { Room } from './room.js';

export class Maze {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.rooms = [];

        this.initializeRooms();
    }

    initializeRooms() {
        for (let row = 0; row < this.height; row++) {
            this.rooms.push([]);

            for (let column = 0; column < this.width; column++) {
                this.rooms[row].push(new Room(Directions));
            }
        }
    }

    connect(location, direction) {
        let opposite = Opposites[direction];
        let room = this.rooms[location.row][location.column];
        let connectedRoom = this.neighbor(location, direction);
        room.openings[direction] = true;
        connectedRoom.openings[opposite] = true;
    }

    neighbor(location, direction) {
        location = this.delta(location, direction);

        if (!this.valid(location)) {
            return null;
        }

        return this.rooms[location.row][location.column];
    }

    delta(location, direction) {
        return {
            row: location.row + DeltaRow[direction],
            column: location.column + DeltaColumn[direction]
        };
    }

    valid(location) {
        if (location.row < 0 || location.row >= this.height) {
            return false;
        }

        if (location.column < 0 || location.column >= this.width) {
            return false;
        }

        return true;
    }

    directions(location) {
        return Object.keys(Directions).filter(direction => this.valid(this.delta(location, direction)));
    }

    output() {
        let result = "";

        for (let row = 0; row < this.height; row++) {
            for (let pass = 0; pass < 3; pass++) {
                for (let column = 0; column < this.width; column++) {
                    let room = this.rooms[row][column];
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