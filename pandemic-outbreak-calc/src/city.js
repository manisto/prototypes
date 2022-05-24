export class City {
    name;
    connectedTo = new Set();
    cubes = 0;

    constructor(name) {
        this.name = name;
        
    }

    infect(turn, amount = 1) {
        console.group(`Infecting ${this.name} +${amount}`);

        if (this.cubes + amount > 3) {
            this.cubes = 3;
            this.#breakOut(turn);
        } else {
            this.cubes += amount;
        }

        console.groupEnd();
    }

    connectTo(...cities) {
        cities.forEach(city => {
            this.connectedTo.add(city);
            city.connectedTo.add(this);
        });
    }

    #breakOut(turn) {
        if (turn.breakouts.has(this)) {
            console.log(`Skipping breakout in ${this.name}`);
            return;
        }

        console.log(`Breakout happened in ${this.name}!`);
        turn.breakouts.add(this);
        this.connectedTo.forEach(city => city.infect(turn));
    }
}