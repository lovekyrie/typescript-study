export default {};
// export = {};
interface Human {
  name: string;
  eat(): void;
}

class Asian implements Human {
  constructor(name: string) {
    this.name = name;
  }
  name: string;
  eat() {}
  age: number = 0;
  sleep() {}
}

interface Man extends Human {
  run(): void;
}

interface Child {
  cry(): void;
}

interface Boy extends Man, Child {}

let boy: Boy = {
  name: "",
  run() {},
  eat() {},
  cry() {},
};

class Auto {
  state = 1;
  //private state2 = 0;
}

interface AutoInterface extends Auto {}

class CClass implements AutoInterface {
  state = 2;
}

class Bus extends Auto implements AutoInterface {}
