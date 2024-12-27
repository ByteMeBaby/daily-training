import { TableProps } from "./types";

export function Table<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  rowKey = "id",
}: TableProps<T>) {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto ">
      <table className="min-w-full border rounded-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.align ? `text-${column.align}` : ""
                }`}
                style={{ width: column.width }}
                key={column.key}
              >
                {column?.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={typeof rowKey === "function" ? rowKey(row) : row[rowKey]}>
              {columns.map((column) =>
                column.render ? (
                  column.render(row[column.dataIndex], row)
                ) : (
                  <td
                    key={column.key}
                    className={`px-6 py-4 whitespace-nowrap ${
                      column.align ? `text-${column.align}` : "text-left"
                    }`}
                  >
                    {row[column.dataIndex]}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
