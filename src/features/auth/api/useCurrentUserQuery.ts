import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from './authApi'

export const authQueryKeys = {
  currentUser: ['auth', 'current-user'] as const,
}

interface UseCurrentUserQueryOptions {
  enabled?: boolean
}

export function useCurrentUserQuery(options?: UseCurrentUserQueryOptions) {
  const { enabled = true } = options ?? {}

  return useQuery({
    queryKey: authQueryKeys.currentUser,
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    enabled,
  })
}
