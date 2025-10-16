/**
 * Generic API Response model
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  timestamp: Date;
}

/**
 * Paginated API Response model
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
  success: boolean;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * API Error Response model
 */
export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
  timestamp: Date;
  path?: string;
}
