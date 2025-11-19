import { useQuery } from '@tanstack/react-query'
import { get } from '@/shared/api/client'
import type { RemoteMenuItem } from '../model/types'
import { transformMenuResponse } from '../model/menuMapper'
import {
  loadMenuCache,
  saveMenuCache,
  type MenuCacheScope,
} from '../model/menuCache'

const MENU_QUERY_KEY = ['menus']

interface UseMenuOptions {
  cacheScope?: MenuCacheScope
}

export function useMenu(options?: UseMenuOptions) {
  const { cacheScope } = options ?? {}
  const cachedMenu = loadMenuCache<RemoteMenuItem[]>(cacheScope)
  const initialData = cachedMenu?.data

  return useQuery({
    queryKey: MENU_QUERY_KEY,
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
}
