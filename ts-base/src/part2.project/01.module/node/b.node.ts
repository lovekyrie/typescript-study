/**
 * Node.js CommonJS 多成员导出（b.node.ts）
 *
 * 通过 exports.xxx 挂载多个导出属性。
 * 注意：exports 与 module.exports 初始为同一引用；若执行 module.exports = {} 会断开 exports 的关联。
 */

/// <reference types="node" />

// ========== exports 挂载命名导出 ==========
exports.c = 3;
exports.d = 4;
