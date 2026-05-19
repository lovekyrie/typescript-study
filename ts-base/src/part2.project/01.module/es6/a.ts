/**
 * ES Module 导出示例（a.ts）
 *
 * 本文件演示 TypeScript/ES6 模块的多种导出方式：
 * - 命名导出（export const / export { }）
 * - 类型与值的导出（interface、function）
 * - 导出别名（as）
 * - 默认导出（default export）
 * - 重新导出（re-export）外部模块成员
 *
 * 编译后每个 export 会对应运行时的模块绑定，import 方只能读取导出成员，不能随意改写。
 */

// ========== 单独导出 ==========
// export 与声明写在一起，适合只导出一个绑定
export const a = 1;

// ========== 批量导出 ==========
// 先声明再 export { }，适合同一文件内集中导出多个成员
let b = 2;
let c = 3;
export { b, c };

// ========== 导出接口 ==========
// 接口仅存在于类型层，编译后会被擦除，但可被其他模块 import 用于类型检查
export interface P {
  x: number;
  y: number;
}

// ========== 导出函数 ==========
export function f() {}

// ========== 导出时起别名 ==========
// 对外暴露名 G，内部仍叫 g，用于避免命名冲突或隐藏实现细节
function g() {}
export { g as G };

// ========== 默认导出 ==========
// 每个模块最多一个 default；import 时可自定义本地名，不必与导出名一致
export default function () {
  console.log("I'm default");
}

// ========== 重新导出（re-export）==========
// 从 ./b 引入 str 并以 hello 名义再导出，不经过本文件中间变量
export { str as hello } from "./b";
