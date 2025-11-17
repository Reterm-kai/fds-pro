import { http, delay } from 'msw'
import type { User } from '@/entities/user'
import type { ApiResponse } from '@/shared/api/types'
import {
  createUserRecord,
  findUserByEmail,
  findUserByIdentity,
} from '../data/users'
import { MOCK_API_BASE_URL } from '../config'
import {
  createErrorResponse,
  createSuccessResponse,
} from '../lib/response'
import { extractBearerToken } from '../lib/request'

const BASE_URL = MOCK_API_BASE_URL

type EmptyParams = Record<string, never>

interface LoginRequestBody {
  username: string
  password: string
}

interface RegisterRequestBody {
  name: string
  email: string
  password: string
}

interface LoginSuccessData {
  user: User
  token: string
}

/**
 * 模拟的当前会话 token
 */
const sessions = new Map<string, User>()

/**
 * 生成模拟 token
 */
function generateToken(userId: number): string {
  return `mock-token-${userId}-${Date.now()}`
}

/**
 * 认证相关 API Mock Handlers
 */
export const authHandlers = [
  // 登录 (支持用户名或邮箱)
  http.post<
    EmptyParams,
    LoginRequestBody,
    ApiResponse<LoginSuccessData | null>
  >(`${BASE_URL}/auth/login`, async ({ request }) => {
    await delay(500)

    const body = (await request.json()) as LoginRequestBody
    const username = body.username?.trim()
    const password = body.password?.trim()

    if (!username || !password) {
      return createErrorResponse(400, '用户名或密码不能为空')
    }

    // 查找用户 (支持用户名或邮箱)
    const user = findUserByIdentity(username)

    // 模拟验证逻辑
    if (!user) {
      return createErrorResponse(404, '用户不存在')
    }

    // 简单的密码验证（实际应该使用加密比对）
    // 这里为了演示，我们假设密码是 '123456'
    if (password !== '123456') {
      return createErrorResponse(401, '密码错误')
    }

    // 生成 token 并保存会话
    const token = generateToken(user.id)
    sessions.set(token, user)

    return createSuccessResponse<LoginSuccessData>({
      user,
      token,
    })
  }),

  // 注册
  http.post<
    EmptyParams,
    RegisterRequestBody,
    ApiResponse<User | null>
  >(`${BASE_URL}/auth/register`, async ({ request }) => {
    await delay(500)

    const body = (await request.json()) as RegisterRequestBody
    const name = body.name?.trim()
    const email = body.email?.trim()
    const password = body.password?.trim()

    if (!name || !email || !password) {
      return createErrorResponse(400, '姓名、邮箱和密码不能为空')
    }

    // 检查邮箱是否已注册
    if (findUserByEmail(email)) {
      return createErrorResponse(409, '该邮箱已被注册')
    }

    // 创建新用户
    const newUser: User = createUserRecord({
      name,
      email,
      role: 'user',
      status: 'active',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
    })

    return createSuccessResponse<User>(newUser)
  }),

  // 登出
  http.delete<EmptyParams, undefined, ApiResponse<null>>(
    `${BASE_URL}/auth/logout`,
    async ({ request }) => {
      await delay(200)

      // 从请求头获取 token
      const token = extractBearerToken(request)

      if (token && sessions.has(token)) {
        sessions.delete(token)
      }

      return createSuccessResponse<null>(null)
    }
  ),

  // 获取当前用户信息
  http.get<EmptyParams, undefined, ApiResponse<User | null>>(
    `${BASE_URL}/auth/me`,
    async ({ request }) => {
      await delay(200)

      // 从请求头获取 token
      const token = extractBearerToken(request)

      if (!token || !sessions.has(token)) {
        return createErrorResponse(401, '未登录或登录已过期')
      }

      const user = sessions.get(token)!

      return createSuccessResponse<User>(user)
    }
  ),
]
