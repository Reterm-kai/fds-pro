import type { CollectionListParams } from './types'

/**
 * 集合实体 Query Key 定义
 */
export const collectionKeys = {
  all: ['collections'] as const,
  lists: () => [...collectionKeys.all, 'list'] as const,
  list: (params: CollectionListParams = {}) =>
    [...collectionKeys.lists(), params] as const,
} as const

