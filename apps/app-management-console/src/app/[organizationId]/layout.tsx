import { getOrganizationClient } from "@repo/pkg-frontend-common-kit/utils";  
import { redirect } from "next/navigation";
import { getDelegatedSession } from "@/lib/delegated-session";
import { OrganizationRole } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { unstable_cache } from "next/cache";
import type { Session } from "next-auth";
import { Suspense } from "react";
import { DelayedLoadingFallback } from "./delayed-loading-fallback";

async function getCachedUserOrganization(
  organizationId: string,
  userId: string,
  accessToken: string
) {
  return unstable_cache(
    async () => {
      // Create a minimal session-like object with just the access token
      const session = { access_token: accessToken } as Session;
      const response = await getOrganizationClient(session).findCurrentUserOrganizations({
        queryParams: {
          organizationId: organizationId,
        },
      });
      return response.data;
    },
    [`user-organization-${userId}-${organizationId}`],
    {
      revalidate: 60, // Cache for 60 seconds
      tags: [`user-organization-${userId}-${organizationId}`],
    }
  )();
}

async function OrganizationGuard({
  organizationId,
  userId,
  accessToken,
  children,
}: {
  organizationId: string;
  userId: string;
  accessToken: string;
  children: React.ReactNode;
}) {
  const startTime = performance.now();
  const organizations = await getCachedUserOrganization(organizationId, userId, accessToken);
  
  const endTime = performance.now();
  const duration = endTime - startTime;
  const isCacheHit = duration < 10; // Cache hits are typically < 10ms
  
  if (isCacheHit) {
    console.log(`✅ Cache HIT - Organizations loaded in ${duration.toFixed(2)}ms`);
  } else {
    console.log(`⏳ Cache MISS - Organizations loaded in ${duration.toFixed(2)}ms`);
  }
  
  if (!organizations?.[0]) {
    redirect("/");
  }

  if (organizations[0].role !== OrganizationRole.Owner && organizations[0].role !== OrganizationRole.Admin) {
    redirect("/");
  }

  return <>{children}</>;
}


export default async function OrganizationLayout({
  children,
  params,
}: {
  params: Promise<{ organizationId: string }>;
  children: React.ReactNode;
}) {
  const { organizationId } = await params;
  const session = await getDelegatedSession();
  if (!session) {
    throw new Error("Session not found");
  }
  
  const userId = session.user?.id || session.user?.email || "unknown";
  const accessToken = session.access_token;
  if (!accessToken) {
    throw new Error("Access token not found in session");
  }

  return (
    <Suspense fallback={<DelayedLoadingFallback />}>
      <OrganizationGuard
        organizationId={organizationId}
        userId={userId}
        accessToken={accessToken}
      >
        {children}
      </OrganizationGuard>
    </Suspense>
  );
}