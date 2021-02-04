export = {};
interface Foo {
  [key: string]: number;
  x: number;
  y: number;
}

interface Bar {
  [key: string]: number;
  x: number;
  // y: string; //Error y属性必须为number类型
}

let foo: Foo = {
  x: 1,
  y: 2,
};

console.log(foo["x"]);

const x = "x";
console.log(foo[x]);

//使用一组有限的字符串字面量
type Index = "a" | "b" | "c";
type FromIndex = { [k in Index]?: number };

const good: FromIndex = { b: 1, c: 2 };

//Error:
// `{b:1,c:2,d:3}` 不能分配给 'FromIndex'
//对象字面量只能指定已知类型,'d'不存在'FromIndex'上
// const bad: FromIndex = { b: 1, c: 2, d: 3 };

// 索引签名的嵌套
interface NestedCSS {
  color?: string;
  nest?: {
    [selector: string]: NestedCSS;
  };
}

const example: NestedCSS = {
  color: "red",
  nest: {
    ".subclass": {
      color: "blue",
    },
  },
};

const failsSliently: NestedCSS = {
  //  colour:'red' //Error 未知属性colour
};

//索引签名中排除某些属性
type FieldState = {
  value: string;
};

// type FromState = {
//   isValid: boolean; //Error 不符合索引签名
//   [fieldName: string]: FieldState;
// };

//使用交叉类型
type FromState = { isValid: boolean } & { [fieldName: string]: FieldState };

//将它用于从某些地方获取的JavaScript对象
declare const state: FromState;

const isValidBool = state.isValid;
const somethingFieldStae = state["something"];

//使用它来创建一个对象时，将不会工作
// const bar: FromState = {
//   isValid: false,
// };
//Error isValid不能赋值给 'FromState'
