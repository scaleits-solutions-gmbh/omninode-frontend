import { ColumnDef } from "@tanstack/react-table";
import { Eye, HardDrive } from "lucide-react";
import { Button } from "@repo/pkg-frontend-common-kit/components";
import { formatDateTimeDe } from "@/lib/utils/ui/date-format";
import { AcmpAssetListItem } from "@repo/lib-api-client";

export const createColumns = (): ColumnDef<AcmpAssetListItem>[] => [
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
    cell: ({ row }) => <div>{row.original.type ?? "-"}</div>,
  },
  {
    size: 30,
    minSize: 100,
    header: "Last Update",
    accessorKey: "lastUpdate",
    cell: ({ row }) => {
      const value = formatDateTimeDe(row.original.lastUpdate, "Never");
      return <div>{value}</div>;
    },
  },
  // Hidden by default via columnVisibility in table state
  { header: "Location", accessorKey: "location", minSize: 100 },
  { header: "Cost Center", accessorKey: "costCenter", minSize: 120 },
  { header: "Department", accessorKey: "department", minSize: 120 },
  { header: "Vendor", accessorKey: "vendor", minSize: 100 },
  { header: "Manufacturer", accessorKey: "manufacturer", minSize: 120 },
  { header: "Service Partner", accessorKey: "servicePartner", minSize: 140 },
  { header: "State (EN)", accessorKey: "stateEn", minSize: 120 },
  { header: "State (DE)", accessorKey: "stateDe", minSize: 120 },
  { header: "Inventory #", accessorKey: "inventoryNumber", minSize: 120 },
  { header: "Serial #", accessorKey: "serialNumber", minSize: 120 },
  { header: "Model", accessorKey: "model", minSize: 120 },
  {
    header: "Creation Date",
    accessorKey: "creationDate",
    minSize: 140,
    cell: ({ row }) => {
      const value = formatDateTimeDe(row.original.creationDate, "-");
      return <div>{value}</div>;
    },
  },
  {
    header: "Is Lent",
    accessorKey: "isLent",
    minSize: 80,
    cell: ({ row }) => <div>{row.original.isLent ? "Yes" : "No"}</div>,
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


