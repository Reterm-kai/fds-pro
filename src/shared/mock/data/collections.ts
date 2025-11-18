import type {
  ListItem,
  ListContentType,
  ListParams,
  ListStatus,
  ListStrategy,
} from '@/features/list-basic'

/**
 * Mock 集合数据
 * 用于基础列表页的分页、筛选、排序示例
 */
const contentTypes: ListContentType[] = ['image', 'template', 'video', 'text']

const strategies: ListStrategy[] = ['artificial', 'rules']

const statuses: ListStatus[] = ['online', 'offline']

const startDate = new Date('2024-09-01T09:00:00Z').getTime()
const oneHour = 60 * 60 * 1000

const mockCollections: ListItem[] = Array.from({ length: 32 }, (_, index) => {
  const id = index + 1
  const createdAt = new Date(startDate + index * oneHour).toISOString()

  return {
    id,
    code: String(100 + id),
    name: `COLL_${String.fromCharCode(65 + (id % 26))}${id}`,
    contentType: contentTypes[index % contentTypes.length],
    strategy: strategies[index % strategies.length],
    contentCount: (id * 37) % 1000,
    createdAt,
    status: statuses[index % statuses.length],
  }
})

/** 获取全部集合（浅拷贝以避免外部修改内部数据） */
export function getAllCollections(): ListItem[] {
  return [...mockCollections]
}

type FilterCollectionsParams = Pick<
  ListParams,
  | 'code'
  | 'name'
  | 'contentType'
  | 'strategy'
  | 'status'
  | 'createdFrom'
  | 'createdTo'
>

/** 根据查询条件筛选集合 */
export function filterCollections(params: FilterCollectionsParams): ListItem[] {
  const { code, name, contentType, strategy, status, createdFrom, createdTo } =
    params

  let filtered = [...mockCollections]

  if (code && code.trim()) {
    const normalizedCode = code.trim()
    filtered = filtered.filter(item => item.code.includes(normalizedCode))
  }

  if (name && name.trim()) {
    const keyword = name.trim().toLowerCase()
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(keyword)
    )
  }

  if (contentType) {
    filtered = filtered.filter(item => item.contentType === contentType)
  }

  if (strategy) {
    filtered = filtered.filter(item => item.strategy === strategy)
  }

  if (status) {
    filtered = filtered.filter(item => item.status === status)
  }

  if (createdFrom) {
    const fromTime = new Date(createdFrom).getTime()
    if (!Number.isNaN(fromTime)) {
      filtered = filtered.filter(
        item => new Date(item.createdAt).getTime() >= fromTime
      )
    }
  }

  if (createdTo) {
    const toTime = new Date(createdTo).getTime()
    if (!Number.isNaN(toTime)) {
      filtered = filtered.filter(
        item => new Date(item.createdAt).getTime() <= toTime
      )
    }
  }

  return filtered
}

type ListSortField = NonNullable<ListParams['sortField']>
type ListSortOrder = NonNullable<ListParams['sortOrder']>

/** 根据字段排序集合 */
export function sortCollections(
  list: ListItem[],
  sortField?: ListSortField,
  sortOrder: ListSortOrder = 'asc'
): ListItem[] {
  if (!sortField) {
    return [...list]
  }

  const sorted = [...list].sort((a, b) => {
    if (sortField === 'contentCount') {
      return a.contentCount - b.contentCount
    }

    if (sortField === 'createdAt') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }

    const valueA = sortField === 'code' ? a.code : a.name
    const valueB = sortField === 'code' ? b.code : b.name

    return valueA.localeCompare(valueB, 'zh-CN')
  })

  if (sortOrder === 'desc') {
    return sorted.reverse()
  }

  return sorted
}

/** 分页处理 */
export function paginateCollections(
  list: ListItem[],
  page: number = 1,
  pageSize: number = 10
): ListItem[] {
  const currentPage = page > 0 ? page : 1
  const size = pageSize > 0 ? pageSize : 10
  const start = (currentPage - 1) * size
  const end = start + size

  return list.slice(start, end)
}
