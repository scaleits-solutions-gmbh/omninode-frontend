import type { AcmpClientNetworkCardListItemReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { ColumnDef } from "@tanstack/react-table";

const display = (value?: string | number | null) => {
  if (value === null || value === undefined) return "—";
  const str = String(value);
  return str.trim() === "" ? "—" : str;
};

export const clientNetworkColumns: ColumnDef<AcmpClientNetworkCardListItemReadModel>[] = [
  {
    size: 28,
    minSize: 220,
    header: "Name",
    accessorKey: "name",
  },
  {
    size: 14,
    minSize: 120,
    header: "IP",
    accessorKey: "ipAddress",
    cell: ({ row }) => <>{display(row.original.ipAddress)}</>,
  },
  {
    size: 14,
    minSize: 140,
    header: "MAC",
    accessorKey: "mac",
    cell: ({ row }) => <>{display(row.original.macAddress)}</>,
  },
  {
    size: 14,
    minSize: 120,
    header: "DNS",
    accessorKey: "dns",
    cell: ({ row }) => <>{display(row.original.dns)}</>,
  },
  {
    size: 14,
    minSize: 120,
    header: "Gateway",
    accessorKey: "gateway",
    cell: ({ row }) => <>{display(row.original.gateway)}</>,
  },
  {
    size: 14,
    minSize: 140,
    header: "Subnet Mask",
    accessorKey: "subnetMask",
    cell: ({ row }) => <>{display(row.original.subnetMask)}</>,
  },
  {
    size: 12,
    minSize: 110,
    header: "Address Type",
    accessorKey: "addressType",
  },
];

