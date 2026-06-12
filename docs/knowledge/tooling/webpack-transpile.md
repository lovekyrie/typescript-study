# Webpack 打包与 TypeScript 转译

> Related source: [ts-base/build/webpack.base.config.js](../../../ts-base/build/webpack.base.config.js)、[ts-base/tsconfig.json](../../../ts-base/tsconfig.json)、[ts-babel/.babelrc](../../../ts-babel/.babelrc)

## Meaning

前端工程里「把 TypeScript 变成浏览器能跑的 JavaScript」通常分两条线：

| 职责 | 典型工具 | 产出 |
|------|----------|------|
| **转译**（去类型、降级语法、处理模块） | tsc / ts-loader、Babel | `.js` 或打包 bundle |
| **类型检查**（编译期报错，运行时不存在） | `tsc --noEmit` | 无文件，仅诊断 |

**Webpack** 负责模块图、打包、压缩、注入 HTML 等；**ts-loader** 或 **babel-loader** 只负责「遇到 `.ts` 时怎么变成 JS 模块」这一环。

### ts-loader 做什么

`ts-loader` 是 Webpack 与 **TypeScript 官方编译器**之间的桥：对每个 `.ts` 调用 tsc 的转译能力，把结果交给 Webpack 继续打包。

| `transpileOnly` | 行为 |
|-----------------|------|
| `false`（默认） | 转译 + 类型检查（打包变慢） |
| `true` | 只转译，类型检查另跑 `tsc` |

转译本身包括：擦除类型与 `interface`、按 `target` 做语法处理、产出 ES 模块供 Webpack 合并。

### Babel 能否替代

能。常见链路：

```text
Webpack → babel-loader → @babel/preset-typescript（剥类型）
                      → @babel/preset-env（按目标环境转语法）
```

Babel **不做**类型检查；类型仍由 `tsc` 负责。与 `ts-loader + transpileOnly` 的分工类似。

### ts-loader（tsc）与 Babel

| | ts-loader / tsc | Babel |
|--|-----------------|-------|
| 实现 | TS 官方编译器 | Babel + preset |
| 类型检查 | 可内置；常拆到 `tsc` | 无 |
| 新 TS 特性 | 与 TS 版本同步 | 依赖插件，可能滞后 |
| 场景 | TS 项目默认 | 统一 Babel 管线、多框架模板 |

### tsconfig 与 `noEmit`

- `target` / `module` / `moduleResolution` 影响转译结果与模块解析。
- `noEmit: true` 约束**直接运行 `tsc`** 不写磁盘；ts-loader 仍可在**内存**中 emit 给 Webpack，二者不矛盾。

## In This Project

### 打包流程（ts-base）

```text
src/index.ts
  → Webpack 解析 import 图
  → .ts 命中 ts-loader（transpileOnly: true）
  → 内存中的 JS 模块
  → 合并/压缩 → 产出 app.js + index.html
```

```js
// ts-base/build/webpack.base.config.js
{
  loader: "ts-loader",
  options: { transpileOnly: true },
}
```

| 命令 | 作用 |
|------|------|
| `npm run type-check` | `tsc --noEmit`，全量类型检查 |
| `npm run build` / `npm start` | Webpack + ts-loader，只转译打包 |

当前 [tsconfig.json](../../../ts-base/tsconfig.json) 要点：`target: ES2020`、`module: ESNext`、`moduleResolution: bundler`、`noEmit: true`。最终输出目录由 Webpack `output` 决定，不是 `outDir`。

### 对照子项目（ts-babel）

```text
ts-babel/
  npm run build      → babel src → dist（转译）
  npm run type-check → tsc --noEmit（类型）
```

若要改成 babel-loader 打包，可参考 [ts-babel/.babelrc](../../../ts-babel/.babelrc)，在 Webpack 中替换 loader，并保留 `type-check` 脚本。

### 常见问题

**`noEmit: true` 为何还能打出 bundle？**  
约束的是 CLI 版 `tsc`；ts-loader 走编译器 API，在内存里拿 JS。

**开发时谁重新编译？**  
`webpack serve` 监听变更，变更的 `.ts` 再次经 ts-loader 转译（热更新取决于 devServer 配置）。

## 相关文件

| 路径 | 说明 |
|------|------|
| `ts-base/build/webpack.base.config.js` | ts-loader 规则 |
| `ts-base/tsconfig.json` | 编译选项 |
| `ts-base/package.json` | `type-check` / `build` |
| `ts-babel/.babelrc` | Babel 预设 |
