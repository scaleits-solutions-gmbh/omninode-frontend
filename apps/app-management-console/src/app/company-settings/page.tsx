import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Settings",
  description: "Configure your company settings and preferences",
};

export default function CompanySettingsPage() {
  return (
    <SideBarLayout
      autoBreadCrumbs={{
        category: "Company",
        breadcrumbs: [
          {
            label: "Company Settings",
          },
        ],
      }}
    >
      Company Settings
    </SideBarLayout>
  );
}
