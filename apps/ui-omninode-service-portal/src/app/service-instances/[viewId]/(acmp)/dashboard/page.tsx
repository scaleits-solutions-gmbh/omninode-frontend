import SideBarLayout from "@/components/layout/layoutSideBar/layoutSideBar";
import PageContent from "@/features/acmp/dashboard/PageContent";
export default function UsersPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "ACMP",
      breadcrumbs: [
        {
          label: "Dashboard"
        },
      ],
    }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
