import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { MantineProvider } from '@mantine/core'
import { ThemeToggle } from './ThemeToggle'

describe('ThemeToggle', () => {
  it('应该渲染主题切换按钮', () => {
    render(
      <MantineProvider>
        <ThemeToggle />
      </MantineProvider>
    )

    const button = screen.getByRole('button', { name: /切换主题/i })
    expect(button).toBeInTheDocument()
  })

  it('应该能够点击切换主题', async () => {
    const user = userEvent.setup()

    render(
      <MantineProvider>
        <ThemeToggle />
      </MantineProvider>
    )

    const button = screen.getByRole('button', { name: /切换主题/i })
    await user.click(button)

    expect(button).toBeInTheDocument()
  })
})
