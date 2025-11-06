import type { UserListParams } from './types'

/**
 * 用户相关的 Query Key 定义
 * 采用函数式结构,便于 QueryClient 缓存管理
 */
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params: UserListParams = {}) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
}
