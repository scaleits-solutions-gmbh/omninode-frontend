"use client";

import { collumns } from "./user-list-columns";
import { fetchUsers } from "@/lib/api-client/user-companies";
import { getColumnStyle } from "@/lib/utils/ui/table-utils";
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Skeleton,
  SearchInput,
  DataTableViewOptions,
  DataTablePagination,
} from "frontend-common-kit/components";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";

export default function UserListCard() {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Fetch users with filters
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", pagination.pageIndex, pagination.pageSize, search],
    queryFn: () =>
      fetchUsers({
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        search: search || undefined,
      }),
    placeholderData: keepPreviousData,
  });

  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    data: data?.items ?? defaultData,
    columns: collumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    manualPagination: true,
    pageCount: data?.totalPages,
    columnResizeMode: "onChange",
    defaultColumn: {
      minSize: 100,
    },
  });

  return (
    <Card>
      <CardHeader className="space-y-2">
        <h2 className="text-lg font-medium">Users</h2>
        <div className="flex justify-between items-center">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <DataTableViewOptions table={table} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-md border">
            <Table
              aria-label="Users table"
              aria-describedby="users-table-desc"
              className="w-full"
            >
              <caption className="sr-only" id="users-table-desc">
                Table showing users with their details.
              </caption>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        scope="col"
                        aria-sort={
                          header.column.getIsSorted()
                            ? header.column.getIsSorted() === "asc"
                              ? "ascending"
                              : "descending"
                            : undefined
                        }
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
                  // Show loading skeletons for all rows
                  Array.from({ length: pagination.pageSize }).map(
                    (_, index) => (
                      <TableRow key={`loading-${index}`}>
                        {collumns.map((column, cellIndex) => (
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
                ) : error ? (
                  <TableRow>
                    <TableCell
                      colSpan={collumns.length}
                      className="h-24 text-center text-red-500"
                      role="status"
                    >
                      Error loading users: {error.message}
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="transition-colors duration-150"
                      role="row"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          role="cell"
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
                      colSpan={collumns.length}
                      className="h-24 text-center"
                      role="status"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {data?.items && data.items.length > 0 && (
            <div className="flex justify-between items-center">
              <div aria-live="polite" className="w-full">
                <DataTablePagination
                  table={table}
                  totalRowsOverride={data?.total}
                  showRowsPerPage={false}
                  showPageCount={false}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
