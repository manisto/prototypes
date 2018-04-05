let id = 0;

export class Room {
    constructor(directions) {
        this.id = id++;
        this.openings = {};

        for (let direction in directions) {
            this.openings[direction] = false;
        }
    }

    get connected() {
        return Object.values(this.openings).some((opening) => opening);
    }
}