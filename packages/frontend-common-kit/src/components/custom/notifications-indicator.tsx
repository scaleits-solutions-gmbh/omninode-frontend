"use client";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  ScrollArea,
  Card,
  CardContent,
  Skeleton,
} from "@/components/ui";
import { Bell, SmilePlus, UserPlus, BellDot } from "lucide-react";
import { useState } from "react";
import { useAuthedQuery, useAuthedMutation } from "@/hooks";
import { baseOmninodeApiClient, getApiAuthentication } from "@repo/omninode-api-client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const notifications: Array<{
  title: string;
  description: string;
  createdAt: Date;
}> = [];

export function NotificationsIndicator() {
  const [tab, setTab] = useState("notifications");
  const queryClient = useQueryClient();

  // Fetch current user actionable membership invites
  const {
    data: membershipInvitesData,
    isLoading: isLoadingMembershipInvites,
    isFetching: isFetchingMembershipInvites,
  } = useAuthedQuery({
    queryKey: ["current-user-membership-invites"],
    queryFn: async ({ session }) =>
      await baseOmninodeApiClient().organizationMicroservice.findCurrentUserActionableOrganizationMembershipInvites({
        request: {},
        apiAuthentication: getApiAuthentication(session.access_token),
      }),
    staleTime: 30000, // Consider data fresh for 30 seconds
  });

  // Fetch current user actionable relationship invites
  const {
    data: relationshipInvitesData,
    isLoading: isLoadingRelationshipInvites,
    isFetching: isFetchingRelationshipInvites,
  } = useAuthedQuery({
    queryKey: ["current-user-relationship-invites"],
    queryFn: async ({ session }) =>
      await baseOmninodeApiClient().organizationMicroservice.findCurrentUserActionableReceivedOrganizationRelationshipInvites({
        request: {},
        apiAuthentication: getApiAuthentication(session.access_token),
      }),
    staleTime: 30000, // Consider data fresh for 30 seconds
  });

  // Accept membership invite mutation
  const acceptMembershipInviteMutation = useAuthedMutation({
    mutationFn: async ({ session, variables }: { session: any; variables: { inviteId: string } }) =>
      await baseOmninodeApiClient().organizationMicroservice.acceptOrganizationMembershipInvite({
        request: {
          pathParams: {
            id: variables.inviteId,
          },
        },
        apiAuthentication: getApiAuthentication(session.access_token),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user-membership-invites"] });
      toast.success("Membership invite accepted");
    },
    onError: (error) => {
      toast.error(`Failed to accept invite: ${error.message}`);
    },
  });

  // Reject membership invite mutation
  const rejectMembershipInviteMutation = useAuthedMutation({
    mutationFn: async ({ session, variables }: { session: any; variables: { inviteId: string } }) =>
      await baseOmninodeApiClient().organizationMicroservice.rejectOrganizationMembershipInvite({
        request: {
          pathParams: {
            id: variables.inviteId,
          },
        },
        apiAuthentication: getApiAuthentication(session.access_token),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user-membership-invites"] });
      toast.success("Membership invite rejected");
    },
    onError: (error) => {
      toast.error(`Failed to reject invite: ${error.message}`);
    },
  });

  // Accept relationship invite mutation
  const acceptRelationshipInviteMutation = useAuthedMutation({
    mutationFn: async ({ session, variables }: { session: any; variables: { inviteId: string } }) =>
      await baseOmninodeApiClient().organizationMicroservice.acceptOrganizationRelationshipInvite({
        request: {
          pathParams: {
            id: variables.inviteId,
          },
          body: {
            relationshipId: variables.inviteId,
          },
        },
        apiAuthentication: getApiAuthentication(session.access_token),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user-relationship-invites"] });
      toast.success("Relationship invite accepted");
    },
    onError: (error) => {
      toast.error(`Failed to accept invite: ${error.message}`);
    },
  });

  // Reject relationship invite mutation
  const rejectRelationshipInviteMutation = useAuthedMutation({
    mutationFn: async ({ session, variables }: { session: any; variables: { inviteId: string } }) =>
      await baseOmninodeApiClient().organizationMicroservice.rejectOrganizationRelationshipInvite({
        request: {
          pathParams: {
            id: variables.inviteId,
          },
        },
        apiAuthentication: getApiAuthentication(session.access_token),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user-relationship-invites"] });
      toast.success("Relationship invite rejected");
    },
    onError: (error) => {
      toast.error(`Failed to reject invite: ${error.message}`);
    },
  });

  const membershipInvites = membershipInvitesData?.body || [];
  const relationshipInvites = relationshipInvitesData?.body || [];

  const notificationCount = notifications.length;
  const invitesCount = membershipInvites.length + relationshipInvites.length;
  const hasAny = notificationCount + invitesCount > 0;
  // Only show loading when there's no data yet (initial load), not during refetches
  const isLoading = 
    (isLoadingMembershipInvites && !membershipInvitesData) || 
    (isLoadingRelationshipInvites && !relationshipInvitesData);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Bell className="w-6 h-6" />
            {hasAny && (
              <span className="absolute right-1 top-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-78 p-4" align="end" forceMount>
            <DropdownMenuLabel className="p-0"> Notifications & Invites</DropdownMenuLabel>
            <DropdownMenuSeparator className="dark:bg-card my-2 bg-border"/>
          <div className="">
            <Tabs
              value={tab}
              onValueChange={setTab}
              defaultValue="notifications"
            >
              <TabsList className="grid grid-cols-2 w-full bg-card border shadow-sm">
                <TabsTrigger value="notifications" className="shadow-none light:data-[state=active]:bg-muted dark:data-[state=active]:border-none">
                  Notifications
                  {notificationCount > 0 ? ` (${notificationCount})` : ""}
                </TabsTrigger>
                <TabsTrigger value="invites"  className="shadow-none light:data-[state=active]:bg-muted dark:data-[state=active]:border-none">
                  Invites{invitesCount > 0 ? ` (${invitesCount})` : ""}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="notifications" className="mt-2">
                <ScrollArea className="h-64">
                  {notifications.length === 0 ? (
                    <div className="text-sm text-muted-foreground p-3">
                      No notifications
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-xs uppercase text-muted-foreground px-1 flex items-center gap-2">
                        <BellDot className="w-4 h-4" /> <span>Notifications</span>
                      </div>
                      {notifications.map((n, idx) => (
                        <Card key={idx} className="py-3">
                          <CardContent className="px-3">
                            <div className="text-sm font-medium">{n.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {n.description}
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground">
                              {n.createdAt.toLocaleString()}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="invites" className="mt-2">
                <ScrollArea className="h-64">
                  {isLoading ? (
                    <div className="space-y-2 p-3">
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-20 w-full" />
                    </div>
                  ) : invitesCount === 0 ? (
                    <div className="text-sm text-muted-foreground p-3">
                      No invites
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {membershipInvites.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-xs uppercase text-muted-foreground px-1 flex items-center gap-2">
                            <UserPlus className="w-4 h-4" />{" "}
                            <span>Membership</span>
                          </div>
                          {membershipInvites.map((invite: {
                            id: string;
                            organizationName: string;
                            expiresAt: string;
                          }) => (
                            <Card key={invite.id} className="py-3">
                              <CardContent className="px-3">
                                <div className="text-sm">
                                  Join{" "}
                                  <span className="font-medium">
                                    {invite.organizationName}
                                  </span>
                                </div>
                                <div className="mt-2 flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      acceptMembershipInviteMutation.mutate({
                                        inviteId: invite.id,
                                      })
                                    }
                                    disabled={
                                      acceptMembershipInviteMutation.isPending ||
                                      rejectMembershipInviteMutation.isPending
                                    }
                                  >
                                    Accept
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      rejectMembershipInviteMutation.mutate({
                                        inviteId: invite.id,
                                      })
                                    }
                                    disabled={
                                      acceptMembershipInviteMutation.isPending ||
                                      rejectMembershipInviteMutation.isPending
                                    }
                                  >
                                    Decline
                                  </Button>
                                </div>
                                <div className="mt-2 text-xs text-muted-foreground">
                                  {new Date(invite.expiresAt).toLocaleString()}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}

                      {relationshipInvites.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-xs uppercase text-muted-foreground px-1 flex items-center gap-2">
                            <SmilePlus className="w-4 h-4" />
                            <span>Organization relationships</span>
                          </div>
                          {relationshipInvites.map((invite: {
                            id: string;
                            inviterOrganizationName: string;
                            targetOrganizationName: string;
                            expiresAt: string;
                          }) => (
                            <Card key={invite.id} className="py-3">
                              <CardContent className="px-3">
                                <div className="text-sm">
                                  <span className="font-medium">
                                    {invite.inviterOrganizationName}
                                  </span>{" "}
                                  invited{" "}
                                  <span className="font-medium">
                                    {invite.targetOrganizationName}
                                  </span>{" "}
                                  to connect
                                </div>
                                <div className="mt-2 flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      acceptRelationshipInviteMutation.mutate({
                                        inviteId: invite.id,
                                      })
                                    }
                                    disabled={
                                      acceptRelationshipInviteMutation.isPending ||
                                      rejectRelationshipInviteMutation.isPending
                                    }
                                  >
                                    Accept
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      rejectRelationshipInviteMutation.mutate({
                                        inviteId: invite.id,
                                      })
                                    }
                                    disabled={
                                      acceptRelationshipInviteMutation.isPending ||
                                      rejectRelationshipInviteMutation.isPending
                                    }
                                  >
                                    Decline
                                  </Button>
                                </div>
                                <div className="mt-2 text-xs text-muted-foreground">
                                  {new Date(invite.expiresAt).toLocaleString()}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
