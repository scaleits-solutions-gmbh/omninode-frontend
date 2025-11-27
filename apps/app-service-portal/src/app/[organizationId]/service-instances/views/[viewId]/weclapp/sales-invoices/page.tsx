import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import PageContent from "@/features/weclapp/sales-invoices/page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales Invoices",
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
          label: "Sales Invoices"
        },
      ],
    }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
