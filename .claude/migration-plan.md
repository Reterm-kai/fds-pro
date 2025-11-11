# Mantine UI 风格到 Arco Design 风格迁移计划

## 项目概述

**任务目标**: 保留 Mantine UI 组件库，仅将设计风格（圆角、字体、间距、颜色、尺寸）调整为 Arco Design 规范

**迁移策略**: 通过修改 Mantine 主题配置文件，将所有设计变量调整为 Arco Design 的设计规范值，实现视觉风格的统一

## 当前项目状态

### 技术栈

- React 19.1.1 + TypeScript 5.9.3
- **Mantine UI 8.3.6** (保留)
- Vite (rolldown-vite 7.1.14)
- FSD 架构

### 现有设计配置文件

- `src/shared/config/typography.ts` - 字体系统配置
- `src/app/providers/theme.ts` - Mantine 主题配置

## Arco Design 设计规范分析

### 1. 间距系统 (Spacing)

**Arco Design 标准间距**:

- `mini`: 4px
- `small`: 8px
- `medium`: 16px
- `large`: 24px

**对比当前 Mantine 间距**:

```typescript
// 当前 (Mantine)
spacing: {
  xs: rem(4),   // 4px ✓ 保持不变
  sm: rem(8),   // 8px ✓ 保持不变
  md: rem(16),  // 16px ✓ 保持不变
  lg: rem(24),  // 24px ✓ 保持不变
  xl: rem(32),  // 32px - 可选保留或移除
}
```

**结论**: 间距系统基本一致，无需大幅调整

### 2. 圆角系统 (Border Radius)

**Arco Design 圆角规范**:

- 小圆角: 2px
- 中圆角: 4px
- 大圆角: 8px
- 超大圆角: 16px
- **默认圆角**: 2px (更偏向小圆角)

**对比当前 Mantine 圆角**:

```typescript
// 当前 (Mantine)
radius: {
  xs: rem(2),   // 2px ✓ 保持不变
  sm: rem(4),   // 4px ✓ 保持不变
  md: rem(8),   // 8px ✓ 保持不变
  lg: rem(16),  // 16px ✓ 保持不变
  xl: rem(32),  // 32px ✗ 需调整为更小值
}
defaultRadius: 'sm' // 4px
```

**调整建议**:

- 将 `xl` 从 32px 改为 16px
- 将 `defaultRadius` 从 'sm' (4px) 改为 'xs' (2px) 或保持 'sm'

### 3. 颜色系统 (Colors)

**Arco Design 主色调**:

- **主色**: `#165DFF` (arcoblue-6)
- 色板: arcoblue-1 ~ arcoblue-10

**预设功能色**:

- 成功: green / `#00B42A`
- 警告: orange / `#FF7D00`
- 错误: red / `#F53F3F`
- 信息: blue / `#165DFF`

**对比当前 Mantine 颜色**:

- Mantine 默认主色为蓝色系列（需替换为 #165DFF）
- 功能色需调整为 Arco Design 规范

### 4. 字体系统 (Typography)

**Arco Design 字体规范**:

- **基础字号**: 14px (比 Mantine 的 16px 小)
- **字体族**: 系统字体栈
- **字重**:
  - normal: 400
  - medium: 500
  - semibold: 600
  - bold: 700

**对比当前 Mantine 字体**:

```typescript
// 当前 (Mantine) - BASE_FONT_SIZE = 16
fontSizes: {
  xs: 0.875rem,  // 14px → 应为 12px (Arco)
  sm: 1rem,      // 16px → 应为 14px (Arco)
  md: 1.125rem,  // 18px → 应为 16px (Arco)
  lg: 1.25rem,   // 20px → 应为 18px (Arco)
  xl: 1.5rem,    // 24px → 应为 20px (Arco)
}
```

**调整建议**:

- 将 `BASE_FONT_SIZE` 从 16 改为 14
- 重新计算所有字体大小以基于 14px

### 5. 阴影系统 (Shadows)

**Arco Design 阴影**:

- 通常更轻柔，透明度更低
- 层次感通过细微差异体现

## 迁移任务清单

### 阶段 1: 创建 Arco Design 设计规范文件 (30分钟)

- [ ] **创建** `src/shared/config/arco-design-tokens.ts`
  - 定义 Arco Design 的完整设计变量
  - 包括颜色调色板、间距、圆角、阴影等
  - 提供类型定义

### 阶段 2: 更新字体配置 (30分钟)

- [ ] **修改** `src/shared/config/typography.ts`
  - 调整 `BASE_FONT_SIZE` 从 16 改为 14
  - 更新 `FIXED_FONT_SIZES` 映射
  - 更新 `FONT_SIZES_PX` 映射
  - 调整 `FLUID_FONT_SIZES` 的 clamp 范围

### 阶段 3: 更新主题配置 (60分钟)

- [ ] **修改** `src/app/providers/theme.ts`
  - **圆角**: 调整 `radius.xl` 为 16px，`defaultRadius` 考虑改为 'xs'
  - **间距**: 验证是否与 Arco Design 一致
  - **颜色**: 引入 Arco Design 颜色调色板
    - 主色: #165DFF
    - 成功: #00B42A
    - 警告: #FF7D00
    - 错误: #F53F3F
  - **字体**: 使用新的字体大小配置
  - **阴影**: 调整为更轻柔的阴影

### 阶段 4: 创建 CSS 变量文件（可选）(15分钟)

- [ ] **创建** `src/shared/styles/arco-variables.css`
  - 定义 CSS 变量以兼容 Arco Design 命名
  - 例如: `--color-primary`, `--color-success` 等

### 阶段 5: 本地验证 (45分钟)

- [ ] **视觉验证**
  - [ ] 启动开发服务器: `pnpm dev`
  - [ ] 检查所有页面的圆角是否变小
  - [ ] 检查字体大小是否基于 14px
  - [ ] 检查主色调是否为 #165DFF
  - [ ] 检查间距是否符合预期
  - [ ] 检查阴影效果是否更轻柔

- [ ] **功能验证**
  - [ ] 所有交互功能正常
  - [ ] 响应式布局正常
  - [ ] 暗色模式正常切换

- [ ] **代码验证**
  - [ ] 类型检查: `pnpm exec tsc --noEmit`
  - [ ] 代码格式: `pnpm format:check`
  - [ ] Lint 检查: `pnpm lint`
  - [ ] 测试运行: `pnpm test:run`
  - [ ] 构建测试: `pnpm build`

### 阶段 6: 创建验证报告 (30分钟)

- [ ] **生成** `.claude/verification-report.md`
  - 迁移前后设计变量对比表
  - 视觉变化说明
  - 测试结果汇总
  - 已知问题和后续优化建议

### 阶段 7: 更新文档 (15分钟)

- [ ] **更新** `CLAUDE.md`
  - 说明设计风格已调整为 Arco Design
  - 更新设计规范说明

## 详细设计变量对比

### 圆角对比

| 尺寸     | Mantine 当前 | Arco Design | 变化 | 建议         |
| -------- | ------------ | ----------- | ---- | ------------ |
| xs       | 2px          | 2px         | =    | 保持         |
| sm       | 4px          | 4px         | =    | 保持         |
| md       | 8px          | 8px         | =    | 保持         |
| lg       | 16px         | 16px        | =    | 保持         |
| xl       | 32px         | 16px        | ↓    | 改为16px     |
| **默认** | sm (4px)     | xs (2px)    | ↓    | 可选调整为xs |

### 间距对比

| 尺寸 | Mantine | Arco | 变化     |
| ---- | ------- | ---- | -------- |
| xs   | 4px     | 4px  | =        |
| sm   | 8px     | 8px  | =        |
| md   | 16px    | 16px | =        |
| lg   | 24px    | 24px | =        |
| xl   | 32px    | -    | 可选移除 |

### 字体大小对比

| 级别 | Mantine (16px基准) | Arco (14px基准) | 变化 |
| ---- | ------------------ | --------------- | ---- |
| xxs  | 12px               | 12px            | =    |
| xs   | 14px               | 12px            | ↓    |
| sm   | 16px               | 14px            | ↓    |
| md   | 18px               | 16px            | ↓    |
| lg   | 20px               | 18px            | ↓    |
| xl   | 24px               | 20px            | ↓    |

### 颜色对比

| 类型 | Mantine       | Arco Design | 变化 |
| ---- | ------------- | ----------- | ---- |
| 主色 | Mantine蓝     | #165DFF     | 替换 |
| 成功 | green         | #00B42A     | 调整 |
| 警告 | yellow/orange | #FF7D00     | 调整 |
| 错误 | red           | #F53F3F     | 调整 |
| 信息 | blue          | #165DFF     | 调整 |

## 时间估算

| 阶段             | 预计时间      |
| ---------------- | ------------- |
| 创建设计规范文件 | 30分钟        |
| 更新字体配置     | 30分钟        |
| 更新主题配置     | 60分钟        |
| 创建CSS变量文件  | 15分钟        |
| 本地验证         | 45分钟        |
| 创建验证报告     | 30分钟        |
| 更新文档         | 15分钟        |
| **总计**         | **约3-4小时** |

## 成功标准

### 技术标准

- [ ] 项目可正常构建: `pnpm build` 成功
- [ ] 类型检查通过: `pnpm exec tsc --noEmit` 无错误
- [ ] 代码格式检查通过: `pnpm format:check` 通过
- [ ] Lint 检查通过: `pnpm lint` 无错误
- [ ] 测试通过: `pnpm test:run` 所有测试通过
- [ ] 无控制台错误或警告

### 视觉标准

- [ ] 默认圆角为 2px 或 4px（Arco Design 风格）
- [ ] 主色调为 #165DFF（Arco Blue）
- [ ] 基础字号为 14px
- [ ] 间距符合 4/8/16/24px 体系
- [ ] 阴影效果更轻柔
- [ ] 整体视觉风格接近 Arco Design

### 功能标准

- [ ] 所有交互功能正常
- [ ] 响应式布局无破坏
- [ ] 暗色模式正常工作
- [ ] 表单组件功能完整
- [ ] 路由导航正常

## 风险评估

### 风险 1: 字体大小变化影响布局

**影响**: 中等
**缓解措施**:

- 使用相对单位 (rem) 保持比例
- 逐步测试各个页面
- 必要时调整容器尺寸

### 风险 2: 圆角变化影响视觉一致性

**影响**: 低
**缓解措施**:

- 全局统一修改
- 视觉验证所有组件

### 风险 3: 颜色变更影响品牌识别

**影响**: 低
**缓解措施**:

- Arco Design 的 #165DFF 仍然是蓝色系
- 提供配置选项便于调整

## 后续优化建议

1. **建立设计系统文档**
   - 记录所有设计变量
   - 提供使用指南

2. **组件审查**
   - 确保所有自定义组件符合新规范
   - 优化组件间距和圆角

3. **暗色模式优化**
   - 确保所有颜色在暗色模式下可读
   - 优化对比度

4. **性能优化**
   - 检查是否有性能下降
   - 优化字体加载

## 回滚计划

如遇到无法解决的问题:

```bash
# 方案 1: 硬重置到迁移前
git reset --hard HEAD~1

# 方案 2: 撤销提交
git revert <commit-hash>

# 方案 3: 恢复备份文件
cp src/shared/config/typography.backup.ts src/shared/config/typography.ts
cp src/app/providers/theme.backup.ts src/app/providers/theme.ts
```
