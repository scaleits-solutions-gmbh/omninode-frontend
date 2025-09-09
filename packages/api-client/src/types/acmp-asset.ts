import { PaginatedData } from "@scaleits-solutions-gmbh/org-lib-global-common-kit";

export type AcmpAssetListItem = {
  id: string;
};

export type GetAcmpAssetsResponseDto = PaginatedData<AcmpAssetListItem>;
