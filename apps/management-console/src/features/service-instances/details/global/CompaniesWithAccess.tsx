import { Card, CardHeader, CardContent } from "@/components/ui/card";
import SearchInput from "@/components/input/searchInput";
import { fetchServiceInstanceCompaniesWithAccess } from "@/lib/apiClient/serviceInstances";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { createColumns } from "./CompaniesWithAccessCollumns";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { DataTablePagination } from "@/components/display/pagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { getColumnStyle } from "@/lib/utils/ui/tableUtils";
import LoadingCompaniesWithAccess from "../loading/LoadingCompaniesWithAccess";

interface CompaniesWithAccessProps {
  onCompanyAccessChange: (companyIndex: number) => void;
  GrantCompanyAccess: React.ReactNode;
}

export default function CompaniesWithAccess({ onCompanyAccessChange, GrantCompanyAccess }: CompaniesWithAccessProps) {
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["service-instance-companies-with-access", id],
    queryFn: () => fetchServiceInstanceCompaniesWithAccess(id as string),
  });

  const columns = createColumns(onCompanyAccessChange);

  const table = useReactTable({
    data: data?.items || [],
    columns: columns,
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
    return <LoadingCompaniesWithAccess />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Companies with access</h2>
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
          {GrantCompanyAccess}
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
                              header.getContext()
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
                          Failed to load companies with access. Please try again later.
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
                            cell.getContext()
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
                      No companies with access found.
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