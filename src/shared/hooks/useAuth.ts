import { useContext } from 'react'
import { AuthContext } from './auth'

/**
 * 自定义Hook用于访问认证上下文
 * 必须在 AuthProvider 内部使用
 */
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
