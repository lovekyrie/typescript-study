/**
 * 类型断言（正确用法）：当比编译器更了解实际类型时使用 as / 尖括号
 * 注意：断言不做运行时转换，错误断言会导致运行时异常
 */
export {};

let getStuff = (type: string): unknown => {
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
let isApplePie = getStuff("boolean") as boolean;

// 断言后按目标类型使用（需自己保证正确）
console.log((apple as number).toFixed(2)); // 演示：实际 apple 是 string，运行时会错
console.log((<string>pi).toUpperCase());
