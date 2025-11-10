import type { Preview, Decorator } from '@storybook/react'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

const queryClient = new QueryClient()

const withProviders: Decorator = Story => (
  <QueryClientProvider client={queryClient}>
    <MantineProvider defaultColorScheme="light">
      <ModalsProvider>
        <Notifications position="top-right" />
        <Story />
      </ModalsProvider>
    </MantineProvider>
  </QueryClientProvider>
)

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withProviders],
}

export default preview
