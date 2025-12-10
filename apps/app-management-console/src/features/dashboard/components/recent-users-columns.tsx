"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
} from "@repo/pkg-frontend-common-kit/components";
import {
  Locale,
  ProjectionOrganizationUserListItemReadModel,
  OrganizationRole,
  organizationRoleLabel,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { ColumnDef } from "@tanstack/react-table";
function getInitials(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  const initials = parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
  return initials || "U";
}

export const recentUsersColumns: ColumnDef<ProjectionOrganizationUserListItemReadModel>[] =
  [
    {
      accessorKey: "name",
      header: "Name",
      size: 40,
      minSize: 200,
      cell: ({ row }) => {
        const membership = row.original;
        const user = membership.user;
        const fullName = `${user.firstName} ${user.lastName}`.trim() || "Unknown User";
        return (
          <div className="flex items-center gap-2">
            <Avatar className="">
              <AvatarImage alt={fullName} />
              <AvatarFallback seed={user.id} className="">
                {getInitials(fullName)}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{fullName}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 40,
      minSize: 240,
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.user.email}
        </span>
      ),
    },
    {
      id: "role",
      header: () => <div className="text-right">Role</div>,
      size: 20,
      minSize: 120,
      cell: ({ row }) => (
        <div className="text-right">
          <Badge
            variant={
              row.original.role === OrganizationRole.Owner
                ? "default"
                : "secondary"
            }
          >
            {organizationRoleLabel(row.original.role, Locale.En)}
          </Badge>
        </div>
      ),
    },
  ];
