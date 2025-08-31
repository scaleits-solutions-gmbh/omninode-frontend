import { getSessionTokenPayload } from "@/lib/utils/misc/session-token";
import { SidebarInset, SidebarProvider } from "frontend-common-kit";
import { AppSidebar } from "./side-bar/side-bar";
import { AutoBreadCrumbsProps } from "./top-bar/auto-bread-crumbs";
import TopBar from "./top-bar/top-bar";

type SideBarLayoutProps = {
  children: React.ReactNode;
  autoBreadCrumbs: AutoBreadCrumbsProps;
};
export default async function SideBarLayout({
  children,
  autoBreadCrumbs,
}: SideBarLayoutProps) {
  let isLoggedIn: boolean = false;
  try {
    await getSessionTokenPayload();
    isLoggedIn = true;
  } catch {}
  return (
    <SidebarProvider>
      <AppSidebar isLoggedIn={isLoggedIn} />
      <SidebarInset>
        <TopBar {...autoBreadCrumbs} isLoggedIn={isLoggedIn} />
        <div className="container mx-auto flex flex-1 flex-col gap-6 p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
