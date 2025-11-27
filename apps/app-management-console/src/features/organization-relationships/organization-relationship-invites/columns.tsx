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
import { useAuthedMutation } from "@repo/pkg-frontend-common-kit/hooks";
import {
  formatExpiresIn,
  getOrganizationClient,
} from "@repo/pkg-frontend-common-kit/utils";
import {
  Locale,
  OrganizationRelationshipInviteReadModel,
  OrganizationRelationshipInviteStatus,
  organizationRelationshipInviteStatusName,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

export interface ColumnProps {
  currentOrganizationId: string;
  inviteType: "sent" | "received";
}

export const createColumns = (
  props: ColumnProps
): ColumnDef<OrganizationRelationshipInviteReadModel>[] => {
  function ActionsCell({
    invite,
  }: {
    invite: OrganizationRelationshipInviteReadModel;
  }) {
    const queryClient = useQueryClient();
    const cancelToastIdRef = useRef<string | number | undefined>(undefined);

    const cancelInviteMutation = useAuthedMutation({
      onMutate: () => {
        cancelToastIdRef.current = toast.loading("Cancelling invite...");
      },
      mutationFn: async ({ session }) => {
        await getOrganizationClient(
          session
        ).cancelOrganizationRelationshipInvite({
          pathParams: { id: invite.id },
        });
      },
      onSuccess: () => {
        toast.success("Invite cancelled", { id: cancelToastIdRef.current });
        queryClient.invalidateQueries({
          queryKey: ["platformOrganizationRelationshipInvites"],
          exact: false,
        });
      },
      onError: (error) => {
        toast.error(`Failed to cancel invite: ${error.message}`, {
          id: cancelToastIdRef.current,
        });
      },
      onSettled: () => {
        cancelToastIdRef.current = undefined;
      },
    });

    const isPending = cancelInviteMutation.isPending;

    return (
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              disabled={
                (props.inviteType === "sent" &&
                  invite.status !==
                    OrganizationRelationshipInviteStatus.Pending) ||
                isPending
              }
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {props.inviteType === "sent" ? (
              invite.status ===
                OrganizationRelationshipInviteStatus.Pending && (
                <>
                  <DropdownMenuItem hidden>Resend invite</DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    disabled={isPending}
                    onClick={() => cancelInviteMutation.mutate()}
                  >
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
  }
  return [
    {
      size: 33,
      minSize: 150,
      header: `${props.inviteType === "sent" ? "Target" : "Inviter"} Organization`,
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
                    : row.original.status ===
                        OrganizationRelationshipInviteStatus.Rejected
                      ? "bg-red-500"
                      : "bg-gray-500"
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
      header: "Expires In",
      cell: ({ row }) => {
        const isPending =
          row.original.status === OrganizationRelationshipInviteStatus.Pending;
        return (
          <div>
            {isPending ? formatExpiresIn(row.original.expiresAt) : "N/A"}
          </div>
        );
      },
    },
    {
      size: 1,
      minSize: 60,
      id: "actions",
      cell: ({ row }) => <ActionsCell invite={row.original} />,
    },
  ];
};
