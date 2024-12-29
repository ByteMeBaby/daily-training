import { useMemo } from "react";
import type { Key, TableProps } from "./types";
import { useTable } from "./hooks/useTable";
import { TableHeader } from "./tableHeader";
import { TableBody } from "./tableBody";
import { TablePagination } from "./tablePagination";

export function Table<TData extends object>({
  columns,
  dataSource,
  rowKey,
  pagination = undefined,
  bordered = false,
  size = "middle",
}: TableProps<TData>) {
  const {
    tableData,
    currentPage,
    pageSize,
    totalPages,
    sortedInfo,
    setCurrentPage,
    setPageSize,
    setSortedInfo,
  } = useTable({
    columns,
    dataSource,
    pagination: pagination || undefined,
  });

  const getRowKey = useMemo(() => {
    if (typeof rowKey === "function") {
      return rowKey;
    }
    return (record: TData) => {
      if (!rowKey) {
        return JSON.stringify(record);
      }
      const key = record[rowKey];
      return (key !== undefined ? key : JSON.stringify(record)) as Key;
    };
  }, [rowKey]);

  const sizeClasses = useMemo(
    () => ({
      small: "text-sm",
      middle: "text-base",
      large: "text-lg",
    }),
    [],
  );

  return (
    <div className="w-full">
      <div
        className={`
          relative
          overflow-x-auto
          ${bordered ? "border border-gray-200 rounded-lg" : ""}
        `}
      >
        <table
          className={`
            w-full
            border-collapse
            ${sizeClasses[size]}
          `}
        >
          <TableHeader<TData>
            columns={columns}
            sortedInfo={sortedInfo}
            setSortedInfo={setSortedInfo}
            size={size}
          />
          <TableBody<TData>
            columns={columns}
            dataSource={tableData}
            getRowKey={getRowKey}
            size={size}
          />
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
          size={size}
        />
      )}
    </div>
  );
}
