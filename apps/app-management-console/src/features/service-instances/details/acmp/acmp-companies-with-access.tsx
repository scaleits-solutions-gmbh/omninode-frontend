import AcmpCompanyAccessPermissionEditor from "./acmp-company-access-permission-editor";
import AcmpGrantCompanyAccess from "./acmp-grant-company-access";
import CompaniesWithAccess from "../global/companies-with-access";
import { fetchServiceInstanceCompaniesWithAccess } from "@/lib/api-client/service-instances";
import { FeAcmpServiceInstanceCompanyWithAccess } from "@/types/fe/fe-service-instance";
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
        PaginatedResponse<FeAcmpServiceInstanceCompanyWithAccess>
      >,
  });

  const [selectedCompany, setSelectedCompany] = useState<
    FeAcmpServiceInstanceCompanyWithAccess | undefined
  >(undefined);

  return (
    <>
      <AcmpCompanyAccessPermissionEditor
        FeAcmpServiceInstanceCompanyWithAccess={selectedCompany}
        onClose={() => setSelectedCompany(undefined)}
      />
      <CompaniesWithAccess
        onCompanyAccessChange={(companyIndex) => {
          setSelectedCompany(data?.items[companyIndex]);
        }}
        GrantCompanyAccess={<AcmpGrantCompanyAccess />}
      />
    </>
  );
}
