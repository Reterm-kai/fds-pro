import { HttpResponse } from 'msw'
import type { ApiResponse } from '@/shared/api/types'

type ResponseInit = Parameters<typeof HttpResponse.json>[1]

/**
 * 生成统一的成功响应
 */
export function createSuccessResponse<T>(
  data: T,
  msg: string = 'success',
  init?: ResponseInit
) {
  return HttpResponse.json<ApiResponse<T>>({ code: 0, msg, data }, init)
}

/**
 * 生成统一的错误响应
 */
export function createErrorResponse(
  code: number,
  msg: string,
  init?: ResponseInit
) {
  const responseInit =
    init ?? (code >= 100 && code < 600 ? { status: code } : undefined)

  return HttpResponse.json<ApiResponse<null>>(
    {
      code,
      msg,
      data: null,
    },
    responseInit
  )
}
