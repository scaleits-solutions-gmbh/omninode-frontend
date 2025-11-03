import { baseOmninodeApiClient, getApiAuthentication } from "@repo/omninode-api-client";  
import { redirect } from "next/navigation";
import { getDelegatedSession } from "@/lib/delegated-session";
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
    const organization = await baseOmninodeApiClient().organizationMicroservice.findBasicOrganizationInfoById({
        apiAuthentication: getApiAuthentication(session.access_token),
        request: {
            pathParams: {
                id: organizationId,
            },
        },
    });
    if (!organization) {
        redirect("/");
    }

  return <div>{children}</div>;
}
