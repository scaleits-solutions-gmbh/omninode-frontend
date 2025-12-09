"use client";

import {
  Card,
  CardContent,
  CardHeader,
  DataTablePagination,
  DataTableViewOptions,
  SearchInput,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/pkg-frontend-common-kit/components";
import { useAuthedQuery } from "@repo/pkg-frontend-common-kit/hooks";
import { getCoreRowModel, getPaginationRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { clientHardwareColumns } from "./client-hard-drive-columns";
import { getColumnStyle } from "@/lib/utils/ui/table-utils";
import { useParams } from "next/navigation";
import { getServiceAcmpClient } from "@repo/pkg-frontend-common-kit/utils";

interface ClientHardwareListProps {
  clientId: string;
}

export const ClientHardwareList = ({ clientId }: ClientHardwareListProps) => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const { viewId } = useParams();

  const {
    data,
    isLoading: isQueryLoading,
    isFetching: isQueryFetching,
    error,
  } = useAuthedQuery({
    queryKey: [
      "clientHardware",
      viewId,
      clientId,
      search,
      pagination.pageIndex,
      pagination.pageSize,
    ],
    enabled: Boolean(viewId) && Boolean(clientId),
    queryFn: async ({ session }) => {
      const response = await getServiceAcmpClient(session).getAcmpClientHardDrives({
        pathParams: { viewId: viewId as string, clientId },
        queryParams: {
          page: pagination.pageIndex + 1,
          pageSize: pagination.pageSize,
          search,
        },
      });
      return response.data;
    },
  });

  const isLoading = isQueryLoading;
  const isFetchingPage = isQueryFetching;

  const table = useReactTable({
    data: data?.data || [],
    columns: clientHardwareColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
      globalFilter: search,
    },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setSearch,
    manualPagination: true,
    pageCount: data?.totalPages || 0,
  });

  if (error) return <div>Error loading hardware</div>;

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
                      <TableHead key={header.id} style={getColumnStyle(header.column.columnDef)}>
                        {header.isPlaceholder
                          ? null
                          : typeof header.column.columnDef.header === "string"
                          ? header.column.columnDef.header
                          : header.column.columnDef.header?.({ column: header.column, header, table })}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {Array.from({ length: pagination.pageSize }).map((_, idx) => (
                  <TableRow key={`skeleton-${idx}`}>
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
                      <TableHead key={header.id} style={getColumnStyle(header.column.columnDef)}>
                        {header.isPlaceholder
                          ? null
                          : typeof header.column.columnDef.header === "string"
                          ? header.column.columnDef.header
                          : header.column.columnDef.header?.({ column: header.column, header, table })}
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
                            : (cell.getValue() as React.ReactNode) ?? "—"}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={clientHardwareColumns.length} className="h-24 text-center">
                      No hardware found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
        <DataTablePagination table={table} isLoading={isLoading} showRowsPerPage={false} showPageCount={false} totalRowsOverride={data?.total} />
      </CardContent>
    </Card>
  );
};
