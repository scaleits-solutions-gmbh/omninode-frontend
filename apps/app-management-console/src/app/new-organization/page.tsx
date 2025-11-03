import { Metadata } from "next";
import PageContent from "@/features/new-organization/page-content";
import LayoutCenteredXY from "@/components/layout/layout-centered-xy/layout-centered-xy";

export const metadata: Metadata = {
  title: "New Organization",
  description: "Create a new organization",
};

export default function NewOrganizationPage() {
  return (
    <LayoutCenteredXY
    >
      <PageContent />
    </LayoutCenteredXY>
  );
}