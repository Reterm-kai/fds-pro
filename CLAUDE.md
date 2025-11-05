# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 React 19 + TypeScript + Vite 的现代前端项目，使用 rolldown-vite 作为构建工具以提升性能。

## 开发命令

### 核心命令

- `pnpm dev` - 启动开发服务器，支持 HMR（热模块替换）
- `pnpm build` - 构建生产版本（先执行类型检查 `tsc -b`，再执行 `vite build`）
- `pnpm preview` - 预览生产构建

### 代码质量

- `pnpm lint` - 运行 ESLint 代码检查
- `pnpm format` - 格式化所有代码（使用 Prettier）
- `pnpm format:check` - 检查代码格式是否符合规范（不修改文件）

### 测试

- `pnpm test` - 运行 Vitest 测试（watch 模式）
- `pnpm test:run` - 运行测试一次（CI 模式）
- `pnpm test:ui` - 启动 Vitest UI 界面
- `pnpm test:coverage` - 运行测试并生成覆盖率报告

### Storybook

- `pnpm storybook` - 启动 Storybook 开发服务器（端口 6006）
- `pnpm build-storybook` - 构建 Storybook 静态文件

### 包管理

- 本项目使用 **pnpm** 作为包管理器
- 安装依赖：`pnpm install`

## 技术栈

- **React**: 19.1.1（最新版本，支持最新特性）
- **TypeScript**: 5.9.3（严格模式已启用）
- **构建工具**: rolldown-vite 7.1.14（Vite 的高性能替代品）
- **代码质量**:
  - **ESLint**: 9.36.0（Flat Config 配置方式）
  - **Prettier**: 3.6.2（代码格式化）
- **测试**:
  - **Vitest**: 4.0.7（单元测试框架）
  - **Testing Library**: React 16.3.0（React 组件测试）
  - **jsdom**: 27.1.0（DOM 环境模拟）
- **组件开发**:
  - **Storybook**: 10.0.4（组件文档和开发环境）
  - **Storybook 插件**: a11y（无障碍检查）、vitest（测试集成）

## 架构特点

### TypeScript 配置

项目使用项目引用（Project References）模式：

- `tsconfig.json` - 根配置，引用子配置
- `tsconfig.app.json` - 应用代码配置（src/ 目录）
- `tsconfig.node.json` - Node.js 环境配置（配置文件）

关键编译选项：

- `strict: true` - 启用所有严格类型检查
- `noUnusedLocals: true` - 禁止未使用的局部变量
- `noUnusedParameters: true` - 禁止未使用的参数
- `verbatimModuleSyntax: true` - 强制明确的导入/导出语法
- `jsx: "react-jsx"` - 使用 React 17+ 的新 JSX 转换

### ESLint 配置

使用 Flat Config 格式（`eslint.config.js`）：

- 扩展了 `@eslint/js` 推荐配置
- 集成 TypeScript ESLint 推荐规则
- 启用 React Hooks 最新推荐规则
- 配置 React Refresh 插件支持 Vite HMR
- 集成 `eslint-config-prettier` 避免与 Prettier 冲突

### Prettier 配置

代码格式化规则（`.prettierrc`）：

- **单引号**: `singleQuote: true`
- **无分号**: `semi: false`
- **2 空格缩进**: `tabWidth: 2`
- **尾随逗号**: `trailingComma: "es5"`（仅在 ES5 支持的地方）
- **行宽**: `printWidth: 80`
- **箭头函数参数**: `arrowParens: "avoid"`（单参数时省略括号）
- **换行符**: `endOfLine: "lf"`（使用 LF）

ESLint 与 Prettier 已正确集成，避免规则冲突。

### Vitest 配置

测试框架配置（`vitest.config.ts`）：

- **全局 API**: `globals: true`（无需导入 describe、it、expect 等）
- **测试环境**: `environment: 'jsdom'`（浏览器环境模拟）
- **设置文件**: `setupFiles: './src/test/setup.ts'`（扩展 Testing Library 断言）
- **CSS 支持**: `css: true`（支持测试中的 CSS 导入）

测试文件命名约定：

- `*.test.tsx` 或 `*.test.ts` - 单元测试
- `*.spec.tsx` 或 `*.spec.ts` - 规格测试

### Storybook 配置

组件文档和开发环境（`.storybook/`）：

- **框架**: React + Vite 集成
- **端口**: 6006（默认）
- **插件**:
  - `@storybook/addon-docs` - 自动生成文档
  - `@storybook/addon-a11y` - 无障碍性检查
  - `@storybook/addon-vitest` - Vitest 集成
  - `@storybook/addon-onboarding` - 新手引导

Story 文件命名约定：

- `*.stories.tsx` 或 `*.stories.ts` - 组件故事
- 放置在 `src/stories/` 或与组件同目录

### 项目结构

```
src/
├── App.tsx          - 主应用组件
├── App.test.tsx     - App 组件测试
├── App.stories.tsx  - App 组件 Story
├── App.css          - 应用样式
├── main.tsx         - 应用入口（使用 StrictMode）
├── index.css        - 全局样式
├── test/
│   └── setup.ts     - Vitest 测试设置
├── stories/         - Storybook 示例组件
└── assets/          - 静态资源

.storybook/          - Storybook 配置
├── main.ts          - 主配置
└── preview.ts       - 预览配置
```

### Vite 配置

- 使用 `@vitejs/plugin-react` 插件，支持 Babel 快速刷新
- rolldown-vite 通过 pnpm overrides 强制替换标准 Vite
- 配置文件：`vite.config.ts`

## 开发注意事项

### 代码格式化

- 提交代码前运行 `pnpm format` 格式化所有代码
- 建议配置编辑器自动保存时格式化（如 VS Code 的 "Format On Save"）
- CI/CD 流程中可使用 `pnpm format:check` 检查格式

### 添加新组件时

- 使用函数组件和 React Hooks
- 严格遵守 TypeScript 类型定义，避免使用 `any`
- 遵循 ESLint 规则，特别是 React Hooks 的依赖数组规则
- 代码必须符合 Prettier 格式规范
- 为每个组件编写测试文件（`*.test.tsx`）
- 为可复用组件创建 Story 文件（`*.stories.tsx`）

### 测试开发

- 使用 Vitest + Testing Library 编写测试
- 测试应覆盖主要功能和用户交互
- 使用 `screen` 查询元素（推荐 `getByRole`、`getByText` 等语义化查询）
- 使用 `userEvent` 模拟用户交互（推荐优于 `fireEvent`）
- 运行 `pnpm test:ui` 可视化调试测试

### Storybook 开发

- 为每个可复用组件创建 Story
- 使用 CSF 3.0 格式（Component Story Format）
- 添加 `autodocs` 标签自动生成文档
- 利用 a11y 插件检查组件的无障碍性
- Story 应展示组件的不同状态和用例

### 样式处理

- 支持 CSS 模块和普通 CSS
- 当前使用常规 CSS 文件（`.css`）

### 类型安全

- 所有未使用的变量和参数会被编译器报错
- 使用 `verbatimModuleSyntax` 确保导入/导出语法明确
- 启用了 `noUncheckedSideEffectImports` 防止副作用导入问题

### 构建优化

- rolldown-vite 提供更快的构建速度和更好的性能
- 生产构建前会先运行 TypeScript 类型检查（`tsc -b`）

## 扩展建议

### ESLint 增强（来自 README）

生产环境建议启用类型感知的 lint 规则：

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      // 或使用更严格的规则
      tseslint.configs.strictTypeChecked,
      // 可选：样式规则
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

可选安装 React 专用 lint 插件：

- `eslint-plugin-react-x`
- `eslint-plugin-react-dom`
