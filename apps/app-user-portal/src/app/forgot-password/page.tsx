import LayoutCenteredXY from "@/components/layouts/layout-centered-xy/layout-centered-xy";
import PageContent from "@/features/forgot-password/page-content";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata.forgotPassword');
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function ForgotPasswordPage() {
  return (
    <LayoutCenteredXY showHeader={false}>
      <PageContent />
    </LayoutCenteredXY>
  );
}
