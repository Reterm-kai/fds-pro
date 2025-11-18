/**
 * EmptyState - 空状态组件
 *
 * 用于展示无数据、搜索无结果、错误等空状态场景
 */

import { Button, Text, Stack } from '@mantine/core'
import {
  IconSearch,
  IconDatabaseOff,
  IconAlertCircle,
  IconFolder,
} from '@tabler/icons-react'
import type { EmptyStateProps, EmptyStateImageType } from './types'
import classes from './EmptyState.module.css'

/**
 * 获取预设图标
 */
function getPresetIcon(type: EmptyStateImageType, size: number) {
  const iconMap = {
    search: IconSearch,
    nodata: IconDatabaseOff,
    error: IconAlertCircle,
    folder: IconFolder,
  }

  const Icon = iconMap[type]
  return <Icon size={size} stroke={1.5} />
}

/**
 * 根据尺寸获取图标大小
 */
function getIconSize(size: 'sm' | 'md' | 'lg'): number {
  const sizeMap = {
    sm: 48,
    md: 64,
    lg: 80,
  }
  return sizeMap[size]
}

export function EmptyState({
  title = '暂无数据',
  description,
  image = 'nodata',
  action,
  size = 'md',
  className,
}: EmptyStateProps) {
  const iconSize = getIconSize(size)

  // 渲染图标/图片
  const renderImage = () => {
    if (typeof image === 'string') {
      return getPresetIcon(image, iconSize)
    }
    return image
  }

  return (
    <Stack className={`${classes.container} ${className || ''}`} gap="md">
      <div className={`${classes.iconWrapper} ${classes[size]}`}>
        {renderImage()}
      </div>

      {title && (
        <Text className={classes.title} size={size === 'lg' ? 'lg' : 'md'}>
          {title}
        </Text>
      )}

      {description && (
        <Text className={classes.description} size="sm">
          {description}
        </Text>
      )}

      {action && (
        <Button
          onClick={action.onClick}
          leftSection={action.icon}
          variant={action.variant || 'default'}
        >
          {action.label}
        </Button>
      )}
    </Stack>
  )
}
