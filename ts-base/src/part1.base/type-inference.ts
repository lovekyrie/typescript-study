/**
 * 类型推断：多数从初始化表达式推断；部分场景从左到右（上下文类型）
 */
let aTypeInfer = 1; // number
let b = [1, null, "a"]; // (number | string | null)[]
let c = { x: 1, y: "a" }; // { x: number; y: string }
let d = (x = 1) => x + 1; // (x?: number) => number

/** 上下文类型：左侧期望 KeyboardEvent，右侧参数自动推断 */
window.onkeydown = (event) => {
  // event.button; // MouseEvent 才有 button
};

interface FooTypeInfer {
  bar: number;
}

/** 断言可“告诉”编译器类型，但运行时仍可能不符，慎用 */
let fooInfer: FooTypeInfer = {
  bar: 1,
};
