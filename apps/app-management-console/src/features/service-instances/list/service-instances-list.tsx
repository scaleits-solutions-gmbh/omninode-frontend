"use client";

// Import to register module augmentation FIRST
import "@/lib/next-auth-options";

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
import { useParams, useRouter } from "next/navigation";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { createColumns } from "./columns";

import { useState } from "react";

import { getColumnStyle } from "@/lib/utils/ui/table-utils";

import {
  baseOmninodeApiClient,
  getApiAuthentication,
} from "@repo/omninode-api-client";
import { useAuthedQuery } from "@repo/pkg-frontend-common-kit/hooks";
import { OrganizationServiceInstanceListItemReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export const ServiceInstancesList = () => {
  const { organizationId } = useParams();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, error } = useAuthedQuery({
    queryKey: [
      "organizationServiceInstances",
      organizationId,
      search,
      pagination.pageIndex,
      pagination.pageSize,
    ],
    queryFn: async ({ session }) => {
      return await baseOmninodeApiClient().serviceMicroservice.findPaginatedOrganizationServiceInstanceListItems(
        {
          request: {
            queryParams: {
              organizationId: organizationId as string,
              pageSize: pagination.pageSize,
              page: pagination.pageIndex + 1,
              searchTerm: search || undefined,
            },
          },
          apiAuthentication: getApiAuthentication(session.access_token),
        }
      );
    },
  });

  const table = useReactTable({
    data: data?.body.data || [],
    columns: createColumns({
      onViewDetails: (serviceInstance: OrganizationServiceInstanceListItemReadModel) => {
        const id = serviceInstance.id;
        const organizationId = serviceInstance.organizationId;
        const url = `/${organizationId}/service-instances/${id}`;
        router.push(url);
      },
    }),
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
    pageCount: data?.body.totalPages || 0,
  });

  if (error) return <div>Error: {error.message}</div>;

  if (!isLoading && !data) return <div>No data</div>;

  return (
    <>
      <Card>
        <CardHeader className="flex justify-between">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <DataTableViewOptions table={table} />
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
                  {Array.from({ length: pagination.pageSize }).map(
                    (_, index) => (
                      <TableRow key={`skeleton-${index}`}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Skeleton className="size-8 rounded-md" />
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
                        <TableCell>
                          <div className="flex justify-end">
                            <Skeleton className="h-8 w-8" />
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  )}
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
            totalRowsOverride={data?.body.total}
          />
        </CardContent>
      </Card>
    </>
  );
};

