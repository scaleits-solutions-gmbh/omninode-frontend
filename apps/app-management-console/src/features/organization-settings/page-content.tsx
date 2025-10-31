"use client";

import { PageHeader } from "@repo/pkg-frontend-common-kit/components";
import OrganizationCoreInfoCard from "./components/organization-core-info-card";
import DangerZoneSection from "./components/danger-zone-section";

export default function PageContent() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Organization settings"
        subtitle="Manage your organization's core information"
      />
      <OrganizationCoreInfoCard />
      <DangerZoneSection />
    </div>
  );
}


