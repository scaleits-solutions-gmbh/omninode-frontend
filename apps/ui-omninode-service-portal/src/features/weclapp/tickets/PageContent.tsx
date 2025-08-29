import PageHeader from "@/components/display/pageHeader";
import { TicketList } from "./list/TicketList";

export default function TicketsPageContent() {
  return (
    <>
      <PageHeader title="Tickets" subtitle="Track and resolve customer support tickets" />
      <TicketList />
    </>
  );
}