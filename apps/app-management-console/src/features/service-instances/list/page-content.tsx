"use client";
import { PageHeader } from "@repo/pkg-frontend-common-kit/components";
import { ServiceInstancesList } from "./service-instances-list";
import NewServiceInstancePopup from "./new-service-instance-popup/new-service-instance-popup";

export default function ServiceInstancesPageContent() {
  return (
    <>
      <PageHeader 
        title="Service Instances" 
        subtitle="Manage service instances and integrations for this organization" 
        actions={<NewServiceInstancePopup />}
      />
      <ServiceInstancesList />
    </>
  );
}