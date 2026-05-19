/**
 * TypeScript 中的错误处理：throw 任意值的问题、try/catch 中 e 为 unknown。
 * 更推荐用返回值/Result 表达失败，让类型系统能检查错误分支。
 */

try {
  throw "Something bad happened";
} catch (e) {
  console.log(e);
}

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

function validate(value: number) {
  if (value < 0 || value > 100) {
    throw new Error("Invalid value");
  }
}

// 返回 { error? } 可在类型上表达「可能失败」，调用方必须处理 error
function validateP(value: number): { error?: string } {
  if (value < 0 || value > 100) {
    return { error: "Invalid value" };
  }
  return {};
}

// 除非需要顶层统一 catch，否则少用 throw 做业务校验
