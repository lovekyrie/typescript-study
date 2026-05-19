/**
 * 索引签名：动态 key 与已知属性共存、字面量联合索引、嵌套 CSS、与交叉类型组合。
 * 注意：带索引签名时，显式属性类型必须兼容签名中的 value 类型。
 */
// export = {};
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

let fooIndex: Foo = {
  x: 1,
  y: 2,
};

console.log(foo["x"]);

const xIndex = "x";
console.log(foo[x]);

type Index = "a" | "b" | "c";
type FromIndex = { [k in Index]?: number };

const good: FromIndex = { b: 1, c: 2 };

// const bad: FromIndex = { b: 1, c: 2, d: 3 };

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

type FieldState = {
  value: string;
};

// type FromState = {
//   isValid: boolean; //Error 不符合索引签名
//   [fieldName: string]: FieldState;
// };

// 固定字段用交叉类型，动态字段用索引签名
type FromState = { isValid: boolean } & { [fieldName: string]: FieldState };

declare const state: FromState;

const isValidBool = state.isValid;
const somethingFieldStae = state["something"];

// const bar: FromState = {
//   isValid: false,
// };
//Error isValid不能赋值给 'FromState'
