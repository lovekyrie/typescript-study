/**
 * 类型断言与赋值断言：as/<T> 收窄、非空 !、确定赋值断言 !。
 * 断言只影响编译器，不改变运行时；滥用会掩盖真实空值风险。
 */

// 类型断言：告诉编译器「我比你知道得更准」
let someValue: unknown = "this is a string";
let strLength: number = (<string>someValue).length;

let someValue1: unknown = "this is a string";
let strLength1: number = (someValue as string).length;

// 非空断言 !：排除 undefined/null（需开启 strictNullChecks 才有意义）
function myFunc(maybeString: string | undefined | null) {
  //const onlyString: string = maybeString; //err
  // const ignoreUndefinedAndNull: string = maybeString!;
}

type NumGenerator = () => number;

function func(numGenerator: NumGenerator | undefined) {
  //const num1 = numGenerator(); //err
  // const num2 = numGenerator!();
}

// 确定赋值断言 x!：声明会在使用前被赋值，跳过「可能未赋值」检查
let x: number;
initialize();
function initialize() {
  x = 10;
}

let x1!: number;
console.log(2 * x1);
initialize1();
function initialize1() {
  x1 = 10;
}
