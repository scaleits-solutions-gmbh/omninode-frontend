import { ColumnDef } from "@tanstack/react-table";
import { FeJob } from "@/types/acmp/job";
import { Zap } from "lucide-react";

export const createColumns = (): ColumnDef<FeJob>[] => {
  return [
    {
      size: 30,
      minSize: 100,
      header: "Job Name",
      accessorKey: "jobName",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <div className="size-8 bg-muted rounded-md flex items-center justify-center">
              <Zap className="size-4" />
            </div>
            <div>{row.original.jobName}</div>
          </div>
        );
      },
    },
    {
      size: 30,
      minSize: 100,
      header: "Kind",
      accessorKey: "kind",
    },
    {
      size: 20,
      minSize: 100,
      header: "Origin",
      accessorKey: "origin",
    },
    {
      size: 20,
      minSize: 100,
      header: "Date Time",
      accessorKey: "dateTime",
    },
    /*
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
              onClick={() => onViewDetails(row.original)}
            >
              <Eye />
            </Button>
          </div>
        );
      },
    },*/
  ];
};
