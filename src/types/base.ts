export interface BaseEntity {
  id: string
  created_at?: string
  updated_at?: string
}

export interface Pagination {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
}

export interface ApiResponse<T> {
  data: T
  pagination?: Pagination
}
