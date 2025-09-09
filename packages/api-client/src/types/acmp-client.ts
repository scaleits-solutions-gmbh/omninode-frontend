import { PaginatedData } from "@scaleits-solutions-gmbh/org-lib-global-common-kit";

export type AcmpClientListItem = {
  id: string;
  name: string;
  ipAddress: string;
  domainFqdn: string;
  clientNo: number;
  tenantId: string;
  tenantName: string;
  lastUpdate: string;
  osInstallationDate: string;
  manufacturer: string;
  model: string;
  cpu: string;
  cpuCoreCount: number;
  cpuThreadCount: number;
  ram: string;
  hasBattery: string;
  batteryName: string;
  batteryHealth: string | null;
  osName: string;
  osArchitecture: string;
  osDisplayVersion: string;
  osPatchLevel: number;
  lastLoggedOnUser: string;
  installedAcmpVersion: string;
};

export type GetAcmpClientsResponseDto = PaginatedData<AcmpClientListItem>;

