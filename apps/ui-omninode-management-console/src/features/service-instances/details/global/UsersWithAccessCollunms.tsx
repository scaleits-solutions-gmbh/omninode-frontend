/*
Columns:
- avatar, name
- email
- AccessGrantedAt - By person Name
- Actions ellipsisicon  (Got to user details, Revoke access) use shadcn dropdown menu
 */

import { type ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { FeServiceInstanceUserWithAccess } from "@/types/feServiceInstance";


const ActionsColumn = (user: FeServiceInstanceUserWithAccess) => {
  const router = useRouter();

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push(`/users/${user.userCompanyId}`)}>
          Go to user details
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive">
          Revoke access
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  );
};

export const columns: ColumnDef<FeServiceInstanceUserWithAccess>[] = [
  {
    header: "User",
    accessorKey: "name",
    minSize: 200,
    size: 30,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-8 rounded-full">
            <AvatarImage src={row.original.userImageUrl} />
            <AvatarFallback seed={row.original.id}>
              {row.original.userFirstName.charAt(0) + row.original.userLastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span>{row.original.userFirstName + " " + row.original.userLastName}</span>
            <span className="text-sm text-muted-foreground">{row.original.userEmail}</span>
          </div>
        </div>
      );
    },
  },
  {
    header: "Access Granted",
    accessorKey: "accessGrantedAt",
    minSize: 200,
    size: 30,
    cell: ({ row }) => {
      const date = new Date(row.original.accessGrantedAt);
      const formattedDate = date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      const formattedTime = date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      });
      return (
        <div className="flex flex-col">
          <span>{`${formattedDate}, ${formattedTime}`}</span>
          <span className="text-sm text-muted-foreground">
            By {row.original.creatorFirstName} {row.original.creatorLastName}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    minSize: 60,
    size: 5,
    cell: ({ row }) => ActionsColumn(row.original),
  },
];