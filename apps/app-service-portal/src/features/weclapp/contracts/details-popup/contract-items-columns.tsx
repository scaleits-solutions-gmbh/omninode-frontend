import { ColumnDef } from "@tanstack/react-table";
import type { WeclappContractItemReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

// Extended type to include the calculated total
type ContractItemWithTotal = WeclappContractItemReadModel & {
  total: string;
};

export const contractItemsColumns: ColumnDef<ContractItemWithTotal>[] = [
  {
    size: 40,
    minSize: 100,
    header: "Name",
    accessorKey: "name",
  },
  {
    size: 25,
    minSize: 100,
    header: "Quantity",
    accessorKey: "quantity",
    cell: ({ row }) => {
      return <div>{row.original.quantity}x</div>;
    },
  },
  {
    size: 25,
    minSize: 100,
    header: "Unit Price",
    accessorKey: "unitPrice",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return <div>${value}</div>;
    },
  },
  {
    header: () => {
      return <div className="text-right">Total</div>;
    },
    accessorKey: "total",
    size: 10,
    minSize: 100,
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return <div className="font-medium text-right">{value}€</div>;
    },
  },
];