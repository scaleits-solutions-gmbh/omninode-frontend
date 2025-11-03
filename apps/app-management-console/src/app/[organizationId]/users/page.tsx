import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import PageContent from "@/features/users/page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
  description: "Manage organization users and their permissions",
};

export default function UsersPage() {
  return (
    <SideBarLayout
      autoBreadCrumbs={{
        category: "Organization",
        breadcrumbs: [
          {
            label: "Users",
          },
        ],
      }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
