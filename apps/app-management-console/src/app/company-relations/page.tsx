import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import PageContent from "@/features/company-relations/list/components/page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Relations",
  description: "Manage relationships and connections with other companies",
};

export default function CompanyRelationsPage() {
  return (
    <SideBarLayout
      autoBreadCrumbs={{
        category: "Company",
        breadcrumbs: [
          {
            label: "Company Relations",
          },
        ],
      }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
