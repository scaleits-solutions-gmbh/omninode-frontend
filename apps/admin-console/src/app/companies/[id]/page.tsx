import SideBarLayout from "@/components/layout/layoutSideBar/LayoutSideBar";
import PageContent from "@/features/companies/details/PageContent"
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
            label: "Company Details"
          },
        ],
      }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
