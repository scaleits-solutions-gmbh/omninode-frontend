import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import PageContent from "@/features/companies/list/page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Companies",
};

export default function CompanyPage() {
  return (
    <SideBarLayout
      autoBreadCrumbs={{
        category: "Management",
        breadcrumbs: [
          {
            label: "Companies",
            href: "/companies",
          },
        ],
      }}
    >
      <PageContent />
    </SideBarLayout>
  );
}