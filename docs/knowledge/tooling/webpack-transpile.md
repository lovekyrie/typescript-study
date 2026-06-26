# Webpack 打包与 TypeScript 转译

> Related source: [ts-base/build/webpack.base.config.js](../../../ts-base/build/webpack.base.config.js)、[ts-base/tsconfig.json](../../../ts-base/tsconfig.json)、[ts-babel/.babelrc](../../../ts-babel/.babelrc)

## Meaning

前端工程里「把 TypeScript 变成浏览器能跑的 JavaScript」通常分两条线：

| 职责 | 典型工具 | 产出 |
|------|----------|------|
| **转译**（去类型、降级语法、处理模块） | TypeScript loader、Babel | `.js` 或打包 bundle |
| **类型检查**（编译期报错，运行时不存在） | `tsc --noEmit`（TS 7 RC 原生编译器） | 无文件，仅诊断 |

**Webpack** 负责模块图、打包、压缩、注入 HTML 等；TypeScript loader 或 Babel loader 只负责「遇到 `.ts` 时怎么变成 JS 模块」这一环。

### 旧链路中的 ts-loader 做什么

`ts-loader` 是 Webpack 与经典 TypeScript 编译器 API 之间的桥：对每个 `.ts` 调用编译器转译能力，把结果交给 Webpack 继续打包。TypeScript 7 RC 的 Go 原生包暂不适合继续接这条链路。

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

Babel **不做**类型检查；类型仍由 TypeScript 7 RC 原生编译器负责。与旧链路中 `ts-loader + transpileOnly` 的分工类似。

### TypeScript loader 与 Babel

| | TypeScript loader | Babel |
|--|-----------------|-------|
| 实现 | TS 官方编译器 | Babel + preset |
| 类型检查 | 可内置；常拆到 `tsc` | 无 |
| 新 TS 特性 | 与 TS 版本同步 | 依赖插件，可能滞后 |
| 场景 | TS 项目默认 | 统一 Babel 管线、多框架模板 |

### tsconfig 与 `noEmit`

- `target` / `module` / `moduleResolution` 影响转译结果与模块解析。
- `noEmit: true` 约束**直接运行 TS 7 RC 原生编译器**不写磁盘；Webpack 打包可以走独立转译链路，二者不矛盾。

## In This Project

### 打包流程（ts-base）

```text
src/index.ts
  → Webpack 解析 import 图
  → .ts 命中本地 Babel loader
  → @babel/preset-typescript 剥离类型
  → JS 模块
  → 合并/压缩 → 产出 app.js + index.html
```

```js
// ts-base/build/webpack.base.config.js
{
  loader: path.resolve(__dirname, "babel-typescript-loader.js"),
}
```

| 命令 | 作用 |
|------|------|
| `npm run type-check` | `tsc --noEmit`，全量类型检查；在 `typescript@7.0.1-rc` 下实际调用 Go 原生编译器 |
| `npm run build` / `npm start` | Webpack + Babel，只转译打包 |

当前 [tsconfig.json](../../../ts-base/tsconfig.json) 要点：`target: ES2020`、`module: ESNext`、`moduleResolution: bundler`、`noEmit: true`。最终输出目录由 Webpack `output` 决定，不是 `outDir`。

### 对照子项目（ts-babel）

```text
ts-babel/
  npm run build      → babel src → dist（转译）
  npm run type-check → tsc --noEmit（类型，TS 7 RC 原生编译器）
```

若要改成 babel-loader 打包，可参考 [ts-babel/.babelrc](../../../ts-babel/.babelrc)，在 Webpack 中替换 loader，并保留 `type-check` 脚本。

### 常见问题

**`noEmit: true` 为何还能打出 bundle？**  
约束的是 TypeScript 7 RC 原生编译器；Webpack 走 Babel 转译链路，在内存里拿 JS。

**开发时谁重新编译？**  
`webpack serve` 监听变更，变更的 `.ts` 再次经本地 Babel loader 转译（热更新取决于 devServer 配置）。

## 相关文件

| 路径 | 说明 |
|------|------|
| `ts-base/build/webpack.base.config.js` | Webpack 转译规则 |
| `ts-base/build/babel-typescript-loader.js` | 本地 Babel TypeScript loader |
| `ts-base/tsconfig.json` | 编译选项 |
| `ts-base/package.json` | `type-check` / `build` |
| `ts-babel/.babelrc` | Babel 预设 |
