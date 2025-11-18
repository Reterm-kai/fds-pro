# 通用 UI 组件库完整设计方案

## 执行时间

2025-11-18

## 项目分析

经过全面扫描,发现以下**高频重复**的 UI 模式:

### 当前问题

1. ❌ 列表页面重复代码(筛选+表格+分页) - `collection-list`, `users`
2. ❌ 表单模态框重复代码 - `UserForm` 等
3. ❌ 分步表单重复代码 - `form-step`, `form-group`
4. ❌ 空状态、错误状态分散处理
5. ❌ 确认对话框手动编写
6. ❌ 详情展示卡片重复编写

### 目标

创建一个**完整的通用 UI 组件库**,放在 `shared/ui/`,涵盖所有高频场景。

---

## 🎯 通用组件库架构

### 分类体系

```
src/shared/ui/
├── 📋 数据展示类
│   ├── filter-panel/       # 通用筛选面板
│   ├── data-table/         # 通用数据表格
│   ├── pagination/         # 增强分页组件
│   ├── description-list/   # 详情描述列表
│   ├── stats-card/         # 统计卡片
│   └── empty-state/        # 空状态占位
│
├── 📝 表单类
│   ├── form-dialog/        # 表单模态框
│   ├── form-stepper/       # 分步表单
│   ├── form-builder/       # 动态表单构建器
│   └── search-input/       # 搜索输入框
│
├── 🎨 反馈类
│   ├── confirm-dialog/     # 确认对话框
│   ├── action-dropdown/    # 操作下拉菜单
│   ├── status-badge/       # 状态徽章
│   └── loading-overlay/    # 加载遮罩
│
├── 🔧 布局类
│   ├── page-header/        # 页面头部
│   ├── section-card/       # 区块卡片
│   └── split-pane/         # 分栏布局
│
└── 🛡️ 工具类
    ├── error-boundary/     # 错误边界
    ├── permission-wrapper/ # 权限包装器
    └── copy-button/        # 复制按钮
```

---

## 📋 核心组件详细设计

### 1. FilterPanel - 通用筛选面板 ⭐⭐⭐

**优先级**: 🔴 最高

#### 功能

- 支持多种字段类型: text, select, multiSelect, dateRange, number
- 响应式布局(Grid)
- 支持字段联动
- 内置查询/重置按钮
- 支持展开/收起(超过 4 个字段时)

#### API 设计

```typescript
// src/shared/ui/filter-panel/types.ts
export type FilterFieldType =
  | 'text'
  | 'select'
  | 'multiSelect'
  | 'date'
  | 'dateRange'
  | 'number'
  | 'numberRange'

export interface FilterFieldConfig {
  name: string
  label: string
  type: FilterFieldType
  placeholder?: string
  options?: Array<{ value: string; label: string }>
  span?: { base?: number; md?: number; lg?: number }
  required?: boolean
  disabled?: boolean | ((values: any) => boolean) // 支持联动禁用
  show?: (values: any) => boolean // 支持条件显示
}

export interface FilterPanelProps<T extends Record<string, any>> {
  fields: FilterFieldConfig[]
  values: T
  loading?: boolean
  collapsible?: boolean // 是否可折叠
  defaultCollapsed?: boolean // 默认折叠状态
  onChange: (name: keyof T, value: any) => void
  onSearch: () => void
  onReset: () => void
  searchText?: string // 自定义查询按钮文本
  resetText?: string // 自定义重置按钮文本
}
```

#### 使用示例

```typescript
<FilterPanel
  fields={[
    { name: 'keyword', label: '关键词', type: 'text', span: { lg: 6 } },
    { name: 'status', label: '状态', type: 'select', options: statusOptions },
    { name: 'dateRange', label: '创建时间', type: 'dateRange' },
  ]}
  values={filters}
  onChange={handleFilterChange}
  onSearch={handleSearch}
  onReset={handleReset}
  collapsible
/>
```

---

### 2. DataTable - 通用数据表格 ⭐⭐⭐

**优先级**: 🔴 最高

#### 功能

- 配置式列定义
- 内置排序、分页
- 自定义渲染函数
- 行操作(编辑、删除、查看)
- 批量操作(可选)
- 加载骨架屏
- 空状态
- 行选择(checkbox)

#### API 设计

```typescript
// src/shared/ui/data-table/types.ts
export interface ColumnConfig<T> {
  key: keyof T | 'actions' | string
  title: string
  dataIndex?: keyof T
  width?: string | number
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  fixed?: 'left' | 'right'
  ellipsis?: boolean // 超长省略
  render?: (value: any, record: T, index: number) => React.ReactNode
}

export interface TableAction<T> {
  key: string
  label: string
  icon?: React.ReactNode
  color?: string
  variant?: 'filled' | 'light' | 'outline'
  onClick: (record: T) => void | Promise<void>
  show?: (record: T) => boolean
  disabled?: (record: T) => boolean
  loading?: boolean
}

export interface DataTableProps<T> {
  columns: ColumnConfig<T>[]
  data: T[]
  loading?: boolean
  rowKey: keyof T

  // 分页
  pagination?: {
    page: number
    pageSize: number
    total: number
    onChange: (page: number) => void
    showTotal?: boolean // 显示总数
    position?: 'top' | 'bottom' | 'both'
  }

  // 排序
  sortable?: {
    field?: string
    order?: 'asc' | 'desc'
    onChange: (field: string) => void
  }

  // 行操作
  actions?: TableAction<T>[]

  // 批量操作
  selectable?: {
    selectedKeys: Array<T[keyof T]>
    onChange: (keys: Array<T[keyof T]>) => void
  }

  // 空状态
  emptyText?: string
  emptyImage?: React.ReactNode

  // 样式
  striped?: boolean
  highlightOnHover?: boolean
  withBorder?: boolean
}
```

---

### 3. Pagination - 增强分页组件 ⭐⭐

**优先级**: 🟡 高

#### 功能

- 页码切换
- 跳转输入
- 每页条数选择
- 总数显示
- 简洁模式/完整模式

#### API 设计

```typescript
export interface PaginationProps {
  page: number
  pageSize: number
  total: number
  onChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void

  // 配置
  pageSizeOptions?: number[] // 默认 [10, 20, 50, 100]
  showTotal?: boolean // 显示总数文本
  showJumper?: boolean // 显示跳转输入
  showSizeChanger?: boolean // 显示每页条数选择
  simple?: boolean // 简洁模式

  // 文本自定义
  totalText?: (total: number, range: [number, number]) => string
}
```

#### 使用示例

```typescript
<Pagination
  page={page}
  pageSize={pageSize}
  total={total}
  onChange={setPage}
  onPageSizeChange={setPageSize}
  showTotal
  showJumper
  showSizeChanger
  totalText={(total, [start, end]) => `共 ${total} 条，当前第 ${start}-${end} 条`}
/>
```

---

### 4. FormDialog - 表单模态框 ⭐⭐⭐

**优先级**: 🔴 最高

#### 功能

- 创建/编辑模式自动切换
- 表单验证
- 提交加载状态
- 成功/失败反馈

#### API 设计

```typescript
export interface FormFieldConfig {
  name: string
  label: string
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'textarea'
    | 'select'
    | 'switch'
  placeholder?: string
  required?: boolean
  options?: Array<{ value: string; label: string }>
  validate?: (value: any, values: any) => string | null
  disabled?: boolean | ((values: any) => boolean)
  show?: (values: any) => boolean
  rows?: number // textarea 行数
}

export interface FormDialogProps<T> {
  opened: boolean
  onClose: () => void
  title: string
  fields: FormFieldConfig[]
  initialValues?: Partial<T>
  submitText?: string
  cancelText?: string
  onSubmit: (values: T) => Promise<void>
  size?: 'sm' | 'md' | 'lg' | 'xl'
  successMessage?: string
}
```

#### 使用示例

```typescript
<FormDialog
  opened={opened}
  onClose={close}
  title={isEditing ? '编辑用户' : '创建用户'}
  fields={[
    { name: 'name', label: '姓名', type: 'text', required: true },
    { name: 'email', label: '邮箱', type: 'email', required: true },
    { name: 'role', label: '角色', type: 'select', options: roleOptions },
  ]}
  initialValues={editingUser}
  onSubmit={handleSubmit}
  successMessage="操作成功"
/>
```

---

### 5. FormStepper - 分步表单 ⭐⭐

**优先级**: 🟡 高

#### 功能

- 多步骤表单
- 步骤验证
- 步骤跳转
- 进度保存

#### API 设计

```typescript
export interface FormStep {
  key: string
  title: string
  description?: string
  icon?: React.ReactNode
  fields: FormFieldConfig[]
  validate?: (values: any) => boolean
}

export interface FormStepperProps<T> {
  steps: FormStep[]
  initialValues?: Partial<T>
  onSubmit: (values: T) => Promise<void>
  allowStepSelect?: boolean // 允许点击步骤跳转
  showProgressDots?: boolean
  submitText?: string
}
```

---

### 6. DescriptionList - 详情描述列表 ⭐⭐

**优先级**: 🟡 高

#### 功能

- 键值对展示
- 支持多列布局
- 支持自定义渲染

#### API 设计

```typescript
export interface DescriptionItem {
  label: string
  value: any
  render?: (value: any) => React.ReactNode
  span?: number // 跨列
}

export interface DescriptionListProps {
  items: DescriptionItem[]
  column?: 1 | 2 | 3 | 4
  bordered?: boolean
  layout?: 'horizontal' | 'vertical'
  labelStyle?: React.CSSProperties
  contentStyle?: React.CSSProperties
}
```

#### 使用示例

```typescript
<DescriptionList
  column={2}
  items={[
    { label: '集合编号', value: data.code },
    { label: '集合名称', value: data.name },
    { label: '状态', value: data.status, render: (v) => <Badge>{v}</Badge> },
    { label: '创建时间', value: data.createdAt, span: 2 },
  ]}
/>
```

---

### 7. EmptyState - 空状态占位 ⭐⭐

**优先级**: 🟡 高

#### 功能

- 无数据提示
- 自定义图标/图片
- 操作按钮

#### API 设计

```typescript
export interface EmptyStateProps {
  title?: string
  description?: string
  image?: React.ReactNode | 'search' | 'nodata' | 'error'
  action?: {
    label: string
    onClick: () => void
    icon?: React.ReactNode
  }
  size?: 'sm' | 'md' | 'lg'
}
```

---

### 8. ConfirmDialog - 确认对话框 ⭐⭐⭐

**优先级**: 🔴 最高

#### 功能

- 一行代码调用
- 支持危险操作(红色确认按钮)
- 异步操作支持

#### API 设计

```typescript
export function confirm(options: {
  title: string
  message: string | React.ReactNode
  confirmText?: string
  cancelText?: string
  danger?: boolean // 危险操作(红色按钮)
  onConfirm: () => void | Promise<void>
  onCancel?: () => void
}): void
```

#### 使用示例

```typescript
import { confirm } from '@/shared/ui/confirm-dialog'

confirm({
  title: '删除用户',
  message: `确定要删除用户 ${user.name} 吗?此操作无法撤销。`,
  danger: true,
  confirmText: '确认删除',
  onConfirm: async () => {
    await deleteUser(user.id)
  },
})
```

---

### 9. ActionDropdown - 操作下拉菜单 ⭐⭐

**优先级**: 🟡 高

#### 功能

- 表格行操作下拉菜单
- 权限控制
- 加载状态

#### API 设计

```typescript
export interface DropdownAction<T> {
  key: string
  label: string
  icon?: React.ReactNode
  color?: string
  danger?: boolean
  disabled?: (record: T) => boolean
  show?: (record: T) => boolean
  onClick: (record: T) => void | Promise<void>
}

export interface ActionDropdownProps<T> {
  actions: DropdownAction<T>[]
  record: T
  trigger?: 'click' | 'hover'
}
```

---

### 10. StatusBadge - 状态徽章 ⭐

**优先级**: 🟢 中

#### 功能

- 预设状态颜色
- 点状/实心样式

#### API 设计

```typescript
export interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'info' | 'default'
  text: string
  variant?: 'dot' | 'filled' | 'light' | 'outline'
}
```

---

### 11. PageHeader - 页面头部 ⭐

**优先级**: 🟢 中

#### 功能

- 标题 + 描述
- 面包屑
- 操作按钮区
- 返回按钮

#### API 设计

```typescript
export interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumbs?: Array<{ label: string; href?: string }>
  extra?: React.ReactNode
  onBack?: () => void
}
```

---

### 12. SearchInput - 搜索输入框 ⭐

**优先级**: 🟢 中

#### 功能

- 防抖搜索
- 清除按钮
- 搜索历史(可选)

#### API 设计

```typescript
export interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onSearch: (value: string) => void
  placeholder?: string
  debounce?: number // 防抖延迟(ms)
  showHistory?: boolean
  maxHistoryCount?: number
}
```

---

## 📊 实现优先级

### Phase 1 - 核心数据组件 (最高优先级) 🔴

**预计时间**: 2-3 天

1. ✅ `FilterPanel` - 通用筛选面板
2. ✅ `DataTable` - 通用数据表格
3. ✅ `Pagination` - 增强分页组件
4. ✅ `EmptyState` - 空状态占位

**交付**: 完成列表页面 70% 的通用化

---

### Phase 2 - 核心表单组件 (高优先级) 🟡

**预计时间**: 2-3 天

5. ✅ `FormDialog` - 表单模态框
6. ✅ `ConfirmDialog` - 确认对话框
7. ✅ `FormStepper` - 分步表单

**交付**: 完成表单场景 80% 的通用化

---

### Phase 3 - 展示增强组件 (中优先级) 🟢

**预计时间**: 1-2 天

8. ✅ `DescriptionList` - 详情描述列表
9. ✅ `ActionDropdown` - 操作下拉菜单
10. ✅ `StatusBadge` - 状态徽章
11. ✅ `PageHeader` - 页面头部

**交付**: 提升整体 UI 一致性

---

### Phase 4 - 工具增强组件 (低优先级) 🔵

**预计时间**: 1 天

12. ✅ `SearchInput` - 搜索输入框
13. ✅ `LoadingOverlay` - 加载遮罩
14. ✅ `ErrorBoundary` - 错误边界
15. ✅ `CopyButton` - 复制按钮

**交付**: 完善细节体验

---

## 🎯 预期效果

### 代码量对比

| 场景           | 重构前  | 重构后     | 减少       |
| -------------- | ------- | ---------- | ---------- |
| **列表页面**   | 220+ 行 | 60-80 行   | **65-70%** |
| **表单模态框** | 120+ 行 | 30-40 行   | **70-75%** |
| **分步表单**   | 300+ 行 | 100-120 行 | **60-65%** |
| **详情页面**   | 150+ 行 | 40-50 行   | **70-75%** |

### 开发效率提升

- ✅ 新建列表页面: **从 2 小时 → 20 分钟**
- ✅ 新建表单: **从 1 小时 → 10 分钟**
- ✅ UI 一致性: **自动保证**
- ✅ 维护成本: **降低 60%**

---

## 📝 使用示例 - 完整列表页面

### 重构前 (220 行)

```typescript
// features/collection-list/ui/CollectionsBasicView.tsx
export function CollectionsBasicView() {
  // 50+ 行状态管理
  const [page, setPage] = useState(1)
  const [formState, setFormState] = useState(...)
  // ...

  // 30+ 行事件处理
  const handleSearch = () => { ... }
  const handleReset = () => { ... }
  // ...

  // 100+ 行 JSX
  return (
    <Stack>
      <CollectionListFilters ... />  {/* 60+ 行 */}
      <CollectionListTable ... />   {/* 80+ 行 */}
    </Stack>
  )
}
```

### 重构后 (60 行)

```typescript
// features/collection-list/ui/CollectionsBasicView.tsx
import { DataTable, FilterPanel } from '@/shared/ui'

export function CollectionsBasicView() {
  const [filters, setFilters] = useListFilters(initialFilters)
  const { data, isLoading } = useCollectionList(filters)

  return (
    <Stack gap="md">
      <FilterPanel
        fields={filterConfig}
        values={filters.form}
        onChange={filters.update}
        onSearch={filters.search}
        onReset={filters.reset}
      />

      <DataTable
        columns={columnConfig}
        data={data?.list ?? []}
        loading={isLoading}
        rowKey="id"
        pagination={{
          page: filters.page,
          pageSize: filters.pageSize,
          total: data?.total ?? 0,
          onChange: filters.setPage,
        }}
        actions={rowActions}
      />
    </Stack>
  )
}
```

---

## ✅ 符合规范

### FSD 架构

- ✅ 所有通用组件放在 `shared/ui/`
- ✅ 无业务逻辑,纯 UI 呈现
- ✅ 不依赖 `features/` 或 `entities/`

### Mantine UI

- ✅ 所有样式使用 Mantine 设计系统变量
- ✅ 支持深色模式 `light-dark()`
- ✅ 响应式布局

### TypeScript

- ✅ 全泛型设计,类型安全
- ✅ 完整的类型定义
- ✅ IDE 智能提示

---

## 📚 文档和测试

### 组件文档

每个组件提供:

- ✅ API 文档
- ✅ 使用示例
- ✅ 最佳实践
- ✅ Storybook 示例

### 单元测试

- ✅ 核心组件 100% 覆盖
- ✅ 边界情况测试
- ✅ 快照测试

---

## 🚀 下一步行动

### 立即开始 Phase 1

1. ✅ 创建 `FilterPanel` 组件
2. ✅ 创建 `DataTable` 组件
3. ✅ 创建 `Pagination` 组件
4. ✅ 创建 `EmptyState` 组件
5. ✅ 在 `collection-list` 中验证

**预计交付时间**: 2-3 天

**验收标准**:

- ✅ `collection-list` 代码量减少 65%
- ✅ 通过所有功能测试
- ✅ 通过 TypeScript 类型检查
- ✅ 样式符合 Mantine 规范
