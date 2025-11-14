import { render } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import { AppLayout } from './AppLayout'
import { useAuthStore } from '@/features/auth'

// Mock Zustand store
vi.mock('@/features/auth', async () => {
  const actual = await vi.importActual('@/features/auth')
  return {
    ...actual,
    useAuthStore: vi.fn(),
  }
})

beforeEach(() => {
  // 设置默认的 mock 状态
  vi.mocked(useAuthStore).mockImplementation(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (selector: any) => {
      const mockState = {
        user: { id: 1, name: 'Test User', email: 'test@example.com' },
        isAuthenticated: true,
        login: vi.fn(),
        logout: vi.fn(),
        register: vi.fn(),
      }
      return selector ? selector(mockState) : mockState
    }
  )
})

describe('AppLayout', () => {
  it('应该渲染布局组件', () => {
    render(
      <MantineProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </MantineProvider>
    )

    // 检查布局是否正确渲染
    expect(document.querySelector('.mantine-AppShell-root')).toBeInTheDocument()
  })
})
