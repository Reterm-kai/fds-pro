/**
 * 用户实体相关工具函数
 */

import type { User } from '../model/types'

/**
 * 获取角色显示文本
 */
export function getRoleLabel(role: User['role']): string {
  const roleMap: Record<User['role'], string> = {
    admin: '管理员',
    user: '用户',
    guest: '访客',
  }
  return roleMap[role]
}

/**
 * 获取状态显示文本
 */
export function getStatusLabel(status: User['status']): string {
  const statusMap: Record<User['status'], string> = {
    active: '在线',
    inactive: '离线',
  }
  return statusMap[status]
}

/**
 * 获取角色对应的颜色
 */
export function getRoleColor(role: User['role']): string {
  const colorMap: Record<User['role'], string> = {
    admin: 'red',
    user: 'blue',
    guest: 'gray',
  }
  return colorMap[role]
}

/**
 * 获取状态对应的颜色
 */
export function getStatusColor(status: User['status']): string {
  const colorMap: Record<User['status'], string> = {
    active: 'green',
    inactive: 'gray',
  }
  return colorMap[status]
}

/**
 * 格式化用户全名
 */
export function getUserFullName(user: User): string {
  return user.name
}

/**
 * 获取用户首字母
 */
export function getUserInitials(user: User): string {
  return user.name.charAt(0).toUpperCase()
}
