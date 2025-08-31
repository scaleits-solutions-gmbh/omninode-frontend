"use client";
import { Columns } from "./user-service-instances-columns";
import { getColumnStyle } from "@/lib/utils/ui/table-utils";
import { FeServiceInstance } from "@/types/fe/fe-service-instance";
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  SearchInput,
  DataTableViewOptions,
  DataTablePagination,
  TableHeader,
  TableRow,
  Skeleton,
} from "@repo/pkg-frontend-common-kit/components";
import {
  PaginatedResponse,
  Service,
  ServiceInstanceStatus,
} from "@scaleits-solutions-gmbh/services";
import { useQuery } from "@tanstack/react-query";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useParams } from "next/navigation";
import { useState } from "react";

const fetchUserServiceInstances = async (
  search: string,
  pageIndex: number,
  pageSize: number
): Promise<PaginatedResponse<FeServiceInstance>> => {
  return {
    items: [
      {
        id: "1",
        instanceName: "Service Instance 1",
        sourceCompanyId: "1",
        sourceCompanyName: "Company X",
        sourceCompanyEmail: "companyx@company.com",
        service: Service.Weclapp,
        status: ServiceInstanceStatus.Active,
        createdAt: new Date(),
        createdBy: "1",
        updatedAt: new Date(),
        updatedBy: "1",
      },
    ],
    total: 0,
    page: pageIndex,
    pageSize: pageSize,
    totalPages: 0,
  };
};

export default function UserServiceInstances() {
  const { viewId } = useParams();
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "quotations",
      viewId,
      search,
      pagination.pageIndex,
      pagination.pageSize,
    ],
    queryFn: () =>
      fetchUserServiceInstances(
        search,
        pagination.pageIndex + 1,
        pagination.pageSize
      ),
  });

  const table = useReactTable({
    data: data?.items || [],
    columns: Columns,
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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Service Instances</h3>
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
          <DataTablePagination
            table={table}
            isLoading={isLoading}
            showRowsPerPage={false}
            showPageCount={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}
