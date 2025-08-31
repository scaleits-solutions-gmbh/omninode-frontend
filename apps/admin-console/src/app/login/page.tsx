import { LayoutCenteredXY } from "@repo/pkg-frontend-common-kit/components";
import PageContent from "@/features/login/page-content";
import { getSessionTokenPayload } from "@/lib/utils/misc/session-token";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
  let hasValidSession = false;
  try {
    const sessionTokenPayload = await getSessionTokenPayload();
    if (sessionTokenPayload.exp > Date.now() / 1000) {
      hasValidSession = true;
    }
  } catch {}

  if (hasValidSession) {
    redirect("/");
  }

  return (
    <LayoutCenteredXY>
      <PageContent />
    </LayoutCenteredXY>
  );
}
