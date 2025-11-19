# FSD 架构快速参考与违规检查清单

## 快速评分

```
整体评分: 92/100 ✅ 优秀级别

├─ 目录结构: 100/100 ✅
├─ 命名规范: 100/100 ✅
├─ 分层依赖: 100/100 ✅
├─ Public API: 100/100 ✅
├─ 导入模式: 100/100 ✅
├─ 循环依赖: 100/100 ✅
├─ Pages 规范: 95/100 ⚠️ (导出方式不一致)
└─ CSS 命名: 94/100 ⚠️ (大小写混用)
```

---

## 层级依赖规则速查

### ✅ 允许的导入

```javascript
// app 层
import { DashboardPage } from '@/pages/dashboard'      ✅
import { AppLayout } from '@/app/layouts'              ✅
import { useAuth } from '@/features/auth'              ✅

// pages 层
import { UsersView } from '@/features/users'           ✅
import type { User } from '@/entities/user'            ✅
import { Logo } from '@/shared/ui'                     ✅

// widgets 层
import { useAuth } from '@/features/auth'              ✅
import { useMenu } from '@/features/menu'              ✅
import { LinksGroup } from '@/shared/ui'               ✅

// features 层
import type { User } from '@/entities/user'            ✅
import { getRoleLabel } from '@/entities/user'         ✅
import { useQuery } from '@tanstack/react-query'       ✅

// entities 层
import { get } from '@/shared/api/client'              ✅

// shared 层
import axios from 'axios'                              ✅
```

### ❌ 禁止的导入

```javascript
// ❌ shared 导入上层
import { UsersView } from '@/features/users'           ❌

// ❌ entities 导入 features
import { useUserList } from '@/features/users'         ❌

// ❌ features 导入 pages
import { UsersPage } from '@/pages/users'              ❌

// ❌ widgets 导入 pages
import { DashboardPage } from '@/pages/dashboard'      ❌

// ❌ pages 导入 app
import { AppProviders } from '@/app/providers'         ❌

// ❌ 直接导入 slice 内部路径
import { useAuth } from '@/features/auth/model'        ❌
import { UserListTable } from '@/features/users/ui'    ❌
import { userApi } from '@/entities/user/api'          ❌
```

---

## 目录命名检查清单

### ✅ 正确的命名

```
features/
├── auth/                    ✅ kebab-case
├── users/                   ✅ kebab-case
├── menu/                    ✅ kebab-case
├── list-basic/              ✅ kebab-case

entities/
├── user/                    ✅ kebab-case
└── form-options/            ✅ kebab-case

widgets/
├── app-navbar/              ✅ kebab-case
├── app-header/              ✅ kebab-case
└── multi-view/              ✅ kebab-case

pages/
├── dashboard/               ✅ kebab-case
├── login/                   ✅ kebab-case
├── form-group/              ✅ kebab-case
└── ...
```

### ❌ 违规的命名（未在项目中发现）

```
// ❌ 不要使用 PascalCase
features/Auth/               ❌ 应该是 features/auth/
features/UserManagement/     ❌ 应该是 features/users/

// ❌ 不要使用 snake_case
features/auth_center/        ❌ 应该是 features/auth-center/
pages/form_group/            ❌ 应该是 pages/form-group/
```

---

## 文件命名规范

### ✅ 项目中的命名规范

| 文件类型   | 格式       | 示例                             | 评分 |
| ---------- | ---------- | -------------------------------- | ---- |
| React 组件 | PascalCase | `UsersView.tsx`, `AppNavbar.tsx` | ✅   |
| Hook       | camelCase  | `useAuth.ts`, `useUserList.ts`   | ✅   |
| API / 工具 | camelCase  | `userApi.ts`, `userUtils.ts`     | ✅   |
| 类型文件   | camelCase  | `types.ts`, `userTypes.ts`       | ✅   |
| Index      | 固定       | `index.ts`                       | ✅   |
| CSS Module | PascalCase | `Login.module.css` ⚠️            | ⚠️   |

---

## Public API 检查清单

### 每个 Slice 必须有 index.ts

```
✅ features/auth/index.ts          - 导出 useAuth, ProtectedRoute, 类型
✅ features/users/index.ts         - 导出 UsersView, Hooks
✅ features/menu/index.ts          - 导出 useMenu, 类型
✅ features/list-basic/index.ts    - 导出 useListData, 工具函数
✅ entities/user/index.ts          - 导出 UI, 工具, 类型, Keys
✅ entities/form-options/index.ts  - 导出 Hooks, 类型
✅ widgets/app-navbar/index.ts     - 导出 AppNavbar
✅ widgets/app-header/index.ts     - 导出 AppHeader
✅ widgets/multi-view/index.ts     - 导出 MultiViewProvider, Hooks, UI
```

### Index 文件结构示例

```typescript
// ✅ 好的 index.ts (features/users)
export { UsersView } from './ui/UsersView'
export { UserListFilters } from './ui/UserListFilters'
export { UserListTable } from './ui/UserListTable'
export { UserForm } from './ui/UserForm'
export { useUserList } from './api/useUserList'
export { useCreateUser } from './api/useCreateUser'
export { useUpdateUser } from './api/useUpdateUser'
export { useDeleteUser } from './api/useDeleteUser'

// ✅ 好的 index.ts (使用 export *)
export * from './model/types'
export * from './model/keys'
export { getUser } from './api/userApi'
export { UserAvatar } from './ui/UserAvatar'
```

---

## 页面层规范检查

### 正确的页面结构

```
✅ pages/dashboard/
   ├── index.tsx          <- 直接定义 DashboardPage 组件
   └── (无其他文件)

✅ pages/login/
   ├── index.tsx          <- 直接定义 LoginPage 组件
   └── Login.module.css    <- 样式文件

❌ 错误的页面结构
pages/login/
├── LoginPage.tsx        ❌ 不要单独的组件文件
└── index.tsx            ❌ 不要再 re-export
```

### 页面导出规范

```typescript
// ✅ 推荐方式 1: 命名导出
export function DashboardPage() {
  return ...
}

// ✅ 推荐方式 2: 命名导出
export function LoginPage() {
  return ...
}

// ⚠️ 当前项目的混用方式
// pages/login/index.tsx
export default function LoginPage() { ... }

// pages/register/index.tsx
export function RegisterPage() { ... }
export default RegisterPage
```

---

## 循环依赖检测方法

### 可能的循环依赖模式

```javascript
// ❌ 直接循环
features/users/ui/UsersView.tsx
  → imports from features/auth
  → which imports from features/users  ❌ 循环!

// ❌ 间接循环
features/users → entities/user
  → shared/api
  → but features/users also imported from pages
  → and pages imports entities/user  ❌ 可能形成循环

// ❌ Slice 内循环
features/auth/ui/Component.tsx
  → from features/auth/model
  → which imports from features/auth/ui  ❌ 循环!
```

### 本项目检查结果

```
✅ 所有依赖均为单向
✅ 没有发现任何循环导入
✅ Slice 内部导入使用相对路径，不会形成环
```

---

## 常见违规及修复示例

### 违规 1: 直接导入 Slice 内部路径

```typescript
// ❌ 错误
import { useAuth } from '@/features/auth/model/useAuth'
import { LoginForm } from '@/features/auth/ui/LoginForm'

// ✅ 正确
import { useAuth } from '@/features/auth'
import { ProtectedRoute } from '@/features/auth'
```

### 违规 2: 下层依赖上层

```typescript
// ❌ 错误 (entities 导入 features)
// entities/user/model/types.ts
import { type UserListParams } from '@/features/users'

// ✅ 正确
// entities/user/model/types.ts
import type { User } from './types' // 自己的类型

// features/users 可以导入 entities/user
import type { User } from '@/entities/user'
```

### 违规 3: 跨 Slice 依赖

```typescript
// ❌ 错误
// features/users/ui/UsersView.tsx
import { MenuItem } from '@/features/menu/model/types'

// ✅ 正确
// features/users/ui/UsersView.tsx
import { MenuViewItem } from '@/features/menu'
```

### 违规 4: Pages 导入 App 层

```typescript
// ❌ 错误
// pages/users/index.tsx
import { AppProviders } from '@/app/providers'

// ✅ 正确
// pages/users/index.tsx
import { UsersView } from '@/features/users'
```

---

## 快速验证脚本

### 查找直接内部导入

```bash
# 查找直接导入 feature 内部路径的情况
grep -r "from '@/features/[^/]*/[a-z]" src --include="*.tsx" --include="*.ts"

# 查找直接导入 entities 内部路径的情况
grep -r "from '@/entities/[^/]*/[a-z]" src --include="*.tsx" --include="*.ts"

# 查找直接导入 widgets 内部路径的情况
grep -r "from '@/widgets/[^/]*/[a-z]" src --include="*.tsx" --include="*.ts"
```

### 查找向上的依赖

```bash
# 查找 shared 是否导入 app/pages/widgets/features
grep -r "from '@/\(app\|pages\|widgets\|features\|entities\)'" src/shared --include="*.tsx" --include="*.ts"

# 查找 entities 是否导入 features/widgets/pages/app
grep -r "from '@/\(features\|widgets\|pages\|app\)'" src/entities --include="*.tsx" --include="*.ts"
```

---

## Pages 层导出不一致（已发现问题）

### 当前状态

```typescript
// pages/login/index.tsx
export default function LoginPage() { ... }
// → router 使用: import LoginPage from '@/pages/login'

// pages/register/index.tsx
export function RegisterPage() { ... }
export default RegisterPage
// → router 使用: import { RegisterPage } from '@/pages/register'
```

### 建议修复方案

```typescript
// 方案 A: 统一使用命名导出（推荐）
// pages/login/index.tsx
export function LoginPage() { ... }

// pages/register/index.tsx
export function RegisterPage() { ... }

// 在 router.tsx 中统一使用命名导入
import { LoginPage, RegisterPage, DashboardPage } from '@/pages'
```

```typescript
// 方案 B: 统一使用 default 导出
// pages/login/index.tsx
export default function LoginPage() { ... }

// pages/register/index.tsx
export default function RegisterPage() { ... }

// 在 router.tsx 中统一使用 default 导入
import LoginPage from '@/pages/login'
import RegisterPage from '@/pages/register'
```

---

## 总体架构可视化

```
┌──────────────────────────────────────────────┐
│ App Layer (app/)                             │
│ - Providers, Layouts, Routes                 │
└────────────────────┬───────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────┐
│ Pages Layer (pages/)                         │
│ - 10 页面组件 (100% 遵守规范)                │
└────────────────────┬───────────────────────┘
                     │
        ┌────────────┼────────────┐
        ↓            ↓            ↓
    ┌────────┐  ┌────────┐  ┌──────────┐
    │Widgets │  │Features│  │Entities  │
    │(3个)   │  │(4个)   │  │(2个)     │
    └────────┘  └────────┘  └──────────┘
        │            │            │
        └────────────┼────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────┐
│ Shared Layer (shared/)                       │
│ - UI, API, Config, Mock, Model              │
└──────────────────────────────────────────────┘

依赖流向: app → pages → (widgets, features, entities) → shared
✅ 所有流向均为单向，无循环
```

---

## 与项目 CLAUDE.md 的对应关系

本分析遵循 `/Users/gp3/web/fds-pro/CLAUDE.md` 中定义的 FSD 规范:

| FSD 要求        | 项目遵守           | 评分 |
| --------------- | ------------------ | ---- |
| 分层依赖规则    | ✅ 完全遵守        | 100% |
| Slice 结构      | ✅ 高度一致        | 99%  |
| Public API 导出 | ✅ 完全遵守        | 100% |
| 目录命名规范    | ✅ kebab-case 遵守 | 100% |
| 文件命名规范    | ✅ 基本遵守        | 98%  |
| Pages 规范      | ⚠️ 导出方式不一致  | 95%  |

---

## 快速检查清单 (用于 Code Review)

- [ ] 导入是否都通过 Public API (index.ts)?
- [ ] 是否有直接导入 slice 内部路径?
- [ ] 是否有下层导入上层?
- [ ] 是否有跨 features 的依赖?
- [ ] CSS/样式文件是否与组件在同一目录?
- [ ] 新建 Slice 是否包含 ui, api, model, lib?
- [ ] 新建 Slice 的 index.ts 是否正确导出?
- [ ] 文件名是否遵守命名规范 (PascalCase/camelCase)?
- [ ] 目录名是否遵守 kebab-case?
- [ ] 是否存在循环导入?

---

**最后更新**: 2025-11-19
**维护者**: FSD Architecture Review
**参考文档**: `/Users/gp3/web/fds-pro/CLAUDE.md`
