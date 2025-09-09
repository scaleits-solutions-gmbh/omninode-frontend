import { ColumnDef } from "@tanstack/react-table";
import type { AcmpClientHardDriveListItem } from "@repo/lib-api-client";
import { formatStorageSize } from "@repo/pkg-frontend-common-kit/utils";

const display = (value?: string | number | null) => {
  if (value === null || value === undefined) return "—";
  const str = String(value);
  return str.trim() === "" ? "—" : str;
};

export const clientHardwareColumns: ColumnDef<AcmpClientHardDriveListItem>[] = [
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
