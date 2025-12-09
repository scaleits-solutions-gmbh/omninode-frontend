"use client";

// Import to register module augmentation FIRST
import "@/lib/next-auth-options";

import {
  Card,
  CardContent,
  CardHeader,
  DataTablePagination,
  DataTableViewOptions,
  SearchInput,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/pkg-frontend-common-kit/components";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { createColumns } from "./columns";

import { useState } from "react";

import { getColumnStyle } from "@/lib/utils/ui/table-utils";

import { getOrganizationClient } from "@repo/pkg-frontend-common-kit/utils";
import { useAuthedQuery } from "@repo/pkg-frontend-common-kit/hooks";
import { ComposedOrganizationMembershipReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { useParams } from "next/navigation";
import ChangeRolePopup from "./change-role-popup";
import RemoveUserPopup from "./remove-user-popup";
import TransferOwnershipPopup from "./transfer-ownership-popup";
import { UserDetailsPopup } from "./user-details-popup";

export const UsersList = () => {
  const { organizationId } = useParams();
  const [selectedUser, setSelectedUser] = useState<
    ComposedOrganizationMembershipReadModel | undefined
  >(undefined);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showChangeRole, setShowChangeRole] = useState(false);
  const [showTransferOwnership, setShowTransferOwnership] = useState(false);
  const [showRemoveUser, setShowRemoveUser] = useState(false);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, error } = useAuthedQuery({
    queryKey: [
      "organizationUsers",
      organizationId,
      search,
      pagination.pageIndex,
      pagination.pageSize,
    ],
    queryFn: async ({ session }) => {
      const response = await getOrganizationClient(session).findComposedOrganizationMemberships({
        pathParams: { id: organizationId as string },
        queryParams: {
          pageSize: pagination.pageSize,
          page: pagination.pageIndex + 1,
          searchTerm: search,
        },
      });
      return response.data;
    },
  });

  const table = useReactTable({
    data: data?.data || [],
    columns: createColumns({
      onViewDetails: (user: ComposedOrganizationMembershipReadModel) => {
        setSelectedUser(user);
        setShowUserDetails(true);
      },
      onRemoveUser: (user: ComposedOrganizationMembershipReadModel) => {
        setSelectedUser(user);
        setShowRemoveUser(true);
      },
      onTransferOwnership: (user: ComposedOrganizationMembershipReadModel) => {
        setSelectedUser(user);
        setShowTransferOwnership(true);
      },
      onChangeRole: (user: ComposedOrganizationMembershipReadModel) => {
        setSelectedUser(user);
        setShowChangeRole(true);
      },
    }),
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

  if (error) return <div>Error: {error.message}</div>;

  if (!isLoading && !data) return <div>No data</div>;

  return (
    <>
      <UserDetailsPopup
        user={showUserDetails ? selectedUser : undefined}
        onClose={() => {
          setShowUserDetails(false);
          setSelectedUser(undefined);
        }}
      />
      {selectedUser && (
        <>
          <ChangeRolePopup
            show={showChangeRole}
            user={selectedUser}
            onClose={() => {
              setShowChangeRole(false);
              setSelectedUser(undefined);
            }}
          />
          <TransferOwnershipPopup
            show={showTransferOwnership}
            user={selectedUser}
            onClose={() => {
              setShowTransferOwnership(false);
              setSelectedUser(undefined);
            }}
          />
          <RemoveUserPopup
            show={showRemoveUser}
            user={selectedUser}
            onClose={() => {
              setShowRemoveUser(false);
              setSelectedUser(undefined);
            }}
          />
        </>
      )}
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
                          <div className="flex items-center gap-2">
                            <Skeleton className="size-8 rounded-full" />
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
                        className="hover:bg-accent/50 cursor-pointer"
                        data-state={row.getIsSelected() && "selected"}
                        onClick={() => {
                          setSelectedUser(row.original);
                          setShowUserDetails(true);
                        }}
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
            totalRowsOverride={data?.total}
          />
        </CardContent>
      </Card>
    </>
  );
};
