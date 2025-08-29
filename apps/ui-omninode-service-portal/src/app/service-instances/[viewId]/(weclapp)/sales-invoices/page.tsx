import SideBarLayout from "@/components/layout/layoutSideBar/layoutSideBar";
import PageContent from "@/features/weclapp/salesInvoices/PageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales Invoices",
};

export default function UsersPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "Weclapp",
      breadcrumbs: [
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
