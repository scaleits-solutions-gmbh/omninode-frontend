import SideBarLayout from "@/components/layout/layoutSideBar/layoutSideBar";
import PageContent from "@/features/weclapp/quotations/PageContent";
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
