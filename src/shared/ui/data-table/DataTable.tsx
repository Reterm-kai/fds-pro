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
import { EmptyState, Pagination } from '@/shared/ui'
import type { DataTableProps, ColumnConfig, TableAction } from './types'
import classes from './DataTable.module.css'
import * as React from "react";

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
function renderActions<T extends Record<string, unknown>>(
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
            <Skeleton key={colIndex} h="lg" className={classes.skeletonItem} />
          ))}
        </Group>
      ))}
    </Stack>
  )
}

export function DataTable<T extends Record<string, unknown>>({
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

  // 获取对齐方式的 CSS 类
  const getAlignClass = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center':
        return classes.alignCenter
      case 'right':
        return classes.alignRight
      default:
        return classes.alignLeft
    }
  }

  // 渲染表格头
  const renderTableHead = () => (
    <Table.Thead>
      <Table.Tr>
        {/* 序号列 */}
        <Table.Th className={classes.indexColumn}>#</Table.Th>

        {/* 数据列 */}
        {finalColumns.map(column => {
          const isSortable = column.sortable && sortable
          const isActionsColumn = column.key === 'actions'

          const thClasses = [
            isSortable ? classes.sortableHeader : '',
            getAlignClass(column.align || 'left'),
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <Table.Th
              key={String(column.key)}
              style={column.width ? { width: column.width } : undefined}
              className={thClasses}
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
                  className={getAlignClass(column.align || 'center')}
                >
                  {renderActions(actions, record)}
                </Table.Td>
              )
            }

            const fallbackKey =
              typeof column.key === 'string'
                ? (column.key as keyof T)
                : (undefined as keyof T | undefined)
            const dataKey = column.dataIndex ?? fallbackKey
            const value =
              dataKey && dataKey in record
                ? (record[dataKey] as T[keyof T])
                : undefined

            return (
              <Table.Td
                key={String(column.key)}
                className={getAlignClass(column.align || 'left')}
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

  // 准备传递给 Pagination 的 props（排除 position）
  const getPaginationProps = () => {
    if (!pagination) return undefined
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { position, ...rest } = pagination
    return rest
  }

  const paginationProps = getPaginationProps()

  return (
    <Stack gap="md">
      {/* 顶部分页 */}
      {pagination && pagination.position === 'top' && paginationProps && (
        <Pagination {...paginationProps} />
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
        (!pagination.position || pagination.position === 'bottom') &&
        paginationProps && <Pagination {...paginationProps} />}
    </Stack>
  )
}
