class Foo1 {}
const Bar1 = Foo1;

//let bar: Bar1; //Error 不能找到名称Bar1
namespace importing {
  export class Foo {}
}

import Bar2 = importing.Foo;

let bar2: Bar2;
//这个import技巧 仅适用于类型和变量

//捕获变量的类型
let foo1 = 123;
let bar3: typeof foo1;

bar3 = 567;
//bar3 = "789"; //Error string不能分配给number类型

//捕获类成员的类型
class Goo {
  goo: number;
  constructor(val: number) {
    this.goo = val;
  }
}

declare let _goo: Goo;
let bar4: typeof _goo.goo;

//捕获字符串类型
const strFoo = "Hello World";

let strBar: typeof strFoo;
//strBar仅能被赋值为'Hello World'
strBar = "Hello World";
//strBar = "anything else"; //Error

//捕获键的名称
const colors = {
  red: "red",
  blue: "blue",
};

type Colors = keyof typeof colors;

let color: Colors;
color = "red";
color = "blue";
// color = "anythingElse"; //Error
