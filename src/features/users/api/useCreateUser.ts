import { useMutation, useQueryClient } from '@tanstack/react-query'
import { post } from '@/shared/api/client'
import { userKeys, type User, type CreateUserParams } from '@/entities/user'

/**
 * 创建用户
 *
 * @returns useMutation 返回值
 */
export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateUserParams) => post<User>('/users', data),
    onSuccess: () => {
      // 创建成功后使列表缓存失效,触发重新请求
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    },
  })
}
