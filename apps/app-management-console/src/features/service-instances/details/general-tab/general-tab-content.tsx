"use client";

// Import to register module augmentation FIRST
import "@/lib/next-auth-options";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/pkg-frontend-common-kit/components";
import { ComposedOrganizationServiceInstanceReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import BasicInformationCard from "./basic-information-card";
import GeneralTabLoading from "./loading/general-tab-loading";
import MembershipGrantsCard from "./membership-grants.card";
import OrganizationRelationshipGrantsCard from "./organization-relationship-grants.card";
import SwitchConnectionCard from "./services/switch-connection-card";

interface GeneralTabContentProps {
  isLoading: boolean;
  error: Error | null;
  serviceInstance: ComposedOrganizationServiceInstanceReadModel;
}

export function GeneralTabContent({
  isLoading,
  error,
  serviceInstance,
}: GeneralTabContentProps) {
  if (isLoading) {
    return <GeneralTabLoading />;
  }

  if (error || !serviceInstance) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Failed to load service instance</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center"></CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      <div className="col-span-1 space-y-6">
        <BasicInformationCard serviceInstance={serviceInstance} />
        <SwitchConnectionCard serviceInstance={serviceInstance} />
      </div>
      <div className="col-span-2 space-y-6">
        <OrganizationRelationshipGrantsCard />
        <MembershipGrantsCard />
      </div>
    </div>
  );
}
