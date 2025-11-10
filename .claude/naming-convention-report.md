# 文件命名规范统一报告

## 任务概述

统一 src 目录下所有文件的命名格式,解决命名混乱问题。

## 执行时间

2025-11-10

## 命名规范

根据 React 和 FSD 最佳实践,采用以下统一规范:

| 文件类型 | 命名格式 | 示例 |
|---------|---------|------|
| **React 组件** | PascalCase | `AuthProvider.tsx`, `UserForm.tsx` |
| **Hooks** | camelCase (useXxx) | `useAuth.ts`, `useUserList.ts` |
| **API 文件** | camelCase | `authApi.ts`, `userApi.ts` |
| **工具函数** | camelCase | `userUtils.ts`, `formatDate.ts` |
| **类型定义** | camelCase | `types.ts`, `userTypes.ts` |
| **index 文件** | 固定 | `index.ts` |

## 重命名清单

### features/auth

**Before → After:**
```
❌ model/auth-context.tsx    → ✅ model/AuthContext.tsx
❌ model/use-auth.ts          → ✅ model/useAuth.ts
❌ api/auth-api.ts            → ✅ api/authApi.ts
```

### features/users

**Before → After:**
```
❌ api/use-user-list.ts       → ✅ api/useUserList.ts
❌ api/use-create-user.ts     → ✅ api/useCreateUser.ts
❌ api/use-update-user.ts     → ✅ api/useUpdateUser.ts
❌ api/use-delete-user.ts     → ✅ api/useDeleteUser.ts
```

### entities/user

**Before → After:**
```
❌ api/user-api.ts            → ✅ api/userApi.ts
❌ lib/user-utils.ts          → ✅ lib/userUtils.ts
```

## 改动统计

- **重命名文件数**: 9 个
- **更新导入路径**: 8 处

## 验证结果

### ✅ TypeScript 类型检查
```bash
tsc -b
```
**结果**: 通过 ✓

### ✅ 代码格式化
```bash
pnpm format
```
**结果**: 通过 ✓

### ✅ 生产构建
```bash
pnpm build
```
**结果**: 通过 ✓
- 构建时间: 789ms
- Bundle 大小: 679.57 kB

## 最终文件结构

```
src/
├── features/
│   ├── auth/
│   │   ├── api/
│   │   │   └── authApi.ts              ✅ camelCase
│   │   ├── model/
│   │   │   ├── AuthContext.tsx         ✅ PascalCase
│   │   │   ├── AuthProvider.tsx        ✅ PascalCase
│   │   │   └── useAuth.ts              ✅ camelCase (Hook)
│   │   ├── ui/
│   │   │   └── ProtectedRoute.tsx      ✅ PascalCase
│   │   └── index.ts
│   │
│   └── users/
│       ├── api/
│       │   ├── useUserList.ts          ✅ camelCase (Hook)
│       │   ├── useCreateUser.ts        ✅ camelCase (Hook)
│       │   ├── useUpdateUser.ts        ✅ camelCase (Hook)
│       │   └── useDeleteUser.ts        ✅ camelCase (Hook)
│       ├── ui/
│       │   ├── UsersView.tsx           ✅ PascalCase
│       │   ├── UserListTable.tsx       ✅ PascalCase
│       │   ├── UserListFilters.tsx     ✅ PascalCase
│       │   └── UserForm.tsx            ✅ PascalCase
│       └── index.ts
│
└── entities/
    └── user/
        ├── api/
        │   └── userApi.ts              ✅ camelCase
        ├── lib/
        │   └── userUtils.ts            ✅ camelCase
        ├── model/
        │   ├── types.ts                ✅ camelCase
        │   └── keys.ts                 ✅ camelCase
        ├── ui/
        │   ├── UserAvatar.tsx          ✅ PascalCase
        │   └── UserCard.tsx            ✅ PascalCase
        └── index.ts
```

## 命名规范原则

### 1. React 组件 → PascalCase
- **原因**: React 官方约定,组件名必须大写开头
- **示例**: `UserForm.tsx`, `AuthProvider.tsx`

### 2. Hooks → camelCase (useXxx)
- **原因**: React Hooks 官方约定,必须 use 开头
- **示例**: `useAuth.ts`, `useUserList.ts`

### 3. 工具函数/API → camelCase
- **原因**: JavaScript/TypeScript 标准命名
- **示例**: `authApi.ts`, `userUtils.ts`

### 4. 避免 kebab-case
- **原因**: 
  - JavaScript 不推荐 kebab-case (需要引号)
  - camelCase 更符合 JS 生态习惯
  - 导入时更自然: `import { useAuth }` vs `import { 'use-auth' }`

## 优势总结

### 1. 一致性
- ✅ 整个项目统一命名风格
- ✅ 符合 React 和 TypeScript 社区规范
- ✅ 降低认知负担

### 2. 可读性
- ✅ PascalCase 组件一眼识别
- ✅ camelCase Hooks 清晰区分
- ✅ 类型明确,易于理解

### 3. 可维护性
- ✅ 新成员快速上手
- ✅ IDE 自动补全友好
- ✅ 重构时不易出错

## 经验总结

### 命名规范最佳实践

**DO (推荐):**
- ✅ React 组件: `UserForm.tsx`
- ✅ Hooks: `useAuth.ts`
- ✅ API: `authApi.ts`
- ✅ Utils: `userUtils.ts`

**DON'T (不推荐):**
- ❌ kebab-case 组件: `user-form.tsx`
- ❌ kebab-case Hooks: `use-auth.ts`
- ❌ PascalCase API: `AuthApi.ts`
- ❌ 混合大小写: `user-Api.ts`

### 关键原则

1. **跟随社区规范** - React/TypeScript 有明确约定
2. **保持一致性** - 全项目统一风格
3. **语义化命名** - 文件名反映内容类型

## 结论

✅ **命名规范统一完成**

项目现已采用统一的命名规范:
- React 组件使用 PascalCase
- Hooks 使用 camelCase (useXxx)
- API/工具函数使用 camelCase
- 消除了所有 kebab-case 命名

这大幅提升了代码的一致性和可维护性!
