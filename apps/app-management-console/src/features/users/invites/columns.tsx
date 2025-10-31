import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Badge,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@repo/pkg-frontend-common-kit/components";
import { OrganizationMembershipInviteReadModel, OrganizationMembershipInviteStatus, organizationMembershipInviteStatusName, Locale } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export interface ColumnProps {}

export const createColumns =
  (): ColumnDef<OrganizationMembershipInviteReadModel>[] => {
    return [
      {
        size: 40,
        minSize: 200,
        header: "Email",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={""} />
                <AvatarFallback seed={row.original.id}>
                  {row.original.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {row.original.email}
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        size: 30,
        minSize: 150,
        header: "Status",
        cell: ({ row }) => {
          return (
            <Badge
              variant="secondary"
            >
              <span
                className={`mr-1 inline-block h-2 w-2 rounded-full ${
                  row.original.status === OrganizationMembershipInviteStatus.Accepted
                    ? "bg-emerald-500"
                    : row.original.status === OrganizationMembershipInviteStatus.Pending
                      ? "bg-amber-500"
                      : "bg-red-500"
                }`}
              />
              {organizationMembershipInviteStatusName(row.original.status, Locale.En)}
            </Badge>
          );
        },
      },
      {
        accessorKey: "expiresAt",
        size: 29,
        minSize: 150,
        header: "Expires At",
        cell: ({ row }) => {
          return (
            <div>
              {new Date(row.original.expiresAt).toLocaleDateString() +
                " " +
                new Date(row.original.expiresAt).toLocaleTimeString()}
            </div>
          );
        },
      },
      {
        size: 1,
        minSize: 60,
        id: "actions",
        cell: ({ row }) => {
          return (
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" disabled={row.original.status !== OrganizationMembershipInviteStatus.Pending}>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                {row.original.status === OrganizationMembershipInviteStatus.Pending && (
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Resend invite</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    Cancel invite
                  </DropdownMenuItem>
                </DropdownMenuContent>
                )}
              </DropdownMenu>
            </div>
          );
        },
      },
    ];
  };
