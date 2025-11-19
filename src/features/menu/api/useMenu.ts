import { useQuery } from '@tanstack/react-query'
import { get } from '@/shared/api/client'
import type { RemoteMenuItem } from '../model/types'
import { transformMenuResponse } from '../model/menuMapper'

const MENU_QUERY_KEY = ['menus']

export function useMenu() {
  return useQuery({
    queryKey: MENU_QUERY_KEY,
    queryFn: () => get<RemoteMenuItem[]>('/menus'),
    select: transformMenuResponse,
    staleTime: 5 * 60 * 1000,
  })
}
