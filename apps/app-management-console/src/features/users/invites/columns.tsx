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
  OrganizationMembershipInviteReadModel,
  OrganizationMembershipInviteStatus,
  organizationMembershipInviteStatusName,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ColumnProps {}

function ActionsCell({
  invite,
}: {
  invite: OrganizationMembershipInviteReadModel;
}) {
  const queryClient = useQueryClient();
  const cancelToastIdRef = useRef<string | number | undefined>(undefined);

  const cancelInviteMutation = useAuthedMutation({
    onMutate: () => {
      cancelToastIdRef.current = toast.loading("Cancelling invite...");
    },
    mutationFn: async ({ session }) => {
      await getOrganizationClient(session).cancelOrganizationMembershipInvite({
        pathParams: { id: invite.id },
      });
    },
    onSuccess: () => {
      toast.success("Invite cancelled", { id: cancelToastIdRef.current });
      queryClient.invalidateQueries({
        queryKey: ["organizationUserInvites"],
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
              invite.status !== OrganizationMembershipInviteStatus.Pending ||
              isPending
            }
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        {invite.status === OrganizationMembershipInviteStatus.Pending && (
          <DropdownMenuContent align="end">
            <DropdownMenuItem hidden>Resend invite</DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              disabled={isPending}
              onClick={() => cancelInviteMutation.mutate()}
            >
              Cancel invite
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
}

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
            <Badge variant="secondary">
              <span
                className={`mr-1 inline-block h-2 w-2 rounded-full ${
                  row.original.status ===
                  OrganizationMembershipInviteStatus.Accepted
                    ? "bg-emerald-500"
                    : row.original.status ===
                        OrganizationMembershipInviteStatus.Pending
                      ? "bg-amber-500"
                      : row.original.status ===
                          OrganizationMembershipInviteStatus.Rejected
                        ? "bg-red-500"
                        : "bg-gray-500"
                }`}
              />
              {organizationMembershipInviteStatusName(
                row.original.status,
                Locale.En
              )}
            </Badge>
          );
        },
      },
      {
        accessorKey: "expiresAt",
        size: 29,
        minSize: 150,
        header: "Expires In",
        cell: ({ row }) => {
          const isPending =
            row.original.status === OrganizationMembershipInviteStatus.Pending;
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
