"use client"

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePersistedCurrentOrganization } from "@repo/pkg-frontend-common-kit/hooks";
import { getOriginUrl } from "@repo/pkg-frontend-common-kit/utils";
import { USER_PORTAL_BASE_URL } from "@repo/pkg-frontend-common-kit/constants";
import { OrganizationRole } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { Loader2 } from "lucide-react";

export default function RootPage() {
  const { organizationId, organizations, isLoading, error, setOrganizationId } = usePersistedCurrentOrganization();
  const router = useRouter();

  // Find the first manageable organization (Owner or Admin)
  const firstManageableOrg = useMemo(() => {
    if (!organizations) return undefined;
    return organizations.find(
      (org) => org.role === OrganizationRole.Owner || org.role === OrganizationRole.Admin
    );
  }, [organizations]);

  useEffect(() => {
    if (isLoading || error) return;
    
    // If no organizations, redirect to user portal
    if (!organizations || organizations.length === 0) {
      router.replace(getOriginUrl() + USER_PORTAL_BASE_URL);
      return;
    }

    // If no manageable organizations, redirect to user portal
    if (!firstManageableOrg) {
      router.replace(getOriginUrl() + USER_PORTAL_BASE_URL);
      return;
    }

    // Check if current selection is manageable
    const currentOrg = organizationId 
      ? organizations.find((org) => org.organizationId === organizationId)
      : undefined;
    
    const isCurrentManageable = currentOrg && 
      (currentOrg.role === OrganizationRole.Owner || currentOrg.role === OrganizationRole.Admin);

    // If current selection is manageable, redirect to its dashboard
    if (isCurrentManageable && organizationId) {
      router.push(`/${organizationId}/dashboard`);
      return;
    }

    // Otherwise, select first manageable org and redirect
    setOrganizationId(firstManageableOrg.organizationId);
    router.push(`/${firstManageableOrg.organizationId}/dashboard`);
  }, [organizationId, organizations, isLoading, error, firstManageableOrg, router, setOrganizationId]);

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
} 
