import {
  ActionIcon,
  Alert,
  Button,
  ScrollArea,
  Skeleton,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconMail,
  IconRefresh,
  IconAlertCircle,
} from '@tabler/icons-react'
import { LinksGroup, ContactButton } from '@/shared/ui'
import { useMenu, type MenuCacheScope } from '@/features/menu'
import classes from './AppNavbar.module.css'

interface AppNavbarProps {
  collapsed?: boolean
  onToggleCollapse?: () => void
  onLinkClick?: () => void
  menuCacheScope?: MenuCacheScope
}

/**
 * 应用侧边导航栏组件
 * 从路由配置动态生成菜单,支持桌面端收缩/展开
 */
export function AppNavbar({
  collapsed = false,
  onToggleCollapse,
  onLinkClick,
  menuCacheScope,
}: AppNavbarProps) {
  const theme = useMantineTheme()
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)

  const {
    data: menuData,
    isLoading,
    isError,
    isFetching,
    reload,
  } = useMenu({
    cacheScope: menuCacheScope,
  })
  const items = menuData ?? []
  const [shouldShowErrorState, setShouldShowErrorState] = useState(false)

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (isError) {
      setShouldShowErrorState(true)
      return
    }

    if (!isFetching && !isLoading) {
      setShouldShowErrorState(false)
    }
  }, [isError, isFetching, isLoading])
  /* eslint-enable react-hooks/set-state-in-effect */

  const shouldShowLoadingState = isLoading && !shouldShowErrorState
  const handleMenuReload = () => {
    void reload()
  }

  // 渲染菜单项列表
  const renderMenuItems = (isCollapsed: boolean) =>
    items.map(item => (
      <LinksGroup
        key={item.id}
        icon={item.icon}
        label={item.label}
        link={item.link}
        links={item.links}
        initiallyOpened={item.initiallyOpened}
        collapsed={isCollapsed}
        onLinkClick={onLinkClick}
      />
    ))

  const renderLoadingState = () => (
    <Stack gap="xs" p="md">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton
          key={`menu-skeleton-${index}`}
          height="calc(var(--mantine-spacing-xl) * 1.25)"
          radius="var(--mantine-radius-md)"
        />
      ))}
    </Stack>
  )

  const renderErrorState = () => (
    <Stack gap="xs" p="md">
      <Alert
        icon={<IconAlertCircle size={16} />}
        color="red"
        variant="light"
        title="菜单加载失败"
      >
        <Text size="sm">
          {isFetching ? '正在重新加载菜单...' : '请检查网络后重试'}
        </Text>
      </Alert>
      <Button
        size="xs"
        variant="light"
        loading={isFetching}
        onClick={handleMenuReload}
      >
        重新加载
      </Button>
    </Stack>
  )

  const renderExpandedContent = () => {
    if (shouldShowLoadingState) {
      return renderLoadingState()
    }
    if (shouldShowErrorState) {
      return renderErrorState()
    }
    if (items.length === 0) {
      return (
        <Text size="sm" c="dimmed" p="md">
          暂无可用菜单
        </Text>
      )
    }
    return <div className={classes.linksInner}>{renderMenuItems(false)}</div>
  }

  const renderCollapsedContent = () => {
    if (shouldShowLoadingState) {
      return (
        <div className={classes.collapsedIconsInner}>
          <Stack gap="sm" p="md" align="center" w="100%">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={`collapsed-skeleton-${index}`}
                width="calc(var(--mantine-spacing-xl) * 1.6)"
                height="calc(var(--mantine-spacing-xl) * 1.6)"
                radius="var(--mantine-radius-xl)"
              />
            ))}
          </Stack>
        </div>
      )
    }

    if (shouldShowErrorState) {
      return (
        <div className={classes.collapsedIconsInner}>
          <Tooltip
            label={isFetching ? '菜单正在重新加载' : '重新加载菜单'}
            position="right"
          >
            <ActionIcon
              variant="light"
              size="lg"
              loading={isFetching}
              onClick={handleMenuReload}
              aria-label={isFetching ? '菜单正在重新加载' : '重新加载菜单'}
            >
              <IconRefresh size={18} />
            </ActionIcon>
          </Tooltip>
        </div>
      )
    }

    if (items.length === 0) {
      return (
        <div className={classes.collapsedIconsInner}>
          <Text size="xs" c="dimmed" px="md" py="sm">
            无菜单
          </Text>
        </div>
      )
    }

    return (
      <div className={classes.collapsedIconsInner}>{renderMenuItems(true)}</div>
    )
  }

  return (
    <nav className={`${classes.navbar} ${collapsed ? classes.collapsed : ''}`}>
      {/* 展开状态的内容 */}
      <ScrollArea className={classes.links}>
        {renderExpandedContent()}
      </ScrollArea>

      {/* 收缩状态的图标 */}
      <div className={classes.collapsedContent}>{renderCollapsedContent()}</div>

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

        <div className={classes.footerContactArea}>
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
                size="md"
                className={classes.contactIconButton}
              >
                <IconMail size={18} />
              </ActionIcon>
            </Tooltip>
          </div>
        </div>
      </div>
    </nav>
  )
}
