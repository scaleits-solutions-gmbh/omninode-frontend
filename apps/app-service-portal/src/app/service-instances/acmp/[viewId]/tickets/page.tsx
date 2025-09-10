import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import PageContent from "@/features/acmp/tickets/page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tickets",
};

export default function TicketsPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "Service Portal",
      breadcrumbs: [
        {
          label: "ACMP",
        },
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
