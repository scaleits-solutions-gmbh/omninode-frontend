import SideBarLayout from "@/components/layout/layoutSideBar/LayoutSideBar";
import PageContent from "@/features/companies/list/PageContent";
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
