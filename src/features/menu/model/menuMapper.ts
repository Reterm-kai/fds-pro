import {
  IconAlertCircle,
  IconChartLine,
  IconChecklist,
  IconFileText,
  IconForms,
  IconGauge,
  IconSettings,
  IconTable,
  IconUser,
} from '@tabler/icons-react'
import type { MenuViewItem, RemoteMenuItem } from './types'

const iconMap = {
  IconGauge,
  IconChartLine,
  IconTable,
  IconForms,
  IconFileText,
  IconChecklist,
  IconAlertCircle,
  IconUser,
  IconSettings,
} satisfies Record<string, typeof IconGauge>

function normalizePath(path?: string): string | undefined {
  if (!path) return undefined
  const trimmed = path.trim()
  if (!trimmed) return undefined
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
}

function sortByOrder<T extends { order?: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const orderA = a.order ?? Number.MAX_SAFE_INTEGER
    const orderB = b.order ?? Number.MAX_SAFE_INTEGER
    return orderA - orderB
  })
}

function mapLinks(children: RemoteMenuItem[] = []) {
  return sortByOrder(children)
    .filter(child => !child.hidden)
    .map(child => {
      const link = normalizePath(child.path)
      if (!link) {
        return null
      }
      return {
        label: child.name,
        link,
      }
    })
    .filter(Boolean) as { label: string; link: string }[]
}

function resolveIcon(iconName?: string) {
  if (!iconName) return undefined
  return iconMap[iconName]
}

function transformItem(item: RemoteMenuItem): MenuViewItem | null {
  if (item.hidden) {
    return null
  }

  const links = mapLinks(item.children)

  if (links.length > 0) {
    return {
      id: item.id,
      label: item.name,
      icon: resolveIcon(item.icon),
      links,
      initiallyOpened: item.initiallyOpened,
    }
  }

  const link = normalizePath(item.path)
  if (!link) {
    return null
  }

  return {
    id: item.id,
    label: item.name,
    icon: resolveIcon(item.icon),
    link,
    initiallyOpened: item.initiallyOpened,
  }
}

/**
 * 将接口返回的菜单数据转换成导航栏使用的数据结构
 */
export function transformMenuResponse(data: RemoteMenuItem[]): MenuViewItem[] {
  return sortByOrder(data).map(transformItem).filter(Boolean) as MenuViewItem[]
}
