import { Suspense } from "react";
import PageContent from "@/features/sign-in/page-content";
import { LayoutCenteredXY } from "@repo/pkg-frontend-common-kit/components";

export default function SignInPage() {
  return (
    <LayoutCenteredXY>
      <Suspense fallback={<div>Loading...</div>}>
        <PageContent />
      </Suspense>
    </LayoutCenteredXY>
  );
}