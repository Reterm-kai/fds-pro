# 响应式样式优化 - 上下文摘要

## 任务目标

将项目中所有样式优化为基于字体大小的响应式实现，使用 rem/em 单位替代固定的 px 单位。

## 现有样式实现分析

### 1. CSS 变量系统 (src/index.css)

- ✅ 已有设计系统，包含颜色、字体、间距、圆角、动画、阴影
- ❌ 间距系统使用固定 rem 值，未响应式
- ❌ 缺少字体大小响应式系统
- ❌ 缺少媒体查询断点变量

### 2. 内联样式使用情况

发现以下文件使用了内联 style：

- `src/pages/login/LoginPage.tsx` - 大量固定像素值（60px, 400px, 500px）
- `src/widgets/app-shell/AppNavbar.tsx` - 布局样式
- `src/widgets/app-shell/AppHeader.tsx` - 图标尺寸使用 rem(14)
- `src/features/auth/model/AuthProvider.tsx` - minHeight
- `src/features/users/ui/UserListFilters.tsx` - 固定宽度（150px）
- `src/shared/ui/logo/Logo.tsx` - 变换和尺寸
- `src/entities/user/ui/UserCard.tsx` - Flex 布局

### 3. Mantine 配置

- 使用默认配置，未自定义主题
- 未配置响应式断点和字体系统
- 使用 Mantine 内置的 rem() 函数（基于 16px）

## 优化方案

### 第一步：创建响应式字体和间距系统

1. 在 CSS 变量中添加流体字体系统（clamp）
2. 创建响应式断点变量
3. 基于基础字体大小重新计算间距系统

### 第二步：配置 Mantine 主题

1. 在 AppProviders.tsx 中添加自定义主题配置
2. 配置响应式字体大小、间距、断点
3. 确保与 CSS 变量系统一致

### 第三步：重构组件样式

优先级排序：

1. LoginPage（最多硬编码）
2. AppNavbar（布局关键）
3. UserListFilters（固定宽度问题）
4. Logo（尺寸问题）
5. 其他组件（轻微问题）

### 第四步：验证

1. 运行 `pnpm dev` 检查页面渲染
2. 测试不同字体大小（浏览器缩放）
3. 测试不同屏幕尺寸（响应式断点）
4. 运行格式化和类型检查

## 技术约束

- 使用 Mantine 8.3.6 的主题系统
- 保持现有设计风格
- 不破坏现有功能
- 遵循项目代码规范（Prettier, ESLint）

## 相似实现参考

- Mantine 官方使用 `rem()` 函数和主题系统
- AppHeader 已正确使用 `rem()` 函数
- 应参考 Mantine 的最佳实践

## 成功标准

1. 所有固定 px 值转换为响应式单位（rem/em/%）
2. 字体大小调整时，所有元素成比例缩放
3. 不同屏幕尺寸下布局正常
4. 所有测试通过
5. 无 ESLint 和 TypeScript 错误
