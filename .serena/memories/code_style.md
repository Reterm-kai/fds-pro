# 代码风格和约定

## Prettier 配置

- 单引号: true
- 无分号: true
- 2 空格缩进
- 行宽: 80
- 尾随逗号: es5
- 箭头函数参数: 单参数省略括号
- 换行符: LF

## TypeScript 规则

- 严格模式启用
- 禁止未使用的局部变量和参数
- 必须明确导入/导出语法
- 避免使用 `any` 类型

## 命名约定

- 组件: PascalCase (如 `UserForm`, `ThemeToggle`)
- 函数/变量: camelCase
- 常量: UPPER_SNAKE_CASE
- 文件: 组件用 PascalCase, 其他用 camelCase

## 组件规范

- 使用函数组件和 React Hooks
- 每个组件配备测试文件 `*.test.tsx`
- 可复用组件创建 Story 文件 `*.stories.tsx`
- 使用 index.ts 导出公共 API

## 测试规范

- 使用 `screen` 查询元素 (推荐 `getByRole`)
- 使用 `userEvent` 模拟用户交互
- 测试覆盖主要功能和边界条件
