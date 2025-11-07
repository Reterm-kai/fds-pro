import { useState, useEffect } from 'react'
import {
  NavLink,
  Stack,
  Collapse,
  Box,
  Tooltip,
  ScrollArea,
  ActionIcon,
} from '@mantine/core'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  IconChevronRight,
  IconChevronLeft,
  IconMenuDeep,
} from '@tabler/icons-react'
import type { MenuItem } from '@/shared/navigation/types'

interface AppNavbarProps {
  /** 菜单项配置 */
  menuItems: MenuItem[]
  /** 是否收缩侧边栏(仅显示图标) */
  collapsed?: boolean
  /** 切换收缩状态的回调 */
  toggleCollapsed?: () => void
}

/**
 * 侧边菜单导航组件
 * 支持多级菜单、路由导航和自动展开当前激活菜单
 */
export function AppNavbar({
  menuItems,
  collapsed = false,
  toggleCollapsed,
}: AppNavbarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [openedKeys, setOpenedKeys] = useState<string[]>([])

  // 自动展开当前激活路径的父菜单
  useEffect(() => {
    const activeKeys: string[] = []

    const findActiveParent = (items: MenuItem[], parentKey?: string) => {
      items.forEach(item => {
        if (item.path === location.pathname && parentKey) {
          activeKeys.push(parentKey)
        }
        if (item.children) {
          findActiveParent(item.children, item.key)
        }
      })
    }

    findActiveParent(menuItems)
    setOpenedKeys(prev => {
      const newKeys = [...new Set([...prev, ...activeKeys])]
      return newKeys
    })
  }, [location.pathname, menuItems])

  const toggleSubmenu = (key: string) => {
    setOpenedKeys(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    )
  }

  const handleMenuClick = (item: MenuItem) => {
    if (item.disabled) return

    if (item.children && item.children.length > 0) {
      toggleSubmenu(item.key)
    } else if (item.path) {
      navigate(item.path)
    }
  }

  const isActive = (item: MenuItem): boolean => {
    if (item.path === location.pathname) return true
    if (item.children) {
      return item.children.some(child => isActive(child))
    }
    return false
  }

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isOpened = openedKeys.includes(item.key)
    const active = isActive(item)

    // 收缩模式下,只显示顶级菜单的图标
    if (collapsed && level === 0) {
      const navLink = (
        <NavLink
          key={item.key}
          label=""
          leftSection={item.icon}
          active={active}
          onClick={() => handleMenuClick(item)}
          disabled={item.disabled}
          style={{
            padding: '8px 0',
            justifyContent: 'center',
            minHeight: '40px',
            marginBottom: '4px',
            borderRadius: '4px',
          }}
          styles={{
            root: {
              '&:hover': {
                backgroundColor: 'var(--mantine-color-gray-1)',
              },
            },
            section: {
              fontSize: '18px',
            },
          }}
        />
      )

      // 使用 Tooltip 显示菜单名称
      return (
        <Tooltip key={item.key} label={item.label} position="right" withArrow>
          {navLink}
        </Tooltip>
      )
    }

    // 收缩模式下不显示子菜单
    if (collapsed && level > 0) {
      return null
    }

    // 正常模式
    return (
      <Box key={item.key}>
        <NavLink
          label={item.label}
          leftSection={item.icon}
          rightSection={
            hasChildren ? (
              <IconChevronRight
                size={14}
                style={{
                  transform: isOpened ? 'rotate(90deg)' : 'none',
                  transition: 'transform 200ms ease',
                }}
              />
            ) : null
          }
          active={active && !hasChildren}
          onClick={() => handleMenuClick(item)}
          disabled={item.disabled}
          style={{
            paddingLeft: `${level * 16 + 16}px`,
            marginBottom: level === 0 ? '4px' : '0',
            borderRadius: '4px',
          }}
          styles={{
            root: {
              '&:hover': {
                backgroundColor: 'var(--mantine-color-gray-1)',
              },
            },
            label: {
              fontSize: level === 0 ? '14px' : '13px',
              fontWeight: level === 0 ? 500 : 400,
            },
          }}
        />
        {hasChildren && (
          <Collapse in={isOpened}>
            <Stack gap={0}>
              {item.children!.map(child => renderMenuItem(child, level + 1))}
            </Stack>
          </Collapse>
        )}
      </Box>
    )
  }

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 60px)',
      }}
    >
      {/* 菜单内容区域 - 可滚动 */}
      <ScrollArea
        flex={1}
        type="scroll"
        styles={{
          viewport: {
            paddingBottom: collapsed ? '4px' : '8px',
            paddingTop: collapsed ? '4px' : '8px',
          },
        }}
      >
        <Stack gap={0} px={collapsed ? '4px' : 'md'}>
          {menuItems.map(item => renderMenuItem(item))}
        </Stack>
      </ScrollArea>

      {/* 收缩按钮 - 固定在底部，参考 Ant Design Pro */}
      {toggleCollapsed && (
        <>
          <Box
            style={{
              padding: collapsed ? '8px 0' : '8px 16px',
            }}
          >
            {collapsed ? (
              <Tooltip label="展开侧边栏" position="right" withArrow>
                <ActionIcon
                  onClick={toggleCollapsed}
                  variant="subtle"
                  size="sm"
                  style={{
                    width: '100%',
                    height: '24px',
                  }}
                >
                  <IconMenuDeep size={16} />
                </ActionIcon>
              </Tooltip>
            ) : (
              <ActionIcon
                onClick={toggleCollapsed}
                variant="subtle"
                size="sm"
                style={{
                  width: '24px',
                  height: '24px',
                }}
              >
                <IconChevronLeft size={16} />
              </ActionIcon>
            )}
          </Box>
          <Box
            style={{
              height: '1px',
              backgroundColor: 'var(--mantine-color-gray-3)',
            }}
          />
        </>
      )}
    </Box>
  )
}
