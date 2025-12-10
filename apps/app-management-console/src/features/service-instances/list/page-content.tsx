"use client";
import { PageHeader } from "@repo/pkg-frontend-common-kit/components";
import { ServiceInstancesList } from "./service-instances-list";
import NewServiceInstancePopup from "./new-service-instance-popup/new-service-instance-popup";
import { useRouteCurrentOrganization } from "@repo/pkg-frontend-common-kit/hooks";
import { OrganizationType } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
export default function ServiceInstancesPageContent() {
  const { organization } = useRouteCurrentOrganization();
  return (
    <>
      <PageHeader 
        title="Service Instances" 
        subtitle="Manage service instances and integrations for this organization" 
        actions={organization?.organizationType === OrganizationType.Provider && <NewServiceInstancePopup />}
      />
      <ServiceInstancesList />
    </>
  );
}