/**
 * 交叉类型 &、联合类型 |、可辨识联合、never 穷尽检查
 */
interface DogInterface {
  run(): void;
}

interface CarInterface {
  jump(): void;
}

/** 交叉类型：同时满足多个类型 */
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
  return peter;
}

/** 可辨识联合：成员含共同字面量字段 kind，便于 switch 收窄 */
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
      return Math.PI * s.radius ** 2;
    default:
      /** never：若漏掉分支，default 中 s 不应再能赋值，用于编译期检查 */
      return ((e: never) => {
        throw new Error(String(e));
      })(s);
  }
}
console.log(area({ kind: "circle", radius: 1 }));
