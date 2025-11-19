const MENU_CACHE_PREFIX = 'fds-pro-menu-cache'
const CACHE_TTL = 1 * 60 * 1000 // 1 分钟

export interface MenuCacheScope {
  userId?: number | string
  tenantId?: string
  locale?: string
}

interface MenuCacheItem<T> {
  timestamp: number
  data: T
}

const createCacheKey = (scope?: MenuCacheScope) => {
  const parts = [
    MENU_CACHE_PREFIX,
    scope?.userId ? `user-${scope.userId}` : 'user-anonymous',
    scope?.tenantId ? `tenant-${scope.tenantId}` : 'tenant-default',
    scope?.locale ? `locale-${scope.locale}` : 'locale-default',
  ]
  return parts.join(':')
}

export function loadMenuCache<T>(
  scope?: MenuCacheScope
): MenuCacheItem<T> | undefined {
  const cacheKey = createCacheKey(scope)

  try {
    const stored = sessionStorage.getItem(cacheKey)
    if (!stored) {
      return undefined
    }
    const parsed = JSON.parse(stored) as MenuCacheItem<T>
    if (!parsed?.data || !parsed.timestamp) {
      return undefined
    }
    if (Date.now() - parsed.timestamp > CACHE_TTL) {
      sessionStorage.removeItem(cacheKey)
      return undefined
    }
    return parsed
  } catch {
    return undefined
  }
}

export function saveMenuCache<T>(data: T, scope?: MenuCacheScope): void {
  const cacheKey = createCacheKey(scope)
  try {
    const payload: MenuCacheItem<T> = {
      data,
      timestamp: Date.now(),
    }
    sessionStorage.setItem(cacheKey, JSON.stringify(payload))
  } catch {
    // ignore write errors
  }
}
