import { ColumnDef } from "@tanstack/react-table";
import type { WeclappProjectMemberReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import {
  Avatar,
  AvatarFallback
} from "@repo/pkg-frontend-common-kit/components";


export const projectMembersColumns: ColumnDef<WeclappProjectMemberReadModel>[] = [
  {
    size: 40,
    minSize: 100,
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => {
      return <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback seed={row.original.id}>{row.original.firstName.charAt(0)+row.original.lastName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>{row.original.firstName} {row.original.lastName}</div>
      </div>;
    },
  },
  {
    size: 40,
    minSize: 100,
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => {
      return <div>{row.original.email}</div>;
    },
  },
  {
    size: 25,
    minSize: 100,
    header: "Role",
    accessorKey: "role",
    cell: ({ row }) => {
      return <div>{row.original.role}</div>;
    },
  }
];