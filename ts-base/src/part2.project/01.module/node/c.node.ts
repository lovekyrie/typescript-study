/**
 * CommonJS 与 ESM 混用示例（c.node.ts）
 *
 * Node 中可同时使用：
 * - require()：同步加载 CommonJS 模块，得到 module.exports
 * - import：静态 ESM 语法，编译/加载行为由 module 配置决定
 *
 * require("../es6/a") 得到的是编译后的模块对象，default 对应 export default。
 */

/// <reference types="node" />

// ========== require 加载 CJS 模块 ==========
let c1 = require("./a.node");
let c2 = require("./b.node");

// ========== require 加载 ESM 编译产物 ==========
// 命名导出在 exports 上，default 在 .default 属性
let c3 = require("../es6/a");

// ========== import 加载 ESM 默认导出 ==========
import c4 from "../es6/d";

console.log(c1);
console.log(c2);
console.log(c3);
c3.default();
c4();
