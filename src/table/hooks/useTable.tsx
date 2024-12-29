// hooks/useTable.ts
import { useState, useMemo, useCallback, useEffect } from "react";
import type { SorterResult, UseTableConfig, UseTableResult } from "../_types";

export function useTable<TData extends object>({
  dataSource,
  columns,
  pagination,
}: UseTableConfig<TData>): UseTableResult<TData> {
  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(
    pagination?.defaultPageSize || pagination?.pageSize || 10,
  );

  const [sortedInfo, setSortedInfo] = useState<SorterResult<TData> | null>(
    null,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [dataSource]);

  const compareValues = useCallback(
    <K extends keyof TData>(a: TData[K], b: TData[K]): number => {
      if (a === b) {
        return 0;
      }

      if (a == null) {
        return -1;
      }
      if (b == null) {
        return 1;
      }

      if (typeof a === "number" && typeof b === "number") {
        return a - b;
      }
      if (typeof a === "string" && typeof b === "string") {
        return a.localeCompare(b);
      }

      return String(a).localeCompare(String(b));
    },
    [],
  );

  const sortData = useCallback(
    (data: TData[]): TData[] => {
      if (!sortedInfo?.field) return data;

      const { field, order } = sortedInfo;
      const column = columns.find((col) => col.dataIndex === field);

      if (!column?.sorter) return data;

      return [...data].sort((a, b) => {
        const sorter =
          typeof column.sorter === "function"
            ? column.sorter
            : (a: TData, b: TData) => compareValues(a[field], b[field]);

        return order === "ascend" ? sorter(a, b) : sorter(b, a);
      });
    },
    [sortedInfo, columns, compareValues],
  );

  const tableData = useMemo(() => {
    const processedData = sortData([...dataSource]);

    if (pagination) {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return processedData.slice(startIndex, endIndex);
    }

    return processedData;
  }, [dataSource, sortData, currentPage, pageSize, pagination]);

  const totalPages = useMemo(() => {
    if (!pagination) {
      return 1;
    }
    return Math.ceil(dataSource.length / pageSize);
  }, [dataSource.length, pageSize, pagination]);

  const safeSetCurrentPage = useCallback(
    (page: number) => {
      const safePage = Math.max(1, Math.min(page, totalPages));
      if (safePage !== currentPage) {
        setCurrentPage(safePage);
      }
    },
    [totalPages, currentPage],
  );

  const safeSetPageSize = useCallback(
    (size: number) => {
      const safeSize = Math.max(1, size);
      if (safeSize !== pageSize) {
        setPageSize(safeSize);
        setCurrentPage(1);
      }
    },
    [pageSize],
  );

  const safeSortedInfo = useCallback((sorter: SorterResult<TData> | null) => {
    setSortedInfo(sorter);
    setCurrentPage(1);
  }, []);

  return {
    tableData,
    currentPage,
    pageSize,
    totalPages,
    sortedInfo,
    setCurrentPage: safeSetCurrentPage,
    setPageSize: safeSetPageSize,
    setSortedInfo: safeSortedInfo,
  };
}
