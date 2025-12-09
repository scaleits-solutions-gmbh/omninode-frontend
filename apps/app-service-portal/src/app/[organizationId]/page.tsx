import { redirect } from "next/navigation";
import Link from "next/link";
import { AlertCircle, Home, Settings } from "lucide-react";
import { Button } from "@repo/pkg-frontend-common-kit/components";
import { getDelegatedSession } from "@/lib/delegated-session";
import {
  getServiceClient,
  getOrganizationClient,
  getOriginUrl,
} from "@repo/pkg-frontend-common-kit/utils";
import {
  USER_PORTAL_BASE_URL,
  MANAGEMENT_CONSOLE_BASE_URL,
} from "@repo/pkg-frontend-common-kit/constants";
import { OrganizationRole } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { getFirstAccessibleResource } from "@/lib/utils/routing/get-first-accessible-resource";
import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ organizationId: string }>;
};

/**
 * Organization-level page.
 *
 * - If accessible views exist → redirects to first accessible resource
 * - If no views → renders "no access" UI with sidebar
 */
export default async function OrganizationPage({ params }: Props) {
  const { organizationId } = await params;
  const session = await getDelegatedSession();

  // Try to find accessible views
  let firstResource: string | null = null;
  
  try {
    const viewsResponse = await getServiceClient(session).findCurrentUserServiceViews({
      pathParams: { organizationId },
    });

    const views = viewsResponse.data ?? [];
    firstResource = getFirstAccessibleResource(organizationId, views);
  } catch {
    // If we can't fetch views, show no-access state below
  }

  // Redirect OUTSIDE of try-catch (redirect throws a special error)
  if (firstResource) {
    redirect(firstResource);
  }

  // No accessible views - check if user is admin/owner for showing Management Console button
  let canAccessManagementConsole = false;
  try {
    const orgsResponse = await getOrganizationClient(session).findCurrentUserOrganizations({
      queryParams: { organizationId },
    });
    const org = orgsResponse.data?.find((o) => o.organizationId === organizationId);
    if (org && (org.role === OrganizationRole.Owner || org.role === OrganizationRole.Admin)) {
      canAccessManagementConsole = true;
    }
  } catch {
    // If we can't fetch, just don't show the button
  }

  const userPortalUrl = getOriginUrl() + USER_PORTAL_BASE_URL;
  const managementConsoleUrl =
    getOriginUrl() + MANAGEMENT_CONSOLE_BASE_URL + `/${organizationId}/dashboard`;

  // Render no-access state
  return (
    <SideBarLayout
      autoBreadCrumbs={{
        category: "Service Portal",
        breadcrumbs: [
          {
            label: "Home",
          },
        ],
      }}
    >
      <div className="flex flex-col items-center justify-center flex-1 gap-6 p-4 min-h-[60vh]">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <div className="rounded-full bg-muted p-4">
            <AlertCircle className="h-10 w-10 text-muted-foreground" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            No Services Available
          </h1>

          <p className="text-muted-foreground">
            You don&apos;t have access to any services for this organization.
            {canAccessManagementConsole
              ? " As an administrator, you can configure service views in the Management Console."
              : " Please contact your administrator if you believe this is an error, or switch to another organization using the sidebar."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {canAccessManagementConsole && (
            <Button variant="outline" asChild>
              <Link href={managementConsoleUrl} className="gap-2">
                <Settings className="h-4 w-4" />
                Go to Management Console
              </Link>
            </Button>
          )}

          <Button asChild>
            <Link href={userPortalUrl} className="gap-2">
              <Home className="h-4 w-4" />
              Go to User Portal
            </Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          Organization ID: {organizationId}
        </p>
      </div>
    </SideBarLayout>
  );
}
