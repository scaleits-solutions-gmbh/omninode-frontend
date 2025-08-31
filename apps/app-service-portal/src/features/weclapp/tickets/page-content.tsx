import {PageHeader} from "../../../../../../packages/frontend-common-kit/dist/components";
import { TicketList } from "./list/ticket-list";

export default function TicketsPageContent() {
  return (
    <>
      <PageHeader title="Tickets" subtitle="Track and resolve customer support tickets" />
      <TicketList />
    </>
  );
}