import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
import { showErrorNotification, showSuccessNotification } from '@/shared/ui'
import type { User } from '@/entities/user'
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getCurrentUser,
} from '../api/authApi'

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

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      set => ({
        user: null,
        isAuthenticated: false,
        isInitialized: false,

        setUser: user =>
          set({ user, isAuthenticated: Boolean(user) }, false, 'auth/setUser'),

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

            // 记录是否需要持久化登录状态
            if (!rememberMe) {
              // 不记住我：通过标记控制后续登出时清理持久化存储
              sessionStorage.setItem('auth-no-persist', 'true')
            } else {
              sessionStorage.removeItem('auth-no-persist')
            }
          } catch (err) {
            const message =
              err instanceof Error ? err.message : '登录失败，请重试'

            showErrorNotification({
              title: '登录失败',
              message,
            })

            throw err
          }
        },

        register: async userData => {
          try {
            const newUser = await apiRegister(userData)

            showSuccessNotification({
              title: '注册成功',
              message: '账户创建成功，请登录',
            })

            return newUser
          } catch (err) {
            const message =
              err instanceof Error ? err.message : '注册失败，请重试'

            showErrorNotification({
              title: '注册失败',
              message,
            })

            throw err
          }
        },

        logout: async () => {
          try {
            await apiLogout()
          } catch {
            // 接口失败时仍然清理本地状态，保证安全退出
            console.warn('登出 API 调用失败，但仍清除本地认证状态')
          }

          set(
            {
              user: null,
              isAuthenticated: false,
            },
            false,
            'auth/logout'
          )

          // 如果之前选择了“仅本次登录”，在登出时清除持久化存储
          if (sessionStorage.getItem('auth-no-persist') === 'true') {
            localStorage.removeItem('auth-storage')
            sessionStorage.removeItem('auth-no-persist')
          }

          showSuccessNotification({
            title: '退出成功',
            message: '您已安全退出登录',
          })
        },

        initialize: async () => {
          // persist 中间件已恢复本地存储的 user / isAuthenticated
          // 这里只负责校验当前登录态是否仍然有效
          const currentState = useAuthStore.getState()

          if (currentState.user) {
            if (import.meta.env.DEV) {
              // 开发环境下，MSW session 在刷新后会丢失
              // 为避免频繁退出，这里直接信任本地缓存的用户信息
              set(
                { isInitialized: true },
                false,
                'auth/initialize/dev-skip-verify'
              )
              return
            }

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
              // Token 无效，清除本地状态
              console.warn('[Auth] Token 校验失败，已清除本地认证状态')

              set(
                {
                  user: null,
                  isAuthenticated: false,
                  isInitialized: true,
                },
                false,
                'auth/initialize/invalid-token'
              )
            }
          } else {
            // 本地无用户信息，视为未登录但完成初始化
            set({ isInitialized: true }, false, 'auth/initialize/no-user')
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

export const selectUser = (state: AuthState) => state.user
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated
export const selectIsInitialized = (state: AuthState) => state.isInitialized
