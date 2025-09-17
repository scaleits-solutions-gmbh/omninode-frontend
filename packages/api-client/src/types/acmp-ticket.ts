import { PaginatedData } from "@scaleits-solutions-gmbh/org-lib-global-common-kit";

export type AcmpTicketListItem = {
  id: string;
  intId: number;
  caption: string;
  creationDate: string;
  lastModified: string;
  categoryEn?: string | null;
  categoryDe?: string | null;
  priority: number;
  stateEn?: string | null;
  stateDe?: string | null;
  ticketContact?: string | null;
  assignee?: string | null;
  impactEn?: string | null;
  impactDe?: string | null;
};

export type GetAcmpTicketsResponseDto = PaginatedData<AcmpTicketListItem>;
