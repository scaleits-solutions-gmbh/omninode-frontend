import { PaginatedData } from "@scaleits-solutions-gmbh/org-lib-global-common-kit";

export type AcmpTicketListItem = {
  id: string;
};

export type GetAcmpTicketsResponseDto = PaginatedData<AcmpTicketListItem>;
