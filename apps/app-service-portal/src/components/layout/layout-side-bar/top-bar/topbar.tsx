

import { AutoBreadCrumbsProps, AutoBreadCrumbs } from "./auto-bread-crumbs";
import GlobalSearch from "./global-search";
import UserIndicator from "./user-indicator";
import TopBarSkeleton from "./top-bar-skeleton";
import Link from "next/link";
import { ManagementConsoleAccess } from "@scaleits-solutions-gmbh/services";
import { Lock } from "lucide-react";
import {
  Separator,
  SidebarTrigger,
  HelpIndicator
} from "@repo/pkg-frontend-common-kit/components";
import ManagementConsoleLink from "./management-console-link";

interface TopBarProps extends AutoBreadCrumbsProps {
  forceTopbarLoading?: boolean;
}

export default async function TopBar({
  category,
  breadcrumbs,
  forceTopbarLoading,
}: TopBarProps) {
  if (forceTopbarLoading) {
    return <TopBarSkeleton />;
  }

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

      <div className="flex items-center gap-8">
        <ManagementConsoleLink />
        <HelpIndicator />
        <div className="hidden">
          <GlobalSearch />
        </div>
        <UserIndicator />
      </div>
    </header>
  );
}
