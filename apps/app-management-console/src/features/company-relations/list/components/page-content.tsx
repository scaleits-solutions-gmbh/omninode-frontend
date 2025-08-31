import CompanyRelationsList from "./company-relations-list";
import InviteCompanyPopup from "./invite-company-popup";
import { PageHeader } from "../../../../../../../packages/frontend-common-kit/dist/components";

export default function PageContent() {
  return (
    <>
      <PageHeader
        title="Company Relations"
        subtitle="Manage partnerships and business relationships"
        actions={<InviteCompanyPopup />}
      />
      <CompanyRelationsList />
    </>
  );
}
