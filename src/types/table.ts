export type TableState = {
  page: number;
  size: number;
};

export type TableSearchParam = {
  search?: string;
};

export type TablePagingParam = {
  page: number;
  size: number;
};

export type TableSortingParam = {
  sortBy?: string;
  order?: 'asc' | 'desc';
};

export enum StatusFilter {
  PENDING = 1,
  EDITING = 2,
  PUBLISHED = 3
}

export type TableFilter = {
  dateRange?: DateRageFilter;
  statusFilter?: StatusFilter;
};

export type DateRageFilter = {
  from?: string;
  to?: string;
};

export type BaseTableQueryParams = TableSearchParam &
  TablePagingParam &
  TableSortingParam &
  TableFilter;

export type Metadata = {
  pageCount: number;
  totalItemCount: number;
  pageNumber: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  firstItemOnPage: number;
  lastItemOnPage: number;
};
