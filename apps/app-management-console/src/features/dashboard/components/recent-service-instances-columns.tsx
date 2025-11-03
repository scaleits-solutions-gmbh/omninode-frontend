"use client";

import { Badge } from "@repo/pkg-frontend-common-kit/components";
import { ColumnDef } from "@tanstack/react-table";

export interface RecentServiceInstance {
  id: string;
  instanceName: string;
  type: string;
  status: "Connected" | "Pending" | "Error" | string;
}

export const recentServiceInstancesColumns: ColumnDef<RecentServiceInstance>[] = [
  {
    accessorKey: "instanceName",
    header: "Name",
    size: 50,
    minSize: 220,
    cell: ({ getValue }) => <span className="font-medium">{getValue() as string}</span>,
  },
  {
    accessorKey: "type",
    header: "Type",
    size: 25,
    minSize: 140,
    cell: ({ getValue }) => <Badge variant="outline">{getValue() as string}</Badge>,
  },
  {
    id: "status",
    header: () => <div className="text-right">Status</div>,
    size: 25,
    minSize: 140,
    cell: ({ row }) => (
      <div className="text-right">
        <Badge variant="secondary">
          <span
            className={`mr-1 inline-block h-2 w-2 rounded-full ${
              row.original.status === "Connected"
                ? "bg-emerald-500"
                : row.original.status === "Pending"
                ? "bg-amber-500"
                : "bg-red-500"
            }`}
          />
          {row.original.status}
        </Badge>
      </div>
    ),
  },
];


