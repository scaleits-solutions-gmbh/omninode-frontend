import { formatStorageSize } from "@repo/pkg-frontend-common-kit/utils";
import type { AcmpClientHardDriveListItemReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { ColumnDef } from "@tanstack/react-table";

export const clientHardwareColumns: ColumnDef<AcmpClientHardDriveListItemReadModel>[] = [
  {
    size: 45,
    minSize: 240,
    header: "Model",
    accessorKey: "model",
  },
  {
    size: 20,
    minSize: 140,
    header: "Media Type",
    accessorKey: "mediaType",
  },
  {
    size: 35,
    minSize: 180,
    header: "Size",
    accessorKey: "size",
    cell: ({ row }) => {
      return <>{formatStorageSize(row.original.size, 2, 'kb')}</>;
    },
  },
];
