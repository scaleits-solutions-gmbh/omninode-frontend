import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import LayoutCenteredXY from "@/components/layouts/layout-centered-xy/layout-centered-xy";
import PageContent from "@/features/home/page-content";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.home");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Home() {
  return (
    <LayoutCenteredXY>
      <PageContent />
    </LayoutCenteredXY>
  );
}
