import LayoutCenteredX from "@/components/layouts/layout-centered-x/layout-centered-x";
import PageContent from "@/features/personal-settings/page-content";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata.personalSettings');
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function PersonalSettingsPage() {
  return (
    <LayoutCenteredX>
      <PageContent />
    </LayoutCenteredX>
  );
}
