import { AppSidebar } from "./sideBar/sideBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AutoBreadCrumbsProps } from "./topBar/autoBreadCrumbs";
import TopBar from "./topBar/topbar";

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
