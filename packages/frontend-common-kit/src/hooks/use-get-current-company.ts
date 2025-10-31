"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuthedQuery } from "./use-authed-query";
import { useMounted } from "./use-mounted";
import { useValidSession } from "./use-valid-session";
import { UserOrganizationReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { baseOmninodeApiClient, getApiAuthentication } from "@repo/omninode-api-client";
const CURRENT_COMPANY_ID_KEY = "currentOrganizationId";
const CURRENT_COMPANY_CHANGE_EVENT = "currentOrganizationIdChange";

function getCurrentOrganizationIdSafe(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(CURRENT_COMPANY_ID_KEY);
  } catch {
    return null;
  }
}

function setCurrentOrganizationIdSafe(companyId: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (!companyId) {
      localStorage.removeItem(CURRENT_COMPANY_ID_KEY);
    } else {
      localStorage.setItem(CURRENT_COMPANY_ID_KEY, companyId);
    }
  } catch {
    // ignore storage errors
  }
}

export type UseGetCurrentOrganizationResult = {
  companies: UserOrganizationReadModel[] | undefined;
  selectedOrganization: UserOrganizationReadModel | undefined;
  selectedOrganizationId: string | null;
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
  refetch: () => void;
  setSelectedOrganizationId: (companyId: string | null) => void;
};

export function useGetCurrentOrganization(): UseGetCurrentOrganizationResult {
  const mounted = useMounted();
  const { isValid: isSessionValid, status: sessionStatus } = useValidSession();
  const query = useAuthedQuery<UserOrganizationReadModel[]>({
    queryKey: ["current-user-companies"],
    queryFn: async ({ session }) => {
      const { body } = await baseOmninodeApiClient().organizationMicroservice.findCurrentUserOrganizations({
        apiAuthentication: getApiAuthentication(session.access_token),
      });
      return body ?? [];
    },
    refetchOnWindowFocus: false,
    staleTime: 60_000,
  });

  const [selectedOrganizationIdState, setSelectedOrganizationIdState] = useState<string | null>(getCurrentOrganizationIdSafe());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onStorage = (e: StorageEvent) => {
      if (e.key === CURRENT_COMPANY_ID_KEY) {
        setSelectedOrganizationIdState(e.newValue);
      }
    };
    const onCustomChange = (e: Event) => {
      // For safety, re-read from storage
      setSelectedOrganizationIdState(getCurrentOrganizationIdSafe());
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener(CURRENT_COMPANY_CHANGE_EVENT, onCustomChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(CURRENT_COMPANY_CHANGE_EVENT, onCustomChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!query.data) return; // avoid clearing persisted id before data loads
    const companies = query.data;
    if (!companies.length) {
      setCurrentOrganizationIdSafe(null);
      setSelectedOrganizationIdState(null);
      return;
    }
    const currentId = getCurrentOrganizationIdSafe();
    const exists = companies.some((c) => c.organizationId === currentId);
    if (!exists) {
      const firstOrganizationId = companies[0]?.organizationId ?? null;
      setCurrentOrganizationIdSafe(firstOrganizationId);
      setSelectedOrganizationIdState(firstOrganizationId);
    } else {
      // Ensure state reflects persisted selection
      setSelectedOrganizationIdState(currentId);
    }
  }, [query.data]);

  const selectedOrganizationId = selectedOrganizationIdState;

  const setSelectedOrganizationId = (companyId: string | null) => {
    setCurrentOrganizationIdSafe(companyId);
    setSelectedOrganizationIdState(companyId);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(CURRENT_COMPANY_CHANGE_EVENT));
    }
  };

  const selectedOrganization = useMemo(() => {
    const companies = query.data ?? [];
    if (!companies.length) return undefined;
    const currentId = selectedOrganizationId;
    if (!currentId) return companies[0];
    return companies.find((c) => c.organizationId === currentId) ?? companies[0];
  }, [query.data, selectedOrganizationId]);

  return {
    companies: query.data,
    selectedOrganization,
    selectedOrganizationId,
    isLoading:
      !mounted ||
      sessionStatus !== "authenticated" ||
      query.isLoading ||
      (isSessionValid && typeof query.data === "undefined"),
    isFetching: query.isFetching,
    error: query.error,
    refetch: () => {
      void query.refetch();
    },
    setSelectedOrganizationId,
  };
}


