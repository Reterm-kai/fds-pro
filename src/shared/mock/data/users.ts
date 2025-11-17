import type { UpdateUserParams, User } from '@/entities/user'

/**
 * Mock 用户数据
 * 用于开发和测试环境
 */
const mockUsers: User[] = [
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

export interface CreateUserRecordInput {
  name: string
  email: string
  role: User['role']
  status?: User['status']
  avatar?: string
}

type FilterUsersParams = {
  keyword?: string
  role?: User['role']
  status?: User['status']
}

/**
 * 获取全部用户（引用同一个数据源）
 */
export function listUsers(): User[] {
  return mockUsers
}

/**
 * 根据 ID 查找用户
 */
export function findUserById(id: number): User | undefined {
  return mockUsers.find(user => user.id === id)
}

/**
 * 根据邮箱查找用户（忽略大小写）
 */
export function findUserByEmail(email: string): User | undefined {
  const normalized = email.toLowerCase()
  return mockUsers.find(user => user.email.toLowerCase() === normalized)
}

/**
 * 根据用户名或邮箱查找用户
 */
export function findUserByIdentity(identity: string): User | undefined {
  const normalized = identity.toLowerCase()
  return mockUsers.find(
    user =>
      user.email.toLowerCase() === normalized ||
      user.name.toLowerCase() === normalized
  )
}

/**
 * 判断邮箱是否被占用
 */
export function isEmailTaken(email: string, excludeId?: number): boolean {
  const normalized = email.toLowerCase()
  return mockUsers.some(
    user =>
      user.email.toLowerCase() === normalized &&
      (excludeId === undefined || user.id !== excludeId)
  )
}

/**
 * 创建一个新的用户记录
 */
export function createUserRecord(
  input: CreateUserRecordInput
): User {
  const timestamp = new Date().toISOString()
  const user: User = {
    id: nextId++,
    name: input.name,
    email: input.email,
    role: input.role,
    status: input.status ?? 'active',
    avatar: input.avatar,
    createdAt: timestamp,
    updatedAt: timestamp,
  }

  mockUsers.push(user)
  return user
}

/**
 * 更新用户信息
 */
export function updateUserRecord(
  id: number,
  params: UpdateUserParams
): User | null {
  const index = mockUsers.findIndex(user => user.id === id)
  if (index === -1) {
    return null
  }

  const updated: User = {
    ...mockUsers[index],
    ...params,
    updatedAt: new Date().toISOString(),
  }

  mockUsers[index] = updated
  return updated
}

/**
 * 删除用户
 */
export function deleteUserRecord(id: number): boolean {
  const index = mockUsers.findIndex(user => user.id === id)
  if (index === -1) {
    return false
  }

  mockUsers.splice(index, 1)
  return true
}

/**
 * 根据条件筛选用户
 */
export function filterUsers(params: FilterUsersParams): User[] {
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
