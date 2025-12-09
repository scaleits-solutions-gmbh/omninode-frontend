import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/pkg-frontend-common-kit/components";
import { ColumnDef } from "@tanstack/react-table";
import { ComposedRelationshipViewGrantReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { MoreVertical } from "lucide-react";

export interface OrganizationRelationshipGrantsColumnProps {
  onChangeAccess: (grant: ComposedRelationshipViewGrantReadModel) => void;
  onRevokeAccess: (grant: ComposedRelationshipViewGrantReadModel) => void;
}

export const createOrganizationRelationshipGrantsColumns = (
  props: OrganizationRelationshipGrantsColumnProps
): ColumnDef<ComposedRelationshipViewGrantReadModel>[] => [
    {
      header: "Organization",
      minSize: 200,
      size: 50,
      cell: ({ row }) => {
        const organization = row.original.organization;

        return (
          <div className="flex items-center gap-2">
            <Avatar className="rounded-md">
              <AvatarImage alt={organization.name} />
              <AvatarFallback seed={organization.id}>
                {organization.name?.charAt(0) ?? "O"}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{organization.name}</span>
          </div>
        );
      },
    },
    {
      header: "View",
      minSize: 200,
      size: 49,
      cell: ({ row }) => {
        const view = row.original.view;
        return (
          <Badge variant="outline" className="font-normal">
            {view.name}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      minSize: 60,
      size: 1,
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => props.onChangeAccess(row.original)}>
                  Change access
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => props.onRevokeAccess(row.original)}
                >
                  Revoke access
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

