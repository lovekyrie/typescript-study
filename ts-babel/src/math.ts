/// <reference types="node" />
/** Babel 示例：TS 编写，Babel 转译；此处用 CommonJS 导出 */
function add(x: number, y: number) {
  return x + y;
}

function sub(x: number, y: number) {
  return x - y;
}

module.exports = {
  add,
  sub,
};
