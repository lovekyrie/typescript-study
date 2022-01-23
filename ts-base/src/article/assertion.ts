//断言
//1 类型断言
// 1.1 "尖括号"语法
let someValue: unknown = "this is a string";
let strLength: number = (<string>someValue).length;
// 1.2 as语法
let someValue1: unknown = "this is a string";
let strLength1: number = (someValue as string).length;

//2 非空断言
// 2.1 忽略undefined 和 null 类型
function myFunc(maybeString: string | undefined | null) {
  // Type 'string | undefined | null' is not assignable to type 'string'.
  // Type 'undefined' is not assignable to type 'string'.
  //const onlyString: string = maybeString; //err (写这个文章的真不是傻逼？还说是error，最后发现是自己傻逼，因为在tsconfig.json关闭了strictNullChecks)
  // const ignoreUndefinedAndNull: string = maybeString!; //非空断言警报
}
// 2.2 调用函数是忽略undefined类型
type NumGenerator = () => number;

function func(numGenerator: NumGenerator | undefined) {
  // Object is possibly 'undefined'
  // cannot invoke an object which is possibly 'undefined'
  //const num1 = numGenerator(); //err
  // const num2 = numGenerator!(); //非空断言警报
}
// 3 确定赋值断言
let x: number;
// console.log(2 * x); //在赋值前使用了变量'x'
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
