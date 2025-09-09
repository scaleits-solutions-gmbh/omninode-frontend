"use client";
import Link from "next/link";
import { useGetCurrentCompany } from "@repo/pkg-frontend-common-kit/hooks";
import { ManagementConsoleAccess } from "@scaleits-solutions-gmbh/services";
import { Lock } from "lucide-react";

export default function ManagementConsoleLink() {
  const { selectedCompany } = useGetCurrentCompany();

  if (selectedCompany?.managementConsoleAccess !== ManagementConsoleAccess.User) {
    return (
      <Link href={process.env.NEXT_PUBLIC_MANAGEMENT_CONSOLE_URL || ""}>
        Management Console
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Lock className="size-4 text-muted-foreground" />
      <span className="text-muted-foreground">Management Console</span>
    </div>
  );
}