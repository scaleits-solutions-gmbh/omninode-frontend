"use client";
import { OrganizationRole } from "@scaleits-solutions-gmbh/services";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export interface SessionData {
  currentUserId: string | undefined;
  currentCompanyId: string | undefined;
  organizationRole: OrganizationRole;
}

const getSessionData = async (): Promise<SessionData> => {
  const organizationRoleCookie = Cookies.get("organizationRole");

  return {
    currentUserId: Cookies.get("currentUserId"),
    currentCompanyId: Cookies.get("currentCompanyId"),
    organizationRole: organizationRoleCookie
      ? (organizationRoleCookie as OrganizationRole)
      : OrganizationRole.None,
  };
};

export function useSession() {
  const {
    data: sessionData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sessionData"],
    queryFn: getSessionData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return {
    sessionData,
    isLoading,
    error,
    isAuthenticated: Boolean(sessionData?.currentUserId),
  };
}

// Individual hooks for backwards compatibility
export function useUserId() {
  const { sessionData } = useSession();
  return sessionData?.currentUserId;
}

export function useCompanyId() {
  const { sessionData } = useSession();
  return sessionData?.currentCompanyId;
}

export function useOrganizationRole() {
  const { sessionData } = useSession();
  return sessionData?.organizationRole || OrganizationRole.None;
}
