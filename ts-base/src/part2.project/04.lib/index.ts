/**
 * 第三方库与声明文件用法（index.ts）
 *
 * 演示四类与「类型声明」相关的场景：
 * 1. @types 包（jquery）：通过 typeRoots / types 解析
 * 2. 全局库（global-lib）：无 import，依赖 script 或三斜线引入 .d.ts
 * 3. 模块库（module-lib）：export = 与 import default
 * 4. UMD 库（umd-lib）：同时支持 AMD/CJS/全局，需 export as namespace
 * 5. 模块增强 declare module：为已有包追加类型
 * 6. 全局增强 declare global：扩展全局命名空间
 */

// ========== @types 提供的模块 ==========
import $ from "jquery";

$(".app").css("color", "#f00");

// ========== 全局库（无 import）==========
// 类型来自 global-lib.d.ts，运行时需先加载 global-lib.js
globalLib({ x: 1 });
globalLib.doSomething();

// ========== CommonJS 风格模块库 ==========
import moduleLib from "./module-lib";
moduleLib({ y: 2 });
moduleLib.doSomething();

// ========== UMD 库 ==========
import umdLib from "./umd-lib";
umdLib.doSomething();

// ========== 模块增强（Module Augmentation）==========
// declare module "包名" 为已有模块追加类型，不改变运行时，仅影响 TS 检查
import m from "moment";
declare module "moment" {
  export function myFunction(): void;
}
m.myFunction = () => {};

// ========== 全局增强（Global Augmentation）==========
// 须在模块文件中（本文件有 import 即为模块）；扩展全局 globalLib 命名空间
declare global {
  namespace globalLib {
    function doAnything(): void;
  }
}

globalLib.doAnything = () => {};
