import { PaginatedData } from "@scaleits-solutions-gmbh/org-lib-global-common-kit";

export type AcmpRolloutTemplateListItem = {
  id: string;
  name: string;
  os: string;
};

export type GetAcmpRolloutTemplatesResponseDto = PaginatedData<AcmpRolloutTemplateListItem>;


