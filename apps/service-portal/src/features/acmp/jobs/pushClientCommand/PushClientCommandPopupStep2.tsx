import { Button } from "@/components/ui/button";
import { columns } from "./PushClientCommandPopupStep2Columns";
import { useQuery } from "@tanstack/react-query";
import { fetchAcmpClients } from "@/lib/apiClient/acmp/client";
import { useState } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import SearchInput from "@/components/input/searchInput";
import {DataTableViewOptions} from "@/components/input/viewOptions";
import {DataTablePagination} from "@/components/display/pagination";
import { FeClient } from "@/types/acmp/client";
import { getColumnStyle } from "@/lib/utils/ui/tableUtils";

interface PushClientCommandPopupStep2Props {
  initialSelectedClients: FeClient[];
  onNext: (clients: FeClient[]) => void;
  onBack: () => void;
}

export default function PushClientCommandPopupStep2({
  initialSelectedClients,
  onNext,
  onBack,
}: PushClientCommandPopupStep2Props) {
  const [selectedClients, setSelectedClients] = useState<FeClient[]>(initialSelectedClients);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["clients", search, pagination.pageIndex, pagination.pageSize],
    queryFn: () =>
      fetchAcmpClients(search, pagination.pageIndex + 1, pagination.pageSize),
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
      selectedClients,
      onSelectionChange: setSelectedClients,
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
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
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
                    const isSelected = selectedClients.some(client => client.id === row.original.id);
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
          {selectedClients.length > 0 && (
            <>Selected: <span className="font-medium">{selectedClients.length} client{selectedClients.length !== 1 ? 's' : ''}</span></>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <Button disabled={selectedClients.length === 0} onClick={() => onNext(selectedClients)}>Next</Button>
        </div>
      </div>
    </>
  );
}
