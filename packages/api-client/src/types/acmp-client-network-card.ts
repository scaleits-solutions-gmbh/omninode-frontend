import { PaginatedData } from "@scaleits-solutions-gmbh/org-lib-global-common-kit";

export type AcmpClientNetworkCardListItem = {
  name: string;
  ipAddress: string;
  mac: string;
  dns: string;
  gateway: string;
  subnetMask: string;
  addressType: string;
};

export type GetAcmpClientNetworkCardResponseDto =
  PaginatedData<AcmpClientNetworkCardListItem>;
