import { useState } from "react";
import { useTable } from "./hooks/useTable";
import type { TableColumn } from "./types";

interface User {
  id: number;
  name: string;
  email: string;
}

export function CustomTableDemo() {
  const [users] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" },
  ]);

  const columns: TableColumn<User>[] = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
      width: 80,
      sorter: true,
    },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
      filters: [{ text: "Contains @example.com", value: "@example.com" }],
    },
  ];

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
    dataSource: users,
    pagination: {
      pageSize: 2,
    },
  });

  const handleSort = (column: TableColumn<User>) => {
    if (!column.sorter) return;

    const isCurrentlySorted = sortedInfo?.field === column.dataIndex;
    let nextOrder: "ascend" | "descend" | null = "ascend";

    if (isCurrentlySorted) {
      nextOrder = sortedInfo.order === "ascend" ? "descend" : null;
    }

    setSortedInfo(
      nextOrder
        ? {
            field: column.dataIndex,
            order: nextOrder,
            column,
          }
        : null,
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex border-b">
        {columns.map((column) => (
          <div
            key={column.key}
            className="flex-1 p-2"
            onClick={() => column.sorter && handleSort(column)}
            style={{
              cursor: column.sorter ? "pointer" : "default",
              width: column.width,
            }}
          >
            <span>{column.title}</span>
            {sortedInfo?.field === column.dataIndex && (
              <span className="ml-1">
                {sortedInfo.order === "ascend" ? "↑" : "↓"}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Body */}
      {tableData.map((record) => (
        <div key={record.id} className="flex border-b">
          {columns.map((column) => (
            <div
              key={column.key}
              className="flex-1 p-2"
              style={{ width: column.width }}
            >
              {column.render
                ? column.render(record[column.dataIndex], record, 0)
                : String(record[column.dataIndex])}
            </div>
          ))}
        </div>
      ))}

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="border p-1"
        >
          <option value={2}>2 / page</option>
          <option value={5}>5 / page</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 border disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
