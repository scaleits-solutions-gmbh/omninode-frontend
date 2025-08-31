import { PageHeader } from "@repo/pkg-frontend-common-kit/components";
import { ContractList } from "./list/contract-list";

export default function ContractsPageContent() {
  return (
    <>
      <PageHeader title="Contracts" subtitle="View and manage your Weclapp contracts and agreements" />
      <ContractList />
    </>
  );
}