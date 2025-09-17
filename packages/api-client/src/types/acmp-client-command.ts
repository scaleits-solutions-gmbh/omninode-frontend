import { PaginatedData } from "@scaleits-solutions-gmbh/org-lib-global-common-kit";

export type AcmpClientCommandListItem = {
  id: string;
  name: string;
};

export type GetAcmpClientCommandsResponseDto = PaginatedData<AcmpClientCommandListItem>;


