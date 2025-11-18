/**
 * API 工具函数
 *
 * 基于 Axios 的统一 HTTP 请求封装,处理认证、错误和响应格式化
 */

import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import type { ApiResponse } from './types'

/** API 错误类 */
export class ApiError extends Error {
  public code: number

  constructor(code: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.code = code
  }
}

/** 基础 URL 配置 (开发环境可配置为代理或 Mock 服务器) */
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

/**
 * 获取认证令牌
 * 优先从 localStorage 获取，如果不存在则尝试从 sessionStorage 获取
 */
function getAuthToken(): string | null {
  return localStorage.getItem('token') || sessionStorage.getItem('token')
}

/**
 * 清除认证令牌
 */
function clearAuthToken(): void {
  localStorage.removeItem('token')
  sessionStorage.removeItem('token')
  localStorage.removeItem('user')
  sessionStorage.removeItem('user')
}

/**
 * 创建 Axios 实例
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000, // 15秒超时
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * 请求拦截器
 * 在每个请求发送前自动添加 Authorization 头
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken()
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 * 处理业务错误、HTTP 错误和 401 未授权
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { data } = response

    // 业务逻辑成功 (code === 0)
    if (data.code === 0) {
      return response
    }

    // 业务逻辑错误
    throw new ApiError(data.code, data.msg || '请求失败')
  },
  error => {
    // 处理 HTTP 错误
    if (axios.isAxiosError(error)) {
      const status = error.response?.status

      // 401 未授权 - 清除令牌并跳转登录
      if (status === 401) {
        clearAuthToken()
        // 只在非登录页时跳转
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
        throw new ApiError(401, '登录已过期，请重新登录')
      }

      // 403 禁止访问
      if (status === 403) {
        throw new ApiError(403, '没有权限访问该资源')
      }

      // 404 未找到
      if (status === 404) {
        throw new ApiError(404, error.response?.data?.msg || '请求的资源不存在')
      }

      // 500 服务器错误
      if (status === 500) {
        throw new ApiError(500, '服务器内部错误，请稍后重试')
      }

      // 其他 HTTP 错误
      throw new ApiError(
        status || -1,
        error.response?.data?.msg || error.message || '网络请求失败'
      )
    }

    // 网络错误或超时
    if (error.code === 'ECONNABORTED') {
      throw new ApiError(-1, '请求超时，请检查网络连接')
    }

    throw new ApiError(
      -1,
      error instanceof Error ? error.message : '网络请求失败'
    )
  }
)

/**
 * 统一的 HTTP 请求函数
 *
 * @param config - Axios 请求配置
 * @returns 解析后的响应数据
 */
async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const response = await axiosInstance.request<ApiResponse<T>>(config)
  return response.data.data
}

/** GET 请求 */
export function get<T>(
  url: string,
  params?: Record<string, string | number | boolean>
) {
  return request<T>({ method: 'GET', url, params })
}

/** POST 请求 */
export function post<T>(url: string, data?: unknown) {
  return request<T>({ method: 'POST', url, data })
}

/** PUT 请求 */
export function put<T>(url: string, data?: unknown) {
  return request<T>({ method: 'PUT', url, data })
}

/** DELETE 请求 */
export function del<T>(url: string) {
  return request<T>({ method: 'DELETE', url })
}

/** PATCH 请求 */
export function patch<T>(url: string, data?: unknown) {
  return request<T>({ method: 'PATCH', url, data })
}

// 导出 axios 实例供特殊场景使用
export { axiosInstance as axios }
