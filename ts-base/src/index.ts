/**
 * Webpack 入口：演示如何在浏览器中加载 TypeScript 模块
 */
import "./part1.base/enum";

const hello: string = "Hello Typescript";
document.querySelectorAll(".app")[0].innerHTML = hello;
