/**
 * ES Module 导入示例（c.ts）
 *
 * 演示从 a.ts 导入的各类语法：
 * - 解构命名导入、类型导入、导入别名
 * - 命名空间导入（import * as）
 * - 默认导入（无花括号）
 *
 * 注意：类型（如 P）在编译后不存在，仅用于静态类型检查。
 */

// ========== 解构命名导入 ==========
import { a, b, c } from "./a";

// ========== 类型导入 ==========
// 可写 import type { P } from "./a"；此处与普通 import 混用，仅 P 作类型使用
import { P } from "./a";

// ========== 导入时取别名 ==========
// 本地名 F 对应 a.ts 中的 f
import { f as F } from "./a";

// ========== 命名空间导入 ==========
// All 为模块命名空间对象，包含所有命名导出（不含 default，default 需单独 import）
import * as All from "./a";

// ========== 默认导入 ==========
// 对应 a.ts 的 export default，本地名可任意（此处 myFunction）
import myFunction from "./a";

console.log(a, b, c);

// ========== 使用导入的类型 ==========
const p: P = {
  x: 1,
  y: 2,
};

console.log(All);

myFunction();
