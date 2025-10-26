import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import OrganizationsPageContent from "@/features/organizations/page-content";
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
      <OrganizationsPageContent />
    </SideBarLayout>
  );
}
