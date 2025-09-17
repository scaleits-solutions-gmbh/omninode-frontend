import { ColumnDef } from "@tanstack/react-table";
import { Eye, Ticket } from "lucide-react";
import { Badge, Button } from "@repo/pkg-frontend-common-kit/components";
import { AcmpTicketListItem } from "@repo/lib-api-client";

function ActionsColumn() {
  return (
    <div className="flex justify-end">
      <Button
        variant="secondary"
        size="icon"
        className="cursor-pointer"
      >
        <Eye />
      </Button>
    </div>
  );
}

export const createColumns = (): ColumnDef<AcmpTicketListItem>[] => [
  {
    size: 20,
    minSize: 100,
    header: "Ticket #",
    accessorKey: "intId",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <div className="size-8 bg-muted rounded-md flex items-center justify-center">
            <Ticket className="size-4" />
          </div>
          <div>{row.original.intId}</div>
        </div>
      );
    },
  },
  {
    size: 35,
    minSize: 150,
    header: "Caption",
    accessorKey: "caption",
  },
  {
    size: 20,
    minSize: 120,
    header: "Created",
    accessorKey: "creationDate",
    cell: ({ row }) => new Date(row.original.creationDate).toLocaleString(),
  },
  {
    size: 20,
    minSize: 120,
    header: "Last Modified",
    accessorKey: "lastModified",
    cell: ({ row }) => new Date(row.original.lastModified).toLocaleString(),
  },
  {
    size: 20,
    minSize: 120,
    header: "Priority",
    accessorKey: "priority",
  },
  {
    size: 15,
    minSize: 120,
    header: "State (EN)",
    accessorKey: "stateEn",
    cell: ({ row }) => <Badge variant="outline">{row.original.stateEn ?? "-"}</Badge>,
  },
  {
    size: 15,
    minSize: 120,
    header: "State (DE)",
    accessorKey: "stateDe",
    cell: ({ row }) => <Badge variant="outline">{row.original.stateDe ?? "-"}</Badge>,
  },
  // Hidden by default; togglable
  { header: "Category (EN)", accessorKey: "categoryEn", minSize: 140 },
  { header: "Category (DE)", accessorKey: "categoryDe", minSize: 140 },
  { header: "Contact", accessorKey: "ticketContact", minSize: 140 },
  { header: "Assignee", accessorKey: "assignee", minSize: 140 },
  { header: "Impact (EN)", accessorKey: "impactEn", minSize: 140 },
  { header: "Impact (DE)", accessorKey: "impactDe", minSize: 140 },
  {
    size: 5,
    minSize: 60,
    id: "actions",
    cell: () => {
      return <ActionsColumn />;
    },
  },
];
