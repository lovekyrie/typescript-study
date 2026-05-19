/**
 * tsconfig files 显式列入的源文件（a.ts）
 *
 * 在 tsconfgi.base.json 的 "files": ["src/a.ts"] 中被点名，
 * 即使其它规则变化，只要在 files 列表中就会参与编译。
 */

let s: string = "config";
