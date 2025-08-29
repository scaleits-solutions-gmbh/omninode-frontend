import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AutoBreadCrumbsProps, AutoBreadCrumbs } from "./autoBreadCrumbs";
import GlobalSearch from "./globalSearch";
import UserIndicator from "./userIndicator";
import TopBarSkeleton from "./TopBarSkeleton";
import Link from "next/link";
import { getSessionTokenPayload } from "@/lib/utils/misc/sessionToken";
import { ManagementConsoleAccess } from "@scaleits-solutions-gmbh/services";
import { Lock } from "lucide-react";

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

  const sessionTokenPayload = await getSessionTokenPayload();

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
        {sessionTokenPayload.managementConsoleAccess !== ManagementConsoleAccess.None ? (
          <Link href={process.env.NEXT_PUBLIC_MANAGEMENT_CONSOLE_URL || ""}>Management Console</Link>
        ):(
          <div className="flex items-center gap-2">
            <Lock className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">Management Console</span>
          </div>
        )}
        <div className="hidden">
          <GlobalSearch />
        </div>
        <UserIndicator />
      </div>
    </header>
  );
}
