import { a, b, c } from "./a";
import { P } from "./a"; //导入接口
import { f as F } from "./a"; //导入时取别名
import * as All from "./a"; //导入模块中的所有成员在All上
import myFunction from "./a"; //不加{},默认导入

console.log(a, b, c);

let p: P = {
  x: 1,
  y: 2,
};

console.log(All);

myFunction();
