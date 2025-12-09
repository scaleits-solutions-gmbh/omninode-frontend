"use client";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { OrganizationRole } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export interface SessionData {
  currentUserId: string | undefined;
  currentOrganizationId: string | undefined;
  organizationRole: OrganizationRole | undefined;
}

const getSessionData = async (): Promise<SessionData> => {
  const organizationRoleCookie = Cookies.get("organizationRole");

  return {
    currentUserId: Cookies.get("currentUserId"),
    currentOrganizationId: Cookies.get("currentOrganizationId"),
    organizationRole: organizationRoleCookie
      ? (organizationRoleCookie as OrganizationRole)
      : undefined,
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

export function useOrganizationId() {
  const { sessionData } = useSession();
  return sessionData?.currentOrganizationId;
}

export function useOrganizationRole() {
  const { sessionData } = useSession();
  return sessionData?.organizationRole;
}
