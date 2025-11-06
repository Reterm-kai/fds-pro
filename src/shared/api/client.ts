/**
 * API 工具函数
 *
 * 提供统一的 HTTP 请求封装,处理错误和响应格式化
 */

/** API 响应统一格式 */
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

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

/** 请求配置选项 */
interface RequestOptions extends RequestInit {
  params?:
    | Record<string, string | number | boolean>
    | { [key: string]: unknown }
}

/**
 * 获取认证令牌
 * 优先从 localStorage 获取，如果不存在则尝试从 sessionStorage 获取
 */
function getAuthToken(): string | null {
  return localStorage.getItem('token') || sessionStorage.getItem('token')
}

/**
 * 统一的 HTTP 请求函数
 *
 * @param endpoint - API 端点路径
 * @param options - 请求配置
 * @returns 解析后的响应数据
 */
async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options

  // 构建 URL
  let url = `${BASE_URL}${endpoint}`
  if (params) {
    const searchParams = new URLSearchParams(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    )
    url += `?${searchParams.toString()}`
  }

  // 默认请求头
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  }

  // 如果有认证令牌，添加到请求头
  const token = getAuthToken()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    })

    // HTTP 错误处理
    if (!response.ok) {
      throw new ApiError(
        response.status,
        `HTTP ${response.status}: ${response.statusText}`
      )
    }

    // 解析 JSON 响应
    const result: ApiResponse<T> = await response.json()

    // 业务逻辑错误处理
    if (result.code !== 0) {
      throw new ApiError(result.code, result.message || '请求失败')
    }

    return result.data
  } catch (error) {
    // 网络错误或其他异常
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(
      -1,
      error instanceof Error ? error.message : '网络请求失败'
    )
  }
}

/** GET 请求 */
export function get<T>(endpoint: string, params?: RequestOptions['params']) {
  return request<T>(endpoint, { method: 'GET', params })
}

/** POST 请求 */
export function post<T>(endpoint: string, data?: unknown) {
  return request<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/** PUT 请求 */
export function put<T>(endpoint: string, data?: unknown) {
  return request<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

/** DELETE 请求 */
export function del<T>(endpoint: string) {
  return request<T>(endpoint, { method: 'DELETE' })
}

/** PATCH 请求 */
export function patch<T>(endpoint: string, data?: unknown) {
  return request<T>(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}
