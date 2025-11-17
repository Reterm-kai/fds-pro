import { useState } from 'react'
import {
  Alert,
  Stack,
  Group,
  Button,
  Text,
} from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { Plus, Upload } from 'lucide-react'
import { modals } from '@mantine/modals'
import type {
  Collection,
  CollectionContentType,
  CollectionListParams,
  CollectionStatus,
  CollectionStrategy,
} from '@/entities/collection'
import {
  getContentTypeLabel,
  getStatusLabel,
  getStrategyLabel,
} from '@/entities/collection'
import { useCollectionList } from '../api/useCollectionList'
import { CollectionListFilters } from './CollectionListFilters'
import { CollectionListTable } from './CollectionListTable'
import { showInfoNotification } from '@/shared/ui'

type SortField = NonNullable<CollectionListParams['sortField']>
type SortOrder = NonNullable<CollectionListParams['sortOrder']>

interface FilterFormState {
  code: string
  name: string
  contentType: CollectionContentType | ''
  strategy: CollectionStrategy | ''
  status: CollectionStatus | ''
  createdFrom: string
  createdTo: string
}

const initialFilterState: FilterFormState = {
  code: '',
  name: '',
  contentType: '',
  strategy: '',
  status: '',
  createdFrom: '',
  createdTo: '',
}

/**
 * 基础列表主视图
 *
 * 负责组合筛选区域、表格以及分页和排序逻辑
 */
export function CollectionsBasicView() {
  const [page, setPage] = useState(1)
  const pageSize = 10

  const [formState, setFormState] =
    useState<FilterFormState>(initialFilterState)
  const [filters, setFilters] =
    useState<FilterFormState>(initialFilterState)
  const [sortField, setSortField] = useState<SortField>('createdAt')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

  const queryParams: CollectionListParams = {
    page,
    pageSize,
    sortField,
    sortOrder,
    ...(filters.code ? { code: filters.code } : {}),
    ...(filters.name ? { name: filters.name } : {}),
    ...(filters.contentType ? { contentType: filters.contentType } : {}),
    ...(filters.strategy ? { strategy: filters.strategy } : {}),
    ...(filters.status ? { status: filters.status } : {}),
    ...(filters.createdFrom ? { createdFrom: filters.createdFrom } : {}),
    ...(filters.createdTo ? { createdTo: filters.createdTo } : {}),
  }

  const { data, isLoading, isError, error } = useCollectionList(queryParams)

  const total = data?.total ?? 0

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

  const handleSortChange = (field: SortField) => {
    setSortField(currentField => {
      if (currentField === field) {
        setSortOrder(currentOrder =>
          currentOrder === 'asc' ? 'desc' : 'asc'
        )
        return currentField
      }

      setSortOrder('asc')
      return field
    })
    setPage(1)
  }

  const handleView = (item: Collection) => {
    modals.open({
      title: '集合详情',
      children: (
        <Stack gap="xs">
          <Text size="sm">集合编号：{item.code}</Text>
          <Text size="sm">集合名称：{item.name}</Text>
          <Text size="sm">
            内容体裁：{getContentTypeLabel(item.contentType)}
          </Text>
          <Text size="sm">
            筛选方式：{getStrategyLabel(item.strategy)}
          </Text>
          <Text size="sm">内容量：{item.contentCount}</Text>
          <Text size="sm">创建时间：{item.createdAt}</Text>
          <Text size="sm">
            状态：{getStatusLabel(item.status)}
          </Text>
        </Stack>
      ),
    })
  }

  const handleCreate = () => {
    showInfoNotification({
      title: '新建集合',
      message: '当前为演示数据，可在接入真实接口后实现创建逻辑。',
    })
  }

  const handleImport = () => {
    showInfoNotification({
      title: '批量导入',
      message: '当前为演示数据，可在接入真实接口后实现导入逻辑。',
    })
  }

  if (isError) {
    return (
      <Alert
        icon={<IconAlertCircle size={16} />}
        title="加载失败"
        color="red"
        variant="light"
      >
        {error instanceof Error
          ? error.message
          : '无法加载列表数据'}
      </Alert>
    )
  }

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Group gap="xs">
          <Button
            leftSection={<Plus size={16} />}
            onClick={handleCreate}
          >
            新建
          </Button>
          <Button
            variant="outline"
            leftSection={<Upload size={16} />}
            onClick={handleImport}
          >
            批量导入
          </Button>
        </Group>
      </Group>

      <CollectionListFilters
        code={formState.code}
        name={formState.name}
        contentType={formState.contentType}
        strategy={formState.strategy}
        status={formState.status}
        createdFrom={formState.createdFrom}
        createdTo={formState.createdTo}
        loading={isLoading}
        onCodeChange={value =>
          setFormState(current => ({ ...current, code: value }))
        }
        onNameChange={value =>
          setFormState(current => ({ ...current, name: value }))
        }
        onContentTypeChange={value =>
          setFormState(current => ({
            ...current,
            contentType: value,
          }))
        }
        onStrategyChange={value =>
          setFormState(current => ({ ...current, strategy: value }))
        }
        onStatusChange={value =>
          setFormState(current => ({ ...current, status: value }))
        }
        onCreatedFromChange={value =>
          setFormState(current => ({
            ...current,
            createdFrom: value,
          }))
        }
        onCreatedToChange={value =>
          setFormState(current => ({
            ...current,
            createdTo: value,
          }))
        }
        onSearch={handleSearch}
        onReset={handleReset}
      />

      <CollectionListTable
        data={data?.list ?? []}
        isLoading={isLoading}
        page={page}
        pageSize={pageSize}
        total={total}
        sortField={sortField}
        sortOrder={sortOrder}
        onPageChange={setPage}
        onSortChange={handleSortChange}
        onView={handleView}
      />
    </Stack>
  )
}

