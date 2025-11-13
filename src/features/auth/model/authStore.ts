import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
import { User } from '@/entities/user'
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getCurrentUser,
} from '../api/authApi'
import { notifications } from '@mantine/notifications'

/**
 * 认证状态接口
 */
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isInitialized: boolean
  setUser: (user: User | null) => void
  login: (
    username: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<void>
  register: (userData: {
    name: string
    email: string
    password: string
  }) => Promise<User>
  logout: () => Promise<void>
  initialize: () => Promise<void>
}

/**
 * 认证 Store
 * 使用 Zustand 管理全局认证状态
 */
export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      set => ({
        user: null,
        isAuthenticated: false,
        isInitialized: false,

        setUser: user =>
          set({ user, isAuthenticated: !!user }, false, 'auth/setUser'),

        login: async (username, password, rememberMe = true) => {
          try {
            const response = await apiLogin({ username, password })
            set(
              {
                user: response.user,
                isAuthenticated: true,
              },
              false,
              'auth/login'
            )

            // 根据 rememberMe 决定持久化行为
            // 持久化由 persist 中间件自动处理
            if (!rememberMe) {
              // 如果不记住我,登出时清除存储
              sessionStorage.setItem('auth-no-persist', 'true')
            } else {
              sessionStorage.removeItem('auth-no-persist')
            }
          } catch (err) {
            const message =
              err instanceof Error ? err.message : '登录失败,请重试'
            notifications.show({
              title: '登录失败',
              message,
              color: 'red',
            })
            throw err
          }
        },

        register: async userData => {
          try {
            const newUser = await apiRegister(userData)
            notifications.show({
              title: '注册成功',
              message: '账户创建成功,请登录',
              color: 'green',
            })
            return newUser
          } catch (err) {
            const message =
              err instanceof Error ? err.message : '注册失败,请重试'
            notifications.show({
              title: '注册失败',
              message,
              color: 'red',
            })
            throw err
          }
        },

        logout: async () => {
          try {
            await apiLogout()
          } catch {
            console.warn('登出 API 调用失败,但仍清除本地认证状态')
          }

          set(
            {
              user: null,
              isAuthenticated: false,
            },
            false,
            'auth/logout'
          )

          // 如果设置了不持久化标志,清除存储
          if (sessionStorage.getItem('auth-no-persist') === 'true') {
            localStorage.removeItem('auth-storage')
            sessionStorage.removeItem('auth-no-persist')
          }
        },

        initialize: async () => {
          // persist 中间件已经自动恢复了状态
          // 这里只需要验证 token 是否仍然有效(可选)
          const currentState = useAuthStore.getState()

          if (currentState.user) {
            // 在开发环境下,由于 MSW 的 sessions 在刷新后会丢失
            // 我们跳过 token 验证,直接信任 localStorage 中的数据
            // 生产环境应该验证 token
            if (import.meta.env.DEV) {
              console.log('[Auth] 开发环境:跳过 token 验证,使用缓存的用户数据')
              set({ isInitialized: true }, false, 'auth/initialize')
            } else {
              // 生产环境:验证 token 是否有效
              try {
                const userData = await getCurrentUser()
                set(
                  {
                    user: userData,
                    isAuthenticated: true,
                    isInitialized: true,
                  },
                  false,
                  'auth/initialize'
                )
              } catch {
                // Token 无效,清除状态
                console.warn('[Auth] Token 验证失败,已清除本地状态')
                set(
                  {
                    user: null,
                    isAuthenticated: false,
                    isInitialized: true,
                  },
                  false,
                  'auth/initialize'
                )
              }
            }
          } else {
            set({ isInitialized: true }, false, 'auth/initialize')
          }
        },
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: state => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: 'AuthStore' }
  )
)

/**
 * 选择器:仅订阅用户信息
 */
export const selectUser = (state: AuthState) => state.user

/**
 * 选择器:仅订阅认证状态
 */
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated

/**
 * 选择器:仅订阅初始化状态
 */
export const selectIsInitialized = (state: AuthState) => state.isInitialized
