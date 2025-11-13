import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/routes'
import { queryClient } from '@/shared/config/queryClient'

/**
 * 应用级 Provider 组合
 * 负责注入状态管理、UI 主题及全局路由
 *
 * 注意:
 * - AuthProvider 已集成在 router 内部，因为它需要访问路由上下文
 * - ColorSchemeScript 在 index.html 中以内联脚本形式引入，避免主题闪烁-暂未用
 * - 使用自定义主题配置，实现响应式字体和间距系统
 */
export function AppProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="auto">
        <ModalsProvider>
          <Notifications position="top-right" />
          <RouterProvider router={router} />
        </ModalsProvider>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
