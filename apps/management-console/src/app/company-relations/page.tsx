import SideBarLayout from "@/components/layout/layoutSideBar/layoutSideBar";
import PageContent from "@/features/company-relations/list/components/PageContent";
export default function CompanyRelationsPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "Company",
      breadcrumbs: [
        {
          label: "Company Relations"
        },
      ],
    }}
    >
      <PageContent />
    </SideBarLayout>
  );
}