import {
  getAcmpAssets,
  getAcmpClientHardDrives,
  getAcmpClientNetworkCards, getAcmpClients, getAcmpClientInstalledSoftware, getAcmpJobs,
  getAcmpTickets,
  getUserCompanies, handleUserSignIn
} from "./methods";
import { GetUserCompaniesResponseDto } from "./types/user-companies";

export class ApiClient {

  public static async handleUserSignIn(accessToken: string): Promise<void> {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || "Not configured";
    return await handleUserSignIn(baseURL, accessToken);
  }

  public static async getUserCompanies(
    accessToken: string
  ): Promise<GetUserCompaniesResponseDto> {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || "Not configured";
    return await getUserCompanies(baseURL, accessToken);
  }

  public static async getAcmpClients(
    accessToken: string,
    params: { serviceInstanceId: string; page?: number; pageSize?: number; search?: string }
  ) {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || "Not configured";
    return await getAcmpClients(baseURL, accessToken, params);
  }

  public static async getAcmpJobs(
    accessToken: string,
    params: { serviceInstanceId: string; page?: number; pageSize?: number; search?: string }
  ) {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || "Not configured";
      return await getAcmpJobs(baseURL, accessToken, params);
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
    const baseURL = process.env.NEXT_PUBLIC_API_URL || "Not configured";
    return await getAcmpClientHardDrives(baseURL, accessToken, params);
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
    const baseURL = process.env.NEXT_PUBLIC_API_URL || "Not configured";
    return await getAcmpClientNetworkCards(baseURL, accessToken, params);
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
    const baseURL = process.env.NEXT_PUBLIC_API_URL || "Not configured";
    return await getAcmpClientInstalledSoftware(baseURL, accessToken, params);
  }

  public static async getAcmpAssets(
    accessToken: string,
    params: { serviceInstanceId: string; page?: number; pageSize?: number; search?: string }
  ) {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || "Not configured";
    return await getAcmpAssets(baseURL, accessToken, params);
  }

  public static async getAcmpTickets(
    accessToken: string,
    params: { serviceInstanceId: string; page?: number; pageSize?: number; search?: string }
  ) {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || "Not configured";
    return await getAcmpTickets(baseURL, accessToken, params);
  }
}