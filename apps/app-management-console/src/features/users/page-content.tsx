"use client";
import { PageHeader, Tabs, TabsList, TabsTrigger, TabsContent } from "@repo/pkg-frontend-common-kit/components";
import { UsersList } from "./users/users-list";
import { UserInviteList } from "./invites/user-invite-list";
import NewUserInvitePopup from "./invites/new-user-invite-popup";

export default function UsersPageContent() {
  return (
    <>
      <PageHeader title="Users" subtitle="Manage users in this organization" actions={<NewUserInvitePopup />} />
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="invites">Invites</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UsersList />
        </TabsContent>
        <TabsContent value="invites">
          <UserInviteList />
        </TabsContent>
      </Tabs>
    </>
  );
}



