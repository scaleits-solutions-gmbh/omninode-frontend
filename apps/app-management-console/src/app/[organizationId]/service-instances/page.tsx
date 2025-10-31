import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
// import PageContent from "@/features/service-instances/list/components/page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Instances",
  description: "Manage your organization's service instances and integrations",
};

export default function ServiceInstancesPage() {
  return (
    <SideBarLayout
      autoBreadCrumbs={{
        category: "Business",
        breadcrumbs: [
          {
            label: "Service Instances",
          },
        ],
      }}
    >
      {/* <PageContent /> */}
      <div>Service Instances</div>
    </SideBarLayout>
  );
}
