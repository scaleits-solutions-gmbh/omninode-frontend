import SideBarLayout from "@/components/layout/layoutSideBar/layoutSideBar";
import HomePageClient from "../features/home/PageContent";

export default function UsersPage() {
  return (
    <SideBarLayout
      autoBreadCrumbs={{
        category: "Home",
        breadcrumbs: [
          {
            label: "Home",
          },
        ],
      }}
      forceSidebarLoading={true}
      forceTopbarLoading={true}
    >
      <HomePageClient />
    </SideBarLayout>
  );
}
