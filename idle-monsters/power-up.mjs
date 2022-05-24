class Item {
    constructor(size, name) {
        this.size = size;
        this.name = name;
    }
}

const items = [];

items.push(new Item(1, "Super rare!"));
items.push(new Item(14, "Boring power-up"));
items.push(new Item(2, "Not so rare"));

const totalSize = items.map(item => item.size).reduce((a, b) => a + b);
console.log({totalSize});

const itemHits = [];
itemHits.length = items.length;
itemHits.fill(0);

function findItem(value) {
    let currentTotal = 0;
    
    for (let index in items) {
        const currentItem = items[index];
        currentTotal += currentItem.size;
        const currentLimit = currentTotal / totalSize;

        if (value < currentLimit) {
            return index;
        }
    }

    throw new Error("Nothing found");
}

for (let i = 0; i < 10000000; i++) {
    const foundIndex = findItem(Math.random());
    itemHits[foundIndex]++;
}

console.log(itemHits);
console.log(itemHits[0] / itemHits[2]);