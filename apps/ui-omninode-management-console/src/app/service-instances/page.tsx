import SideBarLayout from "@/components/layout/layoutSideBar/layoutSideBar";
import PageContent from "@/features/service-instances/list/components/PageContent";
export default function ServiceInstancesPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "Company",
      breadcrumbs: [
        {
          label: "Service Instances"
        },
      ],
    }}
    >
      <PageContent />
    </SideBarLayout>
  );
}