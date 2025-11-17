import { authHandlers } from './auth'
import { userHandlers } from './users'
import { optionsHandlers } from './options'
import { collectionHandlers } from './collections'

/**
 * 所有 Mock API Handlers
 */
export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...optionsHandlers,
  ...collectionHandlers,
]

