import { useQuery } from '@tanstack/react-query'
import { get } from '@/shared/api/client'
import {
  userKeys,
  type UserListParams,
  type UserListResponse,
} from '@/entities/user'

/**
 * 获取用户列表
 *
 * @param params - 查询参数
 * @returns useQuery 返回值
 */
export function useUserList(params: UserListParams = {}) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () =>
      get<UserListResponse>(
        '/users',
        params as Record<string, string | number | boolean>
      ),
  })
}
