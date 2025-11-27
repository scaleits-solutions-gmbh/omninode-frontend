"use client";
import {
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { createColumns } from "./columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  SearchInput,
  DataTableViewOptions,
  Card,
  CardHeader,
  CardContent,
  Skeleton,
  DataTablePagination,
} from "@repo/pkg-frontend-common-kit/components";
import { useAuthedQuery, useValidSession } from "@repo/pkg-frontend-common-kit/hooks";
import { useEffect, useState } from "react";
import { JobDetailsPopup } from "../details-popup/job-details-popup";
import { getColumnStyle } from "@/lib/utils/ui/table-utils";
import { useParams } from "next/navigation";
import { getAcmpServiceClient } from "@repo/pkg-frontend-common-kit/utils";
import type { AcmpJobListItemReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
export const JobList = () => {
  const { viewId } = useParams();
  const [job, setJob] = useState<AcmpJobListItemReadModel | undefined>(undefined);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const { isValid, isLoading: isSessionLoading } = useValidSession();

  const { data: jobs, isLoading: isQueryLoading, isFetching: isQueryFetching, error } = useAuthedQuery({
    queryKey: [
      "jobs",
      viewId,
      search,
      pagination.pageIndex,
      pagination.pageSize,
    ],
    enabled: isValid && Boolean(viewId),
    queryFn: async ({ session }) => {
      const response = await getAcmpServiceClient(session).getAcmpJobs({
        pathParams: { viewId: viewId as string },
        queryParams: {
          page: pagination.pageIndex + 1,
          pageSize: pagination.pageSize,
          search: search,
        },
      });
      return response.data;
    },
  });

  const isLoading = isSessionLoading || isQueryLoading;
  const [isFetchingPage, setIsFetchingPage] = useState(false);

  const table = useReactTable({
    data: jobs?.data || [],
    columns: createColumns({ onViewDetails: (selected) => setJob(selected) }),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
      globalFilter: search,
    },
    onPaginationChange: (updater) => {
      setIsFetchingPage(true);
      setPagination(updater);
    },
    onGlobalFilterChange: setSearch,
    manualPagination: true,
    pageCount: jobs?.totalPages || 0,
  });

  useEffect(() => {
    if (isFetchingPage && !isQueryLoading && !isQueryFetching) {
      setIsFetchingPage(false);
    }
  }, [isFetchingPage, isQueryLoading, isQueryFetching]);

  if (error) return <div>Error: {error.message}</div>;

  if (!isLoading && !jobs) return <div>No data</div>;

  return (
    <>
      <JobDetailsPopup
        job={job}
        onClose={() => setJob(undefined)}
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
            {isFetchingPage || isLoading ? (
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
                        {/*<TableCell>
                          <div className="flex justify-end">
                            <Skeleton className="h-8 w-8" />
                          </div>
                        </TableCell>*/}
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
            totalRowsOverride={jobs?.total}
          />
        </CardContent>
      </Card>
    </>
  );
};
