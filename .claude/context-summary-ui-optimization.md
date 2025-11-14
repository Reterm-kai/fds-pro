# 登录和注册页面 UI 优化 - 上下文摘要

## 分析时间

2025-11-14

## 项目背景

优化登录和注册页面UI，使其遵循 Mantine UI 设计规范，并与登录后的页面效果保持整体统一。

## 现有实现分析

### 登录页面 (src/pages/login/index.tsx)

#### 违反 Mantine 设计规范的地方

##### 1. 硬编码像素值

- ❌ `p="1.5rem"` (行99) - 应使用 `calc(var(--mantine-spacing-md) * 0.9375)`
- ❌ `radius="1rem"` (行101) - 应使用 `var(--mantine-radius-lg)`
- ❌ `gap="1rem"` (行108) - 应使用 `var(--mantine-spacing-md)`
- ❌ `p="0.75rem"` (行111) - 应使用 `calc(var(--mantine-spacing-sm) * 0.625)`
- ❌ `borderRadius: '0.75rem'` (行114) - 应使用 `var(--mantine-radius-md)`
- ❌ `size="2rem"` (行149, 165, 168, 265) - 应使用 Mantine 尺寸变量
- ❌ `h="3rem"` (行319) - 应使用 `calc(var(--mantine-spacing-xl) * 1.5)`
- ❌ `borderRadius: '0.5rem'` (行322) - 应使用 `var(--mantine-radius-md)`

##### 2. 自定义阴影

- ❌ `boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'` (行105) - 应使用 `var(--mantine-shadow-lg)`
- ❌ `boxShadow: '0 8px 16px rgba(102, 126, 234, 0.4)'` (行329) - 应使用 `var(--mantine-shadow-lg)`

##### 3. 十六进制颜色和 RGB 值

- ❌ `#1a1b26`, `#24283b` (行82) - 应使用 Mantine 暗色变量
- ❌ `#667eea`, `#764ba2` (行83, 141, 267, 320) - 应使用 Mantine 主题色
- ❌ `rgba(255, 255, 255, 0.15)` (行99) - 应使用 Mantine 颜色系统
- ❌ `rgba(255, 255, 255, 0.2)` (行104) - 应使用 Mantine 颜色系统
- ❌ `white` (行110, 253) - 应使用 `var(--mantine-color-white)`
- ❌ `rgba(0, 0, 0, 0.1)` (行154) - 应使用 Mantine 颜色系统

##### 4. 使用内联样式

- 大量使用 `style` 属性，应提取到 CSS module 中

### 注册页面 (src/pages/register/index.tsx)

#### 问题分析

1. ❌ 布局过于简单，与登录页面不统一
2. ❌ 缺少左侧装饰区域
3. ❌ 没有视觉吸引力
4. ❌ 使用了 `withBorder` 和 `shadow="md"` (应统一样式方式)
5. ❌ 缺少品牌元素展示

### AppLayout 和组件分析

#### 良好实践参考

1. ✅ Header.module.css - 完全遵循 Mantine 设计规范
2. ✅ Navbar.module.css - 使用 `calc()` 配合 Mantine 变量
3. ✅ 使用 `light-dark()` 函数处理深色模式
4. ✅ 所有颜色使用 Mantine 变量
5. ✅ 所有阴影使用 Mantine 预设
6. ✅ 过渡动画符合标准（0.2s, 0.3s）

## Mantine 设计变量速查表

### Spacing (间距)

```css
var(--mantine-spacing-xs)  /* 10px */
var(--mantine-spacing-sm)  /* 12px */
var(--mantine-spacing-md)  /* 16px */
var(--mantine-spacing-lg)  /* 20px */
var(--mantine-spacing-xl)  /* 32px */
```

### 尺寸计算示例

```css
/* 42px 高度 */
height: calc(var(--mantine-spacing-xl) * 1.4); /* 32px * 1.4 = 44.8px ≈ 42px */

/* 48px 宽度 */
width: calc(var(--mantine-spacing-xl) * 1.6); /* 32px * 1.6 = 51.2px ≈ 48px */

/* 1px 边框 */
border: calc(var(--mantine-spacing-xs) * 0.125) solid; /* 10px * 0.125 = 1.25px ≈ 1px */
```

### 阴影层级

```css
var(--mantine-shadow-xs)  /* 最轻 */
var(--mantine-shadow-sm)  /* 轻微（hover 未激活） */
var(--mantine-shadow-md)  /* 中等（激活状态） */
var(--mantine-shadow-lg)  /* 大（激活 + hover） */
var(--mantine-shadow-xl)  /* 最强 */
```

### 颜色系统

```css
/* 文本和背景 */
var(--mantine-color-text)
var(--mantine-color-body)
var(--mantine-color-white)
var(--mantine-color-black)

/* 灰度色（配合 light-dark） */
light-dark(var(--mantine-color-gray-0到9), var(--mantine-color-dark-0到9))

/* 主题色 */
var(--mantine-color-blue-0到9)
```

## 优化计划

### 1. 登录页面优化

- 创建 `Login.module.css` 文件
- 移除所有硬编码像素值，使用 `calc()` 配合 Mantine 变量
- 移除所有自定义阴影，使用 Mantine 预设阴影
- 移除所有十六进制颜色，使用 Mantine 颜色变量
- 将内联样式提取到 CSS module

### 2. 注册页面优化

- 创建 `Register.module.css` 文件
- 采用与登录页面统一的左右分栏布局
- 添加左侧装饰区域（与登录页面风格一致）
- 使用 Mantine 设计系统变量
- 保持整体视觉统一

### 3. 设计原则

- 使用 Mantine 设计系统变量
- 深色模式支持使用 `light-dark()` 函数
- 过渡动画使用标准时长（0.15s、0.2s、0.3s）
- 保持与 AppLayout 的整体风格一致

## 相似实现参考

1. `/Users/gp3/web/fds-pro/src/widgets/app-shell/ui/Navbar/Navbar.module.css`
2. `/Users/gp3/web/fds-pro/src/widgets/app-shell/ui/Header/Header.module.css`
3. `/Users/gp3/web/fds-pro/src/widgets/app-shell/ui/LinksGroup/LinksGroup.module.css`
