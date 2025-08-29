import SideBarLayout from "@/components/layout/layoutSideBar/layoutSideBar";
import PageContent from "@/features/service-instances/details/PageContent";
export default function ServiceInstancesPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "Company",
      breadcrumbs: [
        {
          label: "Service Instances",
          href: "/service-instances"
        },
        {
          label: "Service Instance Details",
        }
      ],
    }}
    >
      <PageContent />
    </SideBarLayout>
  );
}