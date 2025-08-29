import { AppSidebar } from "./sideBar/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AutoBreadCrumbsProps } from "./topBar/autoBreadCrumbs";
import TopBar from "./topBar/topbar";



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
