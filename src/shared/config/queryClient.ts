import { QueryClient } from '@tanstack/react-query'

/**
 * TanStack Query 全局配置
 *
 * 默认配置说明:
 * - staleTime: 数据过期时间(5分钟),过期后重新获取焦点会自动重新请求
 * - gcTime: 缓存时间(10分钟),超过此时间未使用的数据会被垃圾回收
 * - refetchOnWindowFocus: 窗口重新获得焦点时是否重新请求
 * - refetchOnReconnect: 网络重连时是否重新请求
 * - retry: 请求失败重试次数
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5分钟
      gcTime: 1000 * 60 * 10, // 10分钟 (原 cacheTime)
      refetchOnWindowFocus: false, // 开发环境禁用,生产环境可启用
      refetchOnReconnect: true,
      retry: 1, // 失败重试1次
    },
    mutations: {
      retry: 0, // 修改操作不重试
    },
  },
})
