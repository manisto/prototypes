export class Room {
    constructor() {
        this._openings = 0;
    }

    get connected() {
        return this._openings > 0;
    }

    open(direction) {
        this._openings |= direction;
    }

    isOpen(direction) {
        return this._openings & direction;
    }
}