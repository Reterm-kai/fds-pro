import { useMemo } from 'react'
import {
  ActionIcon,
  ScrollArea,
  Tooltip,
  useMantineTheme,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconMail,
} from '@tabler/icons-react'
import { LinksGroup } from '../LinksGroup'
import { ContactButton } from '../ContactButton'
import { protectedRoutes } from '@/app/routes/router'
import { generateMenuFromRoutes } from '@/app/routes/utils'
import classes from './Navbar.module.css'

interface NavbarProps {
  collapsed?: boolean
  onToggleCollapse?: () => void
  onLinkClick?: () => void
}

/**
 * 应用导航栏组件
 * 从路由配置动态生成菜单，桌面端支持收缩/展开
 */
export function Navbar({
  collapsed = false,
  onToggleCollapse,
  onLinkClick,
}: NavbarProps) {
  const theme = useMantineTheme()
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)

  // 从路由配置生成菜单数据
  const menuData = useMemo(() => {
    const appLayoutRoute = protectedRoutes[0]
    if (!appLayoutRoute?.children) {
      return []
    }
    return generateMenuFromRoutes(appLayoutRoute.children)
  }, [])

  const links = menuData.map(item => (
    <LinksGroup
      {...item}
      key={item.label}
      collapsed={collapsed}
      onLinkClick={onLinkClick}
    />
  ))

  return (
    <nav className={`${classes.navbar} ${collapsed ? classes.collapsed : ''}`}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        {/* 收缩/展开切换按钮 - 固定在分界线，仅桌面端显示 */}
        {!isMobile && (
          <ActionIcon
            onClick={onToggleCollapse}
            variant="subtle"
            size="lg"
            className={classes.toggleButton}
          >
            {collapsed ? (
              <IconLayoutSidebarLeftExpand size={18} />
            ) : (
              <IconLayoutSidebarLeftCollapse size={18} />
            )}
          </ActionIcon>
        )}

        {/* 联系我们按钮 */}
        {collapsed ? (
          <Tooltip label="联系我们" position="right">
            <ActionIcon
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
              size="lg"
              className={classes.contactIconButton}
            >
              <IconMail size={18} />
            </ActionIcon>
          </Tooltip>
        ) : (
          <ContactButton />
        )}
      </div>
    </nav>
  )
}

