# FSD 优化上下文摘要

## 任务目标

使用 Feature-Sliced Design (FSD) 方式优化项目结构

## 当前结构分析

### 已存在的文件

- `src/shared/contexts/auth-context.tsx` - 认证上下文 (❌ 位置错误)
- `src/shared/hooks/useAuth.ts` - 认证 Hook (❌ 位置错误)
- `src/shared/api/auth.ts` - 认证 API (❌ 位置错误)
- `src/shared/components/ProtectedRoute.tsx` - 路由保护组件 (❌ 位置错误)
- `src/features/user-management/` - 用户管理特性 (❌ 粒度太粗)
- `src/entities/user/model/` - 用户类型定义 (✅ 正确)

### FSD 违规问题

1. **shared 层包含业务逻辑** - 违反 FSD 原则,shared 层应该只包含通用代码
2. **entities 层缺少 api 和 ui segments** - 不完整
3. **features 层粒度太粗** - 应该拆分为细粒度特性
4. **缺少标准 segments 结构** - 每个 slice 应该包含 ui/api/model/lib/config

## 优化方案

### 1. 创建 features/auth (认证特性)

**从 shared 层迁移:**

- `shared/contexts/auth-context.tsx` → `features/auth/model/auth-context.tsx`
- `shared/hooks/useAuth.ts` → `features/auth/model/use-auth.ts`
- `shared/api/auth.ts` → `features/auth/api/auth-api.ts`
- `shared/components/ProtectedRoute.tsx` → `features/auth/ui/ProtectedRoute.tsx`
- `shared/hooks/auth.tsx` → `features/auth/model/AuthProvider.tsx`

**新增:**

- `features/auth/ui/LoginForm.tsx` - 登录表单组件
- `features/auth/ui/RegisterForm.tsx` - 注册表单组件
- `features/auth/index.ts` - Public API

### 2. 拆分 features/user-management

**拆分为 3 个独立特性:**

#### features/user-list

- `ui/UserListView.tsx` - 列表视图
- `ui/UserListFilters.tsx` - 筛选器
- `ui/UserListTable.tsx` - 表格
- `api/use-user-list.ts` - 列表查询 Hook
- `model/filters.ts` - 筛选状态

#### features/user-edit

- `ui/UserEditForm.tsx` - 编辑表单
- `api/use-update-user.ts` - 更新 Hook
- `api/use-delete-user.ts` - 删除 Hook

#### features/user-create

- `ui/UserCreateForm.tsx` - 创建表单
- `api/use-create-user.ts` - 创建 Hook

### 3. 完善 entities/user

**新增 segments:**

- `api/user-api.ts` - 用户基础 CRUD API (从 features 移除业务逻辑后的纯 API)
- `ui/UserAvatar.tsx` - 用户头像组件
- `ui/UserCard.tsx` - 用户卡片组件
- `lib/user-utils.ts` - 用户相关工具函数
- `index.ts` - Public API

### 4. 清理 shared 层

**删除业务逻辑文件:**

- ❌ 删除 `shared/contexts/`
- ❌ 删除 `shared/hooks/useAuth.ts`
- ❌ 删除 `shared/hooks/auth.tsx`
- ❌ 删除 `shared/api/auth.ts`
- ❌ 删除 `shared/components/ProtectedRoute.tsx`
- ❌ 删除 `shared/navigation/` (迁移到 app/routes 或 widgets)

**保留通用代码:**

- ✅ `shared/api/client.ts` - API 客户端配置
- ✅ `shared/ui/` - 通用 UI 组件
- ✅ `shared/config/` - 全局配置
- ✅ `shared/mock/` - Mock 数据

## FSD 核心原则检查清单

- [ ] **分层依赖规则**: app → pages → widgets → features → entities → shared
- [ ] **Slice 隔离**: 同层级 slice 之间不能相互依赖
- [ ] **Segment 标准化**: 每个 slice 使用标准 segments (ui/api/model/lib/config)
- [ ] **Public API**: 每个 slice 通过 index.ts 暴露公共接口
- [ ] **Shared 层纯净性**: shared 层不包含任何业务逻辑

## 实施顺序

1. 创建 features/auth 并迁移认证相关代码
2. 拆分 features/user-management 为 3 个独立特性
3. 完善 entities/user 的 segments
4. 清理 shared 层的业务逻辑
5. 更新所有导入路径
6. 运行测试和格式化检查
