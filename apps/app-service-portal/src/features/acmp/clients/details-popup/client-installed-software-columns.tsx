import { ColumnDef } from "@tanstack/react-table";
import type { AcmpClientInstalledSoftwareListItem } from "@repo/lib-api-client";

export const installedSoftwareColumns: ColumnDef<AcmpClientInstalledSoftwareListItem>[] = [
  {
    size: 35,
    minSize: 200,
    header: "Name",
    accessorKey: "name",
  },
  {
    size: 20,
    minSize: 120,
    header: "Version",
    accessorKey: "version",
  },
  {
    size: 25,
    minSize: 180,
    header: "Publisher",
    accessorKey: "publisher",
  },
  {
    size: 20,
    minSize: 140,
    header: "Installed",
    accessorKey: "installDate",
    cell: ({ row }) => {
      const value = row.original.installDate;
      return <>{value ? new Date(value).toLocaleDateString() : "—"}</>;
    },
  },
];
