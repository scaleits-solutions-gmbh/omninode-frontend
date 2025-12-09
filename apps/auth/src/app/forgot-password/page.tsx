import { Suspense } from "react";
import PageContent from "@/features/forgot-password/page-content";
import { LayoutCenteredXY } from "@repo/pkg-frontend-common-kit/components";

export default function ForgotPasswordPage() {
  return (
    <LayoutCenteredXY>
      <Suspense fallback={<div>Loading...</div>}>
        <PageContent />
      </Suspense>
    </LayoutCenteredXY>
  );
}

