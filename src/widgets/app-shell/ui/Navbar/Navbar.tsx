import { useMemo } from 'react'
import { ScrollArea } from '@mantine/core'
import { LinksGroup } from '../LinksGroup'
import { UserButton } from '../UserButton'
import { protectedRoutes } from '@/app/routes/router'
import { generateMenuFromRoutes } from '@/app/routes/utils'
import classes from './Navbar.module.css'

/**
 * 应用导航栏组件
 * 从路由配置动态生成菜单
 */
export function Navbar() {
  // 从路由配置生成菜单数据
  const menuData = useMemo(() => {
    // 获取 AppLayout 的子路由
    const appLayoutRoute = protectedRoutes[0]
    if (!appLayoutRoute?.children) {
      return []
    }
    return generateMenuFromRoutes(appLayoutRoute.children)
  }, [])

  const links = menuData.map(item => <LinksGroup {...item} key={item.label} />)

  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  )
}
