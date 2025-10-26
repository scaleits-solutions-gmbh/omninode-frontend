import { FeUserInvite } from "@/types/fe/fe-user-invite";
import { ColumnDef } from "@tanstack/react-table";
import { Mail } from "lucide-react";

export const inviteListColumns: ColumnDef<FeUserInvite>[] = [
  {
    size: 45,
    minSize: 100,
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-md bg-muted text-muted-foreground flex items-center justify-center">
            <Mail className="size-4" />
          </div>
          {row.original.email}
        </div>
      );
    },
  },
  {
    size: 27.5,
    minSize: 100,
    header: "MC Access Level",
    accessorKey: "organizationRole",
  },
  {
    size: 27.5,
    minSize: 100,
    header: "Invite Sent At",
    accessorKey: "createdAt",
  },
];
