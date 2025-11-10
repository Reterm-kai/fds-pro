import { authHandlers } from './auth'
import { userHandlers } from './users'

/**
 * 所有 Mock API Handlers
 */
export const handlers = [...authHandlers, ...userHandlers]
