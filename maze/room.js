import { Directions } from './directions.js';

export class Room {
    constructor() {
        this.openings = {};
        this.neighbors = {};
    }

    get connected() {
        return Object.values(this.openings).some((opening) => opening);
    }

    addNeighbor(direction, neighbor) {
        this.openings[direction] = false;
        this.neighbors[direction] = neighbor;
    }
}