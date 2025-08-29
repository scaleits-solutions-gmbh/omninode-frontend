"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import SearchInput from "@/components/input/SearchInput";
import { useState, useMemo, useEffect } from "react";
// import { FacetedFilter } from "@/components/input";
import {
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  flexRender,
} from "@tanstack/react-table";
import { companyColumns } from "./CompanyListCollunms";
import { Company } from "@/types/company";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCompanies,
  FetchCompaniesParams,
  getCompaniesQueryKey,
} from "@/lib/apiClient";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";
import { DataTablePagination } from "@/components/display/pagination";
import { ViewOptions } from "@/components/input/ViewOptions";
import { Skeleton } from "@/components/ui/skeleton";
import { getColumnStyle } from "@/lib/utils/ui";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";
export default function CompanyList() {
  const router = useRouter();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [fetchCompaniesParams, setFetchCompaniesParams] =
    useState<FetchCompaniesParams>({
      page: 1,
      pageSize: 10,
    });

  const {
    data: companiesResponse,
    isLoading,
    error,
    refetch,
  } = useQuery<PaginatedResponse<Company>>({
    queryKey: getCompaniesQueryKey(fetchCompaniesParams),
    queryFn: () => fetchCompanies(fetchCompaniesParams),
    retry: false,
  });

  const companies = useMemo(() => {
    return companiesResponse?.items || [];
  }, [companiesResponse]);

  // Handle error toast
  useEffect(() => {
    if (error) {
      toast.error("Error loading companies");
    }
  }, [error]);

  const table = useReactTable<Company>({
    data: companies,
    columns: companyColumns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
      pagination: {
        pageIndex: fetchCompaniesParams.page - 1, // react-table uses 0-based indexing
        pageSize: fetchCompaniesParams.pageSize,
      },
    },
    manualPagination: true,
    pageCount: companiesResponse?.totalPages ?? 0,
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater({
              pageIndex: fetchCompaniesParams.page - 1,
              pageSize: fetchCompaniesParams.pageSize,
            })
          : updater;

      setFetchCompaniesParams((prev) => ({
        ...prev,
        page: newPagination.pageIndex + 1, // Convert back to 1-based indexing
        pageSize: newPagination.pageSize,
      }));
    },
  });

  // TODO: Add filter options when implementing custom filter components

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <SearchInput
            placeholder="Search companies..."
            value={fetchCompaniesParams.search || ""}
            onChange={(e) =>
              setFetchCompaniesParams((prev) => ({
                ...prev,
                search: e.target.value,
                page: 1,
              }))
            }
          />
          {/* TODO: Implement custom filter components for server-side filtering */}
        </div>
        <ViewOptions table={table} />
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const style = getColumnStyle(header.column.columnDef);
                    return (
                      <TableHead key={header.id} className="px-4" style={style}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                // Loading skeleton rows
                Array.from({ length: fetchCompaniesParams.pageSize }).map(
                  (_, index) => (
                    <TableRow key={`skeleton-${index}`}>
                      {table
                        .getHeaderGroups()[0]
                        ?.headers.map((header, colIndex) => {
                          const style = getColumnStyle(header.column.columnDef);
                          return (
                            <TableCell
                              key={`skeleton-cell-${index}-${colIndex}`}
                              className="px-4"
                              style={style}
                            >
                              <Skeleton className="h-6 w-full" />
                            </TableCell>
                          );
                        })}
                    </TableRow>
                  )
                )
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={companyColumns.length} className="h-24">
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <span className="text-red-500">
                        Error loading companies
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => refetch()}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Try Again
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={() => router.push(`/companies/${row.original.id}`)}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const style = getColumnStyle(cell.column.columnDef);
                      return (
                        <TableCell key={cell.id} className="px-4" style={style}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={companyColumns.length}
                    className="h-24 text-center"
                  >
                    {fetchCompaniesParams.search ||
                    fetchCompaniesParams.status?.length ||
                    fetchCompaniesParams.type?.length
                      ? "No companies found matching your criteria."
                      : "No companies found."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter>
        <DataTablePagination
          table={table}
          totalRowsOverride={companiesResponse?.total}
          isLoading={isLoading}
        />
      </CardFooter>
    </Card>
  );
}
