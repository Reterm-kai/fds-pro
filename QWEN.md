# QWEN.md - fds-pro 项目上下文

## 项目概述

**fds-pro** 是一个使用 TypeScript 和 Vite 构建的现代化 React 应用程序。这是一个功能齐全的 Web 应用程序，遵循原子设计模式，具有清晰的架构，将关注点分离到不同层次（实体、功能、共享、组件、页面、应用）。项目使用 Mantine UI 库作为组件，并在开发过程中包含模拟服务工作线程（MSW）用于 API 模拟。

### 关键技术与库

- **框架**: React 19 + TypeScript
- **构建工具**: Vite（使用 rolldown-vite）
- **UI 库**: Mantine 8.x（包含核心、表单、钩子、模态框和通知）
- **路由**: React Router DOM v7
- **状态管理**: TanStack Query（React Query）用于服务器状态管理
- **图标**: Tabler Icons React
- **测试**: Vitest + React Testing Library + Storybook
- **样式**: CSS 模块，PostCSS 配合 Mantine 预设
- **模拟**: MSW（模拟服务工作线程）

### 架构与文件结构

项目遵循受清洁架构启发的基于功能的架构：

```
src/
├── app/                    # 应用级配置
│   ├── layouts/            # 布局组件（AppLayout）
│   └── providers/          # 应用程序提供者（AppProviders）
├── entities/               # 业务实体和类型定义
├── features/               # 功能特定的组件、钩子和逻辑
├── pages/                  # 页面级组件
├── shared/                 # 可重用的工具、UI 组件和配置
│   ├── api/                # API 客户端和工具
│   ├── config/             # 全局配置
│   ├── mock/               # MSW 模拟处理器
│   ├── ui/                 # 共享 UI 组件
│   └── navigation/         # 导航功能
├── widgets/                # 展示组件（头部、导航栏）
└── test/                   # 测试设置和工具
```

### 主要功能

1. **用户管理**: 完整的用户 CRUD 操作，支持搜索、过滤和分页
2. **响应式布局**: Mantine AppShell 配合可折叠侧边栏和响应式设计
3. **API 集成**: 结构化的 API 客户端，带有错误处理和响应格式化
4. **状态管理**: TanStack Query 用于服务器状态，具有自动缓存失效功能
5. **模拟 API**: MSW 用于开发期间的客户端 API 模拟
6. **测试设置**: Vitest 配置与 JSDOM 环境
7. **UI 组件**: 主题切换、占位组件和可重用 UI 元素

### 构建和运行

#### 开发命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 运行测试
pnpm test          # 在观察模式下运行测试
pnpm test:run      # 运行一次测试
pnpm test:ui       # 带 UI 运行测试
pnpm test:coverage # 生成覆盖率报告

# 检查和格式化
pnpm lint          # 运行 ESLint
pnpm format        # 使用 Prettier 格式化文件
pnpm format:check  # 检查格式化

# Storybook
pnpm storybook            # 启动 Storybook
pnpm build-storybook      # 构建 Storybook

# 预览生产构建
pnpm preview
```

#### 环境变量

- `VITE_API_BASE_URL`: API 调用的基本 URL（默认为 '/api'，在开发环境中被代理）

### 开发约定

1. **路径别名**: 使用 `@/` 引用 `src/` 目录（例如 `@/entities/user`）
2. **组件结构**: 遵循原子设计原则（实体、功能、页面、共享）
3. **测试**: 使用 Vitest 和 React Testing Library 为组件和钩子编写测试
4. **类型安全**: 所有组件和函数都使用 TypeScript 严格类型化
5. **状态管理**: 使用 TanStack Query 进行服务器状态管理，使用 React 钩子进行本地状态管理
6. **API 调用**: 使用 `@/shared/api/client.ts` 中的集中式 API 客户端
7. **国际化**: 组件文本首先使用中文，但可以进行国际化

### 关键实现细节

1. **API 客户端**: `@/shared/api/client.ts` 提供统一的 HTTP 请求接口，具有自动错误处理、响应格式化和错误类型。

2. **查询键**: `@/entities/user/model/keys.ts` 文件实现了 TanStack Query 的"查询键"模式，确保一致的缓存失效。

3. **模拟服务**: MSW 配置为在开发模式下拦截 API 调用，允许在没有后端服务器的情况下进行开发。

4. **主题支持**: 应用程序支持自动、浅色和深色主题，配有主题切换组件。

5. **用户管理**: 完整实现，包含列表、创建、编辑、删除操作，具有适当的错误处理和通知。

### 测试设置

- **Vitest** 与 JSDOM 环境进行 DOM 测试
- **React Testing Library** 进行组件测试
- **Storybook** 用于组件开发和文档
- **设置文件** 在 `src/test/setup.ts` 中扩展 Jest 匹配器

### 项目配置

- **TypeScript**: 启用严格模式，配有路径别名和 JSX 转换
- **ESLint**: 类型感知的 linting，具有推荐和样式规则
- **Prettier**: 项目范围内一致的代码格式化
- **PostCSS**: 配置了 Mantine 预设和简单变量支持
- **Vite**: 路径别名、React 插件和开发服务器配置

### 重要文件

- `vite.config.ts`: 带有路径别名的 Vite 配置
- `tsconfig.app.json`: 应用代码的 TypeScript 配置
- `eslint.config.js`: 带有 React 和 TypeScript 规则的 ESLint 配置
- `src/app/providers/AppProviders.tsx`: 主应用程序提供者设置
- `src/app/routes/router.tsx`: 应用程序路由配置
- `src/entities/user/model/types.ts`: 用户实体类型定义
- `src/shared/api/client.ts`: API 客户端实现
- `src/features/user-management/api/useUsers.ts`: 用户 API 钩子

### 语言说明

任务和交互将使用简体中文进行。

### 任务流程

1、根据需求进行分析
2、分析后输出任务步骤
3、根据步骤逐步完成
4、检查修改后的正确性
