"use client";

import { useOrganizationId } from "@/hooks/use-organization-id";
import { getColumnStyle } from "@/lib/utils/ui/table-utils";
import {
  baseOmninodeApiClient,
  getApiAuthentication,
} from "@repo/omninode-api-client";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DataTablePagination,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/pkg-frontend-common-kit/components";
import { useAuthedQuery } from "@repo/pkg-frontend-common-kit/hooks";
import {
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import { recentUsersColumns } from "./recent-users-columns";

export default function RecentUsers() {
  const [pagination] = useState({ pageIndex: 0, pageSize: 5 });
  const organizationId = useOrganizationId();

  const { data: queryData, isLoading } = useAuthedQuery({
    queryKey: ["recentOrganizationUsers", organizationId],
    queryFn: async ({ session }) => {
      return await baseOmninodeApiClient().organizationMicroservice.findPaginatedOrganizationMembers({
        request: {
          pathParams: { id: organizationId as string },
          queryParams: {
            pageSize: pagination.pageSize,
            page: pagination.pageIndex + 1,
          },
        },
        apiAuthentication: getApiAuthentication(session.access_token),
      });
    },
  });

  const table = useReactTable({
    data: queryData?.body.data || [],
    columns: recentUsersColumns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
    },
    manualPagination: true,
    pageCount: queryData?.body.totalPages || 1,
  });

  return (
    <Card className="gap-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base">Recent Users</CardTitle>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/${organizationId}/users`}>View all</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border rounded-md">
          {isLoading ? (
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
                    {table.getAllColumns().map((col, idx) => (
                      <TableCell key={`skeleton-cell-${idx}`} style={getColumnStyle(col.columnDef)}>
                        {col.id === "name" ? (
                          <div className="flex items-center gap-2">
                            <Skeleton className="size-8 rounded-full" />
                            <Skeleton className="h-4 flex-1" />
                          </div>
                        ) : col.id === "role" ? (
                          <div className="flex justify-end">
                            <Skeleton className="h-8 w-8" />
                          </div>
                        ) : (
                          <Skeleton className="h-4" />
                        )}
                      </TableCell>
                    ))}
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
                    <TableRow
                      key={row.id}
                      className="hover:bg-accent/50"
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          style={getColumnStyle(cell.column.columnDef)}
                        >
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
                    <TableCell
                      colSpan={table.getAllColumns().length}
                      className="h-24 text-center"
                    >
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
          totalRowsOverride={queryData?.body.total}
        />
      </CardContent>
    </Card>
  );
}
