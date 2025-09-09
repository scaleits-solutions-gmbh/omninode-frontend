import { PaginatedData } from "@scaleits-solutions-gmbh/org-lib-global-common-kit";

export type AcmpClientInstalledSoftwareListItem = {
  id: string;
  name: string;
  version: string;
  publisher: string;
  installDate: string;
};

export type GetAcmpClientInstalledSoftwareResponseDto =
  PaginatedData<AcmpClientInstalledSoftwareListItem>;
