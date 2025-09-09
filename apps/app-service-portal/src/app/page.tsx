import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import HomePageClient from "../features/home/page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function UsersPage() {
  return (
    <SideBarLayout
      autoBreadCrumbs={{
        category: "Home",
        breadcrumbs: [
          {
            label: "Home",
          },
        ],
      }}
    >
      <HomePageClient />
    </SideBarLayout>
  );
}
