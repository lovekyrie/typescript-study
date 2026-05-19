/**
 * 类型断言（错误示范）：getStuff 返回 any/unknown 时未收窄就调用方法
 * 运行 node 编译结果可见 TypeError，说明断言不能替代真正的类型守卫
 */
let getStuff = (type: string): any => {
  switch (type) {
    case "string":
      return "Apple";
    case "number":
      return 3.1415926;
    case "boolean":
      return false;
  }
};

let apple = getStuff("string");
let pi = getStuff("number");
let isApplePie = getStuff("boolean");

console.log(apple.toFixed(2)); // TypeError: toFixed is not a function
console.log(pi.toUpperCase()); // TypeError
console.log(isApplePie + 1);
