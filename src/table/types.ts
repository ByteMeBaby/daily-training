import type { ReactNode } from "react";

export type Key = string | number;
export type SortOrder = "ascend" | "descend" | null;
export type FilterValue = string;

export interface TableColumn<TData> {
  key: Key;
  title: string | ReactNode;
  dataIndex: keyof TData;
  width?: number;
  align?: "left" | "center" | "right";
  render?: (
    value: TData[keyof TData],
    record: TData,
    index: number,
  ) => ReactNode;
  sorter?: boolean | ((a: TData, b: TData) => number);
  sorterDirections?: SortOrder[];
  defaultSortOrder?: SortOrder;
  filters?: Array<{ text: string; value: string }>;
  filterMode?: "menu" | "tree";
  filtered?: boolean;
  onFilter?: (value: string, record: TData) => boolean;
}

export interface SorterResult<TData> {
  field: keyof TData;
  order: Exclude<SortOrder, null>;
  column: TableColumn<TData>;
}

export interface TablePaginationConfig {
  total?: number;
  pageSize?: number;
  current?: number;
  defaultPageSize?: number;
  defaultCurrent?: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => ReactNode;
}

export interface UseTableConfig<TData> {
  dataSource: TData[];
  columns: TableColumn<TData>[];
  pagination?: TablePaginationConfig;
}

export interface UseTableResult<TData> {
  tableData: TData[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  sortedInfo: SorterResult<TData> | null;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSortedInfo: (sorter: SorterResult<TData> | null) => void;
}
