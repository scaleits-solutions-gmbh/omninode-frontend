import LayoutCenteredX from "@/components/layout/layoutCenteredX/layoutCenteredX";
import PageContent from "@/features/personalSettings/components/PageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Settings",
  description: "Personal Settings",
};

export default function PersonalSettingsPage() {
  return (
    <LayoutCenteredX>
        <PageContent />
    </LayoutCenteredX>
  );
}