/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { notifications } from '@mantine/notifications'
import { User } from '@/entities/user'
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getCurrentUser,
} from '@/shared/api/auth'

// 认证上下文类型定义
interface AuthContextType {
  user: User | null
  login: (
    email: string,
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

// 创建认证上下文
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 认证提供者组件
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // 根据"记住我"选项确定存储方式
  const getStorage = (rememberMe: boolean) =>
    rememberMe ? localStorage : sessionStorage

  useEffect(() => {
    // 检查本地存储中是否有token和用户信息
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token')
    if (token) {
      // 如果有token，则获取当前用户信息
      getCurrentUser()
        .then(userData => {
          setUser(userData)
        })
        .catch(() => {
          // 如果获取用户信息失败，可能是token已过期，清除存储的数据
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          sessionStorage.removeItem('token')
          sessionStorage.removeItem('user')
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string, rememberMe = true) => {
    try {
      const response = await apiLogin({ email, password })
      setUser(response.user)

      // 根据"记住我"选项决定存储方式
      const storage = getStorage(rememberMe)
      storage.setItem('token', response.token)
      storage.setItem('user', JSON.stringify(response.user))
    } catch (error) {
      const message =
        error instanceof Error ? error.message : '登录失败，请重试'
      notifications.show({
        title: '登录失败',
        message,
        color: 'red',
      })
      throw error
    }
  }

  const register = async (userData: {
    name: string
    email: string
    password: string
  }) => {
    try {
      const newUser = await apiRegister(userData)
      notifications.show({
        title: '注册成功',
        message: '账户创建成功，请登录',
        color: 'green',
      })
      return newUser
    } catch (error) {
      const message =
        error instanceof Error ? error.message : '注册失败，请重试'
      notifications.show({
        title: '注册失败',
        message,
        color: 'red',
      })
      throw error
    }
  }

  const logout = () => {
    apiLogout().catch(() => {
      // 即使登出API调用失败，也要清理本地状态
      console.warn('登出API调用失败，但仍清除本地认证状态')
    })

    setUser(null)
    // 清理 localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    // 清理 sessionStorage
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    navigate('/login')
  }

  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  }

  if (loading) {
    return null // 或者返回一个加载指示器
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
