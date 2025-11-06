import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

/**
 * 浏览器环境的 MSW Worker
 * 用于在开发环境拦截和模拟 API 请求
 */
export const worker = setupWorker(...handlers)
