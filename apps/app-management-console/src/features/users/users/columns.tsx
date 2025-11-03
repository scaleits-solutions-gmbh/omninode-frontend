import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreVertical } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Badge,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenu,
} from "@repo/pkg-frontend-common-kit/components";
import {
  Locale,
  OrganizationMembershipReadModel,
  OrganizationRole,
  organizationRoleName,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

function getInitials(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  const initials = parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
  return initials || "U";
}

export interface ColumnProps {
  onViewDetails: (user: OrganizationMembershipReadModel) => void;
  onRemoveUser: (user: OrganizationMembershipReadModel) => void;
  onTransferOwnership: (user: OrganizationMembershipReadModel) => void;
  onChangeRole: (user: OrganizationMembershipReadModel) => void;
}

export const createColumns = (
  props: ColumnProps
): ColumnDef<OrganizationMembershipReadModel>[] => {
  return [
    {
      size: 33,
      minSize: 150,
      header: "User",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage alt={"Unknown User"} />
              <AvatarFallback seed={row.original.userId}>{getInitials("Unknown User")}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{"Unknown User"}</span>
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
            {"unknown.user@example.com"}
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
        const currentUserRole = OrganizationRole.Owner as any;
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
