import { useState } from 'react'
import { NavLink, Stack, Collapse, Box } from '@mantine/core'
import { useNavigate, useLocation } from 'react-router-dom'
import { IconChevronRight } from '@tabler/icons-react'
import type { MenuItem } from '../types/menu'

interface AppNavbarProps {
  /** 菜单项配置 */
  menuItems: MenuItem[]
}

/**
 * 侧边菜单导航组件
 * 支持多级菜单和路由导航
 */
export function AppNavbar({ menuItems }: AppNavbarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [openedKeys, setOpenedKeys] = useState<string[]>([])

  /**
   * 切换子菜单展开状态
   */
  const toggleSubmenu = (key: string) => {
    setOpenedKeys(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    )
  }

  /**
   * 处理菜单项点击
   */
  const handleMenuClick = (item: MenuItem) => {
    if (item.disabled) return

    if (item.children && item.children.length > 0) {
      toggleSubmenu(item.key)
    } else if (item.path) {
      navigate(item.path)
    }
  }

  /**
   * 判断菜单项是否激活
   */
  const isActive = (item: MenuItem): boolean => {
    if (item.path === location.pathname) return true
    if (item.children) {
      return item.children.some(child => isActive(child))
    }
    return false
  }

  /**
   * 渲染菜单项
   */
  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isOpened = openedKeys.includes(item.key)
    const active = isActive(item)

    return (
      <Box key={item.key}>
        <NavLink
          label={item.label}
          leftSection={item.icon}
          rightSection={
            hasChildren ? (
              <IconChevronRight
                size={16}
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
          style={{ paddingLeft: `${level * 16 + 16}px` }}
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
    <Stack gap={0} p="md">
      {menuItems.map(item => renderMenuItem(item))}
    </Stack>
  )
}
