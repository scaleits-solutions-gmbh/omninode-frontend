"use client";
import Link from "next/link";
import { useRouteCurrentOrganization } from "@repo/pkg-frontend-common-kit/hooks";
import { OrganizationRole } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { MANAGEMENT_CONSOLE_BASE_URL } from "@repo/pkg-frontend-common-kit/constants";
import { getOriginUrl } from "@repo/pkg-frontend-common-kit/utils";
import { Lock } from "lucide-react";

export default function ManagementConsoleLink() {
  const { organization, organizationId } = useRouteCurrentOrganization();

  // Allow access if user is Owner or Admin
  if (organization?.role !== OrganizationRole.Member) {
    return (
      <Link
        href={
          getOriginUrl() + 
          MANAGEMENT_CONSOLE_BASE_URL + 
          (organizationId ? `/${organizationId}` : "")
        }
      >
        Management Console
      </Link>
    );
  }

  return (
    <div className="items-center gap-2 flex">
      <Lock className="size-4 text-muted-foreground" />
      <span className="text-muted-foreground">Management Console</span>
    </div>
  );
}
