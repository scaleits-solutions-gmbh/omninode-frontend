import type { Metadata } from "next";
import PageContent from "@/features/home/page-content";
import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";

export const metadata: Metadata = {
  title: "Home | OmniNode",
  description: "Home page for OmniNode user portal",
};

export default function Home() {
  return (
    <SideBarLayout
      autoBreadCrumbs={{ category: "Base", breadcrumbs: [{ label: "Home" }] }}
    >
      <PageContent />
    </SideBarLayout>
  );
}
