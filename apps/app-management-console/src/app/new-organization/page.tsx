import LayoutCenteredXY from "@/components/layout/layout-centered-xy/layout-centered-xy";
import PageContent from "@/features/new-organization/page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Organization",
};

export default function NewOrganizationPage() {
  return (
    <LayoutCenteredXY>
      <PageContent />
    </LayoutCenteredXY>
  );
}
