export const dynamic = "force-dynamic";

import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import { Metadata } from "next";
import PlatformUsersPageContent from "@/features/platform-users/page-content";

export const metadata: Metadata = {
  title: "Platform Users",
};

export default function PLatformUsersPage() {
  return (
    <SideBarLayout
      autoBreadCrumbs={{
        category: "Management",
        breadcrumbs: [
          {
            label: "Platform Users"
          },
        ],
      }}
    >
      <PlatformUsersPageContent />
    </SideBarLayout>
  );
}