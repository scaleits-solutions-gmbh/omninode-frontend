/*
Columns:
- avatar, name, email
- OrganizationRole
- Actions Select
*/

import { FeUser } from "@/types/fe/fe-user";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/pkg-frontend-common-kit/components";
import { type ColumnDef } from "@tanstack/react-table";

export const createColumns = (): ColumnDef<FeUser>[] => [
  {
    header: "User",
    accessorKey: "name",
    minSize: 200,
    size: 50,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-8 rounded-md">
            <AvatarImage src={row.original.imageUrl} />
            <AvatarFallback seed={row.original.id}>
              {row.original.firstName.charAt(0) +
                row.original.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">
              {row.original.firstName + " " + row.original.lastName}
            </div>
            <div className="text-xs text-muted-foreground">
              {row.original.email}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    header: "Access Level",
    accessorKey: "organizationRole",
    minSize: 150,
    size: 45,
    cell: ({ row }) => {
      const access = row.getValue("organizationRole") as string;
      return (
        <div className="capitalize">
          {access.charAt(0).toUpperCase() + access.slice(1)}
        </div>
      );
    },
  },
];
