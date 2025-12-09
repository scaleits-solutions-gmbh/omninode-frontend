"use client";

import { PageHeader } from "@repo/pkg-frontend-common-kit/components";
import DangerZoneSection from "./components/danger-zone-section";
import ServiceProviderSection from "./components/service-provider-section";
import OrganizationCoreInfoCardReactForm from "./components/organization-core-info-card-react-form";

export default function PageContent() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Organization settings"
        subtitle="Manage your organization's core information"
      />
      <OrganizationCoreInfoCardReactForm />
      <ServiceProviderSection />
      <DangerZoneSection />
    </div>
  );
}


