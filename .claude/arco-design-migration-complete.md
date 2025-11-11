# Arco Design 完整迁移报告

## 📋 任务概述

将项目的 Mantine UI theme 样式完全替换为 Arco Design 设计规范，包括：

- ✅ 颜色系统（主色、功能色、中性色）
- ✅ 字体系统（字号、行高、字重）
- ✅ 间距系统
- ✅ 圆角系统（方正简洁风格）
- ✅ 阴影系统
- ✅ 尺寸系统

## 🎯 核心改动

### 1. 创建 Arco Design Tokens 配置文件

**文件**: `src/shared/config/arco-design-tokens.ts`

**内容**:

- **8个完整色板**: Blue(主色)、Green(成功)、Orange(警告)、Red(错误)、Cyan(链接)、Gray(中性)、Purple、Magenta
- **间距系统**: 基于 4px 网格，从 mini(4px) 到 xlarge(24px)
- **圆角系统**: small(2px)、medium(4px)、large(8px) - 方正简洁风格
- **阴影系统**: 5级阴影，从最小(1px)到超大(32px)
- **字体系统**: 基于 14px 基准，从 12px 到 36px
- **尺寸系统**: 组件高度从 mini(24px) 到 large(36px)
- **动画系统**: 时长、曲线
- **Z-Index 层级**: 从 base(0) 到 tooltip(1070)

### 2. 更新字体配置

**文件**: `src/shared/config/typography.ts`

**关键改动**:

```typescript
// 修改前
export const BASE_FONT_SIZE = 16

export const FIXED_FONT_SIZES = {
  xxs: 0.75, // 12px
  xs: 0.875, // 14px
  sm: 1, // 16px
  md: 1.125, // 18px
  // ...
}

// 修改后
export const BASE_FONT_SIZE = 14 // Arco Design 标准

export const FIXED_FONT_SIZES = {
  xxs: 0.857, // 12px (12/14)
  xs: 1, // 14px (14/14) - Arco Design 基础字号
  sm: 1.143, // 16px (16/14)
  md: 1.286, // 18px (18/14)
  // ...
}
```

### 3. 更新主题配置

**文件**: `src/app/providers/theme.ts`

**关键改动**:

#### 3.1 颜色系统

```typescript
// 添加 Arco Design 色板
import {
  ARCO_BLUE,
  ARCO_GREEN,
  ARCO_ORANGE,
  ARCO_RED,
  ARCO_CYAN,
  ARCO_GRAY,
  ARCO_PURPLE,
  ARCO_MAGENTA,
  ARCO_SPACING,
  ARCO_RADIUS,
  ARCO_SHADOWS,
} from '@/shared/config/arco-design-tokens'

// 转换为 Mantine ColorsTuple
const arcoblue: MantineColorsTuple = [
  ARCO_BLUE[1], // #e8f3ff
  ARCO_BLUE[2], // #bedaff
  // ...
  ARCO_BLUE[6], // #165dff - 主色
  // ...
  ARCO_BLUE[10], // #000d4d
]

// 应用到主题
export const theme = createTheme({
  colors: {
    arcoblue,
    arcogreen,
    arcoorange,
    arcored,
    arcocyan,
    arcogray,
    arcopurple,
    arcomagenta,
  },
  primaryColor: 'arcoblue', // 设置主色
  // ...
})
```

#### 3.2 间距系统

```typescript
// 修改前
spacing: {
  xs: rem(4),
  sm: rem(8),
  md: rem(16),
  lg: rem(24),
  xl: rem(32),
}

// 修改后
spacing: {
  xs: rem(ARCO_SPACING.mini),    // 4px
  sm: rem(ARCO_SPACING.small),   // 8px
  md: rem(ARCO_SPACING.default), // 16px
  lg: rem(ARCO_SPACING.large),   // 20px
  xl: rem(ARCO_SPACING.xlarge),  // 24px
}
```

#### 3.3 圆角系统（方正风格）

```typescript
// 修改前
radius: {
  xs: rem(2),
  sm: rem(4),
  md: rem(8),
  lg: rem(16),
  xl: rem(32),
}

// 修改后 - Arco Design 方正简洁风格
radius: {
  xs: rem(ARCO_RADIUS.small),  // 2px
  sm: rem(ARCO_RADIUS.small),  // 2px
  md: rem(ARCO_RADIUS.medium), // 4px
  lg: rem(ARCO_RADIUS.large),  // 8px
  xl: rem(ARCO_RADIUS.large),  // 8px
}
defaultRadius: 'sm',  // 默认 2px 小圆角
```

#### 3.4 阴影系统

```typescript
// 修改前
shadows: {
  xs: '0 0.0625rem 0.125rem rgba(0, 0, 0, 0.05)',
  sm: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.05)',
  md: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)',
  lg: '0 0.625rem 1rem rgba(0, 0, 0, 0.15)',
  xl: '0 1rem 2rem rgba(0, 0, 0, 0.2)',
}

// 修改后
shadows: {
  xs: ARCO_SHADOWS[1],  // 0 0 1px rgba(0, 0, 0, 0.3)
  sm: ARCO_SHADOWS[2],  // 0 2px 8px rgba(0, 0, 0, 0.12)
  md: ARCO_SHADOWS[3],  // 0 4px 16px rgba(0, 0, 0, 0.12)
  lg: ARCO_SHADOWS[4],  // 0 8px 24px rgba(0, 0, 0, 0.12)
  xl: ARCO_SHADOWS[5],  // 0 12px 32px rgba(0, 0, 0, 0.12)
}
```

#### 3.5 缩放系数

```typescript
// 修改前
scale: 1,  // 基于 16px

// 修改后
scale: 14 / 16,  // 基于 14px (Arco Design 标准)
```

## 🎨 设计规范对比

### 颜色系统

| 类型 | Mantine 默认 | Arco Design             | 说明     |
| ---- | ------------ | ----------------------- | -------- |
| 主色 | Blue         | #165dff (Arco Blue 6)   | 品牌蓝色 |
| 成功 | Green        | #00b42a (Arco Green 6)  | 成功状态 |
| 警告 | Yellow       | #ff7d00 (Arco Orange 6) | 警告信息 |
| 错误 | Red          | #f53f3f (Arco Red 6)    | 错误状态 |
| 链接 | -            | #14c9c9 (Arco Cyan 6)   | 超链接   |

### 字体系统

| 类型     | Mantine 默认 | Arco Design | 说明       |
| -------- | ------------ | ----------- | ---------- |
| 基准字号 | 16px         | 14px        | 根字体大小 |
| 正文     | 16px (1rem)  | 14px (1rem) | 主要文本   |
| 小文本   | 14px         | 12px        | 辅助信息   |
| 标题     | 18-36px      | 16-32px     | 各级标题   |

### 圆角系统

| 类型         | Mantine 默认 | Arco Design  | 视觉风格       |
| ------------ | ------------ | ------------ | -------------- |
| xs           | 2px          | 2px          | 最小圆角       |
| sm           | 4px          | 2px          | 小圆角（默认） |
| md           | 8px          | 4px          | 中圆角         |
| lg           | 16px         | 8px          | 大圆角         |
| xl           | 32px         | 8px          | 超大圆角       |
| **整体风格** | **圆润**     | **方正简洁** | **关键差异**   |

### 间距系统

| 类型 | Mantine 默认 | Arco Design    | 说明     |
| ---- | ------------ | -------------- | -------- |
| xs   | 4px          | 4px (mini)     | 迷你间距 |
| sm   | 8px          | 8px (small)    | 小间距   |
| md   | 16px         | 16px (default) | 默认间距 |
| lg   | 24px         | 20px (large)   | 大间距   |
| xl   | 32px         | 24px (xlarge)  | 超大间距 |

### 阴影系统

| 类型 | Mantine 默认 | Arco Design | 使用场景 |
| ---- | ------------ | ----------- | -------- |
| xs   | 0 1px 2px    | 0 0 1px     | 最小阴影 |
| sm   | 0 2px 4px    | 0 2px 8px   | 悬浮卡片 |
| md   | 0 4px 8px    | 0 4px 16px  | 弹窗     |
| lg   | 0 10px 16px  | 0 8px 24px  | 抽屉     |
| xl   | 0 16px 32px  | 0 12px 32px | 模态框   |

## ✅ 验证结果

### 代码质量检查

```bash
✅ pnpm format
   - 所有文件格式化成功

✅ pnpm exec tsc --noEmit
   - TypeScript 类型检查通过

✅ pnpm build
   - 构建成功
   - 输出: dist/index.html (0.65 kB)
   - CSS: dist/assets/index-Bxl3nyhT.css (195.26 kB)
   - JS: dist/assets/index-BtjG1T16.js (686.16 kB)
   - 构建时间: 514ms
```

## 📊 影响范围

### 视觉效果变化

1. **圆角更小更方正**
   - 按钮、输入框、卡片等组件的圆角从 4px 减小到 2px
   - 整体呈现更加方正、简洁的视觉风格

2. **颜色更鲜明**
   - 主色从 Mantine Blue 改为 Arco Blue (#165dff)
   - 功能色使用 Arco Design 标准色板

3. **字体更紧凑**
   - 基准字号从 16px 改为 14px
   - 所有文本相应缩小，信息密度提高

4. **阴影更柔和**
   - 阴影透明度统一为 0.12（之前 0.05-0.2）
   - 呈现更加统一的层次感

5. **间距微调**
   - large 间距从 24px 改为 20px
   - xlarge 间距从 32px 改为 24px

### 组件受影响程度

| 组件类型        | 受影响程度 | 主要变化         |
| --------------- | ---------- | ---------------- |
| Button          | ⭐⭐⭐⭐⭐ | 圆角、颜色、字体 |
| Input/TextInput | ⭐⭐⭐⭐⭐ | 圆角、字体、间距 |
| Card            | ⭐⭐⭐⭐   | 圆角、阴影、间距 |
| Modal/Drawer    | ⭐⭐⭐⭐   | 阴影、圆角       |
| Badge/Tag       | ⭐⭐⭐     | 颜色、圆角、字体 |
| Typography      | ⭐⭐⭐⭐⭐ | 字体大小、行高   |

## 🎯 设计原则

### Arco Design 核心特点

1. **方正简洁**
   - 小圆角设计（2px-8px）
   - 避免过度圆润

2. **信息密度高**
   - 14px 基准字号
   - 紧凑的间距设计

3. **层次分明**
   - 统一的阴影透明度
   - 清晰的 Z-Index 层级

4. **色彩鲜明**
   - 饱和度适中的品牌色
   - 完整的功能色体系

## 📝 使用示例

### 在组件中使用 Arco Design 颜色

```typescript
import { Button } from '@mantine/core'

// 使用 Arco Design 主色
<Button color="arcoblue">主要按钮</Button>

// 使用 Arco Design 成功色
<Button color="arcogreen">成功按钮</Button>

// 使用 Arco Design 警告色
<Button color="arcoorange">警告按钮</Button>

// 使用 Arco Design 错误色
<Button color="arcored">危险按钮</Button>
```

### 直接使用 Design Tokens

```typescript
import {
  ARCO_BLUE,
  ARCO_SPACING,
  ARCO_RADIUS,
  ARCO_SHADOWS,
} from '@/shared/config/arco-design-tokens'

// 使用颜色
<Box style={{ color: ARCO_BLUE[6] }}>Arco Blue 主色</Box>

// 使用间距
<Stack gap={ARCO_SPACING.large}>...</Stack>

// 使用圆角
<Paper style={{ borderRadius: ARCO_RADIUS.medium }}>...</Paper>

// 使用阴影
<Card style={{ boxShadow: ARCO_SHADOWS[3] }}>...</Card>
```

## 🔧 技术细节

### 色板转换

Arco Design 使用 10 级色板，Mantine 使用 10 级 ColorsTuple，完美匹配：

```typescript
// Arco Design 色板结构
ARCO_BLUE = {
  1: '#e8f3ff', // 最浅
  2: '#bedaff',
  3: '#94bfff',
  4: '#6aa1ff',
  5: '#4080ff',
  6: '#165dff', // 主色（第6级）
  7: '#0e42d2',
  8: '#072ca6',
  9: '#031a79',
  10: '#000d4d', // 最深
}

// 转换为 Mantine ColorsTuple
const arcoblue: MantineColorsTuple = [
  ARCO_BLUE[1], // 索引 0
  ARCO_BLUE[2], // 索引 1
  // ...
  ARCO_BLUE[6], // 索引 5 - Mantine 默认使用索引 5 作为主色
  // ...
  ARCO_BLUE[10], // 索引 9
]
```

### rem 单位转换

```typescript
// BASE_FONT_SIZE = 14px 时
1rem = 14px

// 转换关系
12px = 12/14 = 0.857rem
14px = 14/14 = 1rem
16px = 16/14 = 1.143rem
18px = 18/14 = 1.286rem
20px = 20/14 = 1.429rem
```

## 🚀 后续优化建议

1. **组件级优化**
   - 考虑为特定组件创建 Arco Design 风格的样式覆盖
   - 使用 Mantine 的 `styles` API 进一步细化样式

2. **响应式优化**
   - 根据 Arco Design 的响应式规范调整断点
   - 优化移动端字体大小

3. **暗色主题**
   - 添加 Arco Design 暗色主题色板
   - 配置暗色模式下的颜色映射

4. **性能优化**
   - 考虑按需加载色板
   - 优化 CSS 打包体积

## 📦 文件清单

### 新增文件

- ✅ `src/shared/config/arco-design-tokens.ts` (463 行)

### 修改文件

- ✅ `src/shared/config/typography.ts`
- ✅ `src/app/providers/theme.ts`

### 文档文件

- ✅ `.claude/arco-design-migration-complete.md`

## 🎉 总结

本次迁移成功将项目的设计系统从 Mantine 默认风格完全迁移到 Arco Design 设计规范，包括：

- ✅ **8个完整色板**，提供丰富的颜色选择
- ✅ **14px 基准字号**，符合 Arco Design 标准
- ✅ **2-8px 小圆角**，呈现方正简洁风格
- ✅ **统一阴影系统**，层次分明
- ✅ **完整的间距系统**，基于 4px 网格
- ✅ **所有验证通过**，代码质量保证

所有改动遵循 Arco Design 官方设计规范，同时保持与 Mantine UI 组件库的兼容性，实现了**组件不变、样式全变**的目标。

---

**迁移完成时间**: 2025-11-11
**验证状态**: ✅ 全部通过
**影响范围**: 全局主题系统
**风险等级**: 低（仅样式修改，不影响功能）
