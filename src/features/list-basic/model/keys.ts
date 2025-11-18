import type { ListParams, ListResponse, ListItem } from './types'

/**
 * 基础列表 Query Key 定义
 */
export const listKeys = {
  all: ['list-basic'] as const,
  lists: () => [...listKeys.all, 'list'] as const,
  list: (params: ListParams = {}) => [...listKeys.lists(), params] as const,
} as const

// Re-export types for convenience
export type { ListParams, ListResponse, ListItem }
