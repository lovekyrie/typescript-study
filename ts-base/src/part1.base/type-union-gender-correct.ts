/**
 * 字面量联合类型：限制参数只能是若干固定字符串之一
 */
let setGenderCorrect = (gender: "male" | "female" | "other"): void => {
  // ...
};

// setGenderCorrect("true"); // 编译错误：不是合法字面量
