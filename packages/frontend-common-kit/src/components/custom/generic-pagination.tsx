import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTablePaginationLoading } from "./data-table-pagination-loading";

interface GenericPaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function GenericPagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
  isLoading = false,
}: GenericPaginationProps) {
  const pageCount =
    totalItems === 0 ? 1 : Math.max(1, Math.ceil(totalItems / pageSize));
  const hasMultiplePages = pageCount > 1;
  const canPrevious = page > 1;
  const canNext = page < pageCount;

  const from = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = totalItems === 0 ? 0 : Math.min(page * pageSize, totalItems);

  if (isLoading) {
    return (
      <nav
        className="w-full flex items-center justify-center sm:justify-between px-2"
        aria-label="Pagination"
      >
        <DataTablePaginationLoading showRowsPerPage={false} />
      </nav>
    );
  }

  return (
    <nav
      className="w-full flex items-center justify-center sm:justify-between px-2"
      aria-label="Pagination"
    >
      <div className="flex-1 text-sm text-muted-foreground hidden sm:block">
        {totalItems > 0
          ? `Showing ${from} to ${to} of ${totalItems} rows`
          : "0 rows"}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        {pageCount > 1 && (
          <div className="flex w-[100px] text-muted-foreground items-center justify-center text-sm font-medium">
            Page {page} of {pageCount}
          </div>
        )}
        {hasMultiplePages && (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => onPageChange(1)}
              disabled={!canPrevious}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => canPrevious && onPageChange(page - 1)}
              disabled={!canPrevious}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => canNext && onPageChange(page + 1)}
              disabled={!canNext}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => onPageChange(pageCount)}
              disabled={!canNext}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
