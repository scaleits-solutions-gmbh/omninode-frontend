import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import PageContent from "@/features/weclapp/quotations/page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quotations",
};

export default function UsersPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "Weclapp",
      breadcrumbs: [
        {
          label: "Quotations"
        },
      ],
    }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
