import { AcmpClientListItem } from "@repo/lib-api-client";
import { Button } from "@repo/pkg-frontend-common-kit/components";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Monitor } from "lucide-react";

export interface ColumnProps {
  onViewDetails: (client: AcmpClientListItem) => void;
}

export const createColumns = (props: ColumnProps): ColumnDef<AcmpClientListItem>[] => {
  return [
    {
      size: 30,
      minSize: 100,
      header: "Computer Name",
      accessorKey: "name",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <div className="size-8 bg-muted rounded-md flex items-center justify-center">
              <Monitor className="size-4" />
            </div>
            <div>{row.original.name}</div>
          </div>
        );
      },
    },
    {
      size: 35,
      minSize: 100,
      header: "Tenant",
      accessorKey: "tenantName",
      cell: ({ row }) => {
        return <div>{row.original.tenantName}</div>;
      },
    },
    {
      size: 30,
      minSize: 100,
      header: "Last Update",
      accessorKey: "lastUpdate",
      cell: ({ row }) => {
        return <div>{row.original.lastUpdate ? new Date(row.original.lastUpdate).toLocaleString() : "Never"}</div>;
      },
    },
    {
      size: 5,
      minSize: 50,
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <Button
              variant="secondary"
              size="icon"
              className="cursor-pointer"
              onClick={() => props.onViewDetails(row.original)}
            >
              <Eye />
            </Button>
          </div>
        );
      },
    },
  ];
};
