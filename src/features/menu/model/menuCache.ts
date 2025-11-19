const MENU_CACHE_KEY = 'fds-pro-menu-cache'
const CACHE_TTL = 10 * 60 * 1000 // 10 分钟

interface MenuCacheItem<T> {
  timestamp: number
  data: T
}

export function loadMenuCache<T>(): T | undefined {
  try {
    const stored = sessionStorage.getItem(MENU_CACHE_KEY)
    if (!stored) {
      return undefined
    }
    const parsed = JSON.parse(stored) as MenuCacheItem<T>
    if (!parsed?.data || !parsed.timestamp) {
      return undefined
    }
    if (Date.now() - parsed.timestamp > CACHE_TTL) {
      sessionStorage.removeItem(MENU_CACHE_KEY)
      return undefined
    }
    return parsed.data
  } catch {
    return undefined
  }
}

export function saveMenuCache<T>(data: T): void {
  try {
    const payload: MenuCacheItem<T> = {
      data,
      timestamp: Date.now(),
    }
    sessionStorage.setItem(MENU_CACHE_KEY, JSON.stringify(payload))
  } catch {
    // ignore write errors
  }
}
