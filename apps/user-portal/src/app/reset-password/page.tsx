import LayoutCenteredXY from "@/components/layout/layoutCenteredXY/layoutCenteredXY";
import ResetPasswordCardSkeleton from "@/features/resetPassword/components/ResetPasswordCardSkeleton";
import PageContent from "@/features/resetPassword/PageContent";
import { getSessionTokenPayload } from "@/lib/utils/misc/sessionToken";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your password",
};

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
