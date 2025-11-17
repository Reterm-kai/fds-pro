/**
 * 通用 API 类型定义
 * 用于描述后端统一的返回结构 code / message / data
 */

/** API 状态码 */
export type ApiCode = number

/** 响应元信息 */
export interface ApiMeta<Code extends ApiCode = ApiCode> {
  code: Code
  msg: string
}

/** 业务成功响应 (code === 0) */
export interface ApiSuccessResponse<T = unknown> extends ApiMeta<0> {
  data: T
}

/** 业务失败响应 (data 恒为 null) */
export interface ApiErrorResponse
  extends ApiMeta<Exclude<ApiCode, 0>> {
  data: null
}

/** 统一的 API 返回结构 */
export type ApiResponse<T = unknown> =
  | ApiSuccessResponse<T>
  | ApiErrorResponse

/** 分页数据结构 */
export interface PaginatedData<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

/** 分页成功响应结构 */
export type PaginatedResponse<T> = ApiSuccessResponse<PaginatedData<T>>
