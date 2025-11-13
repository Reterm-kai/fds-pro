import { render, screen } from '@testing-library/react'
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
  vi.mocked(useAuthStore).mockImplementation((selector: any) => {
    const mockState = {
      user: { id: 1, name: 'Test User', email: 'test@example.com' },
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
    }
    return selector ? selector(mockState) : mockState
  })
})

describe('AppLayout', () => {
  const mockMenuItems = [
    {
      key: 'home',
      label: '首页',
      path: '/',
    },
    {
      key: 'about',
      label: '关于',
      path: '/about',
    },
  ]

  it('应该渲染布局组件', () => {
    render(
      <MantineProvider>
        <BrowserRouter>
          <AppLayout menuItems={mockMenuItems} />
        </BrowserRouter>
      </MantineProvider>
    )

    expect(screen.getByText('FDS Pro')).toBeInTheDocument()
  })
})
