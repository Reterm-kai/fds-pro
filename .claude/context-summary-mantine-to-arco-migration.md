# Mantine 到 Arco Design 迁移上下文摘要

## 任务概述

将项目中的 Mantine UI 全部替换为 Arco Design

## 项目信息

- **框架**: React 19.1.1 + TypeScript 5.9.3
- **构建工具**: rolldown-vite 7.1.14
- **当前 UI 框架**: Mantine 8.3.6
- **目标 UI 框架**: Arco Design (@arco-design/web-react)

## Mantine 依赖包（需要移除）

```json
"@mantine/core": "^8.3.6",
"@mantine/form": "^8.3.6",
"@mantine/hooks": "^8.3.6",
"@mantine/modals": "^8.3.6",
"@mantine/notifications": "^8.3.6"
```

## 样式依赖（需要移除）

```json
"postcss-preset-mantine": "^1.18.0"
```

## 使用 Mantine 的文件清单

### 1. 配置层 (app/)

- **src/app/providers/AppProviders.tsx**: MantineProvider
- **src/app/providers/theme.ts**: createTheme, rem
- **src/app/layouts/AppLayout.tsx**: AppShell, useDisclosure
- **src/app/layouts/AppLayout.test.tsx**: MantineProvider

### 2. 功能层 (features/)

- **src/features/auth/model/AuthProvider.tsx**: LoadingOverlay, Box
- **src/features/auth/ui/LoginForm.tsx**: (待确认)
- **src/features/users/ui/UsersView.tsx**: Title, Alert, Stack, Group, Button, Text
- **src/features/users/ui/UserListTable.tsx**: Table 相关组件
- **src/features/users/ui/UserListFilters.tsx**: Card, Group, TextInput, Select, Button
- **src/features/users/ui/UserForm.tsx**: Modal, TextInput, Select, Button, Group, Stack

### 3. 实体层 (entities/)

- **src/entities/user/ui/UserCard.tsx**: Card, Group, Text, Badge, Stack
- **src/entities/user/ui/UserAvatar.tsx**: Avatar, AvatarProps

### 4. 共享层 (shared/)

- **src/shared/ui/logo/Logo.tsx**: Group, Text
- **src/shared/ui/theme-toggle/ThemeToggle.tsx**: Switch 等组件
- **src/shared/ui/theme-toggle/ThemeToggle.test.tsx**: MantineProvider

### 5. 页面层 (pages/)

- **src/pages/settings/index.tsx**: Title, Text, Paper, Stack, Switch
- **src/pages/dashboard/index.tsx**: Title, Text, SimpleGrid, Paper, Group, ThemeIcon
- **src/pages/register/index.tsx**: 表单相关组件
- **src/pages/login/LoginPage.tsx**: 表单相关组件

### 6. 组件层 (widgets/)

- **src/widgets/app-shell/AppNavbar.tsx**: 导航栏组件
- **src/widgets/app-shell/AppHeader.tsx**: 头部组件

### 7. 配置文件

- **src/main.tsx**: '@mantine/core/styles.css'
- **.storybook/preview.tsx**: MantineProvider, '@mantine/core/styles.css'

## Mantine -> Arco Design 组件映射表

| Mantine 组件    | Arco Design 组件             | 说明          |
| --------------- | ---------------------------- | ------------- |
| MantineProvider | ConfigProvider               | 全局配置      |
| AppShell        | Layout                       | 布局组件      |
| Button          | Button                       | 按钮          |
| TextInput       | Input                        | 文本输入      |
| Select          | Select                       | 下拉选择      |
| Modal           | Modal                        | 模态框        |
| Card            | Card                         | 卡片          |
| Group           | Space                        | 水平布局      |
| Stack           | Space (direction="vertical") | 垂直布局      |
| Title           | Typography.Title             | 标题          |
| Text            | Typography.Text              | 文本          |
| Badge           | Badge                        | 徽标          |
| Avatar          | Avatar                       | 头像          |
| Table           | Table                        | 表格          |
| Alert           | Alert                        | 警告提示      |
| Paper           | Card                         | 纸张容器      |
| Switch          | Switch                       | 开关          |
| SimpleGrid      | Grid                         | 网格          |
| ThemeIcon       | (自定义实现)                 | 主题图标      |
| LoadingOverlay  | Spin (fullscreen)            | 加载遮罩      |
| Box             | div + style                  | 基础容器      |
| useDisclosure   | useState                     | 状态管理 Hook |

## 样式系统变更

### Mantine

```typescript
import { createTheme, rem } from '@mantine/core'
import '@mantine/core/styles.css'
```

### Arco Design

```typescript
import '@arco-design/web-react/dist/css/arco.css'
// 使用 ConfigProvider 配置主题
```

## 迁移顺序建议

1. **依赖替换**: 更新 package.json
2. **全局配置**: Provider 和主题配置
3. **共享组件**: Logo, ThemeToggle
4. **布局组件**: AppLayout, AppHeader, AppNavbar
5. **实体组件**: UserAvatar, UserCard
6. **功能组件**: AuthProvider, 用户管理相关组件
7. **页面组件**: Dashboard, Settings, Login, Register
8. **测试文件**: 更新所有测试中的 Provider
9. **Storybook**: 更新 preview 配置

## 需要注意的点

1. **useDisclosure**: Mantine 的 Hook，Arco 需要手动用 useState 实现
2. **createTheme**: 主题创建方式完全不同
3. **rem 函数**: Arco 不提供，需要自己实现或使用 CSS
4. **AppShell**: 布局逻辑需要重新实现
5. **Group/Stack**: Arco 统一使用 Space 组件，通过 direction 区分
6. **Paper**: Arco 没有对应组件，使用 Card 替代
7. **ThemeIcon**: Arco 没有，需要自定义实现
8. **表格组件**: API 差异较大，需要重点关注

## 验证计划

1. **本地开发**: `pnpm dev` 启动项目
2. **类型检查**: `pnpm exec tsc --noEmit`
3. **代码检查**: `pnpm lint`
4. **代码格式化**: `pnpm format:check`
5. **测试运行**: `pnpm test:run`
6. **构建测试**: `pnpm build`
7. **Storybook**: `pnpm storybook`

## 已完成的分析

- ✅ 搜索所有 Mantine 导入
- ✅ 列出受影响文件
- ✅ 查询 Arco Design 文档
- ✅ 制定组件映射表
- ✅ 规划迁移顺序
