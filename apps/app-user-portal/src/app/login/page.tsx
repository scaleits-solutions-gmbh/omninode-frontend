import LayoutCenteredXY from "@/components/layouts/layout-centered-xy/layout-centered-xy";
import PageContent from "@/features/login/page-content";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata.login');
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ redirectUrl?: string }> }) {
  const resolvedSearchParams = await searchParams;
  return (
    <LayoutCenteredXY showHeader={false}>
      <PageContent searchParams={resolvedSearchParams} />
    </LayoutCenteredXY>
  );
}
