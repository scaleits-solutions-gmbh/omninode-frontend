import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import { Metadata } from "next";
import PageContent from "@/features/dashboard/page-content";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function DashboardPage() {
  return (
    <SideBarLayout
      autoBreadCrumbs={{
        category: "Business",
        breadcrumbs: [
          {
            label: "Dashboard",
          },
        ],
      }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
