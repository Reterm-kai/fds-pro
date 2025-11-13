# 项目结构优化清单（快速参考）

## 问题速查表

### 高优先级（立即处理）

| ID | 问题 | 位置 | 类型 | 解决方案 |
|----|------|------|------|---------|
| H1 | 混乱的 pages 命名模式 | `src/pages/login/` | 命名不一致 | 统一为 `index.tsx` 模式 |
| H2 | 空目录：auth/lib | `src/features/auth/lib/` | 结构冗余 | 删除空目录 |
| H3 | 空目录：users/model | `src/features/users/model/` | 结构冗余 | 删除空目录 |

### 中优先级（本周处理）

| ID | 问题 | 位置 | 类型 | 解决方案 |
|----|------|------|------|---------|
| M1 | 缺失 index.ts | `src/app/layouts/` | 导出问题 | 创建 index.ts |
| M2 | 缺失 index.ts | `src/app/routes/` | 导出问题 | 创建 index.ts |
| M3 | 目录命名不统一 | 全项目 | 命名规范 | 定义并实施标准 |
| M4 | pages 文件过大 | `src/pages/login/` 365行 | 代码组织 | 标记为长期重构项 |
| M5 | pages 文件过大 | `src/pages/register/` 194行 | 代码组织 | 标记为长期重构项 |

### 低优先级（日后优化）

| ID | 问题 | 位置 | 类型 | 解决方案 |
|----|------|------|------|---------|
| L1 | 表单逻辑未分离 | `src/pages/login/LoginPage.tsx` | 架构优化 | 提取到 features/auth/ui/ |
| L2 | 表单逻辑未分离 | `src/pages/register/index.tsx` | 架构优化 | 提取到 features/auth/ui/ |

---

## 行动计划

### 第一步（5分钟）- 删除空目录
```bash
# 删除两个空目录
rmdir src/features/auth/lib
rmdir src/features/users/model
```

**验证**：
```bash
# 确认已删除
ls -la src/features/auth/ | grep lib    # 应该不存在
ls -la src/features/users/ | grep model # 应该不存在
```

---

### 第二步（20分钟）- 添加缺失的 index.ts

#### 2a. 创建 `src/app/layouts/index.ts`
```typescript
export { AppLayout } from './AppLayout'
export { AuthLayout } from './AuthLayout'
```

**验证**：
```bash
cat src/app/layouts/index.ts
```

#### 2b. 创建 `src/app/routes/index.ts`
```typescript
export { router } from './router'
```

**验证**：
```bash
cat src/app/routes/index.ts
```

#### 2c. 更新导入路径
**搜索并更新这些文件**：
- `src/app/routes/router.tsx` 中引用 layouts 的地方
- `src/main.tsx` 中的导入

**before**:
```typescript
import { AppLayout } from '@/app/layouts/AppLayout'
import { router } from '@/app/routes/router'
```

**after**:
```typescript
import { AppLayout } from '@/app/layouts'
import { router } from '@/app/routes'
```

---

### 第三步（30分钟）- 统一 pages 命名模式

#### 3a. 确认模式选择
**推荐**：保持 `index.tsx` 模式（简洁一致）

**规则**：
- 所有 pages 直接在 `index.tsx` 中定义
- 仅当页面非常复杂（>300行）时，才拆分为 `PageName.tsx + index.tsx`
- 当前：`login` 页面 365 行，可拆分，但保持一致性，暂时保持

#### 3b. 明确 login 页面的规范
**方案A**（推荐）：统一为 index.tsx 模式
```
src/pages/login/
└── index.tsx (包含 365 行的 LoginPage 代码)
```

**方案B**：统一为 PageName.tsx + index.tsx 模式
```
src/pages/login/
├── LoginPage.tsx (365 行页面组件)
└── index.tsx (导出 LoginPage)
```

**选择方案**：根据团队约定选择一种并应用到整个项目

#### 3c. 在 CLAUDE.md 中记录规范
在"文件命名规范"章节添加：
```markdown
### Pages 目录命名规范

所有 pages 采用**统一模式**：

#### 模式 A（推荐）：单文件模式
```
pages/page-name/
└── index.tsx    # 在此定义 PageComponent
```

导入方式：
```typescript
import { PageName } from '@/pages/page-name'
```

#### 模式 B（复杂页面）：拆分模式
当页面代码超过 300 行时，可拆分：
```
pages/page-name/
├── PageName.tsx  # 页面组件
└── index.tsx     # 仅导出
```

导入方式相同：
```typescript
import { PageName } from '@/pages/page-name'
```
```

---

### 第四步（45分钟）- 统一目录命名约定

#### 4a. 决定规范
**建议**：使用 **kebab-case**
- 符合 Unix 文件系统惯例
- 与 URL 路径一致
- 避免跨平台问题

#### 4b. 检查现状
```bash
# 查看所有目录
find src -type d -maxdepth 2 | sort

# 按照命名规范分类
# kebab-case: app-shell, theme-toggle, placeholder, logo
# camelCase: api, config, model, mock, navigation, auth, users, user
```

#### 4c. 将 camelCase 目录改为 kebab-case
**需要改名的目录**：
- `src/shared/api/` → `src/shared/api/` (API 保持)
- `src/shared/config/` → `src/shared/config/` (CONFIG 保持)
- 其他目录暂保持现状

**决策**：为了避免大规模重构，建议：
- **UI 组件子目录**：强制 kebab-case（已遵循）
- **功能目录**：保持 camelCase（features, entities, widgets）
- **系统目录**：保持 camelCase（api, config, model, etc）

#### 4d. 在 CLAUDE.md 更新规范
```markdown
### 目录命名规范

| 层级 | 约定 | 示例 |
|------|------|------|
| **UI 组件子目录** | kebab-case | `theme-toggle/`, `app-shell/` |
| **Feature/Entity 目录** | camelCase | `features/auth/`, `entities/user/` |
| **Segment 目录** | camelCase | `ui/`, `api/`, `model/` |
| **系统目录** | camelCase | `api/`, `config/`, `mock/` |
```

---

## 验证清单

完成各步骤后，使用此清单验证：

### 结构验证
- [ ] 没有空目录
- [ ] `src/app/layouts/index.ts` 存在并导出
- [ ] `src/app/routes/index.ts` 存在并导出
- [ ] 所有 pages 遵循统一模式
- [ ] 没有重复的导出（.tsx 和 index.ts）

### 导入验证
```bash
# 搜索不规范导入
grep -r "from '@/app/layouts/App" src/
grep -r "from '@/app/routes/router" src/

# 应该返回空结果（已改用规范导入）
```

### 编译验证
```bash
pnpm build
# 应该成功，无错误
```

### 类型检查
```bash
pnpm type-check
# 应该成功，无错误
```

---

## 预期效果

完成所有优化后：

| 项目 | 优化前 | 优化后 |
|------|-------|-------|
| 代码行数 | 约 50KB | 约 49.5KB |
| 目录数 | 35+ | 33 |
| 命名一致性 | 70% | 100% |
| FSD 合规性 | 75% | 90% |
| 新增页面指南 | 不清楚 | 明确 |

---

## 长期优化建议

### 第二阶段（1-2周后）
- [ ] 重构 login 页面：提取 LoginForm 到 `features/auth/ui/`
- [ ] 重构 register 页面：提取 RegisterForm 到 `features/auth/ui/`
- [ ] 为 `features/auth/` 添加 model/lib 支持

### 第三阶段（持续）
- [ ] 增加单元测试覆盖（目标 80%+）
- [ ] 添加更多 Storybook 文档
- [ ] 补充架构决策记录（ADR）

---

## 文件修改清单

### 需要创建
- [ ] `src/app/layouts/index.ts`
- [ ] `src/app/routes/index.ts`

### 需要删除
- [ ] `src/features/auth/lib/` (目录)
- [ ] `src/features/users/model/` (目录)

### 需要修改
- [ ] `CLAUDE.md` - 添加/更新文件命名规范
- [ ] `src/app/routes/router.tsx` - 更新导入
- [ ] `src/main.tsx` - 更新导入

### 需要检查
- [ ] 所有使用 `app/layouts` 的导入
- [ ] 所有使用 `app/routes` 的导入
- [ ] 页面的导出规范是否一致

---

## 问题排查

### Q: 修改后导入报错？
**A**: 运行类型检查和编译：
```bash
pnpm type-check
pnpm build
```

### Q: 删除目录后怎么恢复？
**A**: 使用 git 恢复：
```bash
git checkout -- src/features/auth/lib src/features/users/model
```

### Q: 需要多久完成所有优化？
**A**:
- 第一步（删除空目录）：5 分钟
- 第二步（添加 index.ts）：20 分钟
- 第三步（统一 pages）：30 分钟
- 第四步（统一命名）：45 分钟
- **总计**：约 1.5-2 小时

---

## 成功标志

当以下条件都满足时，优化完成：

```
✅ 零个空目录
✅ 所有关键目录都有 index.ts
✅ 所有 pages 遵循统一模式
✅ 目录命名规范在 CLAUDE.md 中文档化
✅ 编译和类型检查通过
✅ 所有导入路径规范化
✅ 新入职开发者能清楚理解命名约定
```

