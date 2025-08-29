import SideBarLayout from "@/components/layout/layoutSideBar/layoutSideBar";
import PageContent from "@/features/users/list/PageContent";
export default function UsersPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "Company",
      breadcrumbs: [
        {
          label: "Users"
        },
      ],
    }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
