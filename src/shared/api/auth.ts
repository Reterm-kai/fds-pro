/**
 * 认证相关的API服务函数
 *
 * 包含登录、注册、登出等操作
 */

import { post, get, del } from './client'
import { User } from '@/entities/user'

/**
 * 登录请求参数
 */
export interface LoginCredentials {
  email: string
  password: string
}

/**
 * 登录响应数据
 */
export interface LoginResponse {
  user: User
  token: string
}

/**
 * 注册请求参数
 */
export interface RegisterCredentials {
  name: string
  email: string
  password: string
}

/**
 * 用户登录
 *
 * @param credentials - 登录凭据
 * @returns 登录响应数据
 */
export async function login(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  return post<LoginResponse>('/auth/login', credentials)
}

/**
 * 用户注册
 *
 * @param userData - 注册数据
 * @returns 注册成功的用户信息
 */
export async function register(userData: RegisterCredentials): Promise<User> {
  return post<User>('/auth/register', userData)
}

/**
 * 用户登出
 *
 * @returns 登出响应
 */
export async function logout(): Promise<void> {
  return del<void>('/auth/logout')
}

/**
 * 获取当前用户信息
 *
 * @returns 当前用户信息
 */
export async function getCurrentUser(): Promise<User> {
  return get<User>('/auth/me')
}
