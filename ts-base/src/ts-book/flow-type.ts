/**
 * 类型流动与 typeof：import 类型别名、捕获变量/成员/字面量的类型、keyof typeof。
 * typeof 在类型位置表示「取值的类型」，不是 JavaScript 的 typeof 运算符。
 */
export {};

class Foo1 {}
const Bar1 = Foo1;

//let bar: Bar1; //Error 不能找到名称Bar1
namespace importing {
  export class Foo {}
}

// import = 仅用于类型/命名空间，可给类型起别名
import Bar2 = importing.Foo;

let bar2: Bar2;

let foo1 = 123;
let bar3: typeof foo1;

bar3 = 567;
//bar3 = "789"; //Error string不能分配给number类型

class Goo {
  goo: number;
  constructor(val: number) {
    this.goo = val;
  }
}

declare let _goo: Goo;
// typeof 实例.属性 → 该属性的类型（number）
let bar4: typeof _goo.goo;

const strFoo = "Hello World";

let strBar: typeof strFoo;
strBar = "Hello World";
//strBar = "anything else"; //Error 字面量类型收窄

const colors = {
  red: "red",
  blue: "blue",
};

// keyof typeof：对象键的联合 "red" | "blue"
type Colors = keyof typeof colors;

let color: Colors;
color = "red";
color = "blue";
// color = "anythingElse"; //Error
