import UserInvitePageContent from "@/features/user-invite/page-content";
import LayoutCenteredXY from "@/components/layouts/layout-centered-xy/layout-centered-xy";
import { getSessionTokenPayload } from "@/lib/utils/misc/session-token";
import { Suspense } from "react";
import LoadingUserInviteCard from "@/features/user-invite/components/user-invite-card-skeleton";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata.userInvite');
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function UserInvitePage() {
  let isLoggedIn = false;
  try {
    await getSessionTokenPayload();
    isLoggedIn = true;
  } catch {}

  return (
    <LayoutCenteredXY showHeader={isLoggedIn}>
      <Suspense fallback={<LoadingUserInviteCard />}>
        <UserInvitePageContent />
      </Suspense>
    </LayoutCenteredXY>
  );
}
