import { userHandlers } from './users'

/**
 * 所有 Mock API Handlers
 */
import { authHandlers } from './auth'
export const handlers = [...userHandlers, ...authHandlers]
