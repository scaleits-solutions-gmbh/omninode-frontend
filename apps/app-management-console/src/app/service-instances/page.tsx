import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import PageContent from "@/features/service-instances/list/components/page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Instances",
  description: "Manage your company's service instances and integrations",
};

export default function ServiceInstancesPage() {
  return (
    <SideBarLayout
      autoBreadCrumbs={{
        category: "Company",
        breadcrumbs: [
          {
            label: "Service Instances",
          },
        ],
      }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
