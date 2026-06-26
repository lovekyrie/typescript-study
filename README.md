# TypeScript 学习仓库

个人 TypeScript 学习笔记与示例代码，当前精确锁定 **TypeScript 7.0.1-rc**（2026-06）。

## 目录结构

| 目录 | 说明 |
|------|------|
| `ts-base/` | 主项目：Webpack + Babel 转译，浏览器端演示 |
| `ts-babel/` | Babel 转译 TypeScript 的独立示例 |
| `docs/` | 学习笔记：`learning/` 按日记录，`knowledge/` 按主题沉淀 |

### ts-base 源码分区

| 路径 | 内容 |
|------|------|
| `src/part1.base/` | 基础语法：类型、类、接口、泛型、枚举、兼容性等 |
| `src/part2.project/` | 工程化：模块、声明合并、.d.ts、tsconfig、项目引用 |
| `src/juejin/` | 进阶类型体操练习 |
| `src/ts-book/` | 书籍配套片段 |
| `src/article/` | 文章配套片段 |

## 快速开始

```bash
cd ts-base
npm install
npm run type-check   # 全量类型检查
npm start            # 开发服务器
npm run build        # 生产构建
```

```bash
cd ts-babel
npm install
npm run type-check
npm run build
```

## 升级说明（4.x → 6.x，当前 7 RC）

本仓库当前使用 TypeScript 7 RC；下列 tsconfig 与语法修复主要来自 4.x → 6.x 迁移过程。

### 依赖

- `typescript`: `^4.5` / `^4.1` → **`7.0.1-rc`**
- `@types/node`: 升级至 22.x
- `ts-loader`: TS 7 RC 包不再提供经典 TypeScript JS API，`ts-base` 的 Webpack 转译改为本地 Babel loader
- Babel 插件名更新：`proposal-*` → `transform-*`（见 `ts-babel/.babelrc`）

### tsconfig 主要变化（`ts-base/tsconfig.json`）

- `target`: ES2017 → **ES2020**
- `lib`: `es7` → **ES2020 + DOM**
- `moduleResolution`: `node` → **`bundler`**（配合 Webpack）
- 新增 `isolatedModules`、`skipLibCheck`
- 子目录 `05.tsconfig`、`06.tsconfig`、`07.project-reference` 从根检查中排除，各自独立配置

### 语法与类型修复

| 项 | 处理方式 |
|----|----------|
| `import "./x.ts"` | 去掉 `.ts` 扩展名 |
| 数字枚举赋任意数字 | 改用成员或 `as E` 并加注释说明 |
| `export =` / `import = require` | 改为 `export default` / `import` |
| 全局脚本 + `namespace` + `isolatedModules` | 文件顶部加 `export {}` |
| Node `module`/`require` | 文件顶部 `/// <reference types="node" />` |
| 泛型 `const arr = []` 推断为 `never[]` | 显式 `const arr: T[] = []` |
| `interface A` 与 `class A` 跨文件合并 | 相关文件改为模块（`export {}`） |

### 脚本

- `webpack-dev-server` → `webpack serve`（Webpack 5 推荐写法）

## 文档

| 文档 | 内容 |
|------|------|
| [docs/learning/INDEX.md](docs/learning/INDEX.md) | 学习问答日志索引 |
| [docs/knowledge/tooling/webpack-transpile.md](docs/knowledge/tooling/webpack-transpile.md) | Webpack 打包、Babel 转译、与 TypeScript 类型检查 |

## 学习建议

1. 从 `part1.base` 按文件名顺序阅读，每个文件顶部有主题说明。
2. 故意写错的示例（如 `*-incorrect.ts`）对比正确写法。
3. 修改代码后执行 `npm run type-check` 观察编译器提示。

## ESLint

使用 [@antfu/eslint-config](https://github.com/antfu/eslint-config)（Flat Config，`eslint.config.mjs`）。

注意：当前 `@typescript-eslint` 仍依赖经典 TypeScript 包入口，在 TypeScript 7 RC 下会在加载阶段失败；待上游支持后再恢复 `npm run lint`。

```bash
npm run lint       # 检查 src
npm run lint:fix   # 自动修复
```

学习向示例已放宽部分规则（`namespace`、`no-console`、显式 `any` 演示等）；`datatype.ts` 单独关闭 `ts/no-explicit-any`。

## 备注

- 根目录 `enum.ts` 在 `index.ts` 中被导入，启动 dev 时会在控制台打印枚举演示输出。
- 类型检查以 `tsc` 为准；打包时 Webpack 通过 Babel 去除 TypeScript 语法（详见 [docs/knowledge/tooling/webpack-transpile.md](docs/knowledge/tooling/webpack-transpile.md)）。
