import LayoutCenteredXY from "@/components/layouts/layout-centered-xy/layout-centered-xy";
import PageContent from "@/features/company-invite/page-content";
import { Metadata } from "next";
import { getSessionTokenPayload } from "@/lib/utils/misc/session-token";
import { Suspense } from "react";
import LoadingCompanyInviteCard from "@/features/company-invite/components/company-invite-card-skeleton";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata.companyInvite');
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function CompanyInvitePage() {
  let isLoggedIn = false;
  try {
    await getSessionTokenPayload();
    isLoggedIn = true;
  } catch {}

  return (
    <LayoutCenteredXY showHeader={isLoggedIn}>
      <Suspense fallback={<LoadingCompanyInviteCard />}>
        <PageContent />
      </Suspense>
    </LayoutCenteredXY>
  );
}
