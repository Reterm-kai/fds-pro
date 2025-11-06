/**
 * 用户相关类型定义
 */

/** 用户实体 */
export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt?: string
}

/** 用户列表查询参数 */
export interface UserListParams {
  page?: number
  pageSize?: number
  keyword?: string
  role?: User['role']
  status?: User['status']
}

/** 用户列表响应 */
export interface UserListResponse {
  list: User[]
  total: number
  page: number
  pageSize: number
}

/** 创建用户参数 */
export interface CreateUserParams {
  name: string
  email: string
  role: User['role']
  password: string
}

/** 更新用户参数 */
export interface UpdateUserParams {
  name?: string
  email?: string
  role?: User['role']
  status?: User['status']
}
