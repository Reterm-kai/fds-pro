# 响应式字体系统使用指南

## 📚 核心配置文件

**唯一真实来源（Single Source of Truth）：**

```
src/shared/config/typography.ts
```

这个文件包含了项目中所有字体相关的配置，其他地方都应该引用这里的值。

## 🎯 快速开始

### 1. 在 React 组件中使用

```tsx
import { FONT_SIZES_PX, rem } from '@/shared/config/typography'

function MyComponent() {
  return (
    <div>
      {/* 使用 Mantine 的尺寸 */}
      <Text size="md">标准文本</Text>

      {/* 使用像素值（如图标）*/}
      <Icon size={FONT_SIZES_PX.lg} />

      {/* 使用 rem 值（内联样式）*/}
      <div style={{ fontSize: rem(FONT_SIZES_PX.xl) }}>自定义文本</div>
    </div>
  )
}
```

### 2. 在 CSS 中使用

```css
/* src/index.css 已经配置好了 CSS 变量 */
.my-text {
  font-size: var(--font-size-md);
  line-height: var(--line-height-normal);
}

/* 或者直接使用 rem 值 */
.custom-text {
  font-size: 1rem; /* 16px */
}
```

### 3. 在 Mantine 主题中使用

主题配置已经自动引用了 `typography.ts`：

```tsx
// src/app/providers/theme.ts
import { FIXED_FONT_SIZES, LINE_HEIGHTS } from '@/shared/config/typography'

export const theme = createTheme({
  fontSizes: {
    xs: rem(FIXED_FONT_SIZES.xs), // 自动引用
    // ...
  },
})
```

## 📖 字体大小规范

### 固定字体大小（用于 Mantine 组件）

| 键名 | rem 值 | 像素值 | 用途         |
| ---- | ------ | ------ | ------------ |
| xxs  | 0.625  | 10px   | 超小辅助信息 |
| xs   | 0.75   | 12px   | 次要文本     |
| sm   | 0.875  | 14px   | 小文本、标签 |
| md   | 1      | 16px   | 正文（默认） |
| lg   | 1.125  | 18px   | 强调文本     |
| xl   | 1.25   | 20px   | 小标题       |
| 2xl  | 1.5    | 24px   | 标题         |
| 3xl  | 2      | 32px   | 主标题       |
| 4xl  | 2.5    | 40px   | 超大标题     |

### 流体字体大小（用于 CSS 变量）

响应式字体会根据视口宽度自动调整：

```css
/* 基础字体：14px（小屏）→ 16px（大屏）*/
font-size: var(--font-size-md);

/* 等同于 */
font-size: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
```

## 🎨 使用场景示例

### 场景 1：基础文本组件

```tsx
import { Text } from '@mantine/core'

// ✅ 推荐：使用 Mantine 的尺寸系统
<Text size="md">这是正文文本</Text>
<Text size="sm">这是小号文本</Text>
```

### 场景 2：自定义图标大小

```tsx
import { FONT_SIZES_PX } from '@/shared/config/typography'
import { User } from 'lucide-react'

// ✅ 推荐：使用统一配置
<User size={FONT_SIZES_PX.lg} />  // 18px

// ❌ 避免：硬编码
<User size={18} />
```

### 场景 3：内联样式

```tsx
import { rem, pxToRem } from '@/shared/config/typography'

// ✅ 推荐：使用工具函数
<div style={{ fontSize: rem(1.5) }}>自定义文本</div>

// ✅ 推荐：像素转 rem
<div style={{ fontSize: rem(pxToRem(24)) }}>24px 的文本</div>

// ❌ 避免：硬编码像素值
<div style={{ fontSize: '24px' }}>不推荐</div>
```

### 场景 4：标题组件

```tsx
import { Title } from '@mantine/core'

// ✅ 推荐：使用 Mantine Title 组件
<Title order={1}>一级标题</Title>  // 自动使用主题配置
<Title order={2}>二级标题</Title>
```

### 场景 5：CSS-in-JS

```tsx
import { FIXED_FONT_SIZES } from '@/shared/config/typography'

const styles = {
  text: {
    fontSize: `${FIXED_FONT_SIZES.lg}rem`, // 1.125rem (18px)
  },
}
```

## 🔧 修改字体大小

### 全局调整

**修改一个文件即可影响全局：**

```typescript
// src/shared/config/typography.ts

export const FIXED_FONT_SIZES = {
  md: 1.125, // 改为 18px（原来是 16px）
  // 其他配置会自动跟随
}
```

### 调整流体字体范围

```typescript
export const FLUID_FONT_SIZES = {
  // 将基础字体从 14-16px 改为 15-18px
  md: 'clamp(0.9375rem, 0.85rem + 0.4375vw, 1.125rem)',
}
```

## 📏 行高使用

```tsx
import { LINE_HEIGHTS } from '@/shared/config/typography'

// 在 CSS 中
.title {
  line-height: var(--line-height-tight);  // 1.2
}

// 在 React 中
<Text style={{ lineHeight: LINE_HEIGHTS.normal }}>
  标准行高的文本
</Text>
```

## 🎭 字体粗细

```tsx
import { FONT_WEIGHTS } from '@/shared/config/typography'

<Text fw={FONT_WEIGHTS.semibold}>半粗体文本</Text>
<Text fw={FONT_WEIGHTS.bold}>粗体文本</Text>
```

## 🧪 工具函数

### rem() - 格式化 rem 值

```typescript
import { rem } from '@/shared/config/typography'

rem(1.5) // "1.5rem"
rem(2) // "2rem"
```

### pxToRem() - 像素转 rem

```typescript
import { pxToRem } from '@/shared/config/typography'

pxToRem(16) // 1
pxToRem(24) // 1.5
pxToRem(32) // 2
```

### remToPx() - rem 转像素

```typescript
import { remToPx } from '@/shared/config/typography'

remToPx(1) // 16
remToPx(1.5) // 24
remToPx(2) // 32
```

## 📋 最佳实践

### ✅ 推荐做法

1. **优先使用 Mantine 组件的 size 属性**

   ```tsx
   <Text size="md">文本</Text>
   <Button size="lg">按钮</Button>
   ```

2. **自定义时引用配置常量**

   ```tsx
   import { FONT_SIZES_PX } from '@/shared/config/typography'
   ;<Icon size={FONT_SIZES_PX.lg} />
   ```

3. **使用 CSS 变量**

   ```css
   font-size: var(--font-size-md);
   ```

4. **使用工具函数**
   ```tsx
   import { rem, pxToRem } from '@/shared/config/typography'
   style={{ fontSize: rem(pxToRem(20)) }}
   ```

### ❌ 避免做法

1. **硬编码像素值**

   ```tsx
   // ❌ 不要这样
   <div style={{ fontSize: '16px' }}>
   ```

2. **魔术数字**

   ```tsx
   // ❌ 不要这样
   <Icon size={18} />
   ```

3. **重复定义尺寸**
   ```typescript
   // ❌ 不要在其他文件中重新定义字体大小
   const fontSize = 16 // 应该引用 FONT_SIZES_PX.md
   ```

## 🔍 调试技巧

### 1. 查看当前字体大小

```typescript
import { BASE_FONT_SIZE, remToPx } from '@/shared/config/typography'

console.log('根字体大小:', BASE_FONT_SIZE)
console.log('1rem =', remToPx(1), 'px')
```

### 2. 浏览器检查

```javascript
// 在浏览器控制台
getComputedStyle(document.documentElement).fontSize // "16px"
```

### 3. 测试响应式

- 调整浏览器窗口大小
- 使用浏览器缩放（Ctrl +/-）
- 开发者工具 > 响应式设计模式

## 🎯 常见问题

### Q: 为什么有固定字体和流体字体两套？

**A:**

- **固定字体（rem）**: 用于 Mantine 组件，保证组件尺寸一致
- **流体字体（clamp）**: 用于 CSS 变量，实现响应式排版

### Q: 何时使用 px、rem 还是 em？

**A:**

- **rem**: 相对于根元素，用于全局尺寸
- **em**: 相对于父元素，用于组件内部
- **px**: 仅在必要时（如边框、阴影）

### Q: 如何添加新的字体大小？

**A:** 在 `typography.ts` 中添加：

```typescript
export const FIXED_FONT_SIZES = {
  // ... 现有配置
  '5xl': 3, // 48px
}

export const FLUID_FONT_SIZES = {
  // ... 现有配置
  '5xl': 'clamp(2.5rem, 2rem + 2.5vw, 3rem)',
}
```

## 📚 相关文档

- [Mantine Typography](https://mantine.dev/theming/typography/)
- [CSS clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)
- [Responsive Typography](https://web.dev/responsive-web-design-basics/#responsive-typography)

## 🚀 快速命令

```bash
# 格式化代码
pnpm format

# 类型检查
pnpm build

# 开发服务器
pnpm dev
```

---

**维护者：** 前端团队
**最后更新：** 2025-11-10
