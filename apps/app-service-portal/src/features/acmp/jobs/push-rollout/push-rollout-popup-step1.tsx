"use client";

import { columns } from "./push-rollout-popup-step1-columns";
import { useState } from "react";
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
} from "@repo/pkg-frontend-common-kit/components";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { getColumnStyle } from "@/lib/utils/ui/table-utils";
import { useAuthedQuery, useValidSession } from "@repo/pkg-frontend-common-kit/hooks";
import { ApiClient, AcmpRolloutTemplateListItem } from "@repo/lib-api-client";
import { useParams } from "next/navigation";

interface PushRolloutPopupStep1Props {
  initialSelectedRollout: AcmpRolloutTemplateListItem | undefined;
  onNext: (rollout: AcmpRolloutTemplateListItem) => void;
}

export default function PushRolloutPopupStep1({
  initialSelectedRollout,
  onNext,
}: PushRolloutPopupStep1Props) {
  const [selectedRollout, setSelectedRollout] = useState<AcmpRolloutTemplateListItem | undefined>(
    initialSelectedRollout
  );
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { viewId } = useParams();
  const { isValid, isLoading: isSessionLoading } = useValidSession();
  const { data, isLoading: isQueryLoading, error } = useAuthedQuery({
    queryKey: ["rollout-templates", viewId, search, pagination.pageIndex, pagination.pageSize],
    enabled: isValid && Boolean(viewId),
    queryFn: async ({ accessToken }) =>
      ApiClient.getAcmpRolloutTemplates(accessToken, {
        serviceInstanceId: viewId as string,
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        search: search,
      }),
  });

  const isLoading = isSessionLoading || isQueryLoading;

  const table = useReactTable({
    data: data?.data || [],
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
      selectedRollout,
      onSelectionChange: setSelectedRollout,
    },
  });

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading)
    return (
      <>
        <Card>
          <CardHeader className="flex justify-between">
            <SearchInput
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPagination((prev) => ({ ...prev, pageIndex: 0 }));
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
                      <TableRow key={`skeleton-${index}`} className="h-10">
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
                            <Skeleton className="h-4 w-4 rounded-sm" />
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </div>
            <DataTablePagination
              table={table}
              isLoading={true}
              showRowsPerPage={false}
              showPageCount={false}
              totalRowsOverride={data?.total}
            />
          </CardContent>
        </Card>
        <div className="flex justify-end">
          <Button
            disabled={!selectedRollout}
            onClick={() => onNext(selectedRollout!)}
          >
            Next
          </Button>
        </div>
      </>
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
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
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
                  table.getRowModel().rows.map((row) => {
                    const isSelected = selectedRollout?.id === row.original.id;
                    return (
                      <TableRow
                        key={row.id}
                        data-state={isSelected ? "selected" : undefined}
                        className={isSelected ? "bg-muted" : undefined}
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
          <DataTablePagination
            table={table}
            showRowsPerPage={false}
            showPageCount={false}
            totalRowsOverride={data?.total}
          />
        </CardContent>
      </Card>
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {selectedRollout && (
            <>
              Selected: <span className="font-medium">{selectedRollout.name}</span>
            </>
          )}
        </div>
        <Button
          disabled={!selectedRollout}
          onClick={() => onNext(selectedRollout!)}
        >
          Next
        </Button>
      </div>
    </>
  );
}
