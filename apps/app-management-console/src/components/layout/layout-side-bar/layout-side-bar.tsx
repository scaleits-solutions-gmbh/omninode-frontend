import { AppSidebar } from "./side-bar/side-bar";
import { AutoBreadCrumbsProps } from "./top-bar/auto-bread-crumbs";
import TopBar from "./top-bar/top-bar";
import {
  SidebarInset,
  SidebarProvider,
} from "@repo/pkg-frontend-common-kit/components";

type SideBarLayoutProps = {
  children: React.ReactNode;
  autoBreadCrumbs: AutoBreadCrumbsProps;
};
export default function SideBarLayout({
  children,
  autoBreadCrumbs,
}: SideBarLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TopBar {...autoBreadCrumbs} />
        <div className="container mx-auto flex flex-1 flex-col gap-6 p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
