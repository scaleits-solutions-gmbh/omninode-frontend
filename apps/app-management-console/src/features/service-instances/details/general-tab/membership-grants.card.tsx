"use client";

// Import to register module augmentation FIRST
import "@/lib/next-auth-options";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  DataTablePagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
} from "@repo/pkg-frontend-common-kit/components";
import { getServiceClient } from "@repo/pkg-frontend-common-kit/utils";
import { useAuthedQuery } from "@repo/pkg-frontend-common-kit/hooks";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { getColumnStyle } from "@/lib/utils/ui/table-utils";
import { createMembershipGrantsColumns } from "./membership-grants.columns";
import { ComposedMembershipViewGrantReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import MembershipGrantRevokeAccessPopup from "./membership-grant-revoke-access-popup";
import MembershipGrantChangeAccessPopup from "./membership-grant-change-access-popup";
import MembershipGrantsCardLoading from "./loading/membership-grants-card-loading";
import MembershipGrantAddPopup from "./membership-grant-add-popup";

export default function MembershipGrantsCard() {
  const { organizationServiceInstanceId } = useParams<{
    organizationId: string;
    organizationServiceInstanceId: string;
  }>();

  const [selectedGrant, setSelectedGrant] =
    useState<ComposedMembershipViewGrantReadModel | undefined>(undefined);
  const [showRevokePopup, setShowRevokePopup] = useState(false);
  const [showChangePopup, setShowChangePopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const { data, isLoading, error, refetch } = useAuthedQuery({
    queryKey: [
      "serviceInstanceMembershipGrants",
      organizationServiceInstanceId,
      pagination.pageIndex,
      pagination.pageSize,
    ],
    queryFn: async ({ session }) => {
      const response = await getServiceClient(session).findComposedServiceViewMembershipGrants({
        pathParams: { id: organizationServiceInstanceId },
        queryParams: {
          pageSize: pagination.pageSize,
          page: pagination.pageIndex + 1,
          searchTerm: undefined,
        },
      });
      return response.data;
    },
  });

  const table = useReactTable({
    data: (data?.data as ComposedMembershipViewGrantReadModel[]) || [],
    columns: createMembershipGrantsColumns({
      onChangeAccess: (grant) => {
        setSelectedGrant(grant);
        setShowChangePopup(true);
      },
      onRevokeAccess: (grant) => {
        setSelectedGrant(grant);
        setShowRevokePopup(true);
      },
    }),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    pageCount: data?.totalPages || 0,
  });

  const allColumns = table.getAllColumns();
  const loadingCols = {
    col1: {
      width: (allColumns[0].columnDef.size as number),
      minWidth: (allColumns[0].columnDef.minSize as number),
    },
    col2: {
      width: (allColumns[1].columnDef.size as number),
      minWidth: (allColumns[1].columnDef.minSize as number),
    },
    col3: {
      width: (allColumns[2].columnDef.size as number),
      minWidth: (allColumns[2].columnDef.minSize as number),
    },
  };

  if (error) return <div>Error: {error.message}</div>;
  if (!isLoading && !data) return <div>No data</div>;

  if (isLoading) {
    return (
      <MembershipGrantsCardLoading
        rows={pagination.pageSize}
        cols={loadingCols}
      />
    );
  }

  return (
    <>
      {selectedGrant && (
        <>
          <MembershipGrantRevokeAccessPopup
            show={showRevokePopup}
            grant={selectedGrant}
            onClose={() => {
              setShowRevokePopup(false);
              setSelectedGrant(undefined);
            }}
          />
          <MembershipGrantChangeAccessPopup
            show={showChangePopup}
            grant={selectedGrant}
            onClose={() => {
              setShowChangePopup(false);
              setSelectedGrant(undefined);
            }}
          />
        </>
      )}
      <MembershipGrantAddPopup
        show={showAddPopup}
        onClose={() => setShowAddPopup(false)}
        onGranted={() => {
          setShowAddPopup(false);
          // Refresh grants list after successful grant
          void refetch();
        }}
      />
    <Card>
      <CardHeader className="flex gap-2 justify-between">
          <div className="flex flex-col gap-1">
        <CardTitle>Membership Grants</CardTitle>
            <p className="text-xs text-muted-foreground">
              Users who have access to this service instance through memberships.
            </p>
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={() => setShowAddPopup(true)}
          >
            Add Grant
          </Button>
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
                      No membership grants.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
        </div>
        <DataTablePagination
          table={table}
          isLoading={isLoading}
          showPageCount={false}
          showRowsPerPage={false}
          totalRowsOverride={data?.total}
        />
      </CardContent>
    </Card>
    </>
  );
}
