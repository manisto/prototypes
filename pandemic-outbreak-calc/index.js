import { City } from "./src/city.js";
import { Turn } from "./src/turn.js";

let chennai = new City("Chennai");
let kolkata = new City("Kolkata");
let delhi = new City("Delhi");
let mumbai = new City("Mumbai");
let karachi = new City("Karachi");
let tehran = new City("tehran");
let riyadh = new City("riyadh");
let baghdad = new City("Baghdad");
let moscow = new City("Moscow");

chennai.connectTo(mumbai, delhi, kolkata);
kolkata.connectTo(chennai, delhi);
delhi.connectTo(kolkata, chennai, mumbai, karachi, tehran);
mumbai.connectTo(karachi, delhi, chennai);
karachi.connectTo(riyadh, tehran, delhi, mumbai);
tehran.connectTo(moscow, baghdad, karachi, delhi);

chennai.infect(new Turn(), 3);
delhi.infect(new Turn(), 3);
delhi.infect(new Turn());
kolkata.infect(new Turn());
chennai.infect(new Turn());

let cities = [chennai, kolkata, delhi, mumbai, karachi, tehran, riyadh, baghdad, moscow];
let cubes = cities.map(city => city.cubes).reduce((a, b) => a + b);
console.log(cities.map(city => `${city.name}: ${city.cubes}`));

console.warn(cubes);