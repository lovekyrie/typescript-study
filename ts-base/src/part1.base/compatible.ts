// export = {};
/**
 * x(目标类型) = y(源类型) x兼容y
 */

let sCompatible: string = "a";
// str = null; "strictNullChecks": false

//接口兼容性
interface X {
  a: any;
  b: any;
}

interface Y {
  a: any;
  b: any;
  c: any;
}
let x1Compatible: X = { a: 1, b: 2 };
let y1: Y = { a: 1, b: 2, c: 3 };
x1Compatible = y1;
//y1 = x1;

//函数兼容性
type Handler = (a: number, y: number) => void;
function hof(Handler: Handler) {
  return Handler;
}

// 1)参数个数
let handler1 = (a: number) => {};
hof(handler1);
let handler2 = (a: number, y: number, c: number) => {};
//hof(handler2);

//可选参数、剩余参数
let a1 = (p1: number, p2: number) => {};
let b1 = (p1?: number, p2?: number) => {};
let c1 = (...args: number[]) => {};
a1 = b1;
a1 = c1;
// b1 = c1;
// b1 = a1;
c1 = a1;
c1 = b1;

//2)参数类型
let handler3 = (a: string) => {};
//hof(handler3);

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Point2D {
  x: number;
  y: number;
}
let p3d = (point: Point3D) => {};
let p2d = (point: Point2D) => {};
p3d = p2d;
//p2d = p3d;

//3)函数返回值
let f1 = () => ({ name: "Alice" });
let g = () => ({ name: "Alice", location: "Beijing" });
f1 = g;
//g = f1;

//函数重载
function overload(x: number, y: number): number;
function overload(x: string, y: string): string;
function overload(x: any, y: any): any {}

//枚举兼容性
enum Fruit {
  Apple,
  Banana,
}
enum Color {
  RedC,
  YellowC
}
let fruit: Fruit.Apple = 1;
let no: number = Fruit.Apple;
//let color: Color.Red = Fruit.Apple; 枚举类型不能兼容

//类兼容性
class A {
  constructor(p: number, q: number) {}
  id: number = 1;
  private name: string = "";
}

class B {
  static s = 1;
  constructor(p: number) {}
  id: number = 2;
  private name: string = "";
}

class C1 extends A {}
let aa = new A(1, 2);
let bb = new B(1);
//aa = bb;
//bb = aa;
let cc = new C1(1, 2);
aa = cc;
cc = aa;

//泛型兼容性
interface Empty<T> {
  //value: T;
}
let obj1: Empty<number> = {};
let obj2: Empty<string> = {};
obj1 = obj2;

let log11 = <T>(x: T): T => {
  console.log(x);
  return x;
};

let log12 = <U>(y: U): U => {
  console.log(y);
  return y;
};
log11 = log12;
