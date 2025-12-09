import { PageHeader } from "@repo/pkg-frontend-common-kit/components";
import { OrganizationList } from "./list/organization-list";

export default function OrganizationsPageContent() {
  return (
    <>
      <PageHeader title="Companies" subtitle="Oversee companies of the Omninode Platform" />
      <OrganizationList />
    </>
  );
}