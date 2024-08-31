export interface ItemsWithPagination<T> {
  items: T[];
  totalPages: number;
  totalCount: number;
}

export interface PaginationProps {
  page?: number;
  limit?: number;
}
