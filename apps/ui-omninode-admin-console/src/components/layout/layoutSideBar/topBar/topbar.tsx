import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AutoBreadCrumbsProps, AutoBreadCrumbs } from "./autoBreadCrumbs";
import GlobalSearch from "./globalSearch";
import UserIndicator from "./userIndicator";

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

      <div className="flex items-center gap-2">
        <div className="hidden">
          <GlobalSearch />
        </div>
        <UserIndicator />
      </div>
    </header>
  );
}
