export interface FeCompanyUserInvite {
  id: string;
  userId?: string;
  companyId: string;
  companyName: string;
  email: string;
  expiresAt: string;
}