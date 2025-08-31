import CompanyRelationsList from "./company-relations-list";
import InviteCompanyPopup from "./invite-company-popup";
import { PageHeader } from "@repo/pkg-frontend-common-kit/components";

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
