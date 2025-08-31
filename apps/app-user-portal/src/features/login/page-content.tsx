import { AppLogo } from "@/components/custom/app-logo";
import LoginCard from "./components/login-card";
import { redirect } from "next/navigation";
import { isInternalUrl } from "@/lib/utils/misc/validate-url";
import { getSessionTokenPayload } from "@/lib/utils/misc/session-token";

interface PageContentProps {
  searchParams: { redirectUrl?: string };
}

export default async function PageContent({ searchParams }: PageContentProps) {
  const searchParamStore = await searchParams;
  const redirectUrl = searchParamStore.redirectUrl;
  try {
    const sessionTokenPayload = await getSessionTokenPayload();
    if (sessionTokenPayload.exp < Date.now() / 1000) {
      if (redirectUrl && isInternalUrl(redirectUrl)) {
        redirect(redirectUrl);
      } else {
        redirect("/");
      }
    }
  } catch {
    /* Do nothing let the user login */
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <AppLogo customSize={64} />
      <LoginCard redirectUrl={redirectUrl ?? undefined} />
    </div>
  );
}
