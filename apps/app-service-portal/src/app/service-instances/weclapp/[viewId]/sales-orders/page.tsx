import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import PageContent from "@/features/weclapp/sales-orders/page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales Orders",
};

export default function UsersPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "Service Portal",
      breadcrumbs: [
        {
          label: "Weclapp",
        },
        {
          label: "Sales Orders"
        },
      ],
    }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
