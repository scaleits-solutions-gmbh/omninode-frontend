import { FeUser } from "@/types/fe/fe-user";
import { ColumnDef } from "@tanstack/react-table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
} from "frontend-common-kit/components";

export const usersListColumns: ColumnDef<FeUser>[] = [
  {
    size: 30,
    minSize: 100,
    header: "User",
    accessorKey: "user",
    cell: ({ row }) => {
      console.log(row.original);
      const firstName = row.original.firstName || "";
      const lastName = row.original.lastName || "";
      const initials = (firstName.charAt(0) || "") + (lastName.charAt(0) || "");

      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={row.original.imageUrl} />
            <AvatarFallback seed={row.original.id}>{initials}</AvatarFallback>
          </Avatar>
          {firstName} {lastName}
        </div>
      );
    },
  },
  {
    size: 30,
    minSize: 100,
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => {
      return <div>{row.original.email}</div>;
    },
  },
  {
    size: 20,
    minSize: 100,
    header: "MC Access Level",
    accessorKey: "managementConsoleAccess",
    cell: ({ row }) => {
      return <Badge>{row.original.managementConsoleAccess}</Badge>;
    },
  },
  {
    size: 20,
    minSize: 100,
    header: "Last Login",
    accessorKey: "lastLoginAt",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.lastLoginAt
            ? new Date(row.original.lastLoginAt).toLocaleString()
            : "Never"}
        </div>
      );
    },
  },
];
