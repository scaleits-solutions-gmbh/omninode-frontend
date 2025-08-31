import { AutoBreadCrumbsProps, AutoBreadCrumbs } from "./auto-bread-crumbs";
import GlobalSearch from "./global-search";
import UserIndicator from "./user-indicator";
import {
  Separator,
  SidebarTrigger,
  HelpIndicator
} from "@repo/pkg-frontend-common-kit/components";
import Link from "next/link";

export default function TopBar({
  category,
  breadcrumbs,
}: AutoBreadCrumbsProps) {
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
        <Link href={process.env.NEXT_PUBLIC_SERVICE_PORTAL_URL || ""}>
          Service Portal
        </Link>
        <HelpIndicator />
        <div className="hidden">
          <GlobalSearch />
        </div>
        <UserIndicator />
      </div>
    </header>
  );
}
