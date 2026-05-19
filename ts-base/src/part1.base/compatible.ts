/**
 * 类型兼容性（结构子类型）：只要源类型结构满足目标类型，即可赋值
 * 规则：x = y 时，x 是目标类型，y 是源类型，y 可赋给 x 即 y 兼容 x
 */
export {};

// ---------- 基础类型 ----------
let sCompatible: string = "a";

// ---------- 接口：目标属性是源属性的子集即可 ----------
interface X {
  a: unknown;
  b: unknown;
}
interface Y {
  a: unknown;
  b: unknown;
  c: unknown;
}
let x1Compatible: X = { a: 1, b: 2 };
let y1: Y = { a: 1, b: 2, c: 3 };
x1Compatible = y1; // OK：Y 多出的 c 不影响
// y1 = x1Compatible; // 错误：缺少 c

// ---------- 函数：参数双向逆变、返回值协变 ----------
type Handler = (a: number, y: number) => void;
function hof(handler: Handler) {
  return handler;
}

// 参数少可以赋给参数多（调用方传的实参仍够用）
let handler1 = (a: number) => {};
hof(handler1);
let handler2 = (a: number, y: number, c: number) => {};
// hof(handler2); // 错误：参数过多

let a1 = (p1: number, p2: number) => {};
let b1 = (p1?: number, p2?: number) => {};
let c1 = (...args: number[]) => {};
a1 = b1;
a1 = c1;
c1 = a1;
c1 = b1;

let handler3 = (a: string) => {};
// hof(handler3); // 错误：参数类型不兼容

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
p3d = p2d; // OK：实现只需用到 Point3D 的子集

let f1 = () => ({ name: "Alice" });
let g = () => ({ name: "Alice", location: "Beijing" });
f1 = g; // 返回值多属性可赋给少属性

function overload(x: number, y: number): number;
function overload(x: string, y: string): string;
function overload(x: unknown, y: unknown): unknown {
  return x;
}

// ---------- 枚举：仅同枚举可互赋；数字枚举可赋给 number ----------
enum Fruit {
  Apple,
  Banana,
}
enum Color {
  RedC,
  YellowC,
}
let fruit: Fruit.Apple = Fruit.Apple;
let no: number = Fruit.Apple;
// let color: Color.RedC = Fruit.Apple; // 不同枚举不兼容

// ---------- 类：只比较实例成员，忽略静态与构造函数差异 ----------
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
let cc = new C1(1, 2);
aa = cc;
cc = aa;

// ---------- 泛型：未使用 T 时，不同 T 的同一结构可互赋 ----------
interface Empty<T> {
  // value: T;
}
let obj1: Empty<number> = {};
let obj2: Empty<string> = {};
obj1 = obj2;

let log11 = <T>(x: T): T => x;
let log12 = <U>(y: U): U => y;
log11 = log12;
