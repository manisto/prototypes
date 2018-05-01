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
        let room = this.room(location);
        let connectedRoom = this.neighbor(location, direction);
        room.open(direction);
        connectedRoom.open(Opposites[direction]);
    }

    neighbor(location, direction) {
        let delta = this.delta(location, direction);
        return this.room(delta);
    }

    delta(location, direction) {
        return {
            row: location.row + DeltaRow[direction],
            column: location.column + DeltaColumn[direction]
        };
    }

    room(location) {
        if (!this.valid(location)) {
            return null;
        }

        return this.rooms[location.row][location.column];
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
        return Directions.filter(direction => this.neighbor(location, direction));
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