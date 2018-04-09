const UP = "UP";
const RIGHT = "RIGHT";
const DOWN = "DOWN";
const LEFT = "LEFT";

export const Directions = [UP, RIGHT, DOWN, LEFT];

export const Opposites = {
    [UP]: DOWN,
    [RIGHT]: LEFT,
    [DOWN]: UP,
    [LEFT]: RIGHT,
};

export const DeltaColumn = {
    [UP]: 0,
    [RIGHT]: 1,
    [DOWN]: 0,
    [LEFT]: -1,
}

export const DeltaRow = {
    [UP]: -1,
    [RIGHT]: 0,
    [DOWN]: 1,
    [LEFT]: 0,
}