/**
 * 模块库类型声明（module-lib.d.ts）
 *
 * 对应 CommonJS 实现 module-lib.js（module.exports = moduleLib）。
 *
 * declare function + declare namespace 同名合并：
 * - 调用签名：moduleLib(options)
 * - 命名空间：version、doSomething 等静态成员
 *
 * export = moduleLib
 * - TypeScript 的「导出赋值」，兼容 Node require 与 export =
 * - 消费方用 `import moduleLib from "./module-lib"` 需开启 esModuleInterop
 */

declare function moduleLib(options: Options): void;

interface Options {
  [key: string]: any;
}

declare namespace moduleLib {
  const version: string;
  function doSomething(): void;
}

export = moduleLib;
