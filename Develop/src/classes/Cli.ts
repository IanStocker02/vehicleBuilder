// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";
import AbleToTow from "../interfaces/AbleToTow.js";

// Define a type union for all vehicle types
type VehicleType = Car | Truck | Motorbike;

// define the Cli class
class Cli {
  // Update the vehicles property to accept Truck and Motorbike objects as well
  vehicles: VehicleType[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  // Update the constructor to accept Truck and Motorbike objects as well
  constructor(vehicles: VehicleType[]) {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin(): string {
    // return a random string
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    ).toUpperCase();
  }

  // method to choose a vehicle from existing vehicles
  chooseVehicle(): void {
    if (this.vehicles.length === 0) {
      console.log("No vehicles available. Please create a new vehicle first.");
      this.startCli();
      return;
    }

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle to perform an action on',
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model} (${vehicle.constructor.name})`,
              value: vehicle.vin,
            };
          }),
        },
      ])
      .then((answers) => {
        // set the selectedVehicleVin to the vin of the selected vehicle
        this.selectedVehicleVin = answers.selectedVehicleVin;
        // perform actions on the selected vehicle
        this.performActions();
      });
  }

  // method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          // Update the choices array to include Truck and Motorbike
          choices: ['Car', 'Truck', 'Motorbike'],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === 'Car') {
          // create a car
          this.createCar();
        } else if (answers.vehicleType === 'Truck') {
          // create a truck
          this.createTruck();
        } else if (answers.vehicleType === 'Motorbike') {
          // create a motorbike
          this.createMotorbike();
        }
      });
  }

  // method to create a car
  createCar(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
          validate: (input) => !isNaN(parseInt(input)) || 'Please enter a valid number',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight (lbs)',
          validate: (input) => !isNaN(parseInt(input)) || 'Please enter a valid number',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed (mph)',
          validate: (input) => !isNaN(parseInt(input)) || 'Please enter a valid number',
        },
      ])
      .then((answers) => {
        const car = new Car(
          // The generateVin method is static and should be called using the class name Cli, use Cli.generateVin()
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        // push the car to the vehicles array
        this.vehicles.push(car);
        console.log(`Car ${car.make} ${car.model} created successfully!`);
        // set the selectedVehicleVin to the vin of the car
        this.selectedVehicleVin = car.vin;
        // perform actions on the car
        this.performActions();
      });
  }

  // method to create a truck
  createTruck(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
          validate: (input) => !isNaN(parseInt(input)) || 'Please enter a valid number',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight (lbs)',
          validate: (input) => !isNaN(parseInt(input)) || 'Please enter a valid number',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed (mph)',
          validate: (input) => !isNaN(parseInt(input)) || 'Please enter a valid number',
        },
        {
          type: 'input',
          name: 'towingCapacity',
          message: 'Enter Towing Capacity (lbs)',
          validate: (input) => !isNaN(parseInt(input)) || 'Please enter a valid number',
        },
      ])
      .then((answers) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          parseInt(answers.towingCapacity),
          []
        );
        // push the truck to the vehicles array
        this.vehicles.push(truck);
        console.log(`Truck ${truck.make} ${truck.model} created successfully!`);
        // set the selectedVehicleVin to the vin of the truck
        this.selectedVehicleVin = truck.vin;
        // perform actions on the truck
        this.performActions();
      });
  }

  // method to create a motorbike
  createMotorbike(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
          validate: (input) => !isNaN(parseInt(input)) || 'Please enter a valid number',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight (lbs)',
          validate: (input) => !isNaN(parseInt(input)) || 'Please enter a valid number',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed (mph)',
          validate: (input) => !isNaN(parseInt(input)) || 'Please enter a valid number',
        },
        {
          type: 'input',
          name: 'frontWheelDiameter',
          message: 'Enter Front Wheel Diameter (inches)',
          validate: (input) => !isNaN(parseInt(input)) || 'Please enter a valid number',
        },
        {
          type: 'input',
          name: 'frontWheelBrand',
          message: 'Enter Front Wheel Brand',
        },
        {
          type: 'input',
          name: 'rearWheelDiameter',
          message: 'Enter Rear Wheel Diameter (inches)',
          validate: (input) => !isNaN(parseInt(input)) || 'Please enter a valid number',
        },
        {
          type: 'input',
          name: 'rearWheelBrand',
          message: 'Enter Rear Wheel Brand',
        },
      ])
      .then((answers) => {
        const frontWheel = new Wheel(parseInt(answers.frontWheelDiameter), answers.frontWheelBrand);
        const rearWheel = new Wheel(parseInt(answers.rearWheelDiameter), answers.rearWheelBrand);
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [frontWheel, rearWheel]
        );
        // push the motorbike to the vehicles array
        this.vehicles.push(motorbike);
        console.log(`Motorbike ${motorbike.make} ${motorbike.model} created successfully!`);
        // set the selectedVehicleVin to the vin of the motorbike
        this.selectedVehicleVin = motorbike.vin;
        // perform actions on the motorbike
        this.performActions();
      });
  }

  // method to find a vehicle to tow
  // Added a parameter to accept a truck object
  findVehicleToTow(truck: Truck): void {
    // Filter out the truck itself from the list of towable vehicles
    const towableVehicles = this.vehicles.filter((vehicle) => vehicle.vin !== truck.vin);

    if (towableVehicles.length === 0) {
      console.log("No vehicles available to tow.");
      this.performActions();
      return;
    }

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleToTow',
          message: 'Select a vehicle to tow',
          choices: towableVehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model} (${vehicle.constructor.name})`,
              value: vehicle.vin,
            };
          }),
        },
      ])
      .then((answers) => {
        // Find the vehicle object based on the selected VIN
        const vehicleToTow = this.vehicles.find((v) => v.vin === answers.vehicleToTow);
        if (!vehicleToTow) {
          console.log("Selected vehicle not found.");
          this.performActions();
          return;
        }

        // Perform the tow action
        truck.tow(vehicleToTow);
        // After towing, perform actions on the truck
        this.performActions();
      });
  }

  // method to perform actions on a vehicle
  performActions(): void {
    // Find the selected vehicle
    const selectedVehicle = this.vehicles.find(v => v.vin === this.selectedVehicleVin);
    if (!selectedVehicle) {
      console.log("Selected vehicle not found.");
      this.startCli();
      return;
    }

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select an action',
          // Add options to tow and wheelie
          choices: [
            'Print details',
            'Start vehicle',
            'Accelerate 5 MPH',
            'Decelerate 5 MPH',
            'Stop vehicle',
            'Turn right',
            'Turn left',
            'Reverse',
            // Conditionally add 'Tow' if Truck
            ...(selectedVehicle instanceof Truck ? ['Tow'] : []),
            // Conditionally add 'Wheelie' if Motorbike
            ...(selectedVehicle instanceof Motorbike ? ['Wheelie'] : []),
            'Select or create another vehicle',
            'Exit',
          ],
        },
      ])
      .then((answers) => {
        // perform the selected action
        switch (answers.action) {
          case 'Print details':
            selectedVehicle.printDetails();
            break;
          case 'Start vehicle':
            selectedVehicle.start();
            break;
          case 'Accelerate 5 MPH':
            selectedVehicle.accelerate(5);
            break;
          case 'Decelerate 5 MPH':
            selectedVehicle.decelerate(5);
            break;
          case 'Stop vehicle':
            selectedVehicle.stop();
            break;
          case 'Turn right':
            selectedVehicle.turn('right');
            break;
          case 'Turn left':
            selectedVehicle.turn('left');
            break;
          case 'Reverse':
            selectedVehicle.reverse();
            break;
          case 'Tow':
            if (selectedVehicle instanceof Truck) {
              this.findVehicleToTow(selectedVehicle);
              return; // Return to avoid calling performActions again immediately
            }
            break;
          case 'Wheelie':
            if (selectedVehicle instanceof Motorbike) {
              selectedVehicle.wheelie();
            }
            break;
          case 'Select or create another vehicle':
            // start the cli to return to the initial prompt if the user wants to select or create another vehicle
            this.startCli();
            return;
          case 'Exit':
            // exit the cli if the user selects exit
            this.exit = true;
            console.log("Exiting the application. Goodbye!");
            return;
          default:
            console.log("Invalid action selected.");
        }

        if (!this.exit) {
          // if the user does not want to exit, perform actions on the selected vehicle
          this.performActions();
        }
      });
  }

  // method to start the cli
  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message:
            'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: ['Create a new vehicle', 'Select an existing vehicle', 'Exit'],
        },
      ])
      .then((answers) => {
        // check if the user wants to create a new vehicle or select an existing vehicle
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else if (answers.CreateOrSelect === 'Select an existing vehicle') {
          this.chooseVehicle();
        } else {
          // Exit the application
          this.exit = true;
          console.log("Exiting the application. Goodbye!");
        }
      });
  }
}

// export the Cli class
export default Cli;
