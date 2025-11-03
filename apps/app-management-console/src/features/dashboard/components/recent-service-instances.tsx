"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Button,
  Skeleton,
  DataTablePagination,
} from "@repo/pkg-frontend-common-kit/components";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { RecentServiceInstance, recentServiceInstancesColumns } from "./recent-service-instances-columns";
import { getColumnStyle } from "@/lib/utils/ui/table-utils";
import { useOrganizationId } from "@/hooks/use-organization-id";

export default function RecentServiceInstances() {
  const organizationId = useOrganizationId();
  const [data, setData] = useState<RecentServiceInstance[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pagination] = useState({ pageIndex: 0, pageSize: 5 });

  useEffect(() => {
    // Mock fetch: hydrate with current data after a short delay
    const mock: RecentServiceInstance[] = [
      { id: "si_1", instanceName: "Weclapp - HQ", type: "Weclapp", status: "Connected" },
      { id: "si_2", instanceName: "ACMP - EU", type: "ACMP", status: "Connected" },
      { id: "si_3", instanceName: "Salesforce - Sandbox", type: "Salesforce", status: "Pending" },
      { id: "si_4", instanceName: "SAP - Prod", type: "SAP", status: "Error" },
    ];
    const t = setTimeout(() => {
      setData(mock);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  const table = useReactTable({
    data,
    columns: recentServiceInstancesColumns as ColumnDef<RecentServiceInstance, unknown>[],
    getCoreRowModel: getCoreRowModel(),
    state: { pagination },
    manualPagination: true,
    pageCount: 1,
  });

  return (
    <Card className="gap-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base">Recent Service Instances (mock data)</CardTitle>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/${organizationId}/service-instances`}>View all</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border rounded-md">
          {isLoading ? (
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
                {Array.from({ length: pagination.pageSize }).map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    {table.getAllColumns().map((col, idx) => (
                      <TableCell key={`skeleton-cell-${idx}`} style={getColumnStyle(col.columnDef)}>
                        <Skeleton className="h-4" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
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
                    <TableRow key={row.id} className="hover:bg-accent/50" data-state={row.getIsSelected() && "selected"}>
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
                    <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      <DataTablePagination table={table} isLoading={isLoading} showPageCount={false} showRowsPerPage={false} totalRowsOverride={data.length} />
      </CardContent>
    </Card>
  );
}


