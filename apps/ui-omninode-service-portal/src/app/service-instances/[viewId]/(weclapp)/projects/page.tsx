import SideBarLayout from "@/components/layout/layoutSideBar/layoutSideBar";
import PageContent from "@/features/weclapp/projects/PageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

export default function UsersPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "Weclapp",
      breadcrumbs: [
        {
          label: "Projects"
        },
      ],
    }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
