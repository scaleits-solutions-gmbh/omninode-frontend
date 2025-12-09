import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenu,
} from "@repo/pkg-frontend-common-kit/components";
import { OrganizationRelationshipReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export interface ColumnProps {
  currentOrganizationId: string;
  onRemoveRelationship: (relationship: OrganizationRelationshipReadModel) => void;
}

export const createColumns = (props: ColumnProps): ColumnDef<OrganizationRelationshipReadModel>[] => {
  return [
    {
      size: 50,
      minSize: 150,
      header: "Organization",
      cell: ({ row }) => {
        const isCurrentLeft = row.original.leftOrganizationId === props.currentOrganizationId;
        const otherOrganizationName = isCurrentLeft
          ? row.original.rightOrganizationName
          : row.original.leftOrganizationName;
        const otherOrganizationId = isCurrentLeft
          ? row.original.rightOrganizationId
          : row.original.leftOrganizationId;

        return (
          <div className="flex items-center gap-2">
            <Avatar className="rounded-md">
              <AvatarImage src={""} />
              <AvatarFallback seed={otherOrganizationId}>
                {otherOrganizationName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {otherOrganizationName}
          </div>
        );
      },
    },
    {
      accessorKey: "Relationship Since",
      size: 49,
      minSize: 150,
      header: "Relationship Since",
      cell: () => {
        return <div>{new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}</div>;
      },
    },
    {
      size: 1,
      minSize: 60,
      id: "actions",
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
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => props.onRemoveRelationship(row.original)}
                >
                  Remove relationship
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
};
