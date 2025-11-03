"use client";
import Link from "next/link";
import { useGetCurrentOrganization } from "@repo/pkg-frontend-common-kit/hooks";
import { OrganizationRole } from "@scaleits-solutions-gmbh/services";
import { Lock } from "lucide-react";

export default function ManagementConsoleLink() {
  const { selectedOrganization } = useGetCurrentOrganization();

  if (selectedOrganization?.organizationRole !== OrganizationRole.Member) {
    return (
      <Link className="hidden md:flex" href={process.env.NEXT_PUBLIC_MANAGEMENT_CONSOLE_URL || ""}>
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