/**
 * tsconfig「文件包含」示例入口（index.ts）
 *
 * 所在目录 05.tsconfig 的 tsconfgi.base.json 使用：
 * - files：显式列出 src/a.ts
 * - include：匹配 src/*（本文件会被包含）
 * - exclude：排除 src/libs（libs/lib.ts 不参与编译）
 *
 * 用于理解 files / include / exclude 的优先级与范围差异。
 */

let hello: string = "Hello Typescript";
