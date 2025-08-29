import PageHeader from "@/components/display/pageHeader";
import { ClientList } from "./list/ClientList";

export default function ClientsPageContent() {
  return (
    <>
      <PageHeader title="Clients" subtitle="View and manage your ACMP client connections" />
      <ClientList />
    </>
  );
}