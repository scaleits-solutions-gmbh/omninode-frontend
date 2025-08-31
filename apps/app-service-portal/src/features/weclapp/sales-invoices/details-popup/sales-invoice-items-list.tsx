"use client";

import { FeSalesInvoice } from "@/types/weclapp/sales-invoice";
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  SearchInput,
  DataTableViewOptions,
  DataTablePagination
} from "../../../../../../../packages/frontend-common-kit/dist/components";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState
} from "@tanstack/react-table";
import { salesInvoiceItemsColumns } from "./sales-invoice-items-columns";

import { useMemo, useState } from "react";
import { getColumnStyle } from "@/lib/utils/ui/table-utils";

interface SalesInvoiceItemsListProps {
  salesInvoice: FeSalesInvoice;
}

export const SalesInvoiceItemsList = ({ salesInvoice }: SalesInvoiceItemsListProps) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  
  // Calculate totals for items with proper error handling
  const itemsWithTotals = useMemo(() => {
    if (!salesInvoice?.items) return [];

    return salesInvoice.items.map((item) => ({
      ...item,
      total: (parseFloat(item.unitPrice || "0") * (item.quantity || 0)).toFixed(
        2
      ),
    }));
  }, [salesInvoice?.items]);

  const table = useReactTable({
    data: itemsWithTotals,
    columns: salesInvoiceItemsColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: "includesString",
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Sales Invoice Items</h3>
      <Card>
        <CardHeader className="flex justify-between">
          <SearchInput
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <DataTableViewOptions table={table} />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-md">
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
                    <TableCell
                      colSpan={salesInvoiceItemsColumns.length}
                      className="h-24 text-center"
                    >
                      No items found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <DataTablePagination table={table} showRowsPerPage={false} showPageCount={false}/>
        </CardContent>
      </Card>
    </div>
  );
};
