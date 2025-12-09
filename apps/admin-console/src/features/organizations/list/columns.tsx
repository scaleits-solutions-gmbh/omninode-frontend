import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage, Button, Badge } from "@repo/pkg-frontend-common-kit/components";
import {
  OrganizationListItemReadModel,
  organizationStatusLabel,
  OrganizationStatus,
  Locale,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export interface ColumnProps {
  onViewDetails: (organization: OrganizationListItemReadModel) => void;
}

export const createColumns = (props: ColumnProps): ColumnDef<OrganizationListItemReadModel>[] => {
  return [
    {
      size: 30,
      minSize: 150,
      header: "Organization",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={""} />
              <AvatarFallback seed={row.original.id}>{row.original.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {row.original.name}
          </div>
        );
      },
    },
    {
      size: 25,
      minSize: 100,
      header: "Email",
      accessorKey: "email",
    },
    {
      size: 20,
      minSize: 120,
      header: "Industry",
      accessorKey: "industry",
    },
    {
      size: 20,
      minSize: 100,
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const statusLabel = organizationStatusLabel(status, Locale.En);
        return (
          <Badge variant={status === OrganizationStatus.Active ? "success" : "secondary"}>
            {statusLabel}
          </Badge>
        );
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

