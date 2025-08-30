import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import PageContent from "@/features/users/details/page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Details",
  description: "View and manage user details and permissions",
};

export default async function UsersPage() {
  return (
    <SideBarLayout
      autoBreadCrumbs={{
        category: "Company",
        breadcrumbs: [
          {
            label: "Users",
            href: "/users",
          },
          {
            label: "User Details",
          },
        ],
      }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
