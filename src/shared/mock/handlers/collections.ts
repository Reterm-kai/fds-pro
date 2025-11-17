import { http, delay } from 'msw'
import type {
  Collection,
  CollectionListParams,
  CollectionListResponse,
} from '@/entities/collection'
import type { ApiResponse } from '@/shared/api/types'
import {
  filterCollections,
  paginateCollections,
  sortCollections,
} from '../data/collections'
import { MOCK_API_BASE_URL } from '../config'
import { createSuccessResponse } from '../lib/response'

const BASE_URL = MOCK_API_BASE_URL

type EmptyParams = Record<string, never>

/**
 * 集合（基础列表）相关 API Mock Handlers
 */
export const collectionHandlers = [
  // 获取集合列表（支持分页 / 筛选 / 排序）
  http.get<
    EmptyParams,
    undefined,
    ApiResponse<CollectionListResponse | null>
  >(`${BASE_URL}/collections`, async ({ request }) => {
    await delay(300)

    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1
    const pageSize = Number(url.searchParams.get('pageSize')) || 10

    const code = url.searchParams.get('code') || undefined
    const name = url.searchParams.get('name') || undefined
    const contentTypeParam = url.searchParams.get('contentType')
    const strategyParam = url.searchParams.get('strategy')
    const statusParam = url.searchParams.get('status')
    const createdFrom = url.searchParams.get('createdFrom') || undefined
    const createdTo = url.searchParams.get('createdTo') || undefined
    const sortFieldParam = url.searchParams.get('sortField')
    const sortOrderParam = url.searchParams.get('sortOrder')

    const filtered = filterCollections({
      code,
      name,
      contentType:
        (contentTypeParam as Collection['contentType']) || undefined,
      strategy: (strategyParam as Collection['strategy']) || undefined,
      status: (statusParam as Collection['status']) || undefined,
      createdFrom,
      createdTo,
    })

    const sortField =
      (sortFieldParam as CollectionListParams['sortField']) || undefined
    const sortOrder: NonNullable<CollectionListParams['sortOrder']> =
      sortOrderParam === 'desc' ? 'desc' : 'asc'

    const sorted = sortCollections(filtered, sortField, sortOrder)
    const list = paginateCollections(sorted, page, pageSize)

    return createSuccessResponse<CollectionListResponse>({
      list,
      total: filtered.length,
      page,
      pageSize,
    })
  }),
]

