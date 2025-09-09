import { ColumnDef } from "@tanstack/react-table";
import { Eye, HardDrive } from "lucide-react";
import { AssetListItem } from "./types";
import { Button } from "@repo/pkg-frontend-common-kit/components";

export const createColumns = (): ColumnDef<AssetListItem>[] => [
  {
    size: 30,
    minSize: 100,
    header: "Asset Name",
    accessorKey: "name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <div className="size-8 bg-muted rounded-md flex items-center justify-center">
            <HardDrive className="size-4" />
          </div>
          <div>{row.original.name}</div>
        </div>
      );
    },
  },
  {
    size: 20,
    minSize: 80,
    header: "Type",
    accessorKey: "type",
  },
  {
    size: 35,
    minSize: 100,
    header: "Tenant",
    accessorKey: "tenantName",
  },
  {
    size: 30,
    minSize: 100,
    header: "Last Update",
    accessorKey: "lastUpdate",
    cell: ({ row }) => {
      const value = row.original.lastUpdate
        ? new Date(row.original.lastUpdate).toLocaleString()
        : "Never";
      return <div>{value}</div>;
    },
  },
  {
    size: 5,
    minSize: 50,
    id: "actions",
    cell: () => {
      return (
        <div className="flex justify-end">
          <Button variant="secondary" size="icon" className="cursor-default">
            <Eye />
          </Button>
        </div>
      );
    },
  },
];


