import type { Metadata } from "next"; 
import LayoutCenteredXY from "@/components/layouts/layout-centered-xy/layout-centered-xy";
import PageContent from "@/features/home/page-content";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: "Home",
    description: "Home",
  };
}

export default function Home() {
  return (
    <LayoutCenteredXY>
      <PageContent />
    </LayoutCenteredXY>
  );
}