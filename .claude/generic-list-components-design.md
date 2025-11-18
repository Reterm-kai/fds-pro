# 通用列表组件系统设计方案

## 执行时间

2025-11-18

## 需求分析

### 当前问题

- ✅ `CollectionsBasicView` 和 `UsersView` 存在大量重复逻辑
- ✅ 筛选区域、表格、分页、排序逻辑相似度 >80%
- ✅ 每次新增列表页面都需要重复编写相同的状态管理代码

### 目标

创建可配置的通用列表组件,放在 `shared/ui/` 层,支持:

1. ✅ 配置式筛选条件(文本、下拉、日期等)
2. ✅ 配置式表格列定义
3. ✅ 内置分页、排序、加载状态
4. ✅ 自定义操作按钮
5. ✅ 类型安全

## 架构设计

### FSD 层级划分

根据 FSD 规范,通用列表组件应放在 `shared/ui/` 层:

```
src/shared/ui/
├── filter-panel/          # 通用筛选面板
│   ├── FilterPanel.tsx
│   ├── FilterPanel.module.css
│   ├── types.ts
│   └── index.ts
├── data-table/            # 通用数据表格
│   ├── DataTable.tsx
│   ├── DataTable.module.css
│   ├── types.ts
│   └── index.ts
└── list-view/             # 组合组件(可选)
    ├── ListView.tsx
    ├── types.ts
    └── index.ts
```

## 组件设计

### 1. FilterPanel - 通用筛选面板

#### 功能

- 支持多种筛选字段类型(文本、下拉、日期范围等)
- 内置"查询"和"重置"按钮
- 响应式布局(Grid)
- 加载状态禁用

#### API 设计

```typescript
// src/shared/ui/filter-panel/types.ts
export type FilterFieldType = 'text' | 'select' | 'date' | 'dateRange'

export interface FilterFieldOption {
  value: string
  label: string
}

export interface FilterFieldConfig {
  name: string // 字段名
  label: string // 显示标签
  type: FilterFieldType // 字段类型
  placeholder?: string // 占位符
  options?: FilterFieldOption[] // 下拉选项(type='select' 时必需)
  span?: { base?: number; md?: number; lg?: number } // 栅格布局
}

export interface FilterPanelProps<T extends Record<string, any>> {
  fields: FilterFieldConfig[] // 筛选字段配置
  values: T // 当前值
  loading?: boolean // 加载状态
  onChange: (name: keyof T, value: any) => void // 字段变更
  onSearch: () => void // 查询
  onReset: () => void // 重置
}
```

#### 使用示例

```typescript
// features/collection-list/ui/CollectionsBasicView.tsx
import { FilterPanel } from '@/shared/ui/filter-panel'

const filterFields: FilterFieldConfig[] = [
  { name: 'code', label: '集合编号', type: 'text', placeholder: '请输入集合编号' },
  { name: 'name', label: '集合名称', type: 'text', placeholder: '请输入集合名称' },
  {
    name: 'contentType',
    label: '内容体裁',
    type: 'select',
    options: [
      { value: '', label: '全部' },
      { value: 'image', label: '图文' },
      { value: 'video', label: '短视频' },
    ],
  },
  { name: 'createdAt', label: '创建时间', type: 'dateRange' },
]

<FilterPanel
  fields={filterFields}
  values={formState}
  loading={isLoading}
  onChange={(name, value) => setFormState(prev => ({ ...prev, [name]: value }))}
  onSearch={handleSearch}
  onReset={handleReset}
/>
```

### 2. DataTable - 通用数据表格

#### 功能

- 配置式列定义
- 内置排序支持
- 自定义单元格渲染
- 内置分页
- 加载骨架屏
- 空状态提示
- 操作列(编辑、删除等)

#### API 设计

```typescript
// src/shared/ui/data-table/types.ts
export interface ColumnConfig<T> {
  key: keyof T | 'actions' // 列 key
  title: string // 列标题
  dataIndex?: keyof T // 数据字段(默认同 key)
  sortable?: boolean // 是否可排序
  width?: string | number // 列宽度
  align?: 'left' | 'center' | 'right' // 对齐方式
  render?: (value: any, record: T, index: number) => React.ReactNode // 自定义渲染
}

export interface TableAction<T> {
  key: string // 操作 key
  label: string // 操作标签
  icon?: React.ReactNode // 操作图标
  color?: string // 按钮颜色
  onClick: (record: T) => void // 点击回调
  show?: (record: T) => boolean // 是否显示(可选)
}

export interface DataTableProps<T> {
  columns: ColumnConfig<T>[] // 列配置
  data: T[] // 数据源
  loading?: boolean // 加载状态

  // 分页
  page?: number
  pageSize?: number
  total?: number
  onPageChange?: (page: number) => void

  // 排序
  sortField?: string
  sortOrder?: 'asc' | 'desc'
  onSortChange?: (field: string) => void

  // 操作列
  actions?: TableAction<T>[]

  // 其他
  rowKey: keyof T // 行 key 字段
  emptyText?: string // 空数据提示
}
```

#### 使用示例

```typescript
// features/collection-list/ui/CollectionsBasicView.tsx
import { DataTable, ColumnConfig, TableAction } from '@/shared/ui/data-table'
import { Badge } from '@mantine/core'

const columns: ColumnConfig<Collection>[] = [
  { key: 'code', title: '集合编号', sortable: true },
  { key: 'name', title: '集合名称', sortable: true },
  {
    key: 'contentType',
    title: '内容体裁',
    render: (value) => (
      <Badge color="blue" variant="light">
        {getContentTypeLabel(value)}
      </Badge>
    ),
  },
  { key: 'contentCount', title: '内容量', sortable: true },
  { key: 'createdAt', title: '创建时间', sortable: true },
  {
    key: 'status',
    title: '状态',
    render: (value) => (
      <Badge color={getStatusColor(value)} variant="dot">
        {getStatusLabel(value)}
      </Badge>
    ),
  },
]

const actions: TableAction<Collection>[] = [
  {
    key: 'view',
    label: '查看详情',
    icon: <IconEye size={18} />,
    onClick: handleView,
  },
]

<DataTable
  columns={columns}
  data={data?.list ?? []}
  loading={isLoading}
  rowKey="id"
  page={page}
  pageSize={pageSize}
  total={total}
  sortField={sortField}
  sortOrder={sortOrder}
  onPageChange={setPage}
  onSortChange={handleSortChange}
  actions={actions}
/>
```

### 3. ListView - 组合组件(可选)

将 FilterPanel + 操作按钮 + DataTable 组合成一个完整的列表视图组件。

```typescript
// src/shared/ui/list-view/types.ts
export interface ListViewProps<TData, TFilters> {
  // 筛选
  filterFields?: FilterFieldConfig[]
  filterValues?: TFilters
  onFilterChange?: (name: keyof TFilters, value: any) => void
  onSearch?: () => void
  onReset?: () => void

  // 操作按钮
  headerActions?: React.ReactNode

  // 表格
  columns: ColumnConfig<TData>[]
  data: TData[]
  loading?: boolean
  rowKey: keyof TData

  // 分页排序
  page?: number
  pageSize?: number
  total?: number
  onPageChange?: (page: number) => void
  sortField?: string
  sortOrder?: 'asc' | 'desc'
  onSortChange?: (field: string) => void

  // 行操作
  actions?: TableAction<TData>[]

  // 错误处理
  error?: Error | null
}
```

#### 使用示例

```typescript
// features/collection-list/ui/CollectionsBasicView.tsx (简化版)
import { ListView } from '@/shared/ui/list-view'

export function CollectionsBasicView() {
  // ... 状态管理 ...

  return (
    <ListView
      // 筛选
      filterFields={filterFields}
      filterValues={formState}
      onFilterChange={(name, value) => setFormState(prev => ({ ...prev, [name]: value }))}
      onSearch={handleSearch}
      onReset={handleReset}

      // 头部操作
      headerActions={
        <Group>
          <Button leftSection={<Plus size={16} />} onClick={handleCreate}>
            新建
          </Button>
          <Button variant="outline" leftSection={<Upload size={16} />} onClick={handleImport}>
            批量导入
          </Button>
        </Group>
      }

      // 表格
      columns={columns}
      data={data?.list ?? []}
      loading={isLoading}
      rowKey="id"

      // 分页排序
      page={page}
      pageSize={pageSize}
      total={total}
      onPageChange={setPage}
      sortField={sortField}
      sortOrder={sortOrder}
      onSortChange={handleSortChange}

      // 行操作
      actions={actions}

      // 错误
      error={isError ? error : null}
    />
  )
}
```

## 实现优先级

### Phase 1: 核心组件 (高优先级)

1. ✅ `FilterPanel` - 通用筛选面板
2. ✅ `DataTable` - 通用数据表格

### Phase 2: 组合组件 (中优先级)

3. ✅ `ListView` - 组合列表视图

### Phase 3: 重构现有代码 (低优先级)

4. ✅ 重构 `collection-list` 使用通用组件
5. ✅ 重构 `users` 使用通用组件

## 优势

### 1. 代码复用

- ❌ **重构前**: 每个列表 200+ 行重复代码
- ✅ **重构后**: 配置式声明,代码量减少 70%

### 2. 一致性

- ✅ 所有列表页面使用统一的筛选、表格、分页组件
- ✅ 样式统一,遵循 Mantine 设计系统

### 3. 可维护性

- ✅ 修改一处,所有列表页面同步更新
- ✅ 类型安全,减少运行时错误

### 4. 可扩展性

- ✅ 支持自定义渲染函数
- ✅ 支持自定义操作列
- ✅ 支持不同的筛选字段类型

## 类型安全

所有组件都使用泛型确保类型安全:

```typescript
// 类型推导示例
const columns: ColumnConfig<Collection>[] = [
  { key: 'code', title: '编号' }, // ✅ 正确
  { key: 'unknown', title: '???' }, // ❌ 类型错误: 'unknown' 不是 Collection 的 key
]

const actions: TableAction<Collection>[] = [
  {
    key: 'view',
    onClick: record => {
      console.log(record.id) // ✅ record 类型为 Collection
    },
  },
]
```

## 迁移计划

### 步骤 1: 创建通用组件

1. 创建 `shared/ui/filter-panel/`
2. 创建 `shared/ui/data-table/`
3. 创建 `shared/ui/list-view/` (可选)

### 步骤 2: 验证通用性

1. 在 `collection-list` 中使用通用组件
2. 验证功能完整性
3. 调整 API 设计(如有必要)

### 步骤 3: 推广使用

1. 重构 `users` 列表
2. 应用到其他列表页面
3. 编写使用文档和最佳实践

### 步骤 4: 优化增强

1. 根据实际使用反馈优化 API
2. 增加单元测试覆盖
3. 创建 Storybook 文档

## 注意事项

### FSD 规范

- ✅ 通用组件放在 `shared/ui/`
- ✅ 不包含业务逻辑
- ✅ 不依赖 `features/` 或 `entities/`
- ✅ 纯 UI 呈现,数据通过 props 传入

### Mantine UI 规范

- ✅ 所有样式使用 Mantine 设计系统变量
- ✅ 使用 Mantine 组件(Grid, Card, Table, Pagination 等)
- ✅ 支持深色模式(light-dark())
- ✅ 响应式布局

### 性能考虑

- ✅ 使用 React.memo 优化渲染
- ✅ 避免不必要的状态提升
- ✅ 大数据集考虑虚拟滚动(可选增强)

## 参考实现

可以参考业界成熟方案:

- Ant Design Pro Table
- Material-UI DataGrid
- TanStack Table (无样式表格库)

但要注意:

- ⚠️ 不要过度设计,保持简单
- ⚠️ 优先满足项目 80% 的使用场景
- ⚠️ 预留扩展点,但不要提前实现

## 下一步行动

1. ✅ 用户确认设计方案
2. ✅ 创建 `FilterPanel` 组件
3. ✅ 创建 `DataTable` 组件
4. ✅ 重构 `collection-list` 进行验证
5. ✅ 编写使用文档
6. ✅ 推广到其他列表页面
