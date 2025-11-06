import { http, HttpResponse, delay } from 'msw'
import type { User, CreateUserParams, UpdateUserParams } from '@/entities/user'
import {
  mockUsers,
  generateUserId,
  filterUsers,
  paginateUsers,
} from '../data/users'

const BASE_URL = '/api'

/**
 * 用户相关 API Mock Handlers
 */
export const userHandlers = [
  // 获取用户列表
  http.get(`${BASE_URL}/users`, async ({ request }) => {
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

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: {
        list,
        total: filtered.length,
        page,
        pageSize,
      },
    })
  }),

  // 获取单个用户
  http.get(`${BASE_URL}/users/:id`, async ({ params }) => {
    await delay(200)

    const id = Number(params.id)
    const user = mockUsers.find(u => u.id === id)

    if (!user) {
      return HttpResponse.json(
        {
          code: 404,
          message: '用户不存在',
          data: null,
        },
        { status: 404 }
      )
    }

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: user,
    })
  }),

  // 创建用户
  http.post(`${BASE_URL}/users`, async ({ request }) => {
    await delay(500)

    const body = (await request.json()) as CreateUserParams

    if (mockUsers.some(u => u.email === body.email)) {
      return HttpResponse.json(
        {
          code: 400,
          message: '邮箱已存在',
          data: null,
        },
        { status: 400 }
      )
    }

    const newUser: User = {
      id: generateUserId(),
      name: body.name,
      email: body.email,
      role: body.role,
      status: 'active',
      createdAt: new Date().toISOString(),
    }

    mockUsers.push(newUser)

    return HttpResponse.json({
      code: 0,
      message: '创建成功',
      data: newUser,
    })
  }),

  // 更新用户
  http.put(`${BASE_URL}/users/:id`, async ({ params, request }) => {
    await delay(400)

    const id = Number(params.id)
    const body = (await request.json()) as UpdateUserParams
    const userIndex = mockUsers.findIndex(u => u.id === id)

    if (userIndex === -1) {
      return HttpResponse.json(
        {
          code: 404,
          message: '用户不存在',
          data: null,
        },
        { status: 404 }
      )
    }

    if (body.email && body.email !== mockUsers[userIndex].email) {
      if (mockUsers.some(u => u.email === body.email)) {
        return HttpResponse.json(
          {
            code: 400,
            message: '邮箱已存在',
            data: null,
          },
          { status: 400 }
        )
      }
    }

    const updatedUser: User = {
      ...mockUsers[userIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    mockUsers[userIndex] = updatedUser

    return HttpResponse.json({
      code: 0,
      message: '更新成功',
      data: updatedUser,
    })
  }),

  // 删除用户
  http.delete(`${BASE_URL}/users/:id`, async ({ params }) => {
    await delay(300)

    const id = Number(params.id)
    const userIndex = mockUsers.findIndex(u => u.id === id)

    if (userIndex === -1) {
      return HttpResponse.json(
        {
          code: 404,
          message: '用户不存在',
          data: null,
        },
        { status: 404 }
      )
    }

    mockUsers.splice(userIndex, 1)

    return HttpResponse.json({
      code: 0,
      message: '删除成功',
      data: null,
    })
  }),
]
