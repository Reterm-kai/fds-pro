# FSD 重构总结

## 重构背景

在初次 FSD 优化中,将 `user-management` 拆分为 3 个独立 features (`user-list`, `user-edit`, `user-create`),但这种拆分**过于细粒度**,违反了 FSD "合理粒度"原则。

## 问题分析

### ❌ 过度拆分的问题

1. **认知负担过重** - 用户管理功能分散到 3 个目录
2. **违反"完整场景"原则** - 增删改查是同一个业务场景的不同操作
3. **过度工程化** - 没有跨页面复用需求,过度拆分增加复杂度

## 重构方案

### 合并为 `features/users`

将过度拆分的 3 个 features 合并为单一的 `users` feature:

```
features/
├── auth/              # ✅ 认证是独立场景
└── users/             # ✅ 用户管理是完整场景
    ├── ui/
    │   ├── UsersView.tsx          # 主视图
    │   ├── UserListTable.tsx      # 列表表格
    │   ├── UserListFilters.tsx    # 筛选器
    │   └── UserForm.tsx           # 统一表单(创建+编辑)
    ├── api/
    │   ├── use-user-list.ts       # 列表查询
    │   ├── use-create-user.ts     # 创建
    │   ├── use-update-user.ts     # 更新
    │   └── use-delete-user.ts     # 删除
    └── index.ts                   # Public API
```

## 改动内容

### 1. 创建 `features/users`

- ✅ 合并所有用户管理相关代码
- ✅ 统一的 UI 组件
- ✅ 完整的 API Hooks
- ✅ Public API 导出

### 2. 删除过度拆分的目录

- ❌ 删除 `features/user-list`
- ❌ 删除 `features/user-edit`
- ❌ 删除 `features/user-create`
- ❌ 删除 `features/user-management` (旧代码)

### 3. 更新导入路径

- ✅ `pages/users/index.tsx` - 简化为直接导出 UsersView

## 验证结果

### ✅ 构建成功

```bash
pnpm build
```

- TypeScript 类型检查通过
- 构建成功
- Bundle: 679.57 kB (gzip: 210.61 kB)
- 构建时间: 585ms

### ✅ 代码格式化

```bash
pnpm format
```

- 所有文件格式化成功

## FSD 核心原则检查

### ✅ 合理粒度

- `users` 是一个**完整的用户管理场景**
- 包含列表、创建、编辑、删除等完整功能
- 符合 FSD "feature 应该是完整的用户交互场景"原则

### ✅ 就近原则

- 所有用户管理代码在同一个目录
- 开发者无需在多个目录间跳转
- 降低认知负担

### ✅ 代码组织

- `ui/` - 所有 UI 组件
- `api/` - 所有 API Hooks
- `index.ts` - 统一的 Public API

## 最终结构

```
src/
├── features/
│   ├── auth/          # 认证特性
│   │   ├── ui/
│   │   ├── api/
│   │   └── model/
│   └── users/         # 用户管理特性 ⭐
│       ├── ui/
│       │   ├── UsersView.tsx
│       │   ├── UserListTable.tsx
│       │   ├── UserListFilters.tsx
│       │   └── UserForm.tsx
│       ├── api/
│       │   ├── use-user-list.ts
│       │   ├── use-create-user.ts
│       │   ├── use-update-user.ts
│       │   └── use-delete-user.ts
│       └── index.ts
├── entities/
│   └── user/
└── pages/
    └── users/
```

## 经验总结

### FSD Feature 拆分原则

**何时拆分:**

- ✅ 不同的用户交互场景 (如 `auth` vs `users`)
- ✅ 创建/编辑在不同页面,有复用需求
- ✅ 业务逻辑足够复杂 (如多步向导)

**何时合并:**

- ✅ 同一个业务场景的不同操作 (增删改查)
- ✅ 在同一个页面中使用
- ✅ 没有跨页面复用需求

### 命名建议

- ✅ `users` - 简洁、通用、符合 RESTful 风格
- ❌ `user-management` - 过于技术化
- ❌ `user-list/edit/create` - 过度拆分

## 结论

通过合并过度拆分的 features,项目现在更加符合 FSD 的**合理粒度原则**:

- 更低的认知负担
- 更好的代码就近性
- 更符合业务语义
- 更易于维护

这次重构体现了"**简单优于复杂**"的设计哲学。
