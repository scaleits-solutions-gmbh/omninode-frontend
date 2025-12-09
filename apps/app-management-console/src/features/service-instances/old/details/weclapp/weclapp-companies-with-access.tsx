/* Commented out - service-instances feature
import WeclappOrganizationAccessPermissionEditor from "./weclapp-organization-access-permission-editor";
import WeclappGrantOrganizationAccess from "./weclapp-grant-organization-access";
import CompaniesWithAccess from "../global/companies-with-access";
import { fetchServiceInstanceCompaniesWithAccess } from "@/lib/api-client/service-instances";
import { FeWeclappServiceInstanceOrganizationWithAccess } from "@/types/fe/fe-service-instance";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function WeclappCompaniesWithAccess() {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["weclapp-companies-with-access", id],
    queryFn: () =>
      fetchServiceInstanceCompaniesWithAccess(id as string) as Promise<
        PaginatedResponse<FeWeclappServiceInstanceOrganizationWithAccess>
      >,
  });

  const [selectedOrganization, setSelectedOrganization] = useState<
    FeWeclappServiceInstanceOrganizationWithAccess | undefined
  >(undefined);

  return (
    <>
      <WeclappOrganizationAccessPermissionEditor
        FeWeclappServiceInstanceOrganizationWithAccess={selectedOrganization}
        onClose={() => setSelectedOrganization(undefined)}
      />
      <CompaniesWithAccess
        onOrganizationAccessChange={(organizationIndex) => {
          setSelectedOrganization(data?.items[organizationIndex]);
        }}
        GrantOrganizationAccess={<WeclappGrantOrganizationAccess />}
      />
    </>
  );
}
*/
