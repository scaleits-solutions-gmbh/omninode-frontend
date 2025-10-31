"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
} from "@repo/pkg-frontend-common-kit/components";
import {
  Locale,
  OrganizationMembershipReadModel,
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

export const recentUsersColumns: ColumnDef<OrganizationMembershipReadModel>[] =
  [
    {
      accessorKey: "name",
      header: "Name",
      size: 40,
      minSize: 200,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-2">
            <Avatar className="">
              <AvatarImage alt={"Unknown User"} />
              <AvatarFallback seed={user.userId} className="">
                {getInitials("Unknown User")}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{"Unknown User"}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 40,
      minSize: 240,
      cell: ({ getValue }) => (
        <span className="text-muted-foreground">
          {"unknown.user@example.com"}
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
