import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import PageContent from "@/features/users/list/page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
  description: "Manage company users and their permissions",
};

export default function UsersPage() {
  return (
    <SideBarLayout
      autoBreadCrumbs={{
        category: "Company",
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
