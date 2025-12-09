import { redirect } from "next/navigation";
import { getDelegatedSession } from "@/lib/delegated-session";
import { getOrganizationClient } from "@repo/pkg-frontend-common-kit/utils";

export const dynamic = "force-dynamic";

/**
 * Root page for the Service Portal.
 * 
 * Responsibilities:
 * 1. Get user's organizations
 * 2. Redirect to first organization's page
 * 3. If no organizations, redirect to no-organizations page
 */
export default async function RootPage() {
  const session = await getDelegatedSession();

  // Get user's organizations
  const orgsResponse = await getOrganizationClient(session).findCurrentUserOrganizations({
    queryParams: {},
  });
  const organizations = orgsResponse.data ?? [];

  if (organizations.length === 0) {
    // No organizations → show no-organizations page
    redirect("/no-organizations");
  }

  // Redirect to first organization
  const firstOrg = organizations[0];
  redirect(`/${firstOrg.organizationId}`);
}
