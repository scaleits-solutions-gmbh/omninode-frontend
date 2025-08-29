import SideBarLayout from "@/components/layout/layoutSideBar/layoutSideBar";
import PageContent from "@/features/weclapp/tickets/PageContent";
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
