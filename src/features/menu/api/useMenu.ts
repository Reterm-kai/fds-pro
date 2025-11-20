import { useQuery, useQueryClient } from '@tanstack/react-query'
import { get } from '@/shared/api/client'
import type { RemoteMenuItem } from '../model/types'
import { transformMenuResponse } from '../model/menuMapper'
import {
  loadMenuCache,
  saveMenuCache,
  clearMenuCache,
  type MenuCacheScope,
} from '../model/menuCache'

const createMenuQueryKey = (scope?: MenuCacheScope) =>
  [
    'menus',
    scope?.userId ?? 'user-anonymous',
    scope?.tenantId ?? 'tenant-default',
    scope?.locale ?? 'locale-default',
  ] as const

interface UseMenuOptions {
  cacheScope?: MenuCacheScope
}

export function useMenu(options?: UseMenuOptions) {
  const { cacheScope } = options ?? {}
  const cachedMenu = loadMenuCache<RemoteMenuItem[]>(cacheScope)
  const initialData = cachedMenu?.data
  const queryKey = createMenuQueryKey(cacheScope)
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await get<RemoteMenuItem[]>('/menus')
      saveMenuCache(response, cacheScope)
      return response
    },
    select: transformMenuResponse,
    initialData,
    initialDataUpdatedAt: cachedMenu?.timestamp,
    placeholderData: previousData => previousData,
    staleTime: 5 * 60 * 1000,
  })

  const reload = async () => {
    clearMenuCache(cacheScope)
    await queryClient.invalidateQueries({
      queryKey,
      exact: true,
      refetchType: 'active',
    })
  }

  return {
    ...query,
    reload,
  }
}
