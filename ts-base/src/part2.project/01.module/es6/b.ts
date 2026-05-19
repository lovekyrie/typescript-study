/**
 * ES Module 基础导出（b.ts）
 *
 * 最简单的命名导出：export const。
 * 被 a.ts 通过 `export { str as hello } from "./b"` 重新导出给外部使用。
 */

// ========== 命名导出变量 ==========
export const str = "hello";
