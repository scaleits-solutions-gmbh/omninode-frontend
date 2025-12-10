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
import {
  Locale,
  OrganizationRole,
  organizationRoleName,
  ProjectionOrganizationUserListItemReadModel,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, Eye } from "lucide-react";

function getInitials(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  const initials = parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
  return initials || "U";
}

export interface ColumnProps {
  onViewDetails: (user: ProjectionOrganizationUserListItemReadModel) => void;
  onRemoveUser: (user: ProjectionOrganizationUserListItemReadModel) => void;
  onTransferOwnership: (user: ProjectionOrganizationUserListItemReadModel) => void;
  onChangeRole: (user: ProjectionOrganizationUserListItemReadModel) => void;
}

export const createColumns = (
  props: ColumnProps
): ColumnDef<ProjectionOrganizationUserListItemReadModel>[] => {
  return [
    {
      size: 33,
      minSize: 150,
      header: "User",
      cell: ({ row }) => {
        const user = row.original.user;
        const fullName = `${user.firstName} ${user.lastName}`.trim() || "Unknown User";
        return (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage alt={fullName} />
              <AvatarFallback seed={user.id}>{getInitials(fullName)}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{fullName}</span>
          </div>
        );
      },
    },
    {
      size: 40,
      minSize: 100,
      header: "Email",
      accessorKey: "email",
      cell: ({ row }) => {
        return (
          <div className="text-sm text-muted-foreground">
            {row.original.user.email}
          </div>
        );
      },
    },
    {
      accessorKey: "Role",
      size: 26,
      minSize: 150,
      header: "Role",
      cell: ({ row }) => {
        return (
          <Badge
            variant={row.original.role === OrganizationRole.Owner ? "default" : "secondary"}
          >
            {organizationRoleName(row.original.role, Locale.En)}
          </Badge>
        );
      },
    },
    {
      size: 1,
      minSize: 60,
      id: "actions",
      cell: ({ row }) => {
        const currentUserRole = OrganizationRole.Owner;
        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={row.original.role === OrganizationRole.Owner}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => props.onViewDetails(row.original)}>
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => props.onChangeRole(row.original)}>
                Change role
              </DropdownMenuItem>
              {currentUserRole === OrganizationRole.Owner && (
                <DropdownMenuItem onClick={() => props.onTransferOwnership(row.original)}>
                  Transfer ownership
                </DropdownMenuItem>
              )}
                <DropdownMenuItem 
                  className="text-destructive"
                  onClick={() => props.onRemoveUser(row.original)}
                >
                  Remove user
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
};
