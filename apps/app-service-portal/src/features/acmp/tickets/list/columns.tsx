import { ColumnDef } from "@tanstack/react-table";
import { Eye, Ticket } from "lucide-react";
import { FeTicket } from "@/types/weclapp/ticket";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Badge, Button } from "@repo/pkg-frontend-common-kit/components";

function ActionsColumn({
  row,
  router,
  pathname,
}: {
  row: FeTicket;
  router: AppRouterInstance;
  pathname: string;
}) {
  return (
    <div className="flex justify-end">
      <Button
        variant="secondary"
        size="icon"
        className="cursor-pointer"
        onClick={() => router.push(`${pathname}/${row.id}`)}
      >
        <Eye />
      </Button>
    </div>
  );
}

export const createColumns = (
  router: AppRouterInstance,
  pathname: string
): ColumnDef<FeTicket>[] => [
  {
    size: 20,
    minSize: 100,
    header: "Number",
    accessorKey: "number",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <div className="size-8 bg-muted rounded-md flex items-center justify-center">
            <Ticket className="size-4" />
          </div>
          <div>{row.original.number}</div>
        </div>
      );
    },
  },
  {
    size: 30,
    minSize: 150,
    header: "Customer",
    accessorKey: "customer",
  },
  {
    size: 20,
    minSize: 100,
    header: "Date",
    accessorKey: "date",
  },
  {
    size: 20,
    minSize: 100,
    header: "Finished Date",
    accessorKey: "finishedDate",
  },
  {
    size: 25,
    minSize: 150,
    header: "Author",
    cell: ({ row }) => {
      const firstName = row.original.authorFirstName;
      const lastName = row.original.authorLastName;
      return `${firstName} ${lastName}`;
    },
  },
  {
    size: 15,
    minSize: 100,
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      return <Badge variant="outline">{status}</Badge>;
    },
  },
  {
    size: 5,
    minSize: 60,
    id: "actions",
    cell: (/*{ row }*/) => {
      //return <ActionsColumn row={row.original} router={router} pathname={pathname} />;
      <div className="flex justify-end">
        <Button variant="secondary" size="icon" className="cursor-default">
          <Eye />
        </Button>
      </div>;
    },
  },
];
