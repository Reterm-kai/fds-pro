/**
 * Pagination - 增强分页组件
 *
 * 在 Mantine Pagination 基础上增加:
 * - 总数显示
 * - 跳转输入
 * - 每页条数选择
 */

import { useState } from 'react'
import {
  Pagination as MantinePagination,
  Group,
  Text,
  Select,
  NumberInput,
} from '@mantine/core'
import type { PaginationProps } from './types'

export function Pagination({
  page,
  pageSize,
  total,
  onChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  showTotal = true,
  showJumper = false,
  showSizeChanger = false,
  simple = false,
  totalText,
  position = 'right',
}: PaginationProps) {
  const [jumperValue, setJumperValue] = useState<number | ''>(page)

  const totalPages = total > 0 ? Math.ceil(total / pageSize) : 0
  const startIndex = (page - 1) * pageSize + 1
  const endIndex = Math.min(page * pageSize, total)

  // 默认总数文本
  const defaultTotalText = (total: number, range: [number, number]) => {
    return `共 ${total} 条，当前第 ${range[0]}-${range[1]} 条`
  }

  // 处理跳转
  const handleJump = () => {
    if (jumperValue && jumperValue >= 1 && jumperValue <= totalPages) {
      onChange(jumperValue)
    }
  }

  // 处理每页条数变化
  const handlePageSizeChange = (value: string | null) => {
    if (value && onPageSizeChange) {
      const newPageSize = Number(value)
      onPageSizeChange(newPageSize)
      // 调整当前页码,避免超出范围
      const newTotalPages = Math.ceil(total / newPageSize)
      if (page > newTotalPages) {
        onChange(newTotalPages)
      }
    }
  }

  const justifyMap = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  }

  if (totalPages === 0) {
    return null
  }

  return (
    <Group justify={justifyMap[position]} align="center" gap="md" wrap="wrap">
      {/* 总数显示 */}
      {showTotal && total > 0 && (
        <Text size="sm" c="dimmed">
          {totalText
            ? totalText(total, [startIndex, endIndex])
            : defaultTotalText(total, [startIndex, endIndex])}
        </Text>
      )}

      {/* 每页条数选择器 */}
      {showSizeChanger && onPageSizeChange && (
        <Group gap="xs">
          <Text size="sm" c="dimmed">
            每页
          </Text>
          <Select
            value={String(pageSize)}
            onChange={handlePageSizeChange}
            data={pageSizeOptions.map(size => ({
              value: String(size),
              label: String(size),
            }))}
            size="sm"
            w={80}
          />
          <Text size="sm" c="dimmed">
            条
          </Text>
        </Group>
      )}

      {/* 分页器 */}
      <MantinePagination
        value={page}
        onChange={onChange}
        total={totalPages}
        siblings={simple ? 0 : 1}
        boundaries={simple ? 0 : 1}
      />

      {/* 跳转输入 */}
      {showJumper && totalPages > 1 && (
        <Group gap="xs">
          <Text size="sm" c="dimmed">
            跳至
          </Text>
          <NumberInput
            value={jumperValue}
            onChange={value => setJumperValue(value as number | '')}
            min={1}
            max={totalPages}
            size="sm"
            w={60}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleJump()
              }
            }}
            onBlur={handleJump}
          />
          <Text size="sm" c="dimmed">
            页
          </Text>
        </Group>
      )}
    </Group>
  )
}
