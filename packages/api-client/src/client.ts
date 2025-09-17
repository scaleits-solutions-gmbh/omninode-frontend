import {
  getAcmpAssets,
  getAcmpClientHardDrives,
  getAcmpClientNetworkCards,
  getAcmpClients,
  getAcmpClientInstalledSoftware,
  getAcmpJobs,
  getAcmpTickets,
  getUserCompanies,
  handleUserSignIn,
  getAcmpClientCommands,
  getAcmpRolloutTemplates,
  pushAcmpClientCommands,
  pushAcmpRolloutTemplate,
} from "./methods";
import { GetUserCompaniesResponseDto } from "./types/user-companies";

export class ApiClient {
  private static readonly baseUrl: string = process.env.NEXT_PUBLIC_API_URL || "Not configured";

  public static async handleUserSignIn(accessToken: string): Promise<void> {
    return await handleUserSignIn(this.baseUrl, accessToken);
  }

  public static async getUserCompanies(
    accessToken: string
  ): Promise<GetUserCompaniesResponseDto> {
    return await getUserCompanies(this.baseUrl, accessToken);
  }

  public static async getAcmpClients(
    accessToken: string,
    params: { serviceInstanceId: string; page?: number; pageSize?: number; search?: string }
  ) {
    return await getAcmpClients(this.baseUrl, accessToken, params);
  }

  public static async getAcmpJobs(
    accessToken: string,
    params: { serviceInstanceId: string; page?: number; pageSize?: number; search?: string }
  ) {
    return await getAcmpJobs(this.baseUrl, accessToken, params);
  }

  public static async getAcmpClientHardDrives(
    accessToken: string,
    params: {
      serviceInstanceId: string;
      clientId: string;
      page?: number;
      pageSize?: number;
      search?: string;
    }
  ) {
    return await getAcmpClientHardDrives(this.baseUrl, accessToken, params);
  }

  public static async getAcmpClientNetworkCards(
    accessToken: string,
    params: {
      serviceInstanceId: string;
      clientId: string;
      page?: number;
      pageSize?: number;
      search?: string;
    }
  ) {
    return await getAcmpClientNetworkCards(this.baseUrl, accessToken, params);
  }

  public static async getAcmpClientInstalledSoftware(
    accessToken: string,
    params: {
      serviceInstanceId: string;
      clientId: string;
      page?: number;
      pageSize?: number;
      search?: string;
    }
  ) {
    return await getAcmpClientInstalledSoftware(this.baseUrl, accessToken, params);
  }

  public static async getAcmpAssets(
    accessToken: string,
    params: { serviceInstanceId: string; page?: number; pageSize?: number; search?: string }
  ) {
    return await getAcmpAssets(this.baseUrl, accessToken, params);
  }

  public static async getAcmpTickets(
    accessToken: string,
    params: { serviceInstanceId: string; page?: number; pageSize?: number; search?: string }
  ) {
    return await getAcmpTickets(this.baseUrl, accessToken, params);
  }

  public static async getAcmpClientCommands(
    accessToken: string,
    params: { serviceInstanceId: string; page?: number; pageSize?: number; search?: string }
  ) {
    return await getAcmpClientCommands(this.baseUrl, accessToken, params);
  }

  public static async getAcmpRolloutTemplates(
    accessToken: string,
    params: { serviceInstanceId: string; page?: number; pageSize?: number; search?: string }
  ) {
    return await getAcmpRolloutTemplates(this.baseUrl, accessToken, params);
  }

  public static async pushAcmpClientCommands(
    accessToken: string,
    params: { serviceInstanceId: string; organizationId?: string },
    body: { commandId: string; clientIds: string[] },
  ) {
    return await pushAcmpClientCommands(this.baseUrl, accessToken, params, body);
  }

  public static async pushAcmpRolloutTemplate(
    accessToken: string,
    params: { serviceInstanceId: string },
    body: { rolloutId: string; clients: { id: string; newName: string; newDescription: string }[] },
  ) {
    return await pushAcmpRolloutTemplate(this.baseUrl, accessToken, params, body);
  }
}