"use client";
import { PageHeader, Tabs, TabsList, TabsTrigger, TabsContent } from "@repo/pkg-frontend-common-kit/components";
import { OrganizationRelationshipList } from "./organization-relationships/organization-relationship-list";
import { OrganizationRelationshipInviteList } from "./organization-relationship-invites/organization-relationship-invite-list";
import NewRelationshipPopup from "./organization-relationships/invite-organization-popup";
import { useParams } from "next/navigation";

export default function OrganizationRelationshipsPageContent() {
  const { organizationId } = useParams();
  return (
    <>
      <PageHeader title="Organization Relationships" subtitle="Oversee organization relationships to your organization" actions={<NewRelationshipPopup currentOrganizationId={organizationId as string} />} />
      <Tabs defaultValue="relationships">
        <TabsList>
          <TabsTrigger value="relationships">Relationships</TabsTrigger>
          <TabsTrigger value="sent-invites">Sent Invites</TabsTrigger>
          <TabsTrigger value="received-invites">Received Invites</TabsTrigger>
        </TabsList>
        <TabsContent value="relationships">
          <OrganizationRelationshipList />
        </TabsContent>
        <TabsContent value="sent-invites">
          <OrganizationRelationshipInviteList inviteType="sent" />
        </TabsContent>
        <TabsContent value="received-invites">
          <OrganizationRelationshipInviteList inviteType="received" />
        </TabsContent>
      </Tabs>
    </>
  );
}