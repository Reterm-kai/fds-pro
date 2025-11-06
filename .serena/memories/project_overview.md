# 项目概览

## 项目名称

fds-pro - 基于 React 19 + TypeScript 的现代前端项目

## 技术栈

- **React**: 19.1.1
- **TypeScript**: 5.9.3 (严格模式)
- **构建工具**: rolldown-vite 7.1.14
- **UI框架**: Mantine 8.3.6
- **路由**: React Router 7.9.5
- **状态管理**: TanStack Query 5.90.7
- **测试**: Vitest 4.0.7 + Testing Library 16.3.0
- **包管理器**: pnpm

## 项目结构

采用 Feature-Sliced Design 架构：

- `src/app/` - 应用配置和布局
- `src/pages/` - 页面组件 (login, register, dashboard, users, settings)
- `src/widgets/` - 复杂UI组件 (app-shell)
- `src/features/` - 功能模块 (user-management)
- `src/entities/` - 业务实体 (user)
- `src/shared/` - 共享资源 (ui, api, hooks, navigation, mock)

## 已实现功能

- 用户管理界面
- Mock API 数据模拟
- 主题切换
- 应用布局和导航
- 登录/注册页面 (部分实现)
