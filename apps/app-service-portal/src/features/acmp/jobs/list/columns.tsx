import { ColumnDef } from "@tanstack/react-table";
import { AcmpJobListItem } from "@repo/lib-api-client";
import { Eye, Zap } from "lucide-react";
import { Button } from "@repo/pkg-frontend-common-kit/components";
import { formatDateTimeDe } from "@/lib/utils/ui/date-format";

export interface ColumnProps {
  onViewDetails: (job: AcmpJobListItem) => void;
}

export const createColumns = (props: ColumnProps): ColumnDef<AcmpJobListItem>[] => {
  return [
    {
      size: 30,
      minSize: 100,
      header: "Job Name",
      accessorKey: "name",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <div className="size-8 bg-muted rounded-md flex items-center justify-center">
              <Zap className="size-4" />
            </div>
            <div>{row.original.name}</div>
          </div>
        );
      },
    },
    {
      size: 30,
      minSize: 100,
      header: "Kind",
      accessorKey: "type",
      cell: ({ row }) => {
        return <>{row.original.type}</>;
      },
    },
    {
      size: 20,
      minSize: 100,
      header: "Author",
      accessorKey: "author",
      cell: ({ row }) => {
        return <>{row.original.author}</>;
      },
    },
    {
      size: 20,
      minSize: 100,
      header: "Date Time",
      accessorKey: "dateTime",
      cell: ({ row }) => {
        return <>{formatDateTimeDe(row.original.dateTime, "N/A")}</>;
      },
    },
    {
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
