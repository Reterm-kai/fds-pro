# 基础列表页面重构计划

## 执行时间

2025-11-18

## 问题概述

提交 `16b0dff` 中的基础列表页面实现存在多处违反 FSD 架构规范和 Mantine UI 样式规范的问题。

## 详细问题分析

### 1. FSD 架构违规

#### 问题 1.1: Pages 层包含额外文件

- **文件**: `src/pages/list-basic/BasicListPage.module.css`
- **违规**: Pages 层只能包含 `index.tsx`,不允许额外的 CSS 模块文件
- **依据**: CLAUDE.md 规定"所有页面组件必须直接在 index.tsx 中定义"
- **影响**: 破坏了 FSD 的"就近原则"和一致性

#### 问题 1.2: Features 命名不当

- **目录**: `src/features/basic-list/`
- **违规**: "basic-list" 不是业务特性名称,而是 UI 模式描述
- **应改为**: `src/features/collection-list/`
- **依据**: FSD 要求 feature 名称反映业务场景

### 2. Mantine UI 样式违规

#### 问题 2.1: 内联 style 硬编码

- **文件**: `CollectionListFilters.tsx:185`
  ```tsx
  style={{ display: 'flex', alignItems: 'flex-end' }}
  ```
- **违规**: 使用内联样式硬编码布局属性
- **应改为**: 使用 Mantine `Flex` 组件或 CSS 模块
- **严重程度**: 🔴 严重

- **文件**: `CollectionListTable.tsx:105`
  ```tsx
  style={{ display: 'flex', alignItems: 'center' }}
  ```
- **违规**: 同上
- **严重程度**: 🔴 严重

#### 问题 2.2: cursor 样式硬编码

- **文件**: `CollectionListTable.tsx:164, 173, 184, 193`
  ```tsx
  style={{ cursor: 'pointer' }}
  ```
- **违规**: 多处使用内联样式设置 cursor
- **应改为**: 使用 CSS 模块或 Mantine 的 sx prop
- **严重程度**: 🔴 严重

#### 问题 2.3: 非标准尺寸使用

- **文件**: `CollectionListTable.tsx:107-113`
  ```tsx
  <Skeleton h="calc(var(--mantine-spacing-lg) * 1.4)" w="10%" />
  ```
- **违规**:
  - `lg * 1.4 = 20px * 1.4 = 28px` 不是 Mantine 标准尺寸
  - 应该使用标准 spacing 值或精确的 calc 表达式
- **严重程度**: 🟡 中等

#### 问题 2.4: 复杂的 calc 嵌套

- **文件**: `BasicListPage.module.css:2`
  ```css
  min-height: calc(100vh - calc(var(--mantine-spacing-xl) * 4));
  ```
- **违规**: 双重 calc() 不必要,且 `xl * 4 = 128px` 不是标准值
- **应简化**: `min-height: calc(100vh - 128px)` 或使用其他方案
- **严重程度**: 🟡 中等

## 优化方案

### 方案 1: 重构目录结构

#### 1.1 删除 Pages 层的 CSS 文件

```bash
# 删除
src/pages/list-basic/BasicListPage.module.css

# 样式迁移到组件内联或使用 Mantine 组件
```

#### 1.2 重命名 Features 目录

```bash
# 从
src/features/basic-list/

# 改为
src/features/collection-list/
```

#### 1.3 更新所有引用路径

- `src/app/routes/router.tsx`
- `src/pages/list-basic/index.tsx`
- `src/features/collection-list/index.ts`

### 方案 2: 修复 Mantine UI 样式

#### 2.1 移除所有内联 style 属性

**CollectionListFilters.tsx:185**

```tsx
// 修改前
<Grid.Col
  span={{ base: 12, md: 6, lg: 3 }}
  style={{ display: 'flex', alignItems: 'flex-end' }}
>

// 修改后
<Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
  <Flex align="flex-end" justify="flex-end" w="100%">
```

**CollectionListTable.tsx:105**

```tsx
// 修改前
<Group
  key={index}
  gap="md"
  style={{ display: 'flex', alignItems: 'center' }}
>

// 修改后
<Group key={index} gap="md" align="center">
```

#### 2.2 移除 cursor 内联样式

**CollectionListTable.tsx:164, 173, 184, 193**

创建 CSS 模块文件:

```css
/* CollectionListTable.module.css */
.sortableHeader {
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.sortableHeader:hover {
  background-color: light-dark(
    var(--mantine-color-gray-1),
    var(--mantine-color-dark-6)
  );
}
```

修改组件:

```tsx
import classes from './CollectionListTable.module.css'

<Table.Th
  onClick={() => onSortChange('code')}
  className={classes.sortableHeader}
>
```

#### 2.3 修复骨架屏尺寸

```tsx
// 修改前
<Skeleton h="calc(var(--mantine-spacing-lg) * 1.4)" w="10%" />

// 修改后 - 使用标准 spacing
<Skeleton h="lg" w="10%" />
```

#### 2.4 简化 Pages 样式

直接在组件中使用 Mantine 组件:

```tsx
// 删除 BasicListPage.module.css

// 在 index.tsx 中
export function BasicListPage() {
  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <div>
          <Title order={1}>基础列表</Title>
          <Text size="sm" c="dimmed">
            典型的查询表格模板,支持分页、检索和排序能力。
          </Text>
        </div>
        <CollectionsBasicView />
      </Stack>
    </Container>
  )
}
```

## 实施步骤

### 步骤 1: 准备工作

- [x] 分析当前代码问题
- [x] 创建详细重构计划
- [ ] 备份当前工作

### 步骤 2: 重构目录结构

1. 重命名 `features/basic-list/` → `features/collection-list/`
2. 更新所有 import 路径
3. 删除 `pages/list-basic/BasicListPage.module.css`

### 步骤 3: 修复样式问题

1. 创建 `CollectionListTable.module.css`
2. 移除所有内联 style 属性
3. 修复骨架屏尺寸
4. 重构 Pages 层样式

### 步骤 4: 验证

1. 运行 `pnpm build` 检查类型错误
2. 运行 `pnpm lint` 检查代码质量
3. 运行 `pnpm dev` 检查功能正常
4. 手动测试所有交互功能

### 步骤 5: 提交

1. 创建规范的 commit message
2. 生成验证报告

## 预期结果

### 目录结构

```
src/
├── features/
│   └── collection-list/          ✅ 重命名
│       ├── ui/
│       │   ├── CollectionListTable.tsx
│       │   ├── CollectionListTable.module.css  ✅ 新增
│       │   ├── CollectionListFilters.tsx
│       │   └── CollectionsBasicView.tsx
│       ├── api/
│       └── index.ts
└── pages/
    └── list-basic/
        └── index.tsx             ✅ 唯一文件
```

### 代码质量

- ✅ 所有内联 style 已移除
- ✅ 所有样式使用 Mantine 设计系统变量
- ✅ 符合 FSD 架构规范
- ✅ 通过 ESLint 和 TypeScript 检查
- ✅ 功能完全正常

## 风险评估

- **低风险**: 纯重构,不改变功能逻辑
- **影响范围**: 仅限基础列表相关文件
- **回滚方案**: Git revert

## 参考文档

- CLAUDE.md - FSD 架构规范
- CLAUDE.md - Mantine UI 样式规范
- Mantine 官方文档
