import { useState } from 'react'
import { Title, Text, Stack, Group, Button, Alert, Badge } from '@mantine/core'
import { IconAlertCircle, IconEye } from '@tabler/icons-react'
import { Plus, Upload } from 'lucide-react'
import { modals } from '@mantine/modals'
import type {
  ListItem,
  ListContentType,
  ListParams,
  ListStatus,
  ListStrategy,
} from '@/features/list-basic'
import {
  getContentTypeLabel,
  getStatusLabel,
  getStrategyLabel,
  getStatusColor,
  useListData,
} from '@/features/list-basic'
import {
  showInfoNotification,
  FilterPanel,
  DataTable,
  Section,
  SectionList,
  type FilterFieldConfig,
  type ColumnConfig,
  type TableAction,
} from '@/shared/ui'

type SortField = NonNullable<ListParams['sortField']>
type SortOrder = NonNullable<ListParams['sortOrder']>

interface FilterFormState extends Record<string, unknown> {
  code: string
  name: string
  contentType: ListContentType | ''
  strategy: ListStrategy | ''
  status: ListStatus | ''
  createdAt: [string, string]
}

const initialFilterState: FilterFormState = {
  code: '',
  name: '',
  contentType: '',
  strategy: '',
  status: '',
  createdAt: ['', ''],
}

/**
 * 筛选字段配置 - 页面级配置
 */
const filterFields: FilterFieldConfig<FilterFormState>[] = [
  {
    name: 'code',
    label: '集合编号',
    type: 'text',
    placeholder: '请输入集合编号',
  },
  {
    name: 'name',
    label: '集合名称',
    type: 'text',
    placeholder: '请输入集合名称',
  },
  {
    name: 'contentType',
    label: '内容体裁',
    type: 'select',
    placeholder: '全部',
    options: [
      { value: '', label: '全部' },
      { value: 'image', label: '图文' },
      { value: 'template', label: '模板视频' },
      { value: 'video', label: '短视频' },
      { value: 'text', label: '文本' },
    ],
  },
  {
    name: 'strategy',
    label: '筛选方式',
    type: 'select',
    placeholder: '全部',
    options: [
      { value: '', label: '全部' },
      { value: 'artificial', label: '人工筛选' },
      { value: 'rules', label: '规则筛选' },
    ],
  },
  {
    name: 'status',
    label: '状态',
    type: 'select',
    placeholder: '全部',
    options: [
      { value: '', label: '全部' },
      { value: 'online', label: '已上架' },
      { value: 'offline', label: '已下架' },
    ],
  },
  { name: 'createdAt', label: '创建时间', type: 'dateRange' },
]

/**
 * 基础列表页面
 *
 * 展示支持分页、检索和排序的标准查询表格
 * 页面级:包含配置、布局、操作按钮和错误处理
 */
export function BasicListPage() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [formState, setFormState] =
    useState<FilterFormState>(initialFilterState)
  const [filters, setFilters] = useState<FilterFormState>(initialFilterState)
  const [sortField, setSortField] = useState<SortField>('createdAt')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

  const queryParams: ListParams = {
    page,
    pageSize,
    sortField,
    sortOrder,
    ...(filters.code ? { code: filters.code } : {}),
    ...(filters.name ? { name: filters.name } : {}),
    ...(filters.contentType ? { contentType: filters.contentType } : {}),
    ...(filters.strategy ? { strategy: filters.strategy } : {}),
    ...(filters.status ? { status: filters.status } : {}),
    ...(filters.createdAt[0] ? { createdFrom: filters.createdAt[0] } : {}),
    ...(filters.createdAt[1] ? { createdTo: filters.createdAt[1] } : {}),
  }

  // 从 Feature 层获取数据
  const { data, isLoading, isError, error } = useListData(queryParams)

  const handleSearch = () => {
    setFilters(formState)
    setPage(1)
  }

  const handleReset = () => {
    setFormState(initialFilterState)
    setFilters(initialFilterState)
    setSortField('createdAt')
    setSortOrder('desc')
    setPage(1)
  }

  const handleSortChange = (field: string) => {
    const typedField = field as SortField
    if (sortField === typedField) {
      setSortOrder(order => (order === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(typedField)
      setSortOrder('asc')
    }
    setPage(1)
  }

  const handleView = (item: ListItem) => {
    modals.open({
      title: '集合详情',
      children: (
        <Stack gap="xs">
          <Text size="sm">集合编号:{item.code}</Text>
          <Text size="sm">集合名称:{item.name}</Text>
          <Text size="sm">
            内容体裁:{getContentTypeLabel(item.contentType)}
          </Text>
          <Text size="sm">筛选方式:{getStrategyLabel(item.strategy)}</Text>
          <Text size="sm">内容量:{item.contentCount}</Text>
          <Text size="sm">创建时间:{item.createdAt}</Text>
          <Text size="sm">状态:{getStatusLabel(item.status)}</Text>
        </Stack>
      ),
    })
  }

  const handleCreate = () => {
    showInfoNotification({
      title: '新建集合',
      message: '当前为演示数据,可在接入真实接口后实现创建逻辑。',
    })
  }

  const handleImport = () => {
    showInfoNotification({
      title: '批量导入',
      message: '当前为演示数据,可在接入真实接口后实现导入逻辑。',
    })
  }

  // 表格列配置 - 页面级配置
  const columns: ColumnConfig<ListItem>[] = [
    { key: 'code', title: '集合编号', sortable: true },
    { key: 'name', title: '集合名称', sortable: true },
    {
      key: 'contentType',
      title: '内容体裁',
      render: (_, record) => (
        <Badge color="blue" variant="light">
          {getContentTypeLabel(record.contentType)}
        </Badge>
      ),
    },
    {
      key: 'strategy',
      title: '筛选方式',
      render: (_, record) => getStrategyLabel(record.strategy),
    },
    { key: 'contentCount', title: '内容量', sortable: true },
    { key: 'createdAt', title: '创建时间', sortable: true },
    {
      key: 'status',
      title: '状态',
      render: (_, record) => (
        <Badge color={getStatusColor(record.status)} variant="dot">
          {getStatusLabel(record.status)}
        </Badge>
      ),
    },
  ]

  // 表格操作配置 - 页面级配置
  const actions: TableAction<ListItem>[] = [
    {
      key: 'view',
      label: '查看详情',
      icon: <IconEye size={18} />,
      onClick: handleView,
    },
  ]

  if (isError) {
    return (
      <SectionList direction="vertical">
        <Section>
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="加载失败"
            color="red"
            variant="light"
          >
            {error.message}
          </Alert>
        </Section>
      </SectionList>
    )
  }

  return (
    <SectionList direction="vertical">
      {/* 页面头部 */}
      <Section>
        <Group justify="space-between" align="flex-start">
          <div>
            <Title order={1}>基础列表</Title>
            <Text size="sm" c="dimmed">
              典型的查询表格模板,支持分页、检索和排序能力,可用于大多数业务列表场景。
            </Text>
          </div>

          <Group gap="sm">
            <Button leftSection={<Plus size={16} />} onClick={handleCreate}>
              新建
            </Button>
            <Button
              variant="default"
              leftSection={<Upload size={16} />}
              onClick={handleImport}
            >
              批量导入
            </Button>
          </Group>
        </Group>
      </Section>

      {/* 筛选区域 */}
      <Section>
        <FilterPanel
          fields={filterFields}
          values={formState}
          loading={isLoading}
          onChange={(name, value) =>
            setFormState(prev => ({ ...prev, [name]: value }))
          }
          onSearch={handleSearch}
          onReset={handleReset}
        />
      </Section>

      {/* 数据表格 */}
      <Section>
        <DataTable
          columns={columns}
          data={data?.list ?? []}
          loading={isLoading}
          rowKey="id"
          pagination={{
            page,
            pageSize,
            total: data?.total ?? 0,
            onChange: setPage,
            onPageSizeChange: setPageSize,
            showTotal: true,
            showJumper: true,
            showSizeChanger: true,
          }}
          sortable={{
            field: sortField,
            order: sortOrder,
            onChange: handleSortChange,
          }}
          actions={actions}
        />
      </Section>
    </SectionList>
  )
}
