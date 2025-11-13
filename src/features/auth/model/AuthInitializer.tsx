import { useEffect, useState, ReactNode } from 'react'
import { LoadingOverlay, Box } from '@mantine/core'
import { useAuthStore, selectIsInitialized } from './authStore'

/**
 * 认证初始化组件
 * 在应用启动时验证存储的认证状态
 */
export const AuthInitializer = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true)
  const isInitialized = useAuthStore(selectIsInitialized)
  const initialize = useAuthStore(state => state.initialize)

  useEffect(() => {
    initialize().finally(() => {
      setIsLoading(false)
    })
  }, [initialize])

  // 在初始化期间显示加载指示器
  if (isLoading || !isInitialized) {
    return (
      <Box pos="relative" mih="100vh">
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ type: 'dots' }}
        />
      </Box>
    )
  }

  return <>{children}</>
}
