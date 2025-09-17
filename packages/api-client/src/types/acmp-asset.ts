import { PaginatedData } from "@scaleits-solutions-gmbh/org-lib-global-common-kit";

export type AcmpAssetListItem = {
  id: string;
  // name mapped from assetName
  name: string;
  // type mapped from assetType (nullable in API)
  type: string | null;
  // lastUpdate mapped from lastModifiedDate (nullable in API)
  lastUpdate: string | null;
  // optional metadata from ACMP
  location?: string | null;
  costCenter?: string | null;
  department?: string | null;
  vendor?: string | null;
  manufacturer?: string | null;
  servicePartner?: string | null;
  stateEn?: string | null;
  stateDe?: string | null;
  inventoryNumber?: string | null;
  serialNumber?: string | null;
  model?: string | null;
  creationDate?: string;
  isLent?: boolean;
};

export type GetAcmpAssetsResponseDto = PaginatedData<AcmpAssetListItem>;
