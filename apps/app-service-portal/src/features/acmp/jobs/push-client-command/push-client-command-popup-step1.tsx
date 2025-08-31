"use client";

import { columns } from "./push-client-command-popup-step1-columns";
import { useQuery } from "@tanstack/react-query";
import { fetchAcmpCommands } from "@/lib/api-client/acmp/client-command";
import { useState } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { FeClientCommand } from "@/types/acmp/client-command";
import { getColumnStyle } from "@/lib/utils/ui/table-utils";
import {
  Button,
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
} from "../../../../../../../packages/frontend-common-kit/dist/components";

interface PushClientCommandPopupStep1Props {
  initialSelectedClientCommand: FeClientCommand | undefined;
  onNext: (clientCommand: FeClientCommand) => void;
}

export default function PushClientCommandPopupStep1({ initialSelectedClientCommand, onNext }: PushClientCommandPopupStep1Props) {
    const [selectedClientCommand, setSelectedClientCommand] = useState<FeClientCommand | undefined>(initialSelectedClientCommand);
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState({
      pageIndex: 0,
      pageSize: 10,
    });
  
    const { data, isLoading, error } = useQuery({
      queryKey: ["clientCommands", search, pagination.pageIndex, pagination.pageSize],
      queryFn: () =>
        fetchAcmpCommands(search, pagination.pageIndex + 1, pagination.pageSize),
    });
  
  
    const table = useReactTable({
      data: data?.items || [],
      columns: columns,
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
      meta: {
        selectedClientCommand,
        onSelectionChange: setSelectedClientCommand,
      },
    });
  
    if (error) return <div>Error: {error.message}</div>;
    if (isLoading) return (
      <Card>
        <CardHeader className="flex justify-between">
          <SearchInput
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPagination(prev => ({ ...prev, pageIndex: 0 }));
            }}
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
                          : typeof header.column.columnDef.header === 'string'
                          ? header.column.columnDef.header
                          : header.column.columnDef.header?.({ 
                              column: header.column, 
                              header,
                              table 
                            })}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {Array.from({ length: pagination.pageSize }).map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    <TableCell >
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell >
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <Skeleton className="h-4 w-4 rounded-sm" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DataTablePagination table={table} isLoading={true} showRowsPerPage={false} showPageCount={false}/>
        </CardContent>
      </Card>
    );
    if (!data) return <div>No data</div>;
  
    return (
      <>
      <Card>
        <CardHeader className="flex justify-between">
          <SearchInput
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPagination(prev => ({ ...prev, pageIndex: 0 }));
            }}
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
                          : typeof header.column.columnDef.header === 'string'
                          ? header.column.columnDef.header
                          : header.column.columnDef.header?.({ 
                              column: header.column, 
                              header,
                              table 
                            })}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                    const isSelected = selectedClientCommand?.id === row.original.id;
                    return (
                      <TableRow
                        key={row.id}
                        data-state={isSelected ? "selected" : undefined}
                        className={isSelected ? "bg-muted" : undefined}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} style={getColumnStyle(cell.column.columnDef)}>
                            {typeof cell.column.columnDef.cell === 'function'
                              ? cell.column.columnDef.cell({ 
                                  row, 
                                  getValue: cell.getValue,
                                  cell,
                                  column: cell.column,
                                  renderValue: cell.renderValue,
                                  table
                                })
                              : cell.getValue() as React.ReactNode}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })
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
          </div>
          <DataTablePagination table={table} showRowsPerPage={false} showPageCount={false}/>
        </CardContent>
      </Card>
      <div className="flex justify-between items-center">
        
          <div className="text-sm text-muted-foreground">
          {selectedClientCommand && (
            <>Selected: <span className="font-medium">{selectedClientCommand.name}</span></>
          )}
        </div>
        <Button disabled={!selectedClientCommand} onClick={() => onNext(selectedClientCommand!)}>Next</Button>
      </div>
    </>
  );
}
