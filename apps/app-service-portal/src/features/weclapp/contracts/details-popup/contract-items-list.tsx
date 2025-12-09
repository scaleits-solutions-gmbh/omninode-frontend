"use client";

import type { WeclappContractListItemReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
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
} from "@repo/pkg-frontend-common-kit/components";
import {
  getCoreRowModel, 
  getFilteredRowModel, 
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState
} from "@tanstack/react-table";
import { contractItemsColumns } from "./contract-items-columns";

import { useMemo, useState } from "react";

import { getColumnStyle } from "@/lib/utils/ui/table-utils";

interface ContractItemsListProps {
  contract: WeclappContractListItemReadModel;
}

export const ContractItemsList = ({ contract }: ContractItemsListProps) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  
  // Calculate totals for items with proper error handling
  const itemsWithTotals = useMemo(() => {
    if (!contract?.items) return [];

    return contract.items.map((item) => ({
      ...item,
      total: (parseFloat(item.unitPrice || "0") * (item.quantity || 0)).toFixed(
        2
      ),
    }));
  }, [contract?.items]);

  const table = useReactTable({
    data: itemsWithTotals,
    columns: contractItemsColumns,
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
      <h3 className="text-lg font-medium mb-3">Contract Items</h3>
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
                      colSpan={contractItemsColumns.length}
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
