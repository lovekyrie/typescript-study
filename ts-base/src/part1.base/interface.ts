/**
 * 接口定义对象
 */
interface List {
  readonly id: number;
  name: string;
  age?: number;
}

/**
 * 接口继承， mergeList比List多一个id属性
 */
interface mergeList extends List {
  id: number;
}

interface Result {
  data: List[];
}

function render(result: Result) {
  result.data.forEach((value) => {
    console.log(value.id, value.name);
    if (value.age) {
      console.log(value.age);
    }
    //value.id++;
  });
}

let result = {
  data: [
    { id: 1, name: "A", sex: "male" },
    { id: 2, name: "B", age: 10 },
  ],
};

render(result);

interface stringArray {
  [index: number]: string;
}

let chars: stringArray = ["a", "b"];

//需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
interface Names {
  [x: string]: any;
  //y:number;
  [z: number]: number;
}

// let add1: (x: number, y: number) => number;
// interface Add {
//   (x: number, y: number): number;
// }

type Add = (x: number, y: number) => number;
let addTwo: Add = (a: number, b: number) => a + b;

interface Lib {
  (): void;
  version: string;
  doSomething(): void;
}

function getLib() {
  let lib: Lib = (() => {}) as Lib;
  lib.version = "1.0";
  lib.doSomething = () => {};
  return lib;
}

let lib1 = getLib();
lib1();

let lib2 = getLib();
lib2.doSomething();
