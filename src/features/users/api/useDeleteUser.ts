import { useMutation, useQueryClient } from '@tanstack/react-query'
import { del } from '@/shared/api/client'
import { userKeys } from '@/entities/user'

/**
 * 删除用户
 *
 * @returns useMutation 返回值
 */
export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => del<void>(`/users/${id}`),
    onSuccess: () => {
      // 删除成功后使列表缓存失效
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    },
  })
}
