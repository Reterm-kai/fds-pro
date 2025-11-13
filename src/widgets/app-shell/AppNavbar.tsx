import { useEffect, useState } from 'react'
import {
  ActionIcon,
  Box,
  Collapse,
  NavLink,
  ScrollArea,
  Stack,
  Tooltip,
  Flex,
} from '@mantine/core'
import { useLocation, useNavigate } from 'react-router-dom'
import { ChevronsLeft, ChevronsRight, ChevronRight } from 'lucide-react'
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
      return [...new Set([...prev, ...activeKeys])]
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
          styles={{
            root: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '2.25rem',
              padding: '0.5rem',
              marginBottom: '0.25rem',
              borderRadius: '0.375rem',
              backgroundColor: active
                ? 'light-dark(rgba(22, 93, 255, 0.08), rgba(82, 143, 255, 0.15))'
                : 'transparent',
              '&:hover': {
                backgroundColor: active
                  ? 'light-dark(rgba(22, 93, 255, 0.12), rgba(82, 143, 255, 0.2))'
                  : 'light-dark(rgba(0, 0, 0, 0.04), rgba(255, 255, 255, 0.08))',
              },
            },
            section: {
              marginInlineEnd: 0,
              fontSize: '1.125rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: active
                ? 'light-dark(var(--mantine-color-blue-6), var(--mantine-color-blue-4))'
                : undefined,
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
    const isActiveLeaf = active && !hasChildren
    return (
      <Box key={item.key}>
        <NavLink
          label={item.label}
          leftSection={item.icon}
          rightSection={
            hasChildren ? (
              <Box
                component="span"
                display="inline-block"
                style={{
                  transform: isOpened ? 'rotate(90deg)' : 'none',
                  transition: 'transform 0.2s ease',
                }}
              >
                <ChevronRight size={12} />
              </Box>
            ) : null
          }
          active={isActiveLeaf}
          onClick={() => handleMenuClick(item)}
          disabled={item.disabled}
          styles={{
            root: {
              paddingLeft: `calc(${level} * 0.75rem + 1rem)`,
              paddingRight: '0.75rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              minHeight: '2.25rem',
              marginBottom: level === 0 ? '0.25rem' : 0,
              borderRadius: '0.375rem',
              backgroundColor: isActiveLeaf
                ? 'light-dark(rgba(22, 93, 255, 0.08), rgba(82, 143, 255, 0.15))'
                : 'transparent',
              '&:hover': {
                backgroundColor: isActiveLeaf
                  ? 'light-dark(rgba(22, 93, 255, 0.12), rgba(82, 143, 255, 0.2))'
                  : 'light-dark(rgba(0, 0, 0, 0.04), rgba(255, 255, 255, 0.08))',
              },
            },
            label: {
              fontSize: level === 0 ? '0.875rem' : '0.8125rem',
              fontWeight: level === 0 ? 500 : 400,
              color: isActiveLeaf
                ? 'light-dark(var(--mantine-color-blue-6), var(--mantine-color-blue-4))'
                : undefined,
            },
            section: {
              fontSize: '1.125rem',
              color: isActiveLeaf
                ? 'light-dark(var(--mantine-color-blue-6), var(--mantine-color-blue-4))'
                : undefined,
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
    <Flex direction="column" h="calc(100vh - 3.75rem)">
      {/* 菜单内容区域 - 可滚动 */}
      <ScrollArea
        flex={1}
        type="scroll"
        styles={{
          viewport: {
            paddingBottom: collapsed ? '0.25rem' : '0.5rem',
            paddingTop: collapsed ? '0.25rem' : '0.5rem',
          },
        }}
      >
        <Stack gap={0} px={collapsed ? '0.25rem' : 'md'}>
          {menuItems.map(item => renderMenuItem(item))}
        </Stack>
      </ScrollArea>

      {/* 收缩按钮 - 固定在底部，参考 Arco Design Pro */}
      {toggleCollapsed && (
        <Flex
          p="0.75rem"
          justify="center"
          align="center"
          style={{
            borderTop:
              '0.0625rem solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-5))',
          }}
        >
          <Tooltip
            label={collapsed ? '展开侧边栏' : '收起侧边栏'}
            position="right"
            withArrow
          >
            <ActionIcon
              onClick={toggleCollapsed}
              variant="subtle"
              size="sm"
              radius="sm"
              aria-label={collapsed ? '展开侧边栏' : '收起侧边栏'}
              styles={{
                root: {
                  transition: 'all 0.2s ease',
                  color:
                    'light-dark(var(--mantine-color-gray-6), var(--mantine-color-gray-5))',
                  '&:hover': {
                    backgroundColor:
                      'light-dark(rgba(0, 0, 0, 0.04), rgba(255, 255, 255, 0.08))',
                    color:
                      'light-dark(var(--mantine-color-gray-9), var(--mantine-color-gray-3))',
                  },
                },
              }}
            >
              {collapsed ? (
                <ChevronsRight size={16} />
              ) : (
                <ChevronsLeft size={16} />
              )}
            </ActionIcon>
          </Tooltip>
        </Flex>
      )}
    </Flex>
  )
}
