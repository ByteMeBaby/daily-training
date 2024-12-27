// Need a generic type with a type variable for the columns to ensure the type safety with the data provided

export interface TableColumn<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  // We might want to change how the data is displayed in the table cell. For example, we might want to display the date in a different format.
  // Now the render function knows exactly what type the value is
  render?: (value: T[keyof T], record: T) => React.ReactNode;
  width?: number | string;
  height?: number | string;
  align?: "left" | "right" | "center";
}

// In the above type the generic type T could be something like this:

/**
 * interface User {
 *  id: number;
 *  name: string;
 *  age: number;
 * }
 **/

// keyof T is a utility type that creates union type of all keys of T. For the example above, keyof User would be
// "id" | "name" | "age".

// My reasioning behind using keyof T is that it ensures that dataIndex can only be a valid property name from the type T.

// Aditional type safety.
/*
export interface TableColumn<T, K extends keyof T = keyof T> {
  key: string;
  title: string;
  dataIndex: K;
  render?: (value: T[K], record: T) => React.ReactNode;
  width?: number | string;
  height?: number | string;
  align?: "left" | "right" | "center";
}

*/
export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  // This key will be used to uniquely identify each row in the table. This is useful when we want to update a specific row in the table. Using the key the unique value from each row will be extracted.
  rowKey?: keyof T | ((record: T) => string);
}

export type SortDirection = "asc" | "desc";

export interface TableSortState<T> {
  sortKey: keyof T;
  sortDirection: SortDirection;
}

export interface UseTableSortProps<T> {
  data: T[];
  initialSortKey: keyof T;
  initialSortDirection: SortDirection;
}

export interface UseTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
}

export interface UseTableReturn<T> {
  tableData: T[];
  headers: TableColumn<T>[];
}
