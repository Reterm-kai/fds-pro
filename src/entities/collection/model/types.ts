/**
 * 集合（基础列表）相关类型定义
 */

export type CollectionContentType = 'image' | 'template' | 'video' | 'text'

export type CollectionStrategy = 'rules' | 'artificial'

export type CollectionStatus = 'online' | 'offline'

/** 集合实体 */
export interface Collection {
  id: number
  /** 集合编号 */
  code: string
  /** 集合名称 */
  name: string
  /** 内容体裁 */
  contentType: CollectionContentType
  /** 策略方式 */
  strategy: CollectionStrategy
  /** 内容量 */
  contentCount: number
  /** 创建时间 ISO 字符串 */
  createdAt: string
  /** 状态 */
  status: CollectionStatus
}

/** 集合列表查询参数 */
export interface CollectionListParams {
  page?: number
  pageSize?: number
  code?: string
  name?: string
  contentType?: CollectionContentType
  strategy?: CollectionStrategy
  status?: CollectionStatus
  /** 创建时间起始（ISO 字符串或日期字符串） */
  createdFrom?: string
  /** 创建时间结束（ISO 字符串或日期字符串） */
  createdTo?: string
  /** 排序字段 */
  sortField?: 'code' | 'name' | 'contentCount' | 'createdAt'
  /** 排序方向 */
  sortOrder?: 'asc' | 'desc'
}

/** 集合列表响应 */
export interface CollectionListResponse {
  list: Collection[]
  total: number
  page: number
  pageSize: number
}
