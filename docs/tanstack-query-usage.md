# TanStack Query 使用指南

## 快速开始

TanStack Query 已集成到项目中,用于管理服务器状态和数据请求。

## 核心概念

### 1. Query (查询)

用于获取数据的操作,具有自动缓存、重试、重新验证等特性。

### 2. Mutation (修改)

用于创建、更新、删除数据的操作。

### 3. Query Keys

用于标识和管理缓存的唯一键。

## 使用示例

### 获取列表数据

```tsx
import { useUserList } from '@/features/user-management/api/useUsers'

export function UsersPage() {
  const { data, isLoading, isError, error } = useUserList({
    page: 1,
    pageSize: 10,
  })

  if (isLoading) return <Loader />
  if (isError) return <Alert>错误: {error.message}</Alert>

  return (
    <div>
      {data?.list.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

### 获取单条数据

```tsx
import { useUser } from '@/features/user-management/api/useUsers'

export function UserDetail({ userId }: { userId: number }) {
  const { data, isLoading } = useUser(userId)

  if (isLoading) return <Loader />

  return <div>{data?.name}</div>
}
```

### 创建数据

```tsx
import { useCreateUser } from '@/features/user-management/api/useUsers'
import { notifications } from '@mantine/notifications'

export function CreateUserForm() {
  const createUser = useCreateUser()

  const handleSubmit = async values => {
    try {
      await createUser.mutateAsync(values)
      notifications.show({ message: '创建成功' })
    } catch (error) {
      notifications.show({ message: '创建失败', color: 'red' })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* 表单字段 */}
      <button type="submit" disabled={createUser.isPending}>
        {createUser.isPending ? '创建中...' : '创建'}
      </button>
    </form>
  )
}
```

### 更新数据

```tsx
import { useUpdateUser } from '@/features/user-management/api/useUsers'

export function EditUserForm({ userId }: { userId: number }) {
  const updateUser = useUpdateUser()

  const handleSubmit = async values => {
    await updateUser.mutateAsync({ id: userId, data: values })
  }

  return <form onSubmit={handleSubmit}>{/* 表单字段 */}</form>
}
```

### 删除数据

```tsx
import { useDeleteUser } from '@/features/user-management/api/useUsers'

export function DeleteUserButton({ userId }: { userId: number }) {
  const deleteUser = useDeleteUser()

  const handleDelete = () => {
    deleteUser.mutate(userId)
  }

  return (
    <button onClick={handleDelete} disabled={deleteUser.isPending}>
      删除
    </button>
  )
}
```

## 创建新的 API Hook

### 1. 定义类型

```typescript
// src/types/product.ts
export interface Product {
  id: number
  name: string
  price: number
  stock: number
}

export interface ProductListParams {
  page?: number
  pageSize?: number
  category?: string
}

export interface ProductListResponse {
  list: Product[]
  total: number
}
```

### 2. 创建 Hook

```typescript
// src/features/product-management/api/useProducts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { get, post, put, del } from '@/shared/api/client'
import type {
  Product,
  ProductListParams,
  ProductListResponse,
} from '../types/product'

// Query Keys
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (params: ProductListParams) =>
    [...productKeys.lists(), params] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
}

// 获取列表
export function useProductList(params: ProductListParams = {}) {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => get<ProductListResponse>('/products', params as any),
  })
}

// 获取详情
export function useProduct(id: number) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => get<Product>(`/products/${id}`),
    enabled: id > 0,
  })
}

// 创建
export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Omit<Product, 'id'>) => post<Product>('/products', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
    },
  })
}

// 更新
export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Product> }) =>
      put<Product>(`/products/${id}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(variables.id),
      })
    },
  })
}

// 删除
export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => del<void>(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
    },
  })
}
```

### 3. 在页面中使用

```tsx
// src/pages/Products.tsx
import { useProductList } from '../hooks/useProducts'

export function Products() {
  const { data, isLoading } = useProductList({ category: 'electronics' })

  // ... 渲染逻辑
}
```

## 高级用法

### 分页

```typescript
export function useProductList(page: number, pageSize: number) {
  return useQuery({
    queryKey: productKeys.list({ page, pageSize }),
    queryFn: () => get<ProductListResponse>('/products', { page, pageSize }),
    placeholderData: previousData => previousData, // 保持旧数据
  })
}
```

### 依赖查询

```typescript
export function useUserOrders(userId: number) {
  const { data: user } = useUser(userId)

  return useQuery({
    queryKey: ['orders', user?.id],
    queryFn: () => get(`/users/${user!.id}/orders`),
    enabled: !!user, // 只有当 user 存在时才执行
  })
}
```

### 乐观更新

```typescript
export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Product> }) =>
      put<Product>(`/products/${id}`, data),

    // 乐观更新
    onMutate: async ({ id, data }) => {
      // 取消相关查询
      await queryClient.cancelQueries({ queryKey: productKeys.detail(id) })

      // 保存旧数据
      const previousProduct = queryClient.getQueryData(productKeys.detail(id))

      // 乐观更新
      queryClient.setQueryData(productKeys.detail(id), (old: any) => ({
        ...old,
        ...data,
      }))

      return { previousProduct }
    },

    // 失败回滚
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        productKeys.detail(variables.id),
        context?.previousProduct
      )
    },

    // 成功后重新获取
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(variables.id),
      })
    },
  })
}
```

### 轮询

```typescript
export function useRealtimeData() {
  return useQuery({
    queryKey: ['realtime'],
    queryFn: () => get('/realtime'),
    refetchInterval: 5000, // 每5秒刷新一次
  })
}
```

## 调试

### React Query Devtools

开发环境下,React Query Devtools 会自动在页面右下角显示一个图标:

- 点击图标打开 Devtools
- 查看所有查询的状态
- 手动触发重新获取
- 查看缓存数据

## 配置

### 全局配置

在 `src/shared/config/queryClient.ts` 中修改全局配置:

```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5分钟
      gcTime: 1000 * 60 * 10, // 10分钟
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})
```

### 环境变量

在 `.env` 文件中配置 API 基础 URL:

```bash
VITE_API_BASE_URL=http://localhost:3000/api
```

## 最佳实践

1. **使用 Query Keys 工厂**: 统一管理查询键,避免重复和冲突
2. **类型安全**: 为所有 API 响应定义 TypeScript 类型
3. **错误处理**: 使用 `isError` 和 `error` 处理错误状态
4. **加载状态**: 使用 `isLoading` 显示加载指示器
5. **缓存失效**: Mutation 成功后使用 `invalidateQueries` 更新相关查询
6. **避免过度请求**: 合理设置 `staleTime` 和 `gcTime`

## 参考资源

- [TanStack Query 官方文档](https://tanstack.com/query/latest)
- [React Query 最佳实践](https://tkdodo.eu/blog/practical-react-query)
- 项目示例: `src/features/user-management/api/useUsers.ts`
