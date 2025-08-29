import UserInvitePageContent from "@/features/userInvite/PageContent";
import LayoutCenteredXY from "@/components/layout/layoutCenteredXY/layoutCenteredXY";
import { getSessionTokenPayload } from "@/lib/utils/misc/sessionToken";
import { Suspense } from "react";
import LoadingUserInviteCard from "@/features/userInvite/components/UserInviteCardSkeleton";

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
