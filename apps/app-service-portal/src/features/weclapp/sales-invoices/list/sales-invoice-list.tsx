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
  DataTablePagination
} from "@repo/pkg-frontend-common-kit/components";

import { fetchWeclappSalesInvoices } from "@/lib/api-client/weclapp/sales-invoice";
import { useQuery } from "@tanstack/react-query";
import {
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { createColumns } from "./columns";

import { useState } from "react";

import { SalesInvoiceDetailsPopup } from "../details-popup/sales-invoice-details-popup";
import { FeSalesInvoice } from "@/types/weclapp/sales-invoice";

import { getColumnStyle } from "@/lib/utils/ui/table-utils";
import { useParams } from "next/navigation";

export const SalesInvoiceList = () => {
  const { viewId } = useParams();
  const [salesInvoice, setSalesInvoice] = useState<FeSalesInvoice | undefined>(
    undefined
  );
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "salesInvoices",
      viewId,
      search,
      pagination.pageIndex,
      pagination.pageSize,
    ],
    queryFn: () =>
      fetchWeclappSalesInvoices(
        search,
        pagination.pageIndex + 1,
        pagination.pageSize
      ),
  });

  const table = useReactTable({
    data: data?.items || [],
    columns: createColumns({
      onViewDetails: (salesInvoice: FeSalesInvoice) => {
        setSalesInvoice(salesInvoice);
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
    pageCount: data?.totalPages || 0,
  });

  if (error) return <div>Error: {error.message}</div>;

  if (!isLoading && !data) return <div>No data</div>;

  return (
    <>
      <SalesInvoiceDetailsPopup
        salesInvoice={salesInvoice}
        onClose={() => setSalesInvoice(undefined)}
      />
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
          <DataTablePagination table={table} isLoading={isLoading} showPageCount={false} showRowsPerPage={false} totalRowsOverride={data?.total}/>
        </CardContent>
      </Card>
    </>
  );
};
