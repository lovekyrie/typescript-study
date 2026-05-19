/**
 * ES Module 默认导出（d.ts）
 *
 * 仅包含 default export，供 Node 侧 c.node.ts 用 `import c4 from "../es6/d"` 演示
 * CommonJS（require）与 ESM（import）混用场景。
 */

// ========== 默认导出函数 ==========
export default function() {
  console.log("I'm default.");
}
// export let a=1  // 若取消注释则与 default 共存，模块同时有命名导出与默认导出
