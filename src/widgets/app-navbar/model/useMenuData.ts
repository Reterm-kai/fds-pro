import { useMemo } from 'react'
import { protectedRoutes } from '@/app/routes/router'
import { generateMenuFromRoutes } from '@/app/routes/utils'
import type { MenuItem } from '@/app/routes/utils'

/**
 * 生成应用导航菜单数据
 * @returns 菜单项数组
 */
export function useMenuData(): MenuItem[] {
  return useMemo(() => {
    const appLayoutRoute = protectedRoutes[0]

    if (!appLayoutRoute?.children) {
      return []
    }

    return generateMenuFromRoutes(appLayoutRoute.children)
  }, [])
}
