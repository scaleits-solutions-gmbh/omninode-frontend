"use client";
import { companyRelationsTableColumns } from "./company-relations-table-columns";
import { fetchCompanyRelations } from "@/lib/api-client/company-relationships";
import { getColumnStyle } from "@/lib/utils/ui/table-utils";
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Skeleton,
  SearchInput,
  DataTableViewOptions,
  DataTablePagination,
} from "frontend-common-kit";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useMemo, useState, useEffect } from "react";

export default function CompanyRelationsList() {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const defaultData = useMemo(() => [], []);
  const columns = useMemo(() => companyRelationsTableColumns, []);

  const { data, isLoading } = useQuery({
    queryKey: ["companyRelations"],
    queryFn: () =>
      fetchCompanyRelations({
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        search: search,
      }),
    retry: false,
  });

  // Client-side filtered data
  const filteredData = useMemo(() => {
    if (!data?.items || !search.trim()) return data?.items || [];

    return data.items.filter((item) => {
      // Filter on company relationship fields
      const searchLower = search.toLowerCase();
      return (
        item.leftCompanyName.toLowerCase().includes(searchLower) ||
        item.rightCompanyName.toLowerCase().includes(searchLower) ||
        item.relationshipType.toLowerCase().includes(searchLower)
      );
    });
  }, [data?.items, search]);

  const table = useReactTable({
    data: filteredData ?? defaultData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    manualPagination: true,
    pageCount:
      Math.ceil((filteredData?.length || 0) / pagination.pageSize) || 1,
    columnResizeMode: "onChange",
    defaultColumn: {
      minSize: 100,
    },
  });

  // Reset to first page when search changes
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
  }, [search]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <SearchInput
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <DataTableViewOptions table={table} />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-md border">
            <Table className="w-full">
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
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  // Show loading skeletons
                  Array.from({ length: pagination.pageSize }).map(
                    (_, index) => (
                      <TableRow key={`loading-${index}`}>
                        {columns.map((column, cellIndex) => (
                          <TableCell
                            key={`loading-cell-${cellIndex}`}
                            style={{
                              width: `${column.size}%`,
                              minWidth: `${column.minSize}px`,
                            }}
                          >
                            <Skeleton className="h-5 w-4/5" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ),
                  )
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          style={getColumnStyle(cell.column.columnDef)}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {filteredData && filteredData.length > 0 && (
            <DataTablePagination
              table={table}
              totalRowsOverride={filteredData.length}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
