import { PaginatedData } from "@scaleits-solutions-gmbh/org-lib-global-common-kit";

export type AcmpClientHardDriveListItem = {
  model: string;
  mediaType: string;
  size: string;
};

export type GetAcmpClientHardDriveResponseDto = PaginatedData<AcmpClientHardDriveListItem>;
