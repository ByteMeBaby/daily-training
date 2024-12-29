import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  size: "small" | "middle" | "large";
}

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export function TablePagination({
  currentPage,
  pageSize,
  totalPages,
  setCurrentPage,
  setPageSize,
  size,
}: TablePaginationProps) {
  const buttonClasses = useMemo(
    () => ({
      small: "px-2 py-1 text-sm",
      middle: "px-3 py-1.5",
      large: "px-4 py-2 text-lg",
    }),
    [],
  );

  const generatePageNumbers = (current: number, total: number): number[] => {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (total <= maxVisiblePages) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    let start = Math.max(2, current - 1);
    let end = Math.min(total - 1, current + 1);

    // Adjust if we're near the start
    if (current <= 3) {
      end = Math.min(total - 1, 4);
    }
    // Adjust if we're near the end
    if (current >= total - 2) {
      start = Math.max(2, total - 3);
    }

    // Add ellipsis at the start if needed
    if (start > 2) {
      pages.push(-1); // -1 represents ellipsis
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis at the end if needed
    if (end < total - 1) {
      pages.push(-1);
    }

    // Always show last page
    if (total > 1) {
      pages.push(total);
    }

    return pages;
  };

  const pageNumbers = useMemo(
    () => generatePageNumbers(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <div className="flex items-center justify-between mt-4 px-2">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Rows per page:</span>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className={`
            border border-gray-300 
            rounded-md 
            bg-white
            ${buttonClasses[size]}
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-500 
            focus:border-blue-500
          `}
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            ${buttonClasses[size]}
            rounded-md
            border
            border-gray-300
            bg-white
            text-gray-700
            disabled:bg-gray-50
            disabled:text-gray-400
            disabled:cursor-not-allowed
            hover:bg-gray-50
            transition-colors
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          `}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pageNumbers.map((pageNum, index) =>
          pageNum === -1 ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`
                ${buttonClasses[size]}
                rounded-md
                border
                ${
                  currentPage === pageNum
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }
                transition-colors
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              `}
            >
              {pageNum}
            </button>
          ),
        )}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            ${buttonClasses[size]}
            rounded-md
            border
            border-gray-300
            bg-white
            text-gray-700
            disabled:bg-gray-50
            disabled:text-gray-400
            disabled:cursor-not-allowed
            hover:bg-gray-50
            transition-colors
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          `}
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
