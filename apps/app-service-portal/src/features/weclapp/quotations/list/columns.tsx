

import { ColumnDef } from "@tanstack/react-table";
import { Eye, FileText } from "lucide-react";
import type { WeclappQuotationListItemReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import {
  Badge,
  Button
} from "@repo/pkg-frontend-common-kit/components";

export interface ColumnProps {
  onViewDetails: (quotation: WeclappQuotationListItemReadModel) => void;
}

export const createColumns = (props: ColumnProps): ColumnDef<WeclappQuotationListItemReadModel>[] => {
  return [
    {
      size: 20,
      minSize: 100,
      header: "Number",
      accessorKey: "number",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <div className="size-8 bg-muted rounded-md flex items-center justify-center">
              <FileText className="size-4" />
            </div>
            <div >{row.original.number}</div>
          </div>
        );
      },
    },
    {
      size: 30,
      minSize: 150,
      header: "Customer",
      accessorKey: "customer",
    },
    {
      size: 20,
      minSize: 100,
      header: "Gross Amount",
      accessorKey: "grossAmount",
    },
    {
      size: 20,
      minSize: 100,
      header: "Net Amount",
      accessorKey: "netAmount",
    },
    {
      size: 15,
      minSize: 100,
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;
        return <Badge variant="outline">{status}</Badge>;
      },
    },
    {
      size: 5,
      minSize: 60,
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
