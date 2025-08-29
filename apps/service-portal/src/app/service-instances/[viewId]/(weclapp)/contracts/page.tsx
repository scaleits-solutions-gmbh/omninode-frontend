import SideBarLayout from "@/components/layout/layoutSideBar/layoutSideBar";
import PageContent from "@/features/weclapp/contracts/PageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contracts",
};

export default function UsersPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "Weclapp",
      breadcrumbs: [
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
