import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import PageContent from "@/features/weclapp/dashboard/page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function UsersPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "Weclapp",
      breadcrumbs: [
        {
          label: "Dashboard"
        },
      ],
    }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
