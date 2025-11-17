import { createContext } from 'react'
import type { TabContextValue } from './types'

export const TabContext = createContext<TabContextValue | null>(null)
