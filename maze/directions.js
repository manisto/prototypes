export const Directions = {
    UP: "UP",
    RIGHT: "RIGHT",
    DOWN: "DOWN",
    LEFT: "LEFT",
};

export const Opposites = {
    [Directions.UP]: Directions.DOWN,
    [Directions.RIGHT]: Directions.LEFT,
    [Directions.DOWN]: Directions.UP,
    [Directions.LEFT]: Directions.RIGHT,
};

export const Dx = {
    [Directions.UP]: 0,
    [Directions.RIGHT]: 1,
    [Directions.DOWN]: 0,
    [Directions.LEFT]: -1,
}

export const Dy = {
    [Directions.UP]: -1,
    [Directions.RIGHT]: 0,
    [Directions.DOWN]: 1,
    [Directions.LEFT]: 0,
}