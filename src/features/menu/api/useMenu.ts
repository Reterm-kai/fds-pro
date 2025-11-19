import { useQuery } from '@tanstack/react-query'
import { get } from '@/shared/api/client'
import type { RemoteMenuItem } from '../model/types'
import { transformMenuResponse } from '../model/menuMapper'
import { loadMenuCache, saveMenuCache } from '../model/menuCache'

const MENU_QUERY_KEY = ['menus']

export function useMenu() {
  const initialData = loadMenuCache<RemoteMenuItem[]>()

  return useQuery({
    queryKey: MENU_QUERY_KEY,
    queryFn: async () => {
      const response = await get<RemoteMenuItem[]>('/menus')
      saveMenuCache(response)
      return response
    },
    select: transformMenuResponse,
    initialData,
    placeholderData: previousData => previousData,
    staleTime: 5 * 60 * 1000,
  })
}
