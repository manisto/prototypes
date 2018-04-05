export class RecursiveBacktracker {
    constructor(maze) {
        this.maze = maze;
        this.stack = [];
    }

    generate(row = 0, column = 0) {
        this.stack.push({ row, column });
        
        while (this.stack.length > 0) {
            let location = this.stack[this.stack.length - 1];
            let direction = this.chooseRandomDirection(location);
            
            if (direction === null) {
                this.stack.pop();
                continue;
            }

            this.maze.connect(location, direction);
            location = this.maze.delta(location, direction);
            this.stack.push(location);
        }
    }

    chooseRandomDirection(location) {
        let directions = this.maze.directions(location).filter(direction => !this.maze.neighbor(location, direction).connected);
        
        if (directions.length === 0) {
            return null;
        }

        let randomIndex = Math.floor(Math.random() * directions.length);
        return directions[randomIndex];
    }
}