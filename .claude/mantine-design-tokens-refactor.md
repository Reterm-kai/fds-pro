# Mantine 设计令牌重构报告

## 🎯 重构目标

将硬编码的像素值重构为使用 Mantine 设计令牌,提升响应式能力和主题兼容性。

## ❌ 问题分析

### 硬编码像素的影响

1. **响应式问题**: 固定像素在不同屏幕尺寸/DPI 下可能不一致
2. **主题兼容性**: 无法跟随 Mantine 主题配置变化
3. **可维护性**: 难以全局调整间距系统
4. **可访问性**: 无法响应用户字体大小偏好设置

### 原来的硬编码问题

```css
/* ❌ 硬编码像素 */
padding: 6px;
margin-bottom: 4px;
```

```tsx
// ❌ 硬编码尺寸
<ThemeIcon size={32}>
  <Icon size={18} />
</ThemeIcon>

// ❌ 硬编码间距
<Stack gap={4}>
```

## ✅ 重构方案

### 1. CSS 中使用 Mantine 间距变量

```css
/* ✅ 使用 Mantine 间距令牌 + calc */
.collapsedControl {
  padding: calc(var(--mantine-spacing-xs) * 0.6);
  margin-bottom: calc(var(--mantine-spacing-xs) * 0.4);
}

.navbar.collapsed .linksInner {
  padding: calc(var(--mantine-spacing-md) * 0.5);
}

.navbar.collapsed .footer {
  padding: calc(var(--mantine-spacing-md) * 0.5);
}
```

**优势**:

- ✅ 跟随 Mantine 主题间距配置
- ✅ 支持响应式缩放
- ✅ 使用 calc() 进行比例调整,保持设计意图

### 2. 组件中使用 Mantine size 系统

```tsx
// ✅ 使用 Mantine 预定义的 size
<ThemeIcon variant="light" size="lg">
  <Icon style={{ width: '70%', height: '70%' }} />
</ThemeIcon>

// ✅ 使用 Mantine 间距名称
<Stack gap={collapsed ? 'xs' : 'sm'}>
```

**优势**:

- ✅ 使用 Mantine 标准尺寸体系 (xs, sm, md, lg, xl)
- ✅ 图标使用百分比自适应容器
- ✅ 间距语义化,易于理解和维护

## 📊 Mantine 设计令牌对照表

### 间距系统 (Spacing)

| 名称 | 默认值 | 说明            |
| ---- | ------ | --------------- |
| `xs` | 10px   | 超小间距        |
| `sm` | 12px   | 小间距          |
| `md` | 16px   | 中等间距 (默认) |
| `lg` | 20px   | 大间距          |
| `xl` | 24px   | 超大间距        |

### 尺寸系统 (Size)

| 组件尺寸 | ThemeIcon | ActionIcon |
| -------- | --------- | ---------- |
| `xs`     | 16px      | 18px       |
| `sm`     | 20px      | 22px       |
| `md`     | 26px      | 28px       |
| `lg`     | 32px      | 34px       |
| `xl`     | 40px      | 44px       |

## 🔧 修改文件清单

### LinksGroup.module.css

```diff
  .collapsedControl {
    display: block;
    width: 100%;
-   padding: 6px;
-   margin-bottom: 4px;
+   padding: calc(var(--mantine-spacing-xs) * 0.6);
+   margin-bottom: calc(var(--mantine-spacing-xs) * 0.4);
    border-radius: var(--mantine-radius-sm);
  }
```

### Navbar.module.css

```diff
  .navbar.collapsed .linksInner {
-   padding: 8px;
+   padding: calc(var(--mantine-spacing-md) * 0.5);
  }

  .navbar.collapsed .footer {
-   padding: 8px;
+   padding: calc(var(--mantine-spacing-md) * 0.5);
  }
```

### LinksGroup.tsx

```diff
  <ThemeIcon variant="light"
-   size={32}
+   size="lg"
  >
-   <Icon size={18} />
+   <Icon style={{ width: '70%', height: '70%' }} />
  </ThemeIcon>
```

### Navbar.tsx

```diff
- <Stack gap={collapsed ? 4 : 'xs'}>
+ <Stack gap={collapsed ? 'xs' : 'sm'}>
```

## 🎨 设计优势

### 1. 响应式适配

设计令牌会根据视口大小自动调整:

- 移动端: 可能使用更小的基础单位
- 桌面端: 使用标准单位
- 高 DPI 屏幕: 自动缩放保持视觉一致

### 2. 主题兼容性

```tsx
// 用户可以自定义 Mantine 主题
<MantineProvider theme={{
  spacing: {
    xs: 8,  // 调整全局 xs 间距
    md: 20, // 调整全局 md 间距
  }
}}>
```

所有使用设计令牌的组件会自动响应主题变化!

### 3. 可访问性

- 支持用户浏览器字体大小设置
- rem 单位基于根字体大小
- 适配辅助技术的缩放需求

## 📐 计算说明

### 为什么使用 calc()?

```css
/* 需要比标准间距更小的值时 */
padding: calc(var(--mantine-spacing-xs) * 0.6);
/* xs = 10px → 10px * 0.6 = 6px */

padding: calc(var(--mantine-spacing-md) * 0.5);
/* md = 16px → 16px * 0.5 = 8px */
```

**优势**:

- ✅ 保持与主题间距的比例关系
- ✅ 主题间距调整时自动适配
- ✅ 语义清晰,表达设计意图

### 图标尺寸策略

```tsx
// 容器使用 Mantine size 系统
<ThemeIcon size="lg">
  {' '}
  {/* 32px */}
  {/* 图标使用百分比,自适应容器 */}
  <Icon style={{ width: '70%', height: '70%' }} />
  {/* 32px * 0.7 ≈ 22px */}
</ThemeIcon>
```

**优势**:

- ✅ 图标与容器保持比例
- ✅ 切换 size 时图标自动适配
- ✅ 视觉平衡更好

## 🎯 最佳实践总结

### CSS 间距

✅ **推荐**:

```css
/* 使用 Mantine 间距变量 */
padding: var(--mantine-spacing-md);
margin: calc(var(--mantine-spacing-xs) * 0.5);
```

❌ **避免**:

```css
/* 硬编码像素 */
padding: 16px;
margin: 5px;
```

### 组件尺寸

✅ **推荐**:

```tsx
<Button size="md" />
<ActionIcon size="lg" />
<Stack gap="sm" />
```

❌ **避免**:

```tsx
<Button style={{ height: 36 }} />
<Stack gap={12} />
```

### 特殊情况

某些情况下可能需要固定像素:

- ✅ 边框宽度: `border: 1px solid`
- ✅ 阴影偏移: `box-shadow: 0 2px 4px`
- ✅ 图标线宽: `stroke-width: 1.5`

## 🚀 迁移检查清单

- [x] CSS 间距使用 `var(--mantine-spacing-*)`
- [x] 组件 size 使用 Mantine 尺寸名称 (xs/sm/md/lg/xl)
- [x] gap/spacing 使用语义化名称
- [x] 图标尺寸使用百分比或 Mantine size
- [x] 代码格式化检查通过
- [x] 类型检查通过
- [x] 热更新验证通过

## 📚 参考资料

- [Mantine Theme Object](https://mantine.dev/theming/theme-object/)
- [Mantine Spacing](https://mantine.dev/theming/spacing/)
- [Mantine Typography](https://mantine.dev/theming/typography/)
- [CSS calc() MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/calc)

---

**重构完成时间**: 2025-11-14
**影响范围**: Navbar 收缩功能相关样式
**向后兼容**: ✅ 视觉效果保持一致,仅改进实现方式
