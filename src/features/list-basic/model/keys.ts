import type { ListParams } from './types'

/**
 * 基础列表 Query Key 定义
 */
export const listKeys = {
  all: ['list-basic'] as const,
  lists: () => [...listKeys.all, 'list'] as const,
  list: (params: ListParams = {}) => [...listKeys.lists(), params] as const,
} as const
