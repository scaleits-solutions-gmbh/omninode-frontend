"use client";

import { columns } from "./service-instance-table-columns";
import { fetchServiceInstances } from "@/lib/api-client/service-instances";
import { getColumnStyle } from "@/lib/utils/ui/table-utils";
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Skeleton,
  Alert,
  AlertDescription,
  AlertTitle,
  SearchInput,
  DataTableViewOptions,
  DataTablePagination,
} from "../../../../../../../packages/frontend-common-kit/dist/components";
import { useQuery } from "@tanstack/react-query";
import {
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  flexRender,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { AlertCircle } from "lucide-react";
import { useMemo, useState, useEffect } from "react";

export default function ServiceInstancesList() {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["serviceInstances"],
    queryFn: () => fetchServiceInstances(),
    retry: false,
  });

  const defaultData = useMemo(() => [], []);
  const tableColumns = useMemo(() => columns, []);

  // Client-side filtered data
  const filteredData = useMemo(() => {
    if (!data?.items || !search.trim()) return data?.items || [];

    return data.items.filter((item) => {
      const searchLower = search.toLowerCase();
      return (
        item.instanceName.toLowerCase().includes(searchLower) ||
        item.status.toLowerCase().includes(searchLower)
      );
    });
  }, [data?.items, search]);

  const table = useReactTable({
    data: filteredData ?? defaultData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    manualPagination: true,
    pageCount:
      Math.ceil((filteredData?.length || 0) / pagination.pageSize) || 1,
    columnResizeMode: "onChange",
    defaultColumn: {
      minSize: 100,
    },
  });

  // Reset to first page when search changes
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
  }, [search]);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <DataTableViewOptions table={table} />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error instanceof Error
                  ? error.message
                  : "Failed to fetch service instances"}
              </AlertDescription>
            </Alert>
          )}
          <div className="rounded-md border">
            <Table className="w-full">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        style={getColumnStyle(header.column.columnDef)}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  // Show loading skeletons
                  Array.from({ length: pagination.pageSize }).map(
                    (_, index) => (
                      <TableRow key={`loading-${index}`}>
                        {tableColumns.map((column, cellIndex) => (
                          <TableCell
                            key={`loading-cell-${cellIndex}`}
                            style={{
                              width: `${column.size}%`,
                              minWidth: `${column.minSize}px`,
                            }}
                          >
                            <Skeleton className="h-5 w-4/5" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ),
                  )
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          style={getColumnStyle(cell.column.columnDef)}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={tableColumns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {filteredData && filteredData.length > 0 && (
            <DataTablePagination
              table={table}
              totalRowsOverride={filteredData.length}
              showRowsPerPage={false}
              showPageCount={false}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
