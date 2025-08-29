import SideBarLayout from "@/components/layout/layoutSideBar/layoutSideBar";
import PageContent from "@/features/personalSettings.ts/components/PageContent";

export default function PersonalSettingsPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "Company",
      breadcrumbs: [
        {
          label: "Personal Settings"
        },
      ],
    }}
    >
      <PageContent />
    </SideBarLayout>
  );
}