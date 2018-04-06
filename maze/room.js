let id = 0;

export class Room {
    constructor() {
        this.id = id++;
        this.openings = {};
    }

    get connected() {
        return Object.values(this.openings).some((opening) => opening);
    }

    open(direction) {
        this.openings[direction] = true;
    }

    close(direction) {
        this.openings[direction] = false;
    }
}