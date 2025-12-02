import Link from "next/link";
import { Building2, Home } from "lucide-react";
import { Button } from "@repo/pkg-frontend-common-kit/components";
import { getOriginUrl } from "@repo/pkg-frontend-common-kit/utils";
import { USER_PORTAL_BASE_URL } from "@repo/pkg-frontend-common-kit/constants";

export const dynamic = "force-dynamic";

/**
 * No organizations page - shown when user has no organizations.
 */
export default function NoOrganizationsPage() {
  const userPortalUrl = getOriginUrl() + USER_PORTAL_BASE_URL;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 bg-background">
      <div className="flex flex-col items-center gap-4 text-center max-w-md">
        <div className="rounded-full bg-muted p-4">
          <Building2 className="h-10 w-10 text-muted-foreground" />
        </div>
        
        <h1 className="text-2xl font-semibold tracking-tight">
          No Organizations Available
        </h1>
        
        <p className="text-muted-foreground">
          You don&apos;t have access to any organizations yet.
          Please contact your administrator to be added to an organization,
          or create a new one from the User Portal.
        </p>
      </div>

      <Button asChild>
        <Link href={userPortalUrl} className="gap-2">
          <Home className="h-4 w-4" />
          Go to User Portal
        </Link>
      </Button>
    </div>
  );
}

