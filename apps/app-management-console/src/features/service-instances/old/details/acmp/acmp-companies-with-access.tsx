/* Commented out - service-instances feature
import AcmpOrganizationAccessPermissionEditor from "./acmp-organization-access-permission-editor";
import AcmpGrantOrganizationAccess from "./acmp-grant-organization-access";
import CompaniesWithAccess from "../global/companies-with-access";
import { fetchServiceInstanceCompaniesWithAccess } from "@/lib/api-client/service-instances";
import { FeAcmpServiceInstanceOrganizationWithAccess } from "@/types/fe/fe-service-instance";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function AcmpCompaniesWithAccess() {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["acmp-companies-with-access", id],
    queryFn: () =>
      fetchServiceInstanceCompaniesWithAccess(id as string) as Promise<
        PaginatedResponse<FeAcmpServiceInstanceOrganizationWithAccess>
      >,
  });

  const [selectedOrganization, setSelectedOrganization] = useState<
    FeAcmpServiceInstanceOrganizationWithAccess | undefined
  >(undefined);

  return (
    <>
      <AcmpOrganizationAccessPermissionEditor
        FeAcmpServiceInstanceOrganizationWithAccess={selectedOrganization}
        onClose={() => setSelectedOrganization(undefined)}
      />
      <CompaniesWithAccess
        onOrganizationAccessChange={(organizationIndex) => {
          setSelectedOrganization(data?.items[organizationIndex]);
        }}
        GrantOrganizationAccess={<AcmpGrantOrganizationAccess />}
      />
    </>
  );
}
*/
