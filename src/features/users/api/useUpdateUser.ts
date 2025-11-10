import { useMutation, useQueryClient } from '@tanstack/react-query'
import { put } from '@/shared/api/client'
import { userKeys, type User, type UpdateUserParams } from '@/entities/user'

/**
 * 更新用户
 *
 * @returns useMutation 返回值
 */
export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserParams }) =>
      put<User>(`/users/${id}`, data),
    onSuccess: (_, variables) => {
      // 更新成功后使相关缓存失效
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) })
    },
  })
}
