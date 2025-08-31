import { createColumns } from "./grant-user-access-popup-columns";
import { fetchServiceInstanceUsersWithoutAccess } from "@/lib/api-client/service-instances";
import { getColumnStyle } from "@/lib/utils/ui/table-utils";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  Table,
  TableBody,
  TableRow,
  SearchInput,
  DataTablePagination,
  TableCell,
  Checkbox,
} from "frontend-common-kit";
import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Loader2, Search } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useMemo } from "react";

export default function GrantUserAccessPopup() {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  // Pagination state for search results
  const [searchPagination, setSearchPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const { data: usersWithoutAccess, isLoading } = useQuery({
    queryKey: ["service-instance-users-without-access", id],
    queryFn: () => fetchServiceInstanceUsersWithoutAccess(id as string),
  });

  // Filter users by search
  const filteredUsers = useMemo(() => {
    if (!usersWithoutAccess?.items) return [];
    return usersWithoutAccess.items.filter(
      (user) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [usersWithoutAccess, search]);

  // Table for search results
  const searchTable = useReactTable({
    data: filteredUsers,
    columns: createColumns(),
    getCoreRowModel: getCoreRowModel(),
    state: { pagination: searchPagination },
    onPaginationChange: setSearchPagination,
    manualPagination: false,
    pageCount: Math.ceil(filteredUsers.length / searchPagination.pageSize),
  });

  const handleGrantAccess = () => {
    // TODO: Implement grant access logic for selectedUserIds
    setIsOpen(false);
    resetPopup();
  };
  const resetPopup = () => {
    setSearch("");
    setSelectedUserIds([]);
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          resetPopup();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>Grant user access</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="space-y-4 pb-4 border-b">
          <DialogTitle>Grant user access</DialogTitle>
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <div className="font-medium text-base">Search result</div>
            {isLoading ? (
              <div className="flex justify-center items-center h-16">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="flex flex-col items-center py-6 text-muted-foreground">
                <Search className="w-8 h-8 mb-2" />
                <span>No users found</span>
              </div>
            ) : (
              <Table>
                <TableBody>
                  {searchTable.getRowModel().rows.map((row) => {
                    const user = row.original;
                    const checked = selectedUserIds.includes(user.id);
                    return (
                      <TableRow
                        key={row.id}
                        className="hover:bg-muted/30 border-b-0"
                      >
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
                        <TableCell className="w-8">
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(value) => {
                              setSelectedUserIds((prev) =>
                                value
                                  ? [...prev, user.id]
                                  : prev.filter((id) => id !== user.id),
                              );
                            }}
                            aria-label={
                              checked ? "Deselect user" : "Select user"
                            }
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
            {filteredUsers.length > 0 && (
              <div className="mt-2">
                <DataTablePagination
                  table={searchTable}
                  showRowsPerPage={false}
                  showPageCount={false}
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-end">
            <span className="text-sm text-muted-foreground">
              {selectedUserIds.length} user
              {selectedUserIds.length !== 1 ? "s" : ""} selected
            </span>
          </div>
        </div>
        <DialogFooter className="border-t space-y-0 pt-4">
          <Button
            variant="outline"
            onClick={() => {
              setIsOpen(false);
              resetPopup();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleGrantAccess}
            disabled={selectedUserIds.length === 0}
          >
            Grant access
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
