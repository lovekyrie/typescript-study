/**
 * 全局库类型声明（global-lib.d.ts）
 *
 * 无 export / import 的 .d.ts 中顶层 declare 会进入全局作用域。
 * 使用时无需 import，但需确保：
 * - 该 .d.ts 被 tsconfig include 或通过 types/typeRoots 引入
 * - 运行时对应脚本（global-lib.js）已执行，否则运行时报错
 *
 * declare function + declare namespace globalLib 合并：
 * 既可作为函数调用 globalLib(options)，又有 globalLib.version 等属性。
 */

declare function globalLib(options: globalLib.Options): void;

declare namespace globalLib {
  const version: string;
  function doSomething(): void;
  interface Options {
    [key: string]: any;
  }
}
