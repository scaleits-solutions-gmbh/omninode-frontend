import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import PageContent from "@/features/acmp/assets/page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assets",
};

export default function AssetsPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "Service Portal",
      breadcrumbs: [
        {
          label: "ACMP",
        },
        {
          label: "Assets"
        },
      ],
    }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
