import { render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/shared/hooks/auth'
import { AppLayout } from './AppLayout'
import * as React from 'react'

// Mock AuthContext
const AuthProviderWrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
)

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
          <AuthProviderWrapper>
            <AppLayout menuItems={mockMenuItems} />
          </AuthProviderWrapper>
        </BrowserRouter>
      </MantineProvider>
    )

    expect(screen.getByText('FDS Pro')).toBeInTheDocument()
  })
})
