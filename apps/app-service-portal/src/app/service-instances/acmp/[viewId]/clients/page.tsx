import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import PageContent from "@/features/acmp/clients/page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clients",
};

export default function UsersPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "Service Portal",
      breadcrumbs: [
        {
          label: "ACMP",
        },
        {
          label: "Clients"
        },
      ],
    }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
