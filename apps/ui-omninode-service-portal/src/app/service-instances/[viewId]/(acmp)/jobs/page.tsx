import SideBarLayout from "@/components/layout/layoutSideBar/layoutSideBar";
import PageContent from "@/features/acmp/jobs/PageContent";
export default function UsersPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "ACMP",
      breadcrumbs: [
        {
          label: "Jobs"
        },
      ],
    }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
