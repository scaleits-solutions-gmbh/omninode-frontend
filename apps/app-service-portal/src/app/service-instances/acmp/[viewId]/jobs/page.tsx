import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import PageContent from "@/features/acmp/jobs/page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs",
};

export default function JobsPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "Service Portal",
      breadcrumbs: [
        {
          label: "ACMP",
        },
        {
          label: "Jobs"
        },
      ],
    }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
