// export = {};
//原始类型
const bool = true;
let num: number | undefined | null = 123;
const str = "abc";

//数组
const arr1: number[] = [1, 2, 3];
//联合类型数组
const arr2: Array<number | string> = [1, 2, 3, "4"];

// 元组
const tuple: [number, string] = [0, "1"];
//不推荐使用，因为即使添加也不能访问
// tuple.push(2)
// console.log(tuple)
// tuple[2]

//函数
const add = (x: number, y: number): number => x + y;
let compute: (x: number, y: number) => number;
compute = (a, b) => a + b;

//对象
const obj: { x: number; y: number } = { x: 1, y: 2 };
obj.x = 3;

// symbol
const s1 = Symbol();
const s2 = Symbol();
// console.log(s1 === s2)

// undefined, null
const un: undefined = undefined;
const nu: null = null;
num = undefined;
num = null;

// void
// const noReturn = () => {};

// any
// let x;
// x = 1;
// x = [];
// x = () => {};

// never 永远没有返回值
const error = () => {
  throw new Error("error");
};
// 死循环
const endless = () => {
  while (true) {}
};
