import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import {get, post, put, del} from '@/shared/api/client'
import {
    userKeys,
    type User,
    type UserListParams,
    type UserListResponse,
    type CreateUserParams,
    type UpdateUserParams,
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

/**
 * 获取用户详情
 *
 * @param id - 用户ID
 * @param enabled - 是否启用查询(默认启用)
 * @returns useQuery 返回值
 */
export function useUser(id: number, enabled = true) {
    return useQuery({
        queryKey: userKeys.detail(id),
        queryFn: () => get<User>(`/users/${id}`),
        enabled: enabled && id > 0,
    })
}

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
            queryClient.invalidateQueries({queryKey: userKeys.lists()})
        },
    })
}

/**
 * 更新用户
 *
 * @returns useMutation 返回值
 */
export function useUpdateUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({id, data}: { id: number; data: UpdateUserParams }) =>
            put<User>(`/users/${id}`, data),
        onSuccess: (_, variables) => {
            // 更新成功后使相关缓存失效
            queryClient.invalidateQueries({queryKey: userKeys.lists()})
            queryClient.invalidateQueries({queryKey: userKeys.detail(variables.id)})
        },
    })
}

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
            void queryClient.invalidateQueries({queryKey: userKeys.lists()})
        },
    })
}
