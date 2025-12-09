"use client";

import { AutoBreadCrumbsProps, AutoBreadCrumbs } from "./auto-bread-crumbs";
import GlobalSearch from "./global-search";
import UserIndicator from "./user-indicator";
import {
  Separator,
  SidebarTrigger,
  HelpIndicator,
  NotificationsIndicator,
} from "@repo/pkg-frontend-common-kit/components";
import { SERVICE_PORTAL_BASE_URL } from "@repo/pkg-frontend-common-kit/constants";
import { getOriginUrl } from "@repo/pkg-frontend-common-kit/utils";
import { useRouteCurrentOrganization } from "@repo/pkg-frontend-common-kit/hooks";
import Link from "next/link";

export default function TopBar({
  category,
  breadcrumbs,
}: AutoBreadCrumbsProps) {
  const { organizationId } = useRouteCurrentOrganization();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <AutoBreadCrumbs category={category} breadcrumbs={breadcrumbs} />
      </div>

      <div className="flex items-center gap-6">
        <Link href={
          getOriginUrl() + 
          SERVICE_PORTAL_BASE_URL + 
          (organizationId ? `/${organizationId}` : "")
        }>
          Service Portal
        </Link>
        <div className="flex items-center gap-4">
          <GlobalSearch />
          <HelpIndicator />
          <NotificationsIndicator />
        </div>

        <UserIndicator />
      </div>
    </header>
  );
}
