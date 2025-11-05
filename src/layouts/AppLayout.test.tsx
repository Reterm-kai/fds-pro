import { render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import { AppLayout } from './AppLayout'

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
