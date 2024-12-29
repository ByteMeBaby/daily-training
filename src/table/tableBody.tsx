import { useMemo } from "react";
import type { Key, TableColumn } from "./types";

interface TableBodyProps<TData extends object> {
  columns: TableColumn<TData>[];
  dataSource: TData[];
  getRowKey: (record: TData) => Key;
  size: "small" | "middle" | "large";
}

export function TableBody<TData extends object>({
  columns,
  dataSource,
  getRowKey,
  size,
}: TableBodyProps<TData>) {
  const paddingClasses = useMemo(
    () => ({
      small: "px-2 py-1",
      middle: "px-3 py-2",
      large: "px-4 py-3",
    }),
    [],
  );

  const renderCell = (
    record: TData,
    column: TableColumn<TData>,
    index: number,
  ) => {
    const value = record[column.dataIndex];

    if (column.render) {
      return column.render(value, record, index);
    }

    if (value === null || value === undefined) {
      return "-";
    }

    return String(value);
  };

  return (
    <tbody>
      {dataSource.map((record, index) => (
        <tr
          key={getRowKey(record)}
          className={`
            border-b
            border-gray-200
            last:border-0
            hover:bg-gray-50
            transition-colors
          `}
        >
          {columns.map((column) => (
            <td
              key={column.key || String(column.dataIndex)}
              className={`
                ${paddingClasses[size]}
                ${column.align ? `text-${column.align}` : ""}
              `}
              style={column.width ? { width: column.width } : undefined}
            >
              {renderCell(record, column, index)}
            </td>
          ))}
        </tr>
      ))}

      {dataSource.length === 0 && (
        <tr>
          <td
            colSpan={columns.length}
            className="text-center py-4 text-gray-500"
          >
            No data
          </td>
        </tr>
      )}
    </tbody>
  );
}
