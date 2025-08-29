import PageHeader from "@/components/display/pageHeader";
import CompanyList from "./CompanyList";
import NewCompanyPopup from "./newCompanyPopup/NewCompanyPopup";
export default function PageContent() {
    return (
        <>
            <PageHeader title="Company List" 
                subtitle="View and manage all organizations in the system"
                actions={
                    <NewCompanyPopup />
                }
            />
            <CompanyList />
        </>
    )
}