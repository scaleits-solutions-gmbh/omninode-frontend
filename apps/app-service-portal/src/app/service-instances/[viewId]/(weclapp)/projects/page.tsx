import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import PageContent from "@/features/weclapp/projects/page-content";
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
