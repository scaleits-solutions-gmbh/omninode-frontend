"use client";
import Link from "next/link";
import { useRouteCurrentOrganization } from "@repo/pkg-frontend-common-kit/hooks";
import { OrganizationRole } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { Lock } from "lucide-react";

export default function ManagementConsoleLink() {
  const { organization } = useRouteCurrentOrganization();

  // Allow access if user is Owner or Admin
  if (organization?.role !== OrganizationRole.Member) {
    return (
      <Link
        className="hidden md:flex"
        href={process.env.NEXT_PUBLIC_MANAGEMENT_CONSOLE_URL || ""}
      >
        Management Console
      </Link>
    );
  }

  return (
    <div className="items-center gap-2 hidden md:flex">
      <Lock className="size-4 text-muted-foreground" />
      <span className="text-muted-foreground">Management Console</span>
    </div>
  );
}
