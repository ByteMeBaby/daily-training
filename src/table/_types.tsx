// used a union of string and number because these are the most common types for keys
// I am planning to use this for reacts key prop requirement
// just wanted it to be simple as we need the keys to be comparable and serializable
// serializable means that we can convert it to a string
export type Key = string | number;

export type SortOrder = "ascend" | "descend" | null;

export interface TableColumn<T> {
  // it can be just a simple string or a complex title such as titles with icons etc.
  title: string | React.ReactNode;
  // purpose of data index is to acess and display the data.
  // must match the property name in the data type
  // keyof T ensures that the only the keys available in the passed data type can be used
  dataIndex: keyof T;
  key: Key;
  width?: number;
  align?: "left" | "right" | "center";
  // this should help to render custom data cells
  // we might need current cell balue, the record and the index of the current row
  // T[keyof T] ensures that the value is of the same type
  render?: (value: T[keyof T], record: T, index: number) => React.ReactNode;
  // boolean because we just need to enable default sorting
  // the function allows to do custom sorting
  sorter?: boolean | ((a: T, b: T) => number);
  sorterDirections?: SortOrder[];
  defaultSortOrder?: SortOrder;
  filters?: Array<{ text: string; value: string }>;
  onFilter?: (value: string, record: T) => boolean;
  filterMode?: "menu" | "tree";
  filtered?: boolean;
}

export interface TablePaginationConfig {
  total?: number;
  pageSize?: number;
  current?: number;
  defaultPageSize?: number;
  defaultCurrent?: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
}

export interface TableChangeExtra<T> {
  action: "paginate" | "sort" | "filter";
  currentDataSource: T[];
}

export interface SorterResult<T> {
  column?: TableColumn<T>;
  order?: SortOrder;
  field?: keyof T;
  columnKey?: Key;
}

// T lets us pass the data type of each row. This will be used to accurately provide types.
export interface TableProps<T> {
  dataSource: T[];
  columns: TableColumn<T>[];
  // purpose of the rowkey is to ensure that which attreibute of the data type will be used as a key
  // the function enables transfrm values or composite keys
  /* interface User {
  id: number;
  name: string;
  email: string;
} */

  /* Method 1: Direct property reference
<Table<User> 
  rowKey="id"
  dataSource={users} 
  columns={columns} 
/> */

  /* Method 2: Custom key generation
<Table<User> 
  rowKey={(record) => `${record.id}-${record.email}`}
  dataSource={users} 
  columns={columns} 
/> */
  rowKey?: keyof T | ((record: T) => Key);
  loading?: boolean;
  pagination?: TablePaginationConfig | false;
  onChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, (Key | boolean)[] | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
    extra: TableChangeExtra<T>,
  ) => void;
  scroll?: {
    x?: number | string | true;
    y?: number | string;
  };
  bordered?: boolean;
  size?: "small" | "middle" | "large";
}

export interface UseTableConfig<T> {
  dataSource: T[];
  columns: TableColumn<T>[];
  pagination?: TablePaginationConfig;
}

export interface UseTableResult<T> {
  tableData: T[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  sortedInfo: SorterResult<T> | null;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSortedInfo: (sorter: SorterResult<T> | null) => void;
}
