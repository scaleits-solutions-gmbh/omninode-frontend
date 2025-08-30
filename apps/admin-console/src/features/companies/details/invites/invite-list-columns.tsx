import { ColumnDef } from "@tanstack/react-table";
import { FeCompanyUserInvite } from "@/types/fe/fe-company-user-invite";

export const inviteListColumns: ColumnDef<FeCompanyUserInvite>[] = [
  {
    size: 35,
    minSize: 100,
    header: "Email",
    accessorKey: "email",
  },
  {
    size: 25,
    minSize: 100,
    header: "Already in System",
    cell: ({ row }) => {
      return row.original.userId ? "Yes" : "No";
    },
  },
  {
    size: 25,
    minSize: 100,
    header: "MC Access Level",
    accessorKey: "managementConsoleAccess",
  },
  {
    size: 25,
    minSize: 100,
    header: "Invite Sent At",
    accessorKey: "createdAt",
  },
];
