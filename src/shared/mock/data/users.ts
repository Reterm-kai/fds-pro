import type { User } from '@/entities/user'

/**
 * Mock 用户数据
 * 用于开发和测试环境
 */
export const mockUsers: User[] = [
  {
    id: 1,
    name: '张三',
    email: 'admin@x.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=zhangsan',
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-11-01T10:20:00Z',
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-02-20T09:15:00Z',
    updatedAt: '2024-10-28T14:30:00Z',
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    role: 'user',
    status: 'inactive',
    createdAt: '2024-03-10T11:45:00Z',
  },
  {
    id: 4,
    name: '赵六',
    email: 'zhaoliu@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-04-05T13:20:00Z',
    updatedAt: '2024-11-02T16:10:00Z',
  },
  {
    id: 5,
    name: '孙七',
    email: 'sunqi@example.com',
    role: 'guest',
    status: 'active',
    createdAt: '2024-05-12T15:30:00Z',
  },
  {
    id: 6,
    name: '周八',
    email: 'zhouba@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-06-18T10:00:00Z',
    updatedAt: '2024-11-03T09:45:00Z',
  },
  {
    id: 7,
    name: '吴九',
    email: 'wujiu@example.com',
    role: 'user',
    status: 'inactive',
    createdAt: '2024-07-22T14:15:00Z',
  },
  {
    id: 8,
    name: '郑十',
    email: 'zhengshi@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-08-30T11:30:00Z',
  },
  {
    id: 9,
    name: '陈十一',
    email: 'chenshiyi@example.com',
    role: 'guest',
    status: 'active',
    createdAt: '2024-09-05T16:20:00Z',
  },
  {
    id: 10,
    name: '刘十二',
    email: 'liushier@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-10-10T12:00:00Z',
  },
  {
    id: 11,
    name: '黄十三',
    email: 'huangshisan@example.com',
    role: 'user',
    status: 'inactive',
    createdAt: '2024-10-15T09:30:00Z',
  },
  {
    id: 12,
    name: '杨十四',
    email: 'yangshisi@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-10-20T14:45:00Z',
  },
]

let nextId = mockUsers.length + 1

/**
 * 生成新用户 ID
 */
export function generateUserId(): number {
  return nextId++
}

/**
 * 根据条件筛选用户
 */
export function filterUsers(params: {
  keyword?: string
  role?: User['role']
  status?: User['status']
}): User[] {
  let filtered = [...mockUsers]

  if (params.keyword) {
    const keyword = params.keyword.toLowerCase()
    filtered = filtered.filter(
      user =>
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword)
    )
  }

  if (params.role) {
    filtered = filtered.filter(user => user.role === params.role)
  }

  if (params.status) {
    filtered = filtered.filter(user => user.status === params.status)
  }

  return filtered
}

/**
 * 分页处理
 */
export function paginateUsers(
  users: User[],
  page: number = 1,
  pageSize: number = 10
) {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return users.slice(start, end)
}
