# 认证功能上下文摘要

## 当前实现状态

### 已实现的文件

1. `src/shared/api/auth.ts` - 认证 API 接口
2. `src/shared/hooks/auth.tsx` - 认证 Context 和 Hooks
3. `src/pages/login/index.tsx` - 登录页面
4. `src/pages/register/index.tsx` - 注册页面
5. `src/shared/components/ProtectedRoute.tsx` - 受保护路由组件
6. `src/widgets/app-shell/AppHeader.tsx` - 包含退出登录功能的头部组件

### 主要问题

1. **路由配置缺失受保护路由包装**
   - `src/app/routes/router.tsx` 中的受保护路由没有使用 `ProtectedRoute` 组件
   - 未认证用户可以直接访问受保护的页面

2. **缺少认证 Mock API Handlers**
   - `src/shared/mock/handlers/index.ts` 只包含用户管理的 handlers
   - 缺少登录、注册、登出的 Mock API 实现

3. **SessionStorage 退出时未清理**
   - `auth.tsx` 中的 `logout` 函数只清理了 localStorage
   - 忘记清理 sessionStorage 中的 token 和 user

4. **AppProviders 可能未集成 AuthProvider**
   - 需要检查 `src/app/providers/AppProviders.tsx` 是否正确集成

## 技术栈

- Mantine Forms: 表单验证
- Mantine Notifications: 消息提示
- React Router v7: 路由管理
- React Context: 状态管理
- MSW: Mock API

## 实现模式

- Feature-Sliced Design 架构
- Context + Hooks 模式管理认证状态
- localStorage/sessionStorage 持久化 token
- 使用 "记住我" 选项切换存储方式
