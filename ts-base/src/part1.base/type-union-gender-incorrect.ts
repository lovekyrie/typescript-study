/**
 * 对比：用 string 无法在编译期拦住非法值，只能运行时 throw
 */
let setGender = (gender: string): void | never => {
  if (gender !== "male" && gender !== "female" && gender !== "other") {
    throw new Error("Please provide a correct gender.");
  }
  // ...
};

setGender("true"); // 编译通过，运行时才报错
