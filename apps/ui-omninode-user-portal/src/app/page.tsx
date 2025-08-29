import type { Metadata } from "next";
import LayoutCenteredXY from "@/components/layout/layoutCenteredXY/layoutCenteredXY";
import PageContent from "@/features/home/PageContent";

export const metadata: Metadata = {
  title: "Home | OmniNode",
  description: "Home page for OmniNode user portal",
};

export default function Home() {
  return (
    <LayoutCenteredXY>
      <PageContent />
    </LayoutCenteredXY>
  );
}
