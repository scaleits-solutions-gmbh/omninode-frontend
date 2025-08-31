import { PageHeader } from "frontend-common-kit";
import CompanyList from "./company-list";
import NewCompanyPopup from "./new-company-popup/new-company-popup";
export default function PageContent() {
  return (
    <>
      <PageHeader
        title="Company List"
        subtitle="View and manage all organizations in the system"
        actions={<NewCompanyPopup />}
      />
      <CompanyList />
    </>
  );
}
