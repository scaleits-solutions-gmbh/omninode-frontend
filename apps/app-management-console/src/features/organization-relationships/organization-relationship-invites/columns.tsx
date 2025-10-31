import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Badge,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/pkg-frontend-common-kit/components";
import {
  OrganizationRelationshipInviteReadModel,
  OrganizationRelationshipInviteStatus,
  organizationRelationshipInviteStatusName,
  Locale,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export interface ColumnProps {
  currentOrganizationId: string;
  inviteType: "sent" | "received";
}

export const createColumns = (
  props: ColumnProps
): ColumnDef<OrganizationRelationshipInviteReadModel>[] => {
  return [
    {
      size: 33,
      minSize: 150,
      header: `${props.inviteType === "sent" ? "Inviter" : "Target"} Organization`,
      cell: ({ row }) => {
        const isCurrentInviter =
          row.original.inviterOrganizationId === props.currentOrganizationId;
        const otherOrganizationName = isCurrentInviter
          ? row.original.targetOrganizationName
          : row.original.inviterOrganizationName;
        const otherOrganizationId = isCurrentInviter
          ? row.original.targetOrganizationId
          : row.original.inviterOrganizationId;

        return (
          <div className="flex items-center gap-2">
            <Avatar className="rounded-md">
              <AvatarImage src={""} />
              <AvatarFallback seed={otherOrganizationId}>
                {otherOrganizationName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {otherOrganizationName}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      size: 33,
      minSize: 150,
      header: "Status",
      cell: ({ row }) => {
        return (
          <Badge variant="secondary">
            <span
              className={`mr-1 inline-block h-2 w-2 rounded-full ${
                row.original.status ===
                OrganizationRelationshipInviteStatus.Accepted
                  ? "bg-emerald-500"
                  : row.original.status ===
                      OrganizationRelationshipInviteStatus.Pending
                    ? "bg-amber-500"
                    : "bg-red-500"
              }`}
            />
            {organizationRelationshipInviteStatusName(
              row.original.status,
              Locale.En
            )}
          </Badge>
        );
      },
    },
    {
      accessorKey: "Expires At",
      size: 33,
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
                <Button variant="ghost" size="icon" disabled={props.inviteType === "sent" && row.original.status !== OrganizationRelationshipInviteStatus.Pending}>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {props.inviteType === "sent" ? (
                  row.original.status ===
                    OrganizationRelationshipInviteStatus.Pending && (
                    <>
                      <DropdownMenuItem>Resend invite</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Cancel invite
                      </DropdownMenuItem>
                    </>
                  )
                ) : (
                  <>
                    <DropdownMenuItem>Accept invite</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Decline invite
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
};
