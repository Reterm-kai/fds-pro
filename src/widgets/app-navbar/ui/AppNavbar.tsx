import { ActionIcon, ScrollArea, Tooltip, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconMail,
} from '@tabler/icons-react'
import { LinksGroup, ContactButton } from '@/shared/ui'
import { useMenuData } from '../model'
import classes from './AppNavbar.module.css'

interface AppNavbarProps {
  collapsed?: boolean
  onToggleCollapse?: () => void
  onLinkClick?: () => void
}

/**
 * 应用侧边导航栏组件
 * 从路由配置动态生成菜单,支持桌面端收缩/展开
 */
export function AppNavbar({
  collapsed = false,
  onToggleCollapse,
  onLinkClick,
}: AppNavbarProps) {
  const theme = useMantineTheme()
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)

  // 从 model 层获取菜单数据
  const menuData = useMenuData()

  // 渲染菜单项列表
  const renderMenuItems = (isCollapsed: boolean) =>
    menuData.map(item => (
      <LinksGroup
        {...item}
        key={item.label}
        collapsed={isCollapsed}
        onLinkClick={onLinkClick}
      />
    ))

  return (
    <nav className={`${classes.navbar} ${collapsed ? classes.collapsed : ''}`}>
      {/* 展开状态的内容 */}
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{renderMenuItems(false)}</div>
      </ScrollArea>

      {/* 收缩状态的图标 */}
      <div className={classes.collapsedContent}>
        <div className={classes.collapsedIconsInner}>{renderMenuItems(true)}</div>
      </div>

      <div className={classes.footer}>
        {/* 收缩/展开切换按钮 - 固定在分界线,仅桌面端显示 */}
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

        {/* 展开状态的联系按钮 */}
        <div className={classes.footerExpanded}>
          <ContactButton />
        </div>

        {/* 收缩状态的联系图标 */}
        <div className={classes.footerCollapsed}>
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
        </div>
      </div>
    </nav>
  )
}
