// 不好的使用方式演示
try {
  throw "Something bad happened";
} catch (e) {
  console.log(e);
}
// 原始字符串会导致极差的调试体验，并且在分析日志时，将会变得错综复杂。

//优雅的捕获错误
function runTask1() {}
function runTask2() {}
try {
  const foo = runTask1();
} catch (e) {
  console.log(`Error:${e}`);
}

try {
  const bar = runTask2();
} catch (e) {
  console.log(`Error:${e}`);
}

//没有在类型系统上更好的表示
function validate(value: number) {
  if (value < 0 || value > 100) {
    throw new Error("Invalid value");
  }
}

//上例中Error并不是一个好的主意。因为没有用来验证函数的类型定义
function validateP(value: number): { error?: string } {
  if (value < 0 || value > 100) {
    return { error: "Invalid value" };
  }
}

// TIP：除非你想用非常通用的try/catch的方式处理错误，否则不要抛出错误。
