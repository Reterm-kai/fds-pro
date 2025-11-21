import { useEffect, type ReactNode } from 'react'
import { LoadingOverlay, Box } from '@mantine/core'
import { useAuthStore, selectIsInitialized } from './authStore'
import { useCurrentUserQuery } from '@/features/auth'

/**
 * 认证初始化组件
 *
 * 在应用启动时验证存储的认证状态
 */
export function AuthInitializer({ children }: { children: ReactNode }) {
  const isInitialized = useAuthStore(selectIsInitialized)
  const cachedUser = useAuthStore(state => state.user)
  const setUser = useAuthStore(state => state.setUser)
  const markInitialized = useAuthStore(state => state.markInitialized)

  const shouldVerify = Boolean(cachedUser) && !import.meta.env.DEV

  const { data, status } = useCurrentUserQuery({
    enabled: shouldVerify && !isInitialized,
  })

  useEffect(() => {
    if (!shouldVerify && !isInitialized) {
      markInitialized()
    }
  }, [isInitialized, markInitialized, shouldVerify])

  useEffect(() => {
    if (!shouldVerify) return

    if (status === 'success') {
      setUser(data ?? null)
      markInitialized()
    }

    if (status === 'error') {
      console.warn('[Auth] Token 校验失败，已清除本地认证状态')
      setUser(null)
      markInitialized()
    }
  }, [data, status, markInitialized, setUser, shouldVerify])

  if (!isInitialized) {
    return (
      <Box pos="relative" mih="100vh">
        <LoadingOverlay
          visible
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ type: 'dots' }}
        />
      </Box>
    )
  }

  return <>{children}</>
}
