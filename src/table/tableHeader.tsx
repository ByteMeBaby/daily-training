import { useMemo } from "react";
import type { SortOrder, SorterResult, TableColumn } from "./types";
import { SortIcon, SortAscIcon, SortDescIcon } from "./icons/sortIcon";

interface TableHeaderProps<TData extends object> {
  columns: TableColumn<TData>[];
  sortedInfo: SorterResult<TData> | null;
  setSortedInfo: (sorter: SorterResult<TData> | null) => void;
  size: "small" | "middle" | "large";
}

export function TableHeader<TData extends object>({
  columns,
  sortedInfo,
  setSortedInfo,
  size,
}: TableHeaderProps<TData>) {
  const paddingClasses = useMemo(
    () => ({
      small: "px-2 py-1",
      middle: "px-3 py-2",
      large: "px-4 py-3",
    }),
    [],
  );

  const handleSortClick = (column: TableColumn<TData>) => {
    if (!column.sorter) return;

    const currentOrder =
      sortedInfo?.field === column.dataIndex ? sortedInfo.order : undefined;
    const nextOrder = getNextSortOrder(currentOrder, column.sorterDirections);

    if (!nextOrder) {
      setSortedInfo(null);
    } else {
      setSortedInfo({
        field: column.dataIndex,
        order: nextOrder,
        column,
      });
    }
  };

  const getNextSortOrder = (
    currentOrder: SortOrder | undefined,
    sortDirections: SortOrder[] = ["ascend", "descend"],
  ): SortOrder => {
    const defaultOrder = sortDirections[0] ?? "ascend";

    if (!currentOrder) {
      return defaultOrder;
    }

    const currentIndex = sortDirections.indexOf(currentOrder);
    if (currentIndex === -1) return defaultOrder;

    const nextIndex = (currentIndex + 1) % sortDirections.length;
    return nextIndex === 0 ? null : sortDirections[nextIndex];
  };

  const renderSortIcon = (column: TableColumn<TData>) => {
    if (!column.sorter) return null;

    if (sortedInfo?.field === column.dataIndex) {
      return sortedInfo.order === "ascend" ? (
        <SortAscIcon className="w-4 h-4 text-blue-600" />
      ) : (
        <SortDescIcon className="w-4 h-4 text-blue-600" />
      );
    }

    return <SortIcon className="w-4 h-4 opacity-0 group-hover:opacity-40" />;
  };

  return (
    <thead className="bg-gray-50 text-gray-700">
      <tr>
        {columns.map((column) => {
          const isSortable = !!column.sorter;
          const isCurrentlySorted = sortedInfo?.field === column.dataIndex;

          return (
            <th
              key={column.key || String(column.dataIndex)}
              className={`
                ${paddingClasses[size]}
                font-semibold
                text-left
                border-b
                border-gray-200
                ${column.align ? `text-${column.align}` : ""}
                ${isSortable ? "cursor-pointer select-none" : ""}
                relative
                group
                transition-colors
              `}
              style={column.width ? { width: column.width } : undefined}
              onClick={isSortable ? () => handleSortClick(column) : undefined}
            >
              <div className="flex items-center gap-2">
                <span className={isCurrentlySorted ? "text-blue-600" : ""}>
                  {column.title}
                </span>
                {renderSortIcon(column)}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
