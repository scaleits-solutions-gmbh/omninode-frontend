import SideBarLayout from "@/components/layout/layoutSideBar/layoutSideBar";
import PageContent from "@/features/weclapp/salesOrders/PageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales Orders",
};

export default function UsersPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "Weclapp",
      breadcrumbs: [
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
