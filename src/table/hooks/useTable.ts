import { useMemo, useState } from "react";
import { UseTableProps, UseTableReturn } from "../types";

export function useTable<T>({
  data,
  columns,
}: UseTableProps<T>): UseTableReturn<T> {
  const [tableData] = useState<T[]>(data);

  const headers = useMemo(() => columns, [columns]);

  return { tableData, headers };
}
