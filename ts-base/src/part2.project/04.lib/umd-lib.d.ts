/**
 * UMD 库类型声明（umd-lib.d.ts）
 *
 * UMD（Universal Module Definition）运行时兼容：
 * - AMD：define(factory)
 * - CommonJS：module.exports = factory()
 * - 浏览器全局：root.umdLib = factory()
 *
 * 类型侧要点：
 * - export = umdLib：作为模块被 import 时的类型
 * - export as namespace umdLib：允许在「模块文件」内把 umdLib 当全局用
 *   （常配合 compilerOptions.allowUmdGlobalAccess）
 *
 * 实现见 umd-lib.js 的 IIFE 分支判断。
 */

declare namespace umdLib {
  const version: string;
  function doSomething(): void;
}

export as namespace umdLib;

export = umdLib;
