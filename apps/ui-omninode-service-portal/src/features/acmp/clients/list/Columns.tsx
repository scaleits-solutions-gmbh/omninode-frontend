import { ColumnDef } from "@tanstack/react-table";
import { FeClient } from "@/types/acmp/client";
import { Monitor } from "lucide-react";

export const createColumns = (): ColumnDef<FeClient>[] => {
  return [
    {
      size: 30,
      minSize: 100,
      header: "Computer Name",
      accessorKey: "computerName",
      cell: ({ row }) => {
        return (
            <div className="flex items-center gap-2">
                <div className="size-8 bg-muted rounded-md flex items-center justify-center">
                    <Monitor className="size-4" />
                </div>
                <div>{row.original.computerName}</div>
            </div>
        );
    },
    },
    {
      size: 20,
      minSize: 100,
      header: "Client No",
      accessorKey: "clientNo",
    },
    {
      size: 30,
      minSize: 100,
      header: "Tenant",
      accessorKey: "name",
    },
    {
      size: 20,
      minSize: 100,
      header: "Last Update",
      accessorKey: "lastUpdate",
    },
    /*{
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
              onClick={() => onViewDetails(row.original)}
            >
              <Eye />
            </Button>
          </div>
        );
      },
    },*/
  ];
};
