import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@/app/styles/layout.css'
import { AppProviders } from '@/app/providers'

// 在开发环境启动 MSW
async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return
  }

  const { worker } = await import('@/shared/mock/browser')

  return worker.start({
    onUnhandledRequest: 'bypass', // 未处理的请求放行
  })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AppProviders />
    </StrictMode>
  )
})
