import { Directions, Opposites } from './directions.js';

export class Room {
    constructor() {
        this[Directions.UP] = false;
        this[Directions.RIGHT] = false;
        this[Directions.DOWN] = false;
        this[Directions.LEFT] = false;
    }

    get connected() {
        return this[Directions.UP] ||
               this[Directions.RIGHT] ||
               this[Directions.DOWN] ||
               this[Directions.LEFT];
    }
}