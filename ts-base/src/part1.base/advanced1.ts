interface DogInterface {
  run(): void;
}

interface CarInterface {
  jump(): void;
}

let pet: DogInterface & CarInterface = {
  jump() {},
  run() {},
};

let aaa: number | string = "1";
let bbb: "a" | "b" | "c";
let ccc: 1 | 2 | 3;

class Dog1 implements DogInterface {
  run() {}
  eat() {}
}

class Cat1 implements CarInterface {
  jump() {}
  eat() {}
}

enum Master {
  Boy,
  Girl,
}

function getPet(master: Master) {
  let peter = master === Master.Boy ? new Dog1() : new Cat1();
  peter.eat();
  //peter.run()
  //peter.jump()
  return peter;
}

interface Square {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Square | Rectangle | Circle;
function area(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.width * s.height;
    case "circle":
      return Math.PI * 2 * s.radius;
    default:
      return ((e: never) => {
        throw new Error(e);
      })(s);
  }
}
console.log(area({ kind: "circle", radius: 1 }));
