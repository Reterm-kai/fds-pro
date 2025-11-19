import { http } from 'msw'
import type { ApiResponse } from '@/shared/api/types'
import { MOCK_API_BASE_URL } from '../config'
import { createSuccessResponse } from '../lib/response'
import { menuData } from '../data/menu'

type EmptyParams = Record<string, never>

const BASE_URL = MOCK_API_BASE_URL

export const menuHandlers = [
  http.get<EmptyParams, undefined, ApiResponse<typeof menuData>>(
    `${BASE_URL}/menus`,
    () => {
      return createSuccessResponse(menuData, 'OK')
    }
  ),
]
