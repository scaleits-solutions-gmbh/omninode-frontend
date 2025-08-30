import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import PageContent from "@/features/weclapp/tickets/page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tickets",
};

export default function UsersPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "Weclapp",
      breadcrumbs: [
        {
          label: "Tickets"
        },
      ],
    }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
