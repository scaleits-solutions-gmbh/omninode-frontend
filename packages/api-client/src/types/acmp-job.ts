import { PaginatedData } from "@scaleits-solutions-gmbh/org-lib-global-common-kit";

export type AcmpJobListItem = {
  id: string;
  name: string;
  type: string;
  status: string;
  author?: string;
  dateTime?: string;
};

export type GetAcmpJobsResponseDto = PaginatedData<AcmpJobListItem>;
