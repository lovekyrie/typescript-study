/**
 * 函数：类型注解、可选参数、默认参数、剩余参数、函数重载
 */
function add1(x: number, y: number) {
  return x + y;
}

/** 函数类型变量 */
let add2: (x: number, y: number) => number;

type add3 = (x: number, y: number) => number;

/** 调用签名写在 interface 里 */
interface add4 {
  (x: number, y: number): number;
}

// add1(1, 2, 3); // 错误：参数个数必须一致

/** 可选参数 ?：可省略，类型为 T | undefined */
function add5(x: number, y?: number) {
  return y !== undefined ? x + y : x;
}
add5(1);

/**
 * 默认参数：省略时用默认值。
 * 注意：有默认值的参数后面，无默认值的参数调用时要显式传 undefined 占位
 */
function add6(x: number, y = 9, z: number, q = 1) {
  return x + y + z + q;
}
add6(1, undefined, 3);

/** 剩余参数 ...rest：收集为数组 */
function add7(x: number, ...rest: number[]) {
  return x + rest.reduce((pre, cur) => pre + cur);
}
console.log(add7(1, 2, 3, 4, 5));

/** 函数重载：多个调用签名 + 一个实现签名 */
function add8(...rest: number[]): number;
function add8(...rest: string[]): string;
function add8(...rest: any[]) {
  const first = rest[0];
  if (typeof first === "string") {
    return rest.join("");
  }
  if (typeof first === "number") {
    return rest.reduce((pre, cur) => pre + cur);
  }
  return rest;
}
console.log(add8(1, 2));
console.log(add8("a", "b", "c"));
