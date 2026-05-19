/**
 * 基础类型：原始类型、数组、元组、函数、对象、Symbol、null/undefined、void、never
 */
export default {};

// ---------- 原始类型 ----------
const bool = true;
// strictNullChecks 为 true 时，number 不能直接赋 null/undefined，需联合类型
let num: number | undefined | null = 123;
const str = "abc";

// ---------- 数组 ----------
const arr1: number[] = [1, 2, 3];
/** 联合类型数组：元素可以是 number 或 string */
const arr2: Array<number | string> = [1, 2, 3, "4"];

// ---------- 元组：固定长度与位置类型 ----------
const tuple: [number, string] = [0, "1"];
// push 在编译期可通过，但访问 tuple[2] 会报错（元组长度固定）
// tuple.push(2);
// tuple[2];

// ---------- 函数类型 ----------
const add = (x: number, y: number): number => x + y;
/** 先声明函数类型，再赋值实现（参数名可不同） */
let compute: (x: number, y: number) => number;
compute = (a, b) => a + b;

// ---------- 对象字面量类型 ----------
const obj: { x: number; y: number } = { x: 1, y: 2 };
obj.x = 3;

// ---------- Symbol：唯一标识 ----------
const s1 = Symbol();
const s2 = Symbol();
// s1 === s2  // false

// ---------- null / undefined ----------
const un: undefined = undefined;
const nu: null = null;
num = undefined;
num = null;

// ---------- void：无有意义返回值 ----------
// const noReturn = (): void => {};

// ---------- any：关闭类型检查（学习阶段尽量避免） ----------
// let x: any;
// x = 1; x = []; x = () => {};

// ---------- never：永不正常返回（抛错或死循环） ----------
const error = (): never => {
  throw new Error("error");
};
const endless = (): never => {
  while (true) {}
};
