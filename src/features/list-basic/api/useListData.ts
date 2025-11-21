import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { get } from '@/shared/api/client'
import { listKeys } from '../model/keys'
import type { ListParams, ListResponse } from '../model/types'

/**
 * 获取列表数据（基础列表页）
 */
export function useListData(params: ListParams = {}) {
  return useQuery({
    queryKey: listKeys.list(params),
    queryFn: () =>
      get<ListResponse>(
        '/collections',
        params as Record<string, string | number | boolean>
      ),
    placeholderData: keepPreviousData,
  })
}
