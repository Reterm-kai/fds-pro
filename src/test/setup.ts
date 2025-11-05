import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// 扩展 Vitest 的断言
expect.extend(matchers)

// 每个测试后清理
afterEach(() => {
  cleanup()
})

/**
 * 模拟 window.matchMedia
 * Mantine UI 依赖此 API 进行响应式设计
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // 兼容旧版本
    removeListener: () => {}, // 兼容旧版本
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  }),
})
