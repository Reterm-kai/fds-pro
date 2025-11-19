import { authHandlers } from './auth'
import { userHandlers } from './users'
import { optionsHandlers } from './options'
import { collectionHandlers } from './collections'
import { menuHandlers } from './menus'

/**
 * 所有 Mock API Handlers
 */
export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...optionsHandlers,
  ...collectionHandlers,
  ...menuHandlers,
]
