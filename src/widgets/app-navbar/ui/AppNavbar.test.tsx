import { describe, it, beforeEach, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MantineProvider } from '@mantine/core'
import { MemoryRouter } from 'react-router-dom'
import { AppNavbar } from './AppNavbar'
import { menuData } from '@/shared/mock/data/menu'

const getMock = vi.hoisted(() => vi.fn())

vi.mock('@/shared/api/client', () => ({
  get: getMock,
}))

function renderAppNavbar() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: 1,
      },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <MemoryRouter initialEntries={['/dashboard']}>
          <AppNavbar />
        </MemoryRouter>
      </MantineProvider>
    </QueryClientProvider>
  )
}

describe('AppNavbar', () => {
  beforeEach(() => {
    getMock.mockReset()
    sessionStorage.clear()
  })

  it('reloads menu data after clicking retry', async () => {
    getMock
      .mockRejectedValueOnce(new Error('network error'))
      .mockRejectedValueOnce(new Error('network error'))
      .mockImplementation(
        () =>
          new Promise(resolve => {
            setTimeout(() => resolve(menuData), 200)
          })
      )

    const user = userEvent.setup()

    renderAppNavbar()

    await screen.findByText('请检查网络后重试', undefined, { timeout: 5000 })

    await user.click(screen.getByText('重新加载'))

    await screen.findByText('正在重新加载菜单...', undefined, {
      timeout: 5000,
    })

    await waitFor(() => {
      expect(screen.getByText('仪表盘')).toBeInTheDocument()
    })
  })
})
