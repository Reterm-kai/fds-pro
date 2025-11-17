import { useQuery } from '@tanstack/react-query'
import { get } from '@/shared/api/client'
import {
  collectionKeys,
  type CollectionListParams,
  type CollectionListResponse,
} from '@/entities/collection'

/**
 * 获取集合列表（基础列表页）
 *
 * @param params - 查询参数
 */
export function useCollectionList(params: CollectionListParams = {}) {
  return useQuery({
    queryKey: collectionKeys.list(params),
    queryFn: () =>
      get<CollectionListResponse>(
        '/collections',
        params as Record<string, string | number | boolean>
      ),
    keepPreviousData: true,
  })
}

