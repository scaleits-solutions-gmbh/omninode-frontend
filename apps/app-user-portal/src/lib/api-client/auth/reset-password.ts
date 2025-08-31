import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";
import { ResetPasswordProcess } from "@/types/fe-reset-password-process";

const apiClient = new BaseApiClient();

export const getResetPassword = async (
  token: string,
): Promise<ResetPasswordProcess> => {
  return await apiClient.get<ResetPasswordProcess>(`/auth/reset-password/`, {
    token,
  });
};

export const resetPassword = async (
  resetPasswordProcessId: string,
  newPassword: string,
): Promise<void> => {
  return await apiClient.post<void>(
    `/auth/reset-password/${resetPasswordProcessId}`,
    { newPassword },
  );
};
