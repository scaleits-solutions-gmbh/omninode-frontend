"use client";
import { useState, useMemo, useEffect } from "react";
import {
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  flexRender,
} from "@tanstack/react-table";
import { serviceInstancesColumns } from "./service-instances-list-columns";
import { FeCompanyServiceInstance } from "@/types/fe/fe-company-service-instance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Skeleton,
  Button,
  SearchInput,
  DataTableViewOptions,
  DataTablePagination,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "frontend-common-kit";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCompanyServiceInstances,
  FetchCompanyServiceInstancesParams,
  getCompanyServiceInstancesQueryKey,
} from "@/lib/api-client";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";
import { getColumnStyle } from "@/lib/utils/ui";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";

export default function ServiceInstancesList() {
  const router = useRouter();
  const params = useParams();
  const sourceCompanyId = params.id as string;

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [
    fetchCompanyServiceInstancesParams,
    setFetchCompanyServiceInstancesParams,
  ] = useState<FetchCompanyServiceInstancesParams>({
    page: 1,
    pageSize: 10,
    companyId: sourceCompanyId || "",
  });

  const { data, isLoading, error, refetch } = useQuery<
    PaginatedResponse<FeCompanyServiceInstance>
  >({
    queryKey: getCompanyServiceInstancesQueryKey(
      fetchCompanyServiceInstancesParams,
    ),
    queryFn: () =>
      fetchCompanyServiceInstances(fetchCompanyServiceInstancesParams),
    retry: false,
    enabled: !!sourceCompanyId, // Only run query if we have a company ID
  });

  const companyServiceInstances = useMemo(() => {
    return data?.items || [];
  }, [data]);

  // Handle error toast
  useEffect(() => {
    if (error) {
      toast.error("Error loading service instances");
    }
  }, [error]);

  const table = useReactTable<FeCompanyServiceInstance>({
    data: companyServiceInstances,
    columns: serviceInstancesColumns(sourceCompanyId || ""),
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
      pagination: {
        pageIndex: fetchCompanyServiceInstancesParams.page - 1, // react-table uses 0-based indexing
        pageSize: fetchCompanyServiceInstancesParams.pageSize,
      },
    },
    manualPagination: true,
    pageCount: data?.totalPages ?? 0,
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater({
              pageIndex: fetchCompanyServiceInstancesParams.page - 1,
              pageSize: fetchCompanyServiceInstancesParams.pageSize,
            })
          : updater;

      setFetchCompanyServiceInstancesParams((prev) => ({
        ...prev,
        page: newPagination.pageIndex + 1, // Convert back to 1-based indexing
        pageSize: newPagination.pageSize,
      }));
    },
  });

  // Update companyId when sourceCompanyId changes
  useEffect(() => {
    if (sourceCompanyId) {
      setFetchCompanyServiceInstancesParams((prev) => ({
        ...prev,
        companyId: sourceCompanyId,
      }));
    }
  }, [sourceCompanyId]);

  // Handle missing company ID
  if (!sourceCompanyId) {
    router.push("/companies");
    return null;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <SearchInput
            value={fetchCompanyServiceInstancesParams.search || ""}
            onChange={(e) =>
              setFetchCompanyServiceInstancesParams((prev) => ({
                ...prev,
                search: e.target.value,
                page: 1,
              }))
            }
          />
        </div>
        <DataTableViewOptions table={table} />
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
                              header.getContext(),
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
                Array.from({
                  length: fetchCompanyServiceInstancesParams.pageSize,
                }).map((_, index) => (
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
                ))
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={serviceInstancesColumns(sourceCompanyId).length}
                    className="h-24"
                  >
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <span className="text-red-500">
                        Error loading service instances
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
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const style = getColumnStyle(cell.column.columnDef);
                      return (
                        <TableCell key={cell.id} className="px-4" style={style}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={serviceInstancesColumns(sourceCompanyId).length}
                    className="h-24 text-center"
                  >
                    {fetchCompanyServiceInstancesParams.search
                      ? "No service instances found matching your criteria."
                      : "No service instances found."}
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
          totalRowsOverride={data?.total}
          isLoading={isLoading}
        />
      </CardFooter>
    </Card>
  );
}
