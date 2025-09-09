import type { Metadata } from "next"; 
import LayoutCenteredXY from "@/components/layouts/layout-centered-xy/layout-centered-xy";
import PageContent from "@/features/home/page-content";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth-options";

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