import { useQuery } from "@tanstack/react-query";
import CompaniesWithAccess from "../global/CompaniesWithAccess";
import { useParams } from "next/navigation";
import WeclappCompanyAccessPermissionEditor from "./WeclappCompanyAccessPermissionEditor";
import { useState } from "react";
import { fetchServiceInstanceCompaniesWithAccess } from "@/lib/apiClient/serviceInstances";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";
import { FeWeclappServiceInstanceCompanyWithAccess } from "@/types/feServiceInstance";
import WeclappGrantCompanyAccess from "./WeclappGrantCompanyAccess";

export default function WeclappCompaniesWithAccess() {
    const { id } = useParams();
    const { data } = useQuery({
        queryKey: ["weclapp-companies-with-access", id],
        queryFn: () => fetchServiceInstanceCompaniesWithAccess(id as string) as Promise<PaginatedResponse<FeWeclappServiceInstanceCompanyWithAccess>>,
    });

    const [selectedCompany, setSelectedCompany] = useState<FeWeclappServiceInstanceCompanyWithAccess | undefined>(undefined);

    return (
        <>
            <WeclappCompanyAccessPermissionEditor 
                FeWeclappServiceInstanceCompanyWithAccess={selectedCompany} 
                onClose={() => setSelectedCompany(undefined)} 
            />
            <CompaniesWithAccess onCompanyAccessChange={(companyIndex) => {
                setSelectedCompany(data?.items[companyIndex]);
            }} GrantCompanyAccess={<WeclappGrantCompanyAccess />} />
        </>
    );
}