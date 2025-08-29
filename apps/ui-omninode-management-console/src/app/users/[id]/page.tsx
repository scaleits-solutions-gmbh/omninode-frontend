import SideBarLayout from "@/components/layout/layoutSideBar/layoutSideBar";
import PageContent from "@/features/users/details/PageContent";
export default async function UsersPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "Company",
      breadcrumbs: [
        {
          label: "Users",
          href: "/users"
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
