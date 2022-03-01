//交叉类型
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

//联合类型
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

// 可辨识联合 （如果一个类型是多个类型的联合类型，且多个类型含有一个公共属性，那么就可以利用这个公共属性，来创建不同的类型保护区块。）
// 1. 可辨识
// explain: 以下代码我们分别定义了Squar,Rectangle,Circle三个接口，在这些接口中都包含一个kind属性，该属性被称为可辨识的属性
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
// 2. 联合类型
// explain: 基于前面定义的3个接口，我们创建一个Shape的联合类型
type Shape = Square | Rectangle | Circle;
// 3. 类型守卫
// explain: 我们无法用不同Shape类型的同一个属性去计算面积，但可以用switch和case运算符来实现类型守卫，确保安全访问s对象中所有的属性
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
