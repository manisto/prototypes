import { Directions, Opposites } from './directions.js';
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
                this.rooms[row].push(new Room());
            }
        }
    }

    connect(row, column, direction) {
        let opposite = Opposites[direction];
        let connectedRoom = null;
        this.rooms[row][column][direction] = true;

        switch (direction) {
            case Directions.UP:
                connectedRoom = this.rooms[row - 1][column];
                break;
            case Directions.RIGHT:
                connectedRoom = this.rooms[row][column + 1];
                break;
            case Directions.DOWN:
                connectedRoom = this.rooms[row + 1][column];
                break;
            case Directions.LEFT:
                connectedRoom = this.rooms[row][column - 1];
                break;
        }

        connectedRoom[opposite] = true;
    }

}