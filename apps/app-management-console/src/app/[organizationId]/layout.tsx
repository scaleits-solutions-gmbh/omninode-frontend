import { baseOmninodeApiClient, getApiAuthentication } from "@repo/omninode-api-client";  
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
    const organizations = await baseOmninodeApiClient().organizationMicroservice.findCurrentUserOrganizations({
        apiAuthentication: getApiAuthentication(session.access_token),
        request: {
            queryParams: {
                organizationId: organizationId,
            },
        },
    });
    const endTime = performance.now();
    console.log(`Time taken to find organizations: ${endTime - startTime} milliseconds`);
    if (!organizations.body[0]) {
        redirect("/");
    }

    if (organizations.body[0].role !== OrganizationRole.Owner && organizations.body[0].role !== OrganizationRole.Admin) {
        redirect("/");
    }

  return <div>{children}</div>;
}