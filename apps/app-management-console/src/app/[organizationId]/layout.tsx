import { getOrganizationClient } from "@repo/pkg-frontend-common-kit/utils";  
import { redirect } from "next/navigation";
import { getDelegatedSession } from "@/lib/delegated-session";
import { OrganizationRole } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
export default async function OrganizationLayout({
  children,
  params,
}: {
  params: Promise<{ organizationId: string }>;
  children: React.ReactNode;
}) {
   const startTime = performance.now();
    const { organizationId } = await params;
    const session = await getDelegatedSession();
    if (!session) {
        throw new Error("Session not found");
    }
    const response = await getOrganizationClient(session).findCurrentUserOrganizations({
        queryParams: {
            organizationId: organizationId,
        },
    });
    const organizations = response.data;
    const endTime = performance.now();
    console.log(`Time taken to find organizations: ${endTime - startTime} milliseconds`);
    if (!organizations[0]) {
        redirect("/");
    }

    if (organizations[0].role !== OrganizationRole.Owner && organizations[0].role !== OrganizationRole.Admin) {
        redirect("/");
    }

  return <div>{children}</div>;
}