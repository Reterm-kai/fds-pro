import { useCallback, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { get } from '@/shared/api/client'
import type { RemoteMenuItem } from '../model/types'
import { transformMenuResponse } from '../model/menuMapper'
import {
  loadMenuCache,
  saveMenuCache,
  clearMenuCache,
  type MenuCacheScope,
  MENU_CACHE_TTL,
} from '../model/menuCache'

const createMenuQueryKey = (scope?: MenuCacheScope) =>
  [
    'menus',
    scope?.userId ?? 'user-anonymous',
    scope?.tenantId ?? 'tenant-default',
    scope?.locale ?? 'locale-default',
  ] as const

interface UseMenuOptions {
  cacheScope?: MenuCacheScope
}

const PROACTIVE_REFRESH_MARGIN = 10 * 1000
const REFRESH_RETRY_ATTEMPTS = 3
const REFRESH_RETRY_DELAY = 2 * 1000

const delay = (duration: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, duration)
  })

export function useMenu(options?: UseMenuOptions) {
  const { cacheScope } = options ?? {}
  const cachedMenu = loadMenuCache<RemoteMenuItem[]>(cacheScope)
  const initialData = cachedMenu?.data
  const queryKey = createMenuQueryKey(cacheScope)
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await get<RemoteMenuItem[]>('/menus')
      saveMenuCache(response, cacheScope)
      return response
    },
    select: transformMenuResponse,
    initialData,
    initialDataUpdatedAt: cachedMenu?.timestamp,
    placeholderData: previousData => previousData,
    staleTime: 5 * 60 * 1000,
    retry: REFRESH_RETRY_ATTEMPTS,
    retryDelay: attemptIndex => attemptIndex * REFRESH_RETRY_DELAY,
  })

  const { refetch } = query

  const refreshWithRetry = useCallback(async () => {
    for (let attempt = 1; attempt <= REFRESH_RETRY_ATTEMPTS; attempt += 1) {
      try {
        await refetch({ throwOnError: true })
        return
      } catch (error) {
        if (attempt === REFRESH_RETRY_ATTEMPTS) {
          if (import.meta.env.DEV) {
            console.error('菜单刷新重试失败', error)
          }
          return
        }
        await delay(REFRESH_RETRY_DELAY * attempt)
      }
    }
  }, [refetch])

  useEffect(() => {
    if (!cachedMenu?.timestamp) {
      return
    }
    if (typeof window === 'undefined') {
      return
    }

    const timeSinceCache = Date.now() - cachedMenu.timestamp
    const timeUntilExpiry = Math.max(0, MENU_CACHE_TTL - timeSinceCache)
    const refreshDelay = Math.max(
      0,
      timeUntilExpiry - PROACTIVE_REFRESH_MARGIN
    )

    let cancelled = false

    const triggerRefresh = () => {
      if (cancelled) return
      void refreshWithRetry()
    }

    if (refreshDelay === 0) {
      triggerRefresh()
      return () => {
        cancelled = true
      }
    }

    const timerId = window.setTimeout(triggerRefresh, refreshDelay)

    return () => {
      cancelled = true
      window.clearTimeout(timerId)
    }
  }, [cachedMenu?.timestamp, refreshWithRetry])

  const reload = async () => {
    clearMenuCache(cacheScope)
    await queryClient.invalidateQueries({
      queryKey,
      exact: true,
      refetchType: 'active',
    })
  }

  return {
    ...query,
    reload,
  }
}
