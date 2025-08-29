import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Handshake } from "lucide-react";
import { FeContract } from "@/types/weclapp/contract";


export interface ColumnProps {
  onViewDetails: (quotation: FeContract) => void;
}
/*
Cols
number
customer
startDate
endDate
latestCancellationWarningQuantity + " " + latestCancellationWarningUnit
status
actions
*/

export const createColumns = ({onViewDetails}: ColumnProps): ColumnDef<FeContract>[] => {
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
            <Handshake className="size-4" />
          </div>
          <div>{row.original.number}</div>
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
    header: "Start Date",
    accessorKey: "startDate",
  },
  {
    size: 20,
    minSize: 100,
    header: "End Date",
    accessorKey: "endDate",
  },
  {
    size: 25,
    minSize: 120,
    header: "Min Warning",
    cell: ({ row }) => {
      const quantity = row.original.latestCancellationWarningQuantity;
      const unit = row.original.latestCancellationWarningUnit;
      return quantity && unit ? `${quantity} ${unit}` : "-";
    },
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
          <Button variant="secondary" size="icon" className="cursor-pointer" onClick={() => onViewDetails(row.original)}>
            <Eye />
          </Button>
        </div>
      );
    },
  },
  ];
};