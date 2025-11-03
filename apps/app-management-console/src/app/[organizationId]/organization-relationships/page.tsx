import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import PageContent from "@/features/organization-relationships/page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Org Relationships",
  description: "Manage relationships and connections with other organizations",
};

export default function OrganizationRelationsPage() {
  return (
    <SideBarLayout
      autoBreadCrumbs={{
        category: "Business",
        breadcrumbs: [
          {
            label: "Org Relationships",
          },
        ],
      }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
