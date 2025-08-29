"use client";
import PageHeader from "@/components/display/pageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrganizationInfo from "./CompanyDetails/ComapanyInfo";
import ServiceInstancesList from "./serviceInstances/ServiceInstancesList";
import CompanyDetails from "./CompanyDetails/CompanyDetails";
import UsersList from "./users/UsersList";
import { useState } from "react";
import InviteUserPopup from "./users/inviteUserPopup";
import InviteList from "./invites/InviteList";

export default function PageContent() {
  const [selectedTab, setSelectedTab] = useState<string>("companyDetails");
  return (
    <>
      <PageHeader title="Organization Details" subtitle="Manage company information, service instances, and user access" />
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
