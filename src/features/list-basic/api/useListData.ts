import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { get } from '@/shared/api/client'
import { listKeys, type ListParams, type ListResponse } from '../model/keys'

/**
 * 获取列表数据（基础列表页）
 *
 * @param params - 查询参数
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
