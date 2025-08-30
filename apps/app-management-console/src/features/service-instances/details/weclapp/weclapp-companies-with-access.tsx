import WeclappCompanyAccessPermissionEditor from "./weclapp-company-access-permission-editor";
import WeclappGrantCompanyAccess from "./weclapp-grant-company-access";
import CompaniesWithAccess from "../global/companies-with-access";
import { fetchServiceInstanceCompaniesWithAccess } from "@/lib/api-client/service-instances";
import { FeWeclappServiceInstanceCompanyWithAccess } from "@/types/fe/fe-service-instance";
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
        PaginatedResponse<FeWeclappServiceInstanceCompanyWithAccess>
      >,
  });

  const [selectedCompany, setSelectedCompany] = useState<
    FeWeclappServiceInstanceCompanyWithAccess | undefined
  >(undefined);

  return (
    <>
      <WeclappCompanyAccessPermissionEditor
        FeWeclappServiceInstanceCompanyWithAccess={selectedCompany}
        onClose={() => setSelectedCompany(undefined)}
      />
      <CompaniesWithAccess
        onCompanyAccessChange={(companyIndex) => {
          setSelectedCompany(data?.items[companyIndex]);
        }}
        GrantCompanyAccess={<WeclappGrantCompanyAccess />}
      />
    </>
  );
}
