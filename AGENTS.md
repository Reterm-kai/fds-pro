# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 **React 19 + TypeScript + Mantine** 的现代前端项目，采用 **Feature-Sliced Design (FSD)** 架构，使用 rolldown-vite 作为构建工具。

## 核心技术栈

- **React**: 19.1.1
- **TypeScript**: 5.9.3 (严格模式)
- **构建工具**: rolldown-vite 7.1.14
- **UI 框架**: Mantine 8.3.6 ⚠️ **所有样式必须使用 Mantine 设计系统变量**
- **路由**: React Router 7.9.5
- **状态管理**: TanStack Query 5.90.7
- **测试**: Vitest 4.0.7 + Testing Library
- **代码质量**: ESLint 9.36.0 + Prettier 3.6.2
- **包管理器**: pnpm

## 🎨 Mantine 设计系统快速参考（AI 必读）

### Spacing 间距标准值

```
xs: 10px  (0.625rem)
sm: 12px  (0.75rem)
md: 16px  (1rem)
lg: 20px  (1.25rem)
xl: 32px  (2rem)
```

### 常用尺寸计算公式

```css
/* 高度计算 */
42px  → calc(var(--mantine-spacing-xl) * 1.4)
48px  → calc(var(--mantine-spacing-xl) * 1.6)
28px  → calc(var(--mantine-spacing-lg) * 1.17)

/* 边框计算 */
1px   → calc(var(--mantine-spacing-xs) * 0.125)
```

### 阴影层级

```css
var(--mantine-shadow-xs)  /* 最轻 */
var(--mantine-shadow-sm)  /* 轻微（hover 未激活） */
var(--mantine-shadow-md)  /* 中等（激活状态） */
var(--mantine-shadow-lg)  /* 大（激活 + hover） */
var(--mantine-shadow-xl)  /* 最强 */
```

### 颜色使用

```css
/* 文本和背景 */
var(--mantine-color-text)
var(--mantine-color-body)

/* 灰度色（配合 light-dark） */
light-dark(var(--mantine-color-gray-0到9), var(--mantine-color-dark-0到9))

/* 主题色 */
var(--mantine-color-blue-0到9)
```

## 开发命令

### 核心命令

```bash
pnpm dev              # 启动开发服务器 (HMR)
pnpm build            # 构建生产版本 (类型检查 + 构建)
pnpm preview          # 预览生产构建
```

### 代码质量

```bash
pnpm lint             # ESLint 代码检查
pnpm format           # 格式化所有代码
pnpm format:check     # 检查代码格式
```

### 测试

```bash
pnpm test             # 运行测试 (watch 模式)
pnpm test:run         # 运行测试 (CI 模式)
pnpm test:ui          # Vitest UI 界面
pnpm test:coverage    # 生成覆盖率报告
```

### Storybook

```bash
pnpm storybook        # 启动 Storybook (端口 6006)
pnpm build-storybook  # 构建 Storybook 静态文件
```

## 项目架构 (FSD)

项目采用 **Feature-Sliced Design** 架构，严格遵循 FSD 规范:

```
src/
├── app/              # 应用层 - 全局配置和初始化
│   ├── providers/    # 全局 Providers (Router, Query, Theme)
│   ├── layouts/      # 布局组件 (AppLayout, AuthLayout)
│   └── routes/       # 路由配置
│
├── pages/            # 页面层 - 路由页面组合
│   ├── login/
│   ├── register/
│   ├── dashboard/
│   ├── users/
│   └── settings/
│
├── widgets/          # 组件层 - 复杂业务组件
│   └── app-shell/    # 应用外壳 (Header, Navbar)
│
├── features/         # 特性层 - 用户交互特性
│   ├── auth/         # 认证特性
│   │   ├── ui/       # LoginForm, RegisterForm, ProtectedRoute
│   │   ├── api/      # 登录、注册、登出 API
│   │   └── model/    # AuthProvider, useAuth
│   │
│   └── users/        # 用户管理特性
│       ├── ui/       # UsersView, UserForm, UserListTable, UserListFilters
│       └── api/      # useUserList, useCreateUser, useUpdateUser, useDeleteUser
│
├── entities/         # 实体层 - 业务实体
│   └── user/         # 用户实体
│       ├── ui/       # UserAvatar, UserCard
│       ├── api/      # 用户基础 API
│       ├── model/    # 用户类型、Query Keys
│       └── lib/      # 工具函数 (getRoleLabel, getStatusColor 等)
│
└── shared/           # 共享层 - 通用代码 (无业务逻辑)
    ├── ui/           # Logo, ThemeToggle, Placeholder
    ├── api/          # API 客户端 (axios)
    ├── config/       # 全局配置 (queryClient)
    ├── mock/         # Mock 数据 (MSW)
    └── navigation/   # 导航配置
```

## FSD 核心原则

### 1. 分层依赖规则

```
app → pages → widgets → features → entities → shared
```

- ✅ 上层可以依赖下层
- ❌ 下层不能依赖上层
- ❌ 同层 slice 之间不能相互依赖

### 2. Slice 结构

每个 slice (features/entities) 使用标准 segments:

```
feature/
├── ui/       # UI 组件
├── api/      # API 请求
├── model/    # 状态管理和类型
├── lib/      # 辅助函数
└── index.ts  # Public API (统一导出)
```

### 3. Public API

每个 slice 通过 `index.ts` 暴露公共接口:

```typescript
// features/users/index.ts
export { UsersView } from './ui/UsersView'
export { useUserList } from './api/useUserList'
```

外部引用:

```typescript
import { UsersView, useUserList } from '@/features/users'
```

## 文件命名规范

### 文件名约定

| 文件类型       | 命名格式   | 示例                               |
| -------------- | ---------- | ---------------------------------- |
| **React 组件** | PascalCase | `UserForm.tsx`, `AuthProvider.tsx` |
| **Hooks**      | camelCase  | `useAuth.ts`, `useUserList.ts`     |
| **API/工具**   | camelCase  | `authApi.ts`, `userUtils.ts`       |
| **类型定义**   | camelCase  | `types.ts`, `userTypes.ts`         |
| **index 文件** | 固定       | `index.ts`                         |

### 目录命名约定

| 目录类型           | 命名格式   | 示例                                  | 说明                            |
| ------------------ | ---------- | ------------------------------------- | ------------------------------- |
| **Feature/Entity** | kebab-case | `app-shell`, `user-profile`           | features/ 和 entities/ 下的目录 |
| **Pages**          | kebab-case | `login`, `dashboard`, `user-settings` | pages/ 下的目录                 |
| **UI 组件目录**    | kebab-case | `theme-toggle`, `logo`                | shared/ui/ 下的组件目录         |
| **Segment 目录**   | 固定名称   | `ui`, `api`, `model`, `lib`           | FSD slice 内部的标准目录        |

### Pages 目录规范

**标准模式**: 所有页面组件必须直接在 `index.tsx` 中定义

```
pages/
├── login/
│   └── index.tsx          ✅ 直接定义 LoginPage 组件
├── dashboard/
│   └── index.tsx          ✅ 直接定义 DashboardPage 组件
└── users/
    └── index.tsx          ✅ 直接定义 UsersPage 组件
```

❌ **错误示例** (不允许):

```
pages/
└── login/
    ├── LoginPage.tsx      ❌ 不要创建单独的组件文件
    └── index.tsx          ❌ 不要用 index.ts 仅做 re-export
```

**原因**:

- 保持一致性,减少认知负担
- 简化导入路径 (`@/pages/login` 直接指向组件)
- 符合 FSD 的"就近原则"
- 避免不必要的文件层级

## 代码规范

### TypeScript

- ✅ 严格模式启用 (`strict: true`)
- ✅ 禁止 `any` 类型
- ✅ 禁止未使用的变量和参数
- ✅ 使用 `verbatimModuleSyntax` 明确导入/导出

### CSS/样式规范

本项目使用 **Mantine UI** 作为 UI 框架，所有样式必须遵循 Mantine 的设计系统规范。

#### ⚠️ 强制规则（AI 必须遵守）

**在创建或修改任何 CSS 样式时，必须严格遵守以下规则：**

1. **🚫 绝对禁止使用 `rem()` 函数或硬编码像素值**
   - ❌ 禁止：`width: rem(48px)`, `height: 42px`, `padding: 16px`
   - ✅ 必须：`width: calc(var(--mantine-spacing-xl) * 1.6)`, `height: calc(var(--mantine-spacing-xl) * 1.4)`

2. **🚫 绝对禁止使用自定义阴影值**
   - ❌ 禁止：`box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)`
   - ✅ 必须：`box-shadow: var(--mantine-shadow-sm)`（sm, md, lg, xl）

3. **🚫 绝对禁止使用十六进制颜色或 RGB 值**
   - ❌ 禁止：`color: #333`, `background: rgb(240, 240, 240)`
   - ✅ 必须：`color: var(--mantine-color-text)`, `background: light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))`

4. **✅ 所有尺寸必须基于 Mantine spacing 变量**
   - 使用 `calc()` 配合 Mantine 变量计算精确尺寸
   - Mantine spacing: xs(10px), sm(12px), md(16px), lg(20px), xl(32px)

5. **✅ 深色模式必须使用 `light-dark()` 函数**
   - 任何需要区分深浅色的样式都必须使用 `light-dark(浅色值, 深色值)`

**违反以上规则的代码将被视为不符合项目规范，必须重写。**

#### 核心原则

1. **优先使用 Mantine Design Tokens**：所有样式值必须使用 Mantine 提供的 CSS 变量
2. **禁止硬编码值**：不允许使用具体的像素值、颜色代码等
3. **统一设计语言**：确保整个应用的视觉一致性

#### Mantine Design Tokens 使用规范

##### 1. 间距 (Spacing)

✅ **正确用法**：

```css
padding: var(--mantine-spacing-xs); /* 超小间距 */
padding: var(--mantine-spacing-sm); /* 小间距 */
padding: var(--mantine-spacing-md); /* 中间距（默认） */
padding: var(--mantine-spacing-lg); /* 大间距 */
padding: var(--mantine-spacing-xl); /* 超大间距 */

/* 计算值（需要时） */
padding: calc(var(--mantine-spacing-md) * 1.5);
```

❌ **错误用法**：

```css
padding: 8px; /* 不要使用固定像素值 */
padding: 12px; /* 不要使用固定像素值 */
```

##### 2. 颜色 (Colors)

✅ **正确用法**：

```css
/* 主题色 */
color: var(--mantine-color-text); /* 文本颜色 */
background: var(--mantine-color-body); /* 背景色 */

/* 灰度色（支持深色模式） */
background: light-dark(
var(--mantine-color-gray-2),
/* 浅色模式 */ var(--mantine-color-dark-6) /* 深色模式 */
);

/* 主题色阶 */
color: var(--mantine-color-blue-7); /* 蓝色-7阶 */
color: light-dark(var(--mantine-color-blue-7), var(--mantine-color-blue-4));

/* 白色/黑色 */
color: var(--mantine-color-white);
color: var(--mantine-color-black);
```

❌ **错误用法**：

```css
color: #333; /* 不要使用十六进制颜色 */
background: #f0f0f0; /* 不要使用十六进制颜色 */
```

##### 3. 字体大小 (Font Size)

✅ **正确用法**：

```css
font-size: var(--mantine-font-size-xs); /* 超小字体 */
font-size: var(--mantine-font-size-sm); /* 小字体 */
font-size: var(--mantine-font-size-md); /* 中字体（默认） */
font-size: var(--mantine-font-size-lg); /* 大字体 */
font-size: var(--mantine-font-size-xl); /* 超大字体 */
```

❌ **错误用法**：

```css
font-size: 14px; /* 不要使用固定像素值 */
font-size: 16px; /* 不要使用固定像素值 */
```

##### 4. 圆角 (Border Radius)

✅ **正确用法**：

```css
border-radius: var(--mantine-radius-xs); /* 超小圆角 */
border-radius: var(--mantine-radius-sm); /* 小圆角 */
border-radius: var(--mantine-radius-md); /* 中圆角（默认） */
border-radius: var(--mantine-radius-lg); /* 大圆角 */
border-radius: var(--mantine-radius-xl); /* 超大圆角 */
border-radius: 50%; /* 圆形（特殊情况） */
```

❌ **错误用法**：

```css
border-radius: 4px; /* 不要使用固定像素值 */
border-radius: 8px; /* 不要使用固定像素值 */
```

##### 5. 阴影 (Shadows)

✅ **正确用法**：

```css
box-shadow: var(--mantine-shadow-xs); /* 超小阴影 */
box-shadow: var(--mantine-shadow-sm); /* 小阴影 */
box-shadow: var(--mantine-shadow-md); /* 中阴影（默认） */
box-shadow: var(--mantine-shadow-lg); /* 大阴影 */
box-shadow: var(--mantine-shadow-xl); /* 超大阴影 */
```

❌ **错误用法**：

```css
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 不要自定义阴影 */
```

##### 6. 尺寸单位 (rem 函数)

对于需要精确尺寸的场景，使用 Mantine 的 `rem()` 函数：

✅ **正确用法**：

```css
min-height: rem(42px); /* 转换为 rem 单位 */
border: rem(1px) solid; /* 边框宽度 */
width: rem(240px); /* 固定宽度 */
```

❌ **错误用法**：

```css
min-height: 42px; /* 不要直接使用像素值 */
border: 1px solid; /* 边框可以接受，但建议使用 rem() */
```

##### 7. z-index (层级)

✅ **正确用法**：

```css
z-index: var(--mantine-z-index-app); /* 应用层级 */
z-index: var(--mantine-z-index-modal); /* 模态框层级 */
z-index: var(--mantine-z-index-popover); /* 弹出层级 */
z-index: var(--mantine-z-index-overlay); /* 遮罩层级 */
z-index: var(--mantine-z-index-max); /* 最高层级 */
```

❌ **错误用法**：

```css
z-index: 10; /* 不要使用具体数字 */
z-index: 999; /* 不要使用具体数字 */
```

##### 8. 过渡动画 (Transitions)

✅ **正确用法**：

```css
/* 标准过渡时间 */
transition: all 0.15s ease; /* 快速交互 */
transition: all 0.2s ease; /* 标准过渡 */
transition: all 0.3s ease; /* 平滑过渡 */

/* 多属性过渡 */
transition:
background-color 0.15s ease,
                     color 0.15s ease;
```

**推荐时长**：

- `0.15s` - 快速反馈（hover、按钮点击）
- `0.2s` - 标准过渡（颜色变化）
- `0.3s` - 平滑展开（布局变化、宽度调整）

❌ **错误用法**：

```css
transition: all 0.5s ease; /* 太慢，影响用户体验 */
transition: all 100ms ease; /* 使用秒而非毫秒 */
```

#### 样式文件示例

✅ **完整的良好示例**：

```css
.navbar {
   height: 100%;
   padding: 0;
   display: flex;
   flex-direction: column;
   transition: all 0.3s ease;
}

.navbarItem {
   padding: var(--mantine-spacing-xs) var(--mantine-spacing-md);
   font-size: var(--mantine-font-size-sm);
   color: var(--mantine-color-text);
   border-radius: var(--mantine-radius-sm);
   transition: background-color 0.15s ease;
   min-height: rem(42px);

   &:hover {
      background-color: light-dark(
              var(--mantine-color-gray-2),
              var(--mantine-color-dark-6)
      );
   }
}

.button {
   padding: var(--mantine-spacing-sm) var(--mantine-spacing-md);
   border: rem(1px) solid
   light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4));
   border-radius: var(--mantine-radius-md);
   box-shadow: var(--mantine-shadow-sm);
   z-index: var(--mantine-z-index-app);
}
```

#### ✅ 样式开发检查清单

**在编写或修改样式前，AI 必须确认以下所有项：**

- [ ] ✅ 所有间距使用 `var(--mantine-spacing-*)`
- [ ] ✅ 所有颜色使用 `var(--mantine-color-*)`
- [ ] ✅ 所有字体大小使用 `var(--mantine-font-size-*)`
- [ ] ✅ 所有圆角使用 `var(--mantine-radius-*)`
- [ ] ✅ 所有阴影使用 `var(--mantine-shadow-*)`
- [ ] ✅ 所有 z-index 使用 `var(--mantine-z-index-*)`
- [ ] ✅ 所有尺寸使用 `calc(var(--mantine-spacing-*) * 倍数)`（禁止 rem() 和硬编码）
- [ ] ✅ 深色模式使用 `light-dark(浅色值, 深色值)` 函数
- [ ] ✅ 过渡时间符合推荐标准（0.15s、0.2s、0.3s）
- [ ] ❌ 没有使用 `rem()` 函数
- [ ] ❌ 没有硬编码像素值
- [ ] ❌ 没有十六进制颜色或 RGB 值
- [ ] ❌ 没有自定义阴影值

**示例：正确的尺寸计算**

```css
/* 42px 高度 */
height: calc(var(--mantine-spacing-xl) * 1.4); /* 32px * 1.4 = 44.8px ≈ 42px */

/* 48px 正方形 */
width: calc(var(--mantine-spacing-xl) * 1.6); /* 32px * 1.6 = 51.2px ≈ 48px */
height: calc(var(--mantine-spacing-xl) * 1.6);

/* 1px 边框 */
border: calc(var(--mantine-spacing-xs) * 0.125) solid...; /* 10px * 0.125 = 1.25px ≈ 1px */
```

### Prettier 配置

```json
{
   "singleQuote": true,
   "semi": false,
   "tabWidth": 2,
   "trailingComma": "es5",
   "printWidth": 80,
   "arrowParens": "avoid"
}
```

### ESLint

- Flat Config 格式 (`eslint.config.js`)
- TypeScript ESLint 推荐规则
- React Hooks 规则
- 与 Prettier 集成

## 开发注意事项

### 添加新功能

1. **确定所属层级**:
   - 业务场景 → `features/`
   - 业务实体 → `entities/`
   - 通用组件 → `shared/ui/`

2. **创建标准结构**:

   ```
   features/new-feature/
   ├── ui/
   ├── api/
   ├── model/
   └── index.ts
   ```

3. **遵循命名规范**:
   - 组件: `PascalCase.tsx`
   - Hooks: `useXxx.ts`
   - API: `xxxApi.ts`

4. **导出 Public API**:
   ```typescript
   // index.ts
   export { FeatureView } from './ui/FeatureView'
   export { useFeature } from './api/useFeature'
   ```

### 添加新组件

- ✅ 使用函数组件和 Hooks
- ✅ 严格类型定义
- ✅ 遵循 ESLint 规则
- ✅ 编写测试文件 (`*.test.tsx`)
- ✅ 为可复用组件创建 Story (`*.stories.tsx`)

### 测试开发

- 使用 Vitest + Testing Library
- 语义化查询: `getByRole`, `getByText`
- 用户交互: `userEvent` (优于 `fireEvent`)
- 运行 `pnpm test:ui` 可视化调试

### Storybook 开发

- CSF 3.0 格式
- 添加 `autodocs` 标签
- 展示组件不同状态
- 利用 a11y 插件检查无障碍性

## 状态管理

使用 **TanStack Query** 进行服务端状态管理:

```typescript
// 查询
const { data, isLoading } = useUserList({ page: 1 })

// 变更
const createUser = useCreateUser()
await createUser.mutateAsync(userData)
```

Query Keys 管理:

```typescript
// entities/user/model/keys.ts
export const userKeys = {
   all: ['users'] as const,
   lists: () => [...userKeys.all, 'list'] as const,
   list: (params: UserListParams) => [...userKeys.lists(), params] as const,
   detail: (id: number) => [...userKeys.all, 'detail', id] as const,
}
```

## Mock 数据 (MSW)

使用 Mock Service Worker 模拟 API:

```typescript
// shared/mock/handlers/users.ts
export const usersHandlers = [
   http.get('/users', ({ request }) => {
      // 返回 mock 数据
   }),
]
```

启用 Mock:

```typescript
// main.tsx
if (import.meta.env.DEV) {
   import('./shared/mock/browser').then(({ worker }) => {
      worker.start()
   })
}
```

## 路由配置

使用 React Router 7:

```typescript
// app/routes/router.tsx
export const router = createBrowserRouter([
   {
      element: <AuthLayout />,  // 提供认证上下文
      children: [
         // 公共路由
         { path: '/login', element: <LoginPage /> },
         // 受保护路由
         {
            path: '/',
            element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
            children: [
               { path: 'dashboard', element: <DashboardPage /> },
               { path: 'users', element: <UsersPage /> },
            ],
         },
      ],
   },
])
```

## UI 框架 (Mantine)

使用 Mantine 8.3.6:

```typescript
import { Button, TextInput, Stack } from '@mantine/core'

function MyComponent() {
  return (
    <Stack gap="md">
      <TextInput label="姓名" />
      <Button>提交</Button>
    </Stack>
  )
}
```

主题配置:

```typescript
// app/providers/AppProviders.tsx
<MantineProvider defaultColorScheme="auto">
        {children}
        </MantineProvider>
```

## 构建优化

- rolldown-vite 提供更快的构建速度
- 生产构建前运行类型检查
- 代码分割警告 (> 500 kB) 可通过 dynamic import 优化

## 最佳实践

### FSD

1. **合理粒度**: feature 应该是完整的用户场景
2. **就近原则**: 相关代码放在同一目录
3. **Public API**: 通过 index.ts 暴露接口
4. **Shared 纯净**: 不包含业务逻辑

### 代码质量

1. **格式化**: 提交前运行 `pnpm format`
2. **类型安全**: 避免 `any`, 严格类型定义
3. **测试覆盖**: 为核心功能编写测试
4. **代码复用**: 优先使用 entities 和 shared 层

### 性能

1. 使用 TanStack Query 缓存
2. 避免不必要的重渲染
3. 大列表使用虚拟化
4. 图片懒加载

## 常见问题

### Q: 新功能应该放在哪里?

- **业务场景** (如用户管理、订单管理) → `features/`
- **业务实体** (如用户、商品) → `entities/`
- **通用 UI** (如 Logo、ThemeToggle) → `shared/ui/`

### Q: 何时拆分 feature?

- ✅ 不同的业务场景
- ✅ 有跨页面复用需求
- ❌ 同一场景的不同操作 (增删改查应该在一起)

### Q: 如何组织 API?

- 基础 CRUD → `entities/xxx/api/`
- 业务逻辑 Hook → `features/xxx/api/`

## 参考资料

- [Feature-Sliced Design 官方文档](https://feature-sliced.design/)
- [React 19 文档](https://react.dev/)
- [TanStack Query 文档](https://tanstack.com/query/latest)
- [Mantine 文档](https://mantine.dev/)
