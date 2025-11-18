/**
 * DataTable - 通用数据表格组件
 *
 * 功能完整的数据表格,支持排序、分页、操作列等
 */

import {
  Card,
  Table,
  Group,
  Text,
  ActionIcon,
  Tooltip,
  Skeleton,
  Stack,
} from '@mantine/core'
import { IconArrowUp, IconArrowDown, IconArrowsSort } from '@tabler/icons-react'
import { EmptyState } from '../empty-state'
import { Pagination } from '../pagination'
import type { DataTableProps, ColumnConfig, TableAction } from './types'
import classes from './DataTable.module.css'

/**
 * 获取排序图标
 */
function getSortIcon(
  columnKey: string,
  sortField?: string,
  sortOrder?: 'asc' | 'desc'
) {
  if (sortField !== columnKey) {
    return <IconArrowsSort size={16} />
  }
  return sortOrder === 'asc' ? (
    <IconArrowUp size={16} />
  ) : (
    <IconArrowDown size={16} />
  )
}

/**
 * 渲染表格行操作
 */
function renderActions<T>(
  actions: TableAction<T>[],
  record: T
): React.ReactNode {
  const visibleActions = actions.filter(action => {
    if (action.show) {
      return action.show(record)
    }
    return true
  })

  if (visibleActions.length === 0) {
    return null
  }

  return (
    <div className={classes.actionsCell}>
      {visibleActions.map(action => {
        const isDisabled = action.disabled ? action.disabled(record) : false

        return (
          <Tooltip key={action.key} label={action.label}>
            <ActionIcon
              variant={action.variant || 'subtle'}
              color={action.color || 'blue'}
              onClick={() => action.onClick(record)}
              disabled={isDisabled}
              aria-label={action.label}
            >
              {action.icon}
            </ActionIcon>
          </Tooltip>
        )
      })}
    </div>
  )
}

/**
 * 渲染加载骨架屏
 */
function renderSkeleton(columnsCount: number, rowsCount: number = 10) {
  return (
    <Stack gap="md">
      {Array.from({ length: rowsCount }).map((_, index) => (
        <Group key={index} gap="md" align="center">
          {Array.from({ length: columnsCount }).map((_, colIndex) => (
            <Skeleton key={colIndex} h="lg" style={{ flex: 1 }} />
          ))}
        </Group>
      ))}
    </Stack>
  )
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  rowKey,
  pagination,
  sortable,
  actions,
  emptyText = '暂无数据',
  emptyImage = 'nodata',
  striped = false,
  highlightOnHover = true,
  withBorder = true,
  size = 'md',
}: DataTableProps<T>) {
  // 合并列配置和操作列
  const finalColumns: ColumnConfig<T>[] = [...columns]
  if (actions && actions.length > 0) {
    finalColumns.push({
      key: 'actions',
      title: '操作',
      align: 'center',
      width: actions.length * 50,
    })
  }

  // 渲染加载状态
  if (loading) {
    return (
      <Card withBorder={withBorder} radius="md" shadow="xs" padding="lg">
        {renderSkeleton(finalColumns.length)}
      </Card>
    )
  }

  // 渲染空状态
  if (data.length === 0) {
    return (
      <Card withBorder={withBorder} radius="md" shadow="xs" padding="lg">
        <EmptyState
          title={emptyText}
          description="请调整筛选条件后重试"
          image={emptyImage}
        />
      </Card>
    )
  }

  // 计算分页范围
  const startIndex = pagination
    ? (pagination.page - 1) * pagination.pageSize
    : 0

  // 渲染表格头
  const renderTableHead = () => (
    <Table.Thead>
      <Table.Tr>
        {/* 序号列 */}
        <Table.Th style={{ width: 60 }}>#</Table.Th>

        {/* 数据列 */}
        {finalColumns.map(column => {
          const isSortable = column.sortable && sortable
          const isActionsColumn = column.key === 'actions'

          return (
            <Table.Th
              key={String(column.key)}
              style={{
                width: column.width,
                textAlign: column.align || 'left',
              }}
              className={isSortable ? classes.sortableHeader : ''}
              onClick={
                isSortable
                  ? () => sortable.onChange(String(column.key))
                  : undefined
              }
            >
              {isActionsColumn ? (
                column.title
              ) : (
                <Group gap="xs" wrap="nowrap">
                  <Text size="sm">{column.title}</Text>
                  {isSortable && (
                    <span className={classes.sortIcon}>
                      {getSortIcon(
                        String(column.key),
                        sortable.field,
                        sortable.order
                      )}
                    </span>
                  )}
                </Group>
              )}
            </Table.Th>
          )
        })}
      </Table.Tr>
    </Table.Thead>
  )

  // 渲染表格体
  const renderTableBody = () => (
    <Table.Tbody>
      {data.map((record, index) => (
        <Table.Tr key={String(record[rowKey])}>
          {/* 序号列 */}
          <Table.Td>{startIndex + index + 1}</Table.Td>

          {/* 数据列 */}
          {finalColumns.map(column => {
            const isActionsColumn = column.key === 'actions'

            if (isActionsColumn && actions) {
              return (
                <Table.Td
                  key={String(column.key)}
                  style={{ textAlign: column.align || 'center' }}
                >
                  {renderActions(actions, record)}
                </Table.Td>
              )
            }

            const dataIndex = column.dataIndex || column.key
            const value = record[dataIndex as keyof T]

            return (
              <Table.Td
                key={String(column.key)}
                style={{ textAlign: column.align || 'left' }}
              >
                {column.render
                  ? column.render(value, record, index)
                  : String(value || '-')}
              </Table.Td>
            )
          })}
        </Table.Tr>
      ))}
    </Table.Tbody>
  )

  return (
    <Stack gap="md">
      {/* 顶部分页 */}
      {pagination && pagination.position === 'top' && (
        <Pagination {...pagination} />
      )}

      {/* 表格 */}
      <Card withBorder={withBorder} radius="md" shadow="xs" padding="lg">
        <Table
          striped={striped}
          highlightOnHover={highlightOnHover}
          verticalSpacing={size}
          horizontalSpacing={size}
        >
          {renderTableHead()}
          {renderTableBody()}
        </Table>
      </Card>

      {/* 底部分页 */}
      {pagination &&
        (!pagination.position || pagination.position === 'bottom') && (
          <Pagination {...pagination} />
        )}
    </Stack>
  )
}
