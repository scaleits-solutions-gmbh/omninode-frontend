import { useQuery } from "@tanstack/react-query";
import CompaniesWithAccess from "../global/CompaniesWithAccess";
import { useParams } from "next/navigation";
import AcmpCompanyAccessPermissionEditor from "./AcmpCompanyAccessPermissionEditor";
import { useState } from "react";
import { fetchServiceInstanceCompaniesWithAccess } from "@/lib/apiClient/serviceInstances";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";
import { FeAcmpServiceInstanceCompanyWithAccess } from "@/types/feServiceInstance";
import AcmpGrantCompanyAccess from "./AcmpGrantCompanyAccess";

export default function AcmpCompaniesWithAccess() {
    const { id } = useParams();
    const { data } = useQuery({
        queryKey: ["acmp-companies-with-access", id],
        queryFn: () => fetchServiceInstanceCompaniesWithAccess(id as string) as Promise<PaginatedResponse<FeAcmpServiceInstanceCompanyWithAccess>>,
    });

    const [selectedCompany, setSelectedCompany] = useState<FeAcmpServiceInstanceCompanyWithAccess | undefined>(undefined);

    return (
        <>
            <AcmpCompanyAccessPermissionEditor 
                FeAcmpServiceInstanceCompanyWithAccess={selectedCompany} 
                onClose={() => setSelectedCompany(undefined)} 
            />
            <CompaniesWithAccess onCompanyAccessChange={(companyIndex) => {
                setSelectedCompany(data?.items[companyIndex]);
            }} GrantCompanyAccess={<AcmpGrantCompanyAccess />} />
        </>
    );
}