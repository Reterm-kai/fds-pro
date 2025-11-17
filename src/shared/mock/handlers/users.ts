import { http, delay } from 'msw'
import type {
  User,
  UserListResponse,
  CreateUserParams,
  UpdateUserParams,
} from '@/entities/user'
import type { ApiResponse } from '@/shared/api/types'
import {
  createUserRecord,
  deleteUserRecord,
  filterUsers,
  findUserById,
  isEmailTaken,
  paginateUsers,
  updateUserRecord,
} from '../data/users'
import { MOCK_API_BASE_URL } from '../config'
import {
  createErrorResponse,
  createSuccessResponse,
} from '../lib/response'

const BASE_URL = MOCK_API_BASE_URL

type EmptyParams = Record<string, never>
interface UserIdParams {
  id: string
}

/**
 * 用户相关 API Mock Handlers
 */
export const userHandlers = [
  // 获取用户列表
  http.get<EmptyParams, undefined, ApiResponse<UserListResponse | null>>(
    `${BASE_URL}/users`,
    async ({ request }) => {
      await delay(300)

      const url = new URL(request.url)
      const page = Number(url.searchParams.get('page')) || 1
      const pageSize = Number(url.searchParams.get('pageSize')) || 10
      const keyword = url.searchParams.get('keyword') || undefined
      const role = (url.searchParams.get('role') as User['role']) || undefined
      const status =
        (url.searchParams.get('status') as User['status']) || undefined

      const filtered = filterUsers({ keyword, role, status })
      const list = paginateUsers(filtered, page, pageSize)

      return createSuccessResponse<UserListResponse>({
        list,
        total: filtered.length,
        page,
        pageSize,
      })
    }
  ),

  // 获取单个用户
  http.get<UserIdParams, undefined, ApiResponse<User | null>>(
    `${BASE_URL}/users/:id`,
    async ({ params }) => {
      await delay(200)

      const id = Number(params.id)
      const user = findUserById(id)

      if (!user) {
        return createErrorResponse(404, '用户不存在')
      }

      return createSuccessResponse<User>(user)
    }
  ),

  // 创建用户
  http.post<EmptyParams, CreateUserParams, ApiResponse<User | null>>(
    `${BASE_URL}/users`,
    async ({ request }) => {
      await delay(500)

      const body = (await request.json()) as CreateUserParams

      if (isEmailTaken(body.email)) {
        return createErrorResponse(400, '邮箱已存在')
      }

      const newUser = createUserRecord({
        name: body.name,
        email: body.email,
        role: body.role,
        status: 'active',
      })

      return createSuccessResponse<User>(newUser, '创建成功')
    }
  ),

  // 更新用户
  http.put<UserIdParams, UpdateUserParams, ApiResponse<User | null>>(
    `${BASE_URL}/users/:id`,
    async ({ params, request }) => {
      await delay(400)

      const id = Number(params.id)
      const body = (await request.json()) as UpdateUserParams

      if (!findUserById(id)) {
        return createErrorResponse(404, '用户不存在')
      }

      if (body.email && isEmailTaken(body.email, id)) {
        return createErrorResponse(400, '邮箱已存在')
      }

      const updatedUser = updateUserRecord(id, body)

      if (!updatedUser) {
        return createErrorResponse(500, '更新失败，请稍后重试', {
          status: 500,
        })
      }

      return createSuccessResponse<User>(updatedUser, '更新成功')
    }
  ),

  // 删除用户
  http.delete<UserIdParams, undefined, ApiResponse<null>>(
    `${BASE_URL}/users/:id`,
    async ({ params }) => {
      await delay(300)

      const id = Number(params.id)
      const deleted = deleteUserRecord(id)

      if (!deleted) {
        return createErrorResponse(404, '用户不存在')
      }

      return createSuccessResponse<null>(null, '删除成功')
    }
  ),
]
