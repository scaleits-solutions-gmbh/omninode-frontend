import GrantUserAccessPopup from "./grant-user-access-popup";
import { columns } from "./users-with-access-columns";
import LoadingUsersWithAccess from "../loading/loading-users-with-access";
import { fetchServiceInstanceUsersWithAccess } from "@/lib/api-client/service-instances";
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
  Alert,
  AlertDescription,
  AlertTitle,
  Tabs,
  TabsList,
  TabsTrigger,
  SearchInput,
  DataTablePagination,
} from "@repo/pkg-frontend-common-kit/components";
import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { AlertCircle, Lock } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function UsersWithAccess() {
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["service-instance-users-with-access", id],
    queryFn: () => fetchServiceInstanceUsersWithAccess(id as string),
  });

  const table = useReactTable({
    data: data?.items || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
      globalFilter: search,
    },
    onGlobalFilterChange: setSearch,
  });

  if (isLoading) {
    return <LoadingUsersWithAccess />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Users and groups with access</h2>
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <Tabs defaultValue="users">
            <TabsList>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="groups" disabled>
                {" "}
                <div className="flex items-center gap-2">
                  <Lock /> Groups
                </div>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <GrantUserAccessPopup />
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
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
                {error ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                          Failed to load users with access. Please try again
                          later.
                        </AlertDescription>
                      </Alert>
                    </TableCell>
                  </TableRow>
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
                      No users with access found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4">
            <DataTablePagination table={table} showRowsPerPage={false} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
