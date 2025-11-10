import { createContext } from 'react'
import { User } from '@/entities/user'

/**
 * 认证上下文类型定义
 */
export interface AuthContextType {
  user: User | null
  login: (
    username: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<void>
  logout: () => void
  register: (userData: {
    name: string
    email: string
    password: string
  }) => Promise<User>
  isAuthenticated: boolean
}

/**
 * 创建认证上下文
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined)
