/**
 * 基础列表相关工具函数
 */

import type { ListItem } from '../model/types'

/**
 * 获取内容体裁显示文本
 */
export function getContentTypeLabel(type: ListItem['contentType']): string {
  const map: Record<ListItem['contentType'], string> = {
    image: '图文',
    template: '模板视频',
    video: '短视频',
    text: '文本',
  }

  return map[type]
}

/**
 * 获取筛选方式显示文本
 */
export function getStrategyLabel(strategy: ListItem['strategy']): string {
  const map: Record<ListItem['strategy'], string> = {
    artificial: '人工筛选',
    rules: '规则筛选',
  }

  return map[strategy]
}

/**
 * 获取状态显示文本
 */
export function getStatusLabel(status: ListItem['status']): string {
  const map: Record<ListItem['status'], string> = {
    online: '已上架',
    offline: '已下架',
  }

  return map[status]
}

/**
 * 获取状态对应的颜色（用于 Mantine 组件 color 属性）
 */
export function getStatusColor(status: ListItem['status']): string {
  const map: Record<ListItem['status'], string> = {
    online: 'teal',
    offline: 'gray',
  }

  return map[status]
}
