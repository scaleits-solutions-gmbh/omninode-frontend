import { PageHeader } from "frontend-common-kit/components";
import { ClientList } from "./list/client-list";

export default function ClientsPageContent() {
  return (
    <>
      <PageHeader title="Clients" subtitle="View and manage your ACMP client connections" />
      <ClientList />
    </>
  );
}