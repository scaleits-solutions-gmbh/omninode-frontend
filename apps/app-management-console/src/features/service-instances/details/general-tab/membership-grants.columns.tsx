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
import { ColumnDef } from "@tanstack/react-table";
import { ComposedMembershipViewGrantReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { MoreVertical } from "lucide-react";

function getInitials(firstName: string, lastName: string): string {
  const parts = `${firstName} ${lastName}`.trim().split(" ").filter(Boolean);
  const initials = parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
  return initials || "U";
}

export interface MembershipGrantsColumnProps {
  onChangeAccess: (grant: ComposedMembershipViewGrantReadModel) => void;
  onRevokeAccess: (grant: ComposedMembershipViewGrantReadModel) => void;
}

export const createMembershipGrantsColumns = (
  props: MembershipGrantsColumnProps
): ColumnDef<ComposedMembershipViewGrantReadModel>[] => [
  {
    header: "User",
    minSize: 200,
    size: 50,
    cell: ({ row }) => {
      const user = row.original.user;
      const fullName =
        `${user.firstName} ${user.lastName}`.trim() || "Unknown User";

      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-8 rounded-full">
            <AvatarImage alt={fullName} />
            <AvatarFallback seed={user.id}>
              {getInitials(user.firstName, user.lastName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{fullName}</span>
            <span className="text-sm text-muted-foreground">
              {user.email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    header: "View",
    minSize: 200,
    size: 49,
    cell: ({ row }) => {
      const view = row.original.view;
      return (
        <Badge variant="outline" className="font-normal">
          {view.name}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    minSize: 60,
    size: 1,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => props.onChangeAccess(row.original)}
              >
                Change access
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => props.onRevokeAccess(row.original)}
              >
                Revoke access
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

