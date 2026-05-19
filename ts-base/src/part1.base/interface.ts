/**
 * 接口：对象形状、readonly、可选属性、继承、索引签名、函数类型、混合类型
 */
interface List {
  readonly id: number; // 只读：编译期不可重新赋值
  name: string;
  age?: number; // 可选属性
}

/** 接口继承：子接口可收窄或重复声明成员 */
interface mergeList extends List {
  id: number;
}

interface Result {
  data: List[];
}

function render(result: Result) {
  result.data.forEach((value) => {
    console.log(value.id, value.name);
    if (value.age !== undefined) {
      console.log(value.age);
    }
    // value.id++; // 错误：readonly
  });
}

/** 多余属性检查对直接字面量更严；先赋给变量再传入可绕过（仍建议结构一致） */
let result = {
  data: [
    { id: 1, name: "A", sex: "male" },
    { id: 2, name: "B", age: 10 },
  ],
};
render(result);

/** 字符串索引签名：下标为 number 时实际会转成 string */
interface stringArray {
  [index: number]: string;
}
let chars: stringArray = ["a", "b"];

/**
 * 任意属性签名后，显式属性类型须兼容索引签名类型
 * 数字索引返回值须兼容 string 索引的返回值类型
 */
interface Names {
  [x: string]: unknown;
  [z: number]: number;
}

/** 用 type 描述函数类型 */
type Add = (x: number, y: number) => number;
let addTwo: Add = (a, b) => a + b;

/** 混合类型：既可调用又有属性 */
interface Lib {
  (): void;
  version: string;
  doSomething(): void;
}

function getLib() {
  let lib = (() => {}) as Lib;
  lib.version = "1.0";
  lib.doSomething = () => {};
  return lib;
}

let lib1 = getLib();
lib1();
let lib2 = getLib();
lib2.doSomething();
