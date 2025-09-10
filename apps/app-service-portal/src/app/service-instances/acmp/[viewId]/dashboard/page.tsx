import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import PageContent from "@/features/acmp/dashboard/page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function UsersPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "Service Portal",
      breadcrumbs: [
        {
          label: "ACMP",
        },
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
