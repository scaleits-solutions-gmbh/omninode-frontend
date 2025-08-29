import SideBarLayout from "@/components/layout/layoutSideBar/layoutSideBar";
export default function CompanySettingsPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "Company",
      breadcrumbs: [
        {
          label: "Company Settings"
        },
      ],
    }}
    >
      Company Settings
    </SideBarLayout>
  );
}