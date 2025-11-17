import {
  Card,
  Table,
  Badge,
  Group,
  Text,
  Pagination,
  ActionIcon,
  Tooltip,
  Skeleton,
  Stack,
} from '@mantine/core'
import {
  IconEye,
  IconArrowUp,
  IconArrowDown,
  IconArrowsSort,
} from '@tabler/icons-react'
import type {
  Collection,
  CollectionListParams,
} from '@/entities/collection'
import {
  getContentTypeLabel,
  getStatusColor,
  getStatusLabel,
  getStrategyLabel,
} from '@/entities/collection'

type SortField = NonNullable<CollectionListParams['sortField']>

interface CollectionListTableProps {
  data: Collection[]
  isLoading: boolean
  page: number
  pageSize: number
  total: number
  sortField?: CollectionListParams['sortField']
  sortOrder?: CollectionListParams['sortOrder']
  onPageChange: (page: number) => void
  onSortChange: (field: SortField) => void
  onView: (item: Collection) => void
}

function formatDateTime(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return '-'
  }

  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
}

function getSortIcon(
  field: SortField,
  activeField?: CollectionListParams['sortField'],
  order?: CollectionListParams['sortOrder']
) {
  if (activeField !== field) {
    return <IconArrowsSort size={16} />
  }

  if (order === 'desc') {
    return <IconArrowDown size={16} />
  }

  return <IconArrowUp size={16} />
}

/**
 * 集合列表表格组件
 *
 * 展示分页、排序后的集合数据
 */
export function CollectionListTable({
  data,
  isLoading,
  page,
  pageSize,
  total,
  sortField,
  sortOrder,
  onPageChange,
  onSortChange,
  onView,
}: CollectionListTableProps) {
  const totalPages = total > 0 ? Math.ceil(total / pageSize) : 0

  if (isLoading) {
    return (
      <Card withBorder radius="md" shadow="xs" padding="lg">
        <Stack gap="md">
          {Array.from({ length: 10 }).map((_, index) => (
            <Group
              key={index}
              gap="md"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Skeleton h="calc(var(--mantine-spacing-lg) * 1.4)" w="10%" />
              <Skeleton h="calc(var(--mantine-spacing-lg) * 1.4)" w="10%" />
              <Skeleton h="calc(var(--mantine-spacing-lg) * 1.4)" w="15%" />
              <Skeleton h="calc(var(--mantine-spacing-lg) * 1.4)" w="15%" />
              <Skeleton h="calc(var(--mantine-spacing-lg) * 1.4)" w="10%" />
              <Skeleton h="calc(var(--mantine-spacing-lg) * 1.4)" w="20%" />
              <Skeleton h="calc(var(--mantine-spacing-lg) * 1.4)" w="10%" />
            </Group>
          ))}
        </Stack>
      </Card>
    )
  }

  const startIndex = (page - 1) * pageSize

  const rows = data.map((item, index) => (
    <Table.Tr key={item.id}>
      <Table.Td>{startIndex + index + 1}</Table.Td>
      <Table.Td>{item.code}</Table.Td>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>
        <Badge color="blue" variant="light">
          {getContentTypeLabel(item.contentType)}
        </Badge>
      </Table.Td>
      <Table.Td>{getStrategyLabel(item.strategy)}</Table.Td>
      <Table.Td>{item.contentCount}</Table.Td>
      <Table.Td>{formatDateTime(item.createdAt)}</Table.Td>
      <Table.Td>
        <Badge color={getStatusColor(item.status)} variant="dot">
          {getStatusLabel(item.status)}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Tooltip label="查看详情">
          <ActionIcon
            variant="subtle"
            color="blue"
            aria-label="查看详情"
            onClick={() => onView(item)}
          >
            <IconEye size={18} />
          </ActionIcon>
        </Tooltip>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <Card withBorder radius="md" shadow="xs" padding="lg">
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>#</Table.Th>
            <Table.Th
              onClick={() => onSortChange('code')}
              style={{ cursor: 'pointer' }}
            >
              <Group gap="xs">
                <Text size="sm">集合编号</Text>
                {getSortIcon('code', sortField, sortOrder)}
              </Group>
            </Table.Th>
            <Table.Th
              onClick={() => onSortChange('name')}
              style={{ cursor: 'pointer' }}
            >
              <Group gap="xs">
                <Text size="sm">集合名称</Text>
                {getSortIcon('name', sortField, sortOrder)}
              </Group>
            </Table.Th>
            <Table.Th>内容体裁</Table.Th>
            <Table.Th>筛选方式</Table.Th>
            <Table.Th
              onClick={() => onSortChange('contentCount')}
              style={{ cursor: 'pointer' }}
            >
              <Group gap="xs">
                <Text size="sm">内容量</Text>
                {getSortIcon('contentCount', sortField, sortOrder)}
              </Group>
            </Table.Th>
            <Table.Th
              onClick={() => onSortChange('createdAt')}
              style={{ cursor: 'pointer' }}
            >
              <Group gap="xs">
                <Text size="sm">创建时间</Text>
                {getSortIcon('createdAt', sortField, sortOrder)}
              </Group>
            </Table.Th>
            <Table.Th>状态</Table.Th>
            <Table.Th>操作</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={9}>
                <Text size="sm" c="dimmed">
                  暂无数据，请调整筛选条件后重试。
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

      {totalPages > 1 && (
        <Group justify="space-between" mt="md">
          <Text size="sm" c="dimmed">
            共 {total} 条记录，当前第 {page} / {totalPages} 页
          </Text>
          <Pagination
            value={page}
            onChange={onPageChange}
            total={totalPages}
          />
        </Group>
      )}
    </Card>
  )
}

