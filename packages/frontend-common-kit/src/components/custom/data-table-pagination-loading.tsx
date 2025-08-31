import { Skeleton } from "@/components/ui/skeleton";

interface DataTablePaginationLoadingProps {
  showRowsPerPage?: boolean;
}

export function DataTablePaginationLoading({
  showRowsPerPage = true,
}: DataTablePaginationLoadingProps) {
  return (
    <div className="w-full flex items-center justify-between space-x-6 lg:space-x-8">
      <Skeleton className="h-5 w-[90px]" />
      <div className="flex items-center space-x-4">
        {showRowsPerPage && <Skeleton className="h-8 w-[70px]" />}
        <Skeleton className="h-5 w-16" />
        <div className="flex items-center space-x-2">
          <Skeleton className="hidden h-8 w-8 lg:flex" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="hidden h-8 w-8 lg:flex" />
        </div>
      </div>
    </div>
  );
}
