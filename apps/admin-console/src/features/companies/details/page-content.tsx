"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  PageHeader,
} from "../../../../../../packages/frontend-common-kit/dist/components";
import { useState } from "react";
import OrganizationInfo from "./company-details/company-info";
import CompanyDetails from "./company-details/company-details";
import InviteList from "./invites/invite-list";
import ServiceInstancesList from "./service-instances/service-instances-list";
import InviteUserPopup from "./users/invite-user-popup";
import UsersList from "./users/users-list";

export default function PageContent() {
  const [selectedTab, setSelectedTab] = useState<string>("companyDetails");
  return (
    <>
      <PageHeader
        title="Organization Details"
        subtitle="Manage company information, service instances, and user access"
      />
      <OrganizationInfo />
      <Tabs
        defaultValue={selectedTab}
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="gap-4"
      >
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="companyDetails">Company Details</TabsTrigger>
            <TabsTrigger value="serviceInstances">
              Service Instances
            </TabsTrigger>
            <TabsTrigger value="users">Users & Invites</TabsTrigger>
          </TabsList>
          {selectedTab === "users" && <InviteUserPopup />}
        </div>
        <TabsContent value="companyDetails">
          <CompanyDetails />
        </TabsContent>
        <TabsContent value="serviceInstances">
          <ServiceInstancesList />
        </TabsContent>
        <TabsContent value="users">
          <div className="space-y-6">
            <InviteList />
            <UsersList />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
