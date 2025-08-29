import PageHeader from "@/components/display/pageHeader";
import { ContractList } from "./list/ContractList";

export default function ContractsPageContent() {
  return (
    <>
      <PageHeader title="Contracts" subtitle="View and manage your Weclapp contracts and agreements" />
      <ContractList />
    </>
  );
}