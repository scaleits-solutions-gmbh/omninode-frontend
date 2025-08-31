import { ColumnDef } from "@tanstack/react-table";
import { FeProject } from "@/types/weclapp/project";

import { EyeIcon, FolderOpen } from "lucide-react";
import {
  Badge,
  Button
} from "../../../../../../../packages/frontend-common-kit/dist/components";


export interface ColumnProps {
    onViewDetails: (project: FeProject) => void;
}

export const createColumns = (props: ColumnProps): ColumnDef<FeProject>[] => {
    return [
    {
        size: 15,
        minSize: 100,
        header: "Number",
        accessorKey: "number",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <div className="size-8 bg-muted rounded-md flex items-center justify-center">
                        <FolderOpen className="size-4" />
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
        size: 20,
        minSize: 100,
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
            return <Badge variant="outline">{row.original.status}</Badge>;
        }
    },
    {
        size: 5,
        minSize: 60,
        id: "actions",
        cell: ({ row }) => {
            return <div className="flex justify-end">
                <Button variant="secondary" size="icon" onClick={() => props.onViewDetails(row.original)}>
                    <EyeIcon  />
                </Button>
            </div>;
        },
    }
    ];
};
