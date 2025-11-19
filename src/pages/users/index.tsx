import { UsersView } from '@/features/users'
import { PageContainer } from '@/shared/ui'

/**
 * 用户管理页面容器
 * 页面层负责组合布局,业务交互由 feature 承担
 */
export function UsersPage() {
  return (
    <PageContainer size="full">
      <UsersView />
    </PageContainer>
  )
}
