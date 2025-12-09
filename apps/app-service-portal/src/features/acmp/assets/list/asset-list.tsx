"use client";

import {
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  SearchInput,
  DataTableViewOptions,
  DataTablePagination,
} from "@repo/pkg-frontend-common-kit/components";
import {
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { getColumnStyle } from "@/lib/utils/ui/table-utils";
import { createColumns } from "./columns";
import { useAuthedQuery } from "@repo/pkg-frontend-common-kit/hooks";
import { getServiceAcmpClient } from "@repo/pkg-frontend-common-kit/utils";
import { useParams } from "next/navigation";

// removed mock data; using real API

export const AssetList = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    location: false,
    costCenter: false,
    department: false,
    vendor: false,
    manufacturer: false,
    servicePartner: false,
    stateEn: false,
    stateDe: false,
    inventoryNumber: false,
    serialNumber: false,
    model: false,
    creationDate: false,
    isLent: true,
  });
  const { viewId } = useParams();
  const [isFetchingPage, setIsFetchingPage] = useState(false);
  const { data: assets, isLoading: isQueryLoading, isFetching: isQueryFetching, error } = useAuthedQuery({
    queryKey: [
      "assets",
      viewId,
      search,
      pagination.pageIndex,
      pagination.pageSize,
    ],
    enabled: Boolean(viewId),
    queryFn: async ({ session }) => {
      const response = await getServiceAcmpClient(session).getAcmpAssets({
        pathParams: { viewId: viewId as string },
        queryParams: {
          page: pagination.pageIndex + 1,
          pageSize: pagination.pageSize,
          search: search,
        },
      });
      return response.data;
    },
  });

  const isLoading = isQueryLoading;

  const table = useReactTable({
    data: assets?.data || [],
    columns: createColumns(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
      globalFilter: search,
      columnVisibility,
    },
    onPaginationChange: (updater) => {
      setIsFetchingPage(true);
      setPagination(updater);
    },
    onGlobalFilterChange: setSearch,
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
    pageCount: assets?.totalPages || 0,
  });

  useEffect(() => {
    if (isFetchingPage && !isQueryLoading && !isQueryFetching) {
      setIsFetchingPage(false);
    }
  }, [isFetchingPage, isQueryLoading, isQueryFetching]);

  if (error) return <div>Error: {error.message}</div>;
  if (!isLoading && !assets) return <div>No data</div>;

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
        <DataTableViewOptions table={table} />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border rounded-md">
          {isFetchingPage || isLoading ? (
            <Table>
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
                          : typeof header.column.columnDef.header === "string"
                            ? header.column.columnDef.header
                            : header.column.columnDef.header?.({
                                column: header.column,
                                header,
                                table,
                              })}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {Array.from({ length: pagination.pageSize }).map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Skeleton className="size-8" />
                        <Skeleton className="h-4 flex-1" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Table>
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
                          : typeof header.column.columnDef.header === "string"
                            ? header.column.columnDef.header
                            : header.column.columnDef.header?.({
                                column: header.column,
                                header,
                                table,
                              })}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} style={getColumnStyle(cell.column.columnDef)}>
                          {typeof cell.column.columnDef.cell === "function"
                            ? cell.column.columnDef.cell({
                                row,
                                getValue: cell.getValue,
                                cell,
                                column: cell.column,
                                renderValue: cell.renderValue,
                                table,
                              })
                            : (cell.getValue() as React.ReactNode)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
        <DataTablePagination
          table={table}
          isLoading={isLoading}
          showPageCount={false}
          showRowsPerPage={false}
          totalRowsOverride={assets?.total}
        />
      </CardContent>
    </Card>
  );
};

export default AssetList;


