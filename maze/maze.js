import { Directions, Opposites } from './directions.js';
import { Room } from './room.js';

export class Maze {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.rooms = [];

        this.initializeRooms();
        this.addNeighbors();
    }

    initializeRooms() {
        for (let row = 0; row < this.height; row++) {
            this.rooms.push([]);

            for (let column = 0; column < this.width; column++) {
                this.rooms[row].push(new Room());
            }
        }
    }

    addNeighbors() {
        for (let row = 0; row < this.height; row++) {
            for (let column = 0; column < this.width; column++) {
                let room = this.rooms[row][column];

                if (row > 0) {
                    room.addNeighbor(Directions.UP, this.rooms[row - 1][column]);
                }

                if (row < (this.height - 1)) {
                    room.addNeighbor(Directions.DOWN, this.rooms[row + 1][column]);
                }

                if (column > 0) {
                    room.addNeighbor(Directions.LEFT, this.rooms[row][column - 1]);
                }

                if (column < (this.width - 1)) {
                    room.addNeighbor(Directions.RIGHT, this.rooms[row][column + 1]);
                }
            }
        }
    }

    connect(room, direction) {
        let opposite = Opposites[direction];
        let connectedRoom = room.neighbors[direction];
        room.openings[direction] = true;
        connectedRoom.openings[opposite] = true;
    }
}