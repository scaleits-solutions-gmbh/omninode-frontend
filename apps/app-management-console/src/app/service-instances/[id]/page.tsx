import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import PageContent from "@/features/service-instances/details/page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Instance Details",
  description: "View and configure service instance settings",
};

export default function ServiceInstancesPage() {
  return (
    <SideBarLayout
      autoBreadCrumbs={{
        category: "Company",
        breadcrumbs: [
          {
            label: "Service Instances",
            href: "/service-instances",
          },
          {
            label: "Service Instance Details",
          },
        ],
      }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
