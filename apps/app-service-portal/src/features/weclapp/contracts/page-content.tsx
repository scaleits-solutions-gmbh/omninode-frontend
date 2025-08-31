import { PageHeader } from "frontend-common-kit";
import { ContractList } from "./list/contract-list";

export default function ContractsPageContent() {
  return (
    <>
      <PageHeader title="Contracts" subtitle="View and manage your Weclapp contracts and agreements" />
      <ContractList />
    </>
  );
}