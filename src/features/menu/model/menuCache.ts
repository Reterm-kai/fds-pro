const MENU_CACHE_PREFIX = 'fds-pro-menu-cache'

/** 菜单缓存过期时间（1 分钟） */
export const MENU_CACHE_TTL = 60 * 1000

export interface MenuCacheScope {
  userId?: number | string
  tenantId?: string
  locale?: string
}

interface MenuCacheItem<T> {
  timestamp: number
  data: T
}

function createCacheKey(scope?: MenuCacheScope): string {
  const parts = [
    MENU_CACHE_PREFIX,
    scope?.userId ? `user-${scope.userId}` : 'user-anonymous',
    scope?.tenantId ? `tenant-${scope.tenantId}` : 'tenant-default',
    scope?.locale ? `locale-${scope.locale}` : 'locale-default',
  ]
  return parts.join(':')
}

/**
 * 从 sessionStorage 加载菜单缓存
 */
export function loadMenuCache<T>(
  scope?: MenuCacheScope
): MenuCacheItem<T> | undefined {
  const cacheKey = createCacheKey(scope)

  try {
    const stored = sessionStorage.getItem(cacheKey)
    if (!stored) return undefined

    const parsed = JSON.parse(stored) as MenuCacheItem<T>
    if (!parsed?.data || !parsed.timestamp) return undefined

    if (Date.now() - parsed.timestamp > MENU_CACHE_TTL) {
      sessionStorage.removeItem(cacheKey)
      return undefined
    }

    return parsed
  } catch {
    return undefined
  }
}

/**
 * 保存菜单缓存到 sessionStorage
 */
export function saveMenuCache<T>(data: T, scope?: MenuCacheScope): void {
  const cacheKey = createCacheKey(scope)

  try {
    const payload: MenuCacheItem<T> = { data, timestamp: Date.now() }
    sessionStorage.setItem(cacheKey, JSON.stringify(payload))
  } catch {
    // 忽略写入错误
  }
}

/**
 * 清除菜单缓存
 */
export function clearMenuCache(scope?: MenuCacheScope): void {
  try {
    sessionStorage.removeItem(createCacheKey(scope))
  } catch {
    // 忽略删除错误
  }
}
