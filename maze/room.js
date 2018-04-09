export class Room {
    constructor() {
        this._openings = {};
    }

    get connected() {
        return Object.values(this._openings).some((opening) => opening);
    }

    open(direction) {
        this._openings[direction] = true;
    }

    isOpen(direction) {
        return !!this._openings[direction];
    }
}