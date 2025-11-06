import { http, HttpResponse, delay } from 'msw'
import type { User } from '@/entities/user'
import { mockUsers, generateUserId } from '../data/users'

const BASE_URL = '/api'

/**
 * 模拟的已注册用户数据库
 */
const registeredUsers = [...mockUsers]

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
  // 登录
  http.post(`${BASE_URL}/auth/login`, async ({ request }) => {
    await delay(500)

    const body = (await request.json()) as { email: string; password: string }
    const { email, password } = body

    // 查找用户
    const user = registeredUsers.find(u => u.email === email)

    // 模拟验证逻辑
    if (!user) {
      return HttpResponse.json(
        {
          code: 404,
          message: '用户不存在',
        },
        { status: 404 }
      )
    }

    // 简单的密码验证（实际应该使用加密比对）
    // 这里为了演示，我们假设密码是 'password123'
    if (password !== 'password123') {
      return HttpResponse.json(
        {
          code: 401,
          message: '密码错误',
        },
        { status: 401 }
      )
    }

    // 生成 token 并保存会话
    const token = generateToken(user.id)
    sessions.set(token, user)

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: {
        user,
        token,
      },
    })
  }),

  // 注册
  http.post(`${BASE_URL}/auth/register`, async ({ request }) => {
    await delay(500)

    const body = (await request.json()) as {
      name: string
      email: string
      password: string
    }
    const { name, email } = body

    // 检查邮箱是否已注册
    const existingUser = registeredUsers.find(u => u.email === email)
    if (existingUser) {
      return HttpResponse.json(
        {
          code: 409,
          message: '该邮箱已被注册',
        },
        { status: 409 }
      )
    }

    // 创建新用户
    const newUser: User = {
      id: generateUserId(),
      name,
      email,
      role: 'user',
      status: 'active',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    registeredUsers.push(newUser)

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: newUser,
    })
  }),

  // 登出
  http.delete(`${BASE_URL}/auth/logout`, async ({ request }) => {
    await delay(200)

    // 从请求头获取 token
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')

    if (token && sessions.has(token)) {
      sessions.delete(token)
    }

    return HttpResponse.json({
      code: 0,
      message: 'success',
    })
  }),

  // 获取当前用户信息
  http.get(`${BASE_URL}/auth/me`, async ({ request }) => {
    await delay(200)

    // 从请求头获取 token
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')

    if (!token || !sessions.has(token)) {
      return HttpResponse.json(
        {
          code: 401,
          message: '未登录或登录已过期',
        },
        { status: 401 }
      )
    }

    const user = sessions.get(token)!

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: user,
    })
  }),
]
