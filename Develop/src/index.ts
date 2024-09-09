// Importing classes
import Cli from './classes/Cli.js';
import Car from './classes/Car.js';
import Truck from './classes/Truck.js';
import Motorbike from './classes/Motorbike.js';
import Wheel from './classes/Wheel.js';

// Initialize wheels for initial vehicles
const wheel1 = new Wheel(18, "Michelin");
const wheel2 = new Wheel(18, "Michelin");
const wheel3 = new Wheel(18, "Michelin");
const wheel4 = new Wheel(18, "Michelin");
const motorbikeWheels = [
  new Wheel(17, "Pirelli"),
  new Wheel(17, "Pirelli"),
];

// Initialize vehicles
const car1 = new Car("1HGCM82633A004352", "Red", "Honda", "Civic", 2020, 2800, 130, [wheel1, wheel2, wheel3, wheel4]);

// Initialize an empty array; trucks and motorbikes can be added as needed
const vehicles: (Car | Truck | Motorbike)[] = [];

// push vehicles to array
//vehicles.push(Truck);
vehicles.push(car1);
//vehicles.push(Motorbike);

// create a new instance of the Cli class
const cli = new Cli(vehicles);

// start the cli
cli.startCli();
