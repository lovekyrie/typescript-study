/**
 * Node.js CommonJS 导出示例（a.node.ts）
 *
 * CommonJS 使用 module.exports / exports 暴露模块内容。
 * - module.exports：模块的真实导出对象，赋值即整个模块的导出
 * - exports：最初指向 module.exports，适合挂载属性；若整体替换应写 module.exports = ...
 *
 * /// <reference types="node" /> 引入 @types/node，获得 require、module 等类型。
 */

/// <reference types="node" />

// ========== module.exports 整体导出 ==========
let a = {
  x: 1,
  y: 2,
};

module.exports = a;
