import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import { Metadata } from "next";
import PageContent from "@/features/organization-settings/page-content";

export const metadata: Metadata = {
  title: "Organization Settings",
  description: "Configure your organization settings and preferences",
};

export default function OrganizationSettingsPage() {
  return (
    <SideBarLayout
      autoBreadCrumbs={{
        category: "Organization",
        breadcrumbs: [
          {
            label: "Organization Settings",
          },
        ],
      }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
