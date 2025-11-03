export const dynamic = "force-dynamic";

import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import OrganizationsPageContent from "@/features/organizations/page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Companies",
};

export default function OrganizationPage() {
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
      <OrganizationsPageContent />
    </SideBarLayout>
  );
}