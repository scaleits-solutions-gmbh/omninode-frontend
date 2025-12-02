import type { AcmpClientInstalledSoftwareListItemReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { ColumnDef } from "@tanstack/react-table";
import { formatDateDe } from "@/lib/utils/ui/date-format";

export const installedSoftwareColumns: ColumnDef<AcmpClientInstalledSoftwareListItemReadModel>[] = [
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
    cell: ({ row }) => formatDateDe(row.original.installDate, "—"),
  },
];

