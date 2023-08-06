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

export type BaseTableQueryParams = TableSearchParam &
  TablePagingParam &
  TableSortingParam;

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
