import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import PageContent from "@/features/weclapp/contracts/page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contracts",
};

export default function UsersPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "Service Portal",
      breadcrumbs: [
        {
          label: "Weclapp",
        },
        {
          label: "Contracts"
        },
      ],
    }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
