/**
 * 用户实体基础 API
 *
 * 提供用户的基础 CRUD 操作
 */

import { get } from '@/shared/api/client'
import type { User } from '../model/types'

/**
 * 获取单个用户详情
 *
 * @param id - 用户ID
 * @returns 用户信息
 */
export async function getUser(id: number): Promise<User> {
  return get<User>(`/users/${id}`)
}
