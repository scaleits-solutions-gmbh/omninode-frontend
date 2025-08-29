import LayoutCenteredXY from "@/components/layout/layoutCenteredXY/layoutCenteredXY";
import PageContent from "@/features/companyInvite/PageContent";
import { Metadata } from "next";
import { getSessionTokenPayload } from "@/lib/utils/misc/sessionToken";
import { Suspense } from "react";
import LoadingCompanyInviteCard from "@/features/companyInvite/components/CompanyInviteCardSkeleton";

export const metadata: Metadata = {
  title: "Company Invitation",
  description: "Accept company invitation",
};

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
