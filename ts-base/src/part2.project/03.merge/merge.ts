/**
 * 声明合并（Declaration Merging）
 *
 * TypeScript 允许同名声明在类型层面合并，常见于：
 * - interface：多次声明合并为一个接口（成员累加）
 * - namespace + class / function / enum：为值附加静态或命名空间成员
 * - 函数重载：同名函数多个调用签名合并为 overload
 *
 * export {} 将文件视为模块，避免全局污染并与其它示例一致。
 */

export {};

// ========== interface 合并 ==========
// 两个 interface A 会合并，需同时满足 x、y 及所有 foo 重载签名
interface A {
  x: number;
  foo(bar: number): number;
  foo(bar: "a"): string;
}

interface A {
  y: number;
  foo(bar: string): string;
  foo(bar: number[]): number[];
  foo(bar: "b"): string;
}

let mergeA: A = {
  x: 1,
  y: 1,
  foo(bar: any) {
    return 1 as any;
  },
};

// ========== class + namespace 合并 ==========
// 类 C 是运行时值；namespace C 为其附加静态属性 state
class C {}
namespace C {
  export let state = 1;
}
console.log(C.state);

// ========== function + namespace 合并 ==========
function Lib() {}
namespace Lib {
  export let version = "1.0";
}
console.log(Lib.version);

// ========== enum + namespace 合并 ==========
// 枚举成员与 namespace 内扩展（如 mix）共存，用于增强枚举能力
enum Color {
  Red,
  Yellow,
  Blue,
}
namespace Color {
  export function mix() {}
}
console.log(Color);
