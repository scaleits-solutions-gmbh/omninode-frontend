import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import PageContent from "@/features/companies/details/page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Details",
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
          {
            label: "Company Details",
          },
        ],
      }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
