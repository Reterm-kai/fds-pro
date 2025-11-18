/**
 * 基础列表相关类型定义
 */

export type ListContentType = 'image' | 'template' | 'video' | 'text'

export type ListStrategy = 'rules' | 'artificial'

export type ListStatus = 'online' | 'offline'

/** 列表项 */
export interface ListItem {
  id: number
  /** 集合编号 */
  code: string
  /** 集合名称 */
  name: string
  /** 内容体裁 */
  contentType: ListContentType
  /** 策略方式 */
  strategy: ListStrategy
  /** 内容量 */
  contentCount: number
  /** 创建时间 ISO 字符串 */
  createdAt: string
  /** 状态 */
  status: ListStatus
}

/** 列表查询参数 */
export interface ListParams {
  page?: number
  pageSize?: number
  code?: string
  name?: string
  contentType?: ListContentType
  strategy?: ListStrategy
  status?: ListStatus
  /** 创建时间起始（ISO 字符串或日期字符串） */
  createdFrom?: string
  /** 创建时间结束（ISO 字符串或日期字符串） */
  createdTo?: string
  /** 排序字段 */
  sortField?: 'code' | 'name' | 'contentCount' | 'createdAt'
  /** 排序方向 */
  sortOrder?: 'asc' | 'desc'
}

/** 列表响应 */
export interface ListResponse {
  list: ListItem[]
  total: number
  page: number
  pageSize: number
}
