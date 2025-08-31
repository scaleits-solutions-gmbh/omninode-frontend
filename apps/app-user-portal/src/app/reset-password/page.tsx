import LayoutCenteredXY from "@/components/layouts/layout-centered-xy/layout-centered-xy";
import ResetPasswordCardSkeleton from "@/features/reset-password/components/reset-password-card-skeleton";
import PageContent from "@/features/reset-password/page-content";
import { getSessionTokenPayload } from "@/lib/utils/misc/session-token";
import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata.resetPassword');
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function ResetPasswordPage() {
  let isLoggedIn = false;
  try {
    await getSessionTokenPayload();
    isLoggedIn = true;
  } catch {}
  return (
    <LayoutCenteredXY showHeader={isLoggedIn}>
      <Suspense fallback={<ResetPasswordCardSkeleton />}>
        <PageContent />
      </Suspense>
    </LayoutCenteredXY>
  );
}
