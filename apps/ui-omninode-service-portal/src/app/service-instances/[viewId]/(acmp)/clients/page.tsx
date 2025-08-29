import SideBarLayout from "@/components/layout/layoutSideBar/layoutSideBar";
import PageContent from "@/features/acmp/clients/PageContent";
export default function UsersPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "ACMP",
      breadcrumbs: [
        {
          label: "Clients"
        },
      ],
    }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
