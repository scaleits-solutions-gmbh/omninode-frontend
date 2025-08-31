import { AppSidebar } from "./side-bar/sidebar";

import { AutoBreadCrumbsProps } from "./top-bar/auto-bread-crumbs";
import TopBar from "./top-bar/topbar";
import {
  SidebarInset,
  SidebarProvider
} from "../../../../../../packages/frontend-common-kit/dist/components";

type SideBarLayoutProps = {
  children: React.ReactNode;
  autoBreadCrumbs: AutoBreadCrumbsProps;
  forceSidebarLoading?: boolean;
  forceTopbarLoading?: boolean;
};
export default function SideBarLayout({
  children,
  autoBreadCrumbs,
  forceSidebarLoading,
  forceTopbarLoading,
}: SideBarLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar forceSidebarLoading={forceSidebarLoading} />
      <SidebarInset>
        <TopBar {...autoBreadCrumbs} forceTopbarLoading={forceTopbarLoading} />
        <div className="container mx-auto flex flex-1 flex-col gap-6 p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
