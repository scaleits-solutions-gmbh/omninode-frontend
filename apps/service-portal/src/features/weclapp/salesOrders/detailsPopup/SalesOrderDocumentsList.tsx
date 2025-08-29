import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { salesOrderDocumentsColumns } from "./SalesOrderDocumentsColumns";
import { useQuery } from "@tanstack/react-query";
import { fetchWeclappSalesOrderDocuments } from "@/lib/apiClient/weclapp/salesOrder";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import SearchInput from "@/components/input/searchInput";
import { DataTablePagination } from "@/components/display/pagination";
import { DataTableViewOptions } from "@/components/input/viewOptions";
import { useState } from "react";
import { getColumnStyle } from "@/lib/utils/ui/tableUtils";

interface SalesOrderDocumentsListProps {
  salesOrderId: string;
}

export const SalesOrderDocumentsList = ({ salesOrderId }: SalesOrderDocumentsListProps) => {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setPage(1); // Reset to first page when searching
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["salesOrderDocuments", salesOrderId, searchText, page, pageSize],
    queryFn: () => fetchWeclappSalesOrderDocuments(salesOrderId, searchText, page, pageSize),
  });

  const table = useReactTable({
    data: data?.items || [],
    columns: salesOrderDocumentsColumns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: data?.totalPages || 0,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: pageSize,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newState = updater({
          pageIndex: page - 1,
          pageSize: pageSize,
        });
        setPage(newState.pageIndex + 1);
        setPageSize(newState.pageSize);
      }
    },
    manualPagination: true,
  });

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Loading state
  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Documents</h3>
        <Card>
          <CardHeader className="flex justify-between">
            <SearchInput
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
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
                  {Array.from({ length: pageSize }).map((_, index) => (
                    <TableRow key={`skeleton-${index}`}>
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
                  ))}
                </TableBody>
              </Table>
            </div>
            <DataTablePagination table={table} isLoading={true} showRowsPerPage={false} />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Documents</h3>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load documents. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Documents</h3>
      <Card>
        <CardHeader className="flex justify-between">
            <SearchInput value={searchText} onChange={handleSearchChange} />
            <DataTableViewOptions table={table} />
        </CardHeader>
        <CardContent className="space-y-4">
      {data?.items && data.items.length > 0 ? (
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
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} style={getColumnStyle(cell.column.columnDef)}>
                        {cell.column.id === 'size' ? (
                          <span className="text-sm text-muted-foreground">
                            {formatFileSize(cell.getValue() as number)}
                          </span>
                        ) : typeof cell.column.columnDef.cell === 'function'
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
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={salesOrderDocumentsColumns.length}
                    className="h-24 text-center"
                  >
                    No documents found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground">
            No documents available for this salesOrder.
          </p>
        </div>
      )}
      <DataTablePagination table={table} showRowsPerPage={false}/>
      </CardContent>
    </Card>
    </div>
  );
};