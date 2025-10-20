"use client";

import { useEffect, useMemo, useState } from "react";
import { ApiClient, Company } from "@repo/lib-api-client";
import { useAuthedQuery } from "./use-authed-query";
import { useMounted } from "./use-mounted";
import { useValidSession } from "./use-valid-session";
import { ManagementConsoleAccess } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

const CURRENT_COMPANY_ID_KEY = "currentCompanyId";
const CURRENT_COMPANY_CHANGE_EVENT = "currentCompanyIdChange";

function getCurrentCompanyIdSafe(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(CURRENT_COMPANY_ID_KEY);
  } catch {
    return null;
  }
}

function setCurrentCompanyIdSafe(companyId: string | null): void {
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

export type UseGetCurrentCompanyResult = {
  companies: Company[] | undefined;
  selectedCompany: Company | undefined;
  selectedCompanyId: string | null;
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
  refetch: () => void;
  setSelectedCompanyId: (companyId: string | null) => void;
};

export function useGetCurrentCompany(): UseGetCurrentCompanyResult {
  const mounted = useMounted();
  const { isValid: isSessionValid, status: sessionStatus } = useValidSession();
  const query = useAuthedQuery<Company[]>({
    queryKey: ["user-companies"],
    queryFn: async ({ accessToken }) => {/*
      const { companies } = await ApiClient.getUserCompanies(accessToken);
      return companies ?? [];*/
      return [{ id: "1", name: "Sample Company", managementConsoleAccess: ManagementConsoleAccess.User, serviceInstanceHosts: [] }];
    },
    refetchOnWindowFocus: false,
    staleTime: 60_000,
  });

  const [selectedCompanyIdState, setSelectedCompanyIdState] = useState<string | null>(getCurrentCompanyIdSafe());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onStorage = (e: StorageEvent) => {
      if (e.key === CURRENT_COMPANY_ID_KEY) {
        setSelectedCompanyIdState(e.newValue);
      }
    };
    const onCustomChange = (e: Event) => {
      // For safety, re-read from storage
      setSelectedCompanyIdState(getCurrentCompanyIdSafe());
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
      setCurrentCompanyIdSafe(null);
      setSelectedCompanyIdState(null);
      return;
    }
    const currentId = getCurrentCompanyIdSafe();
    const exists = companies.some((c) => c.id === currentId);
    if (!exists) {
      const firstCompanyId = companies[0]?.id ?? null;
      setCurrentCompanyIdSafe(firstCompanyId);
      setSelectedCompanyIdState(firstCompanyId);
    } else {
      // Ensure state reflects persisted selection
      setSelectedCompanyIdState(currentId);
    }
  }, [query.data]);

  const selectedCompanyId = selectedCompanyIdState;

  const setSelectedCompanyId = (companyId: string | null) => {
    setCurrentCompanyIdSafe(companyId);
    setSelectedCompanyIdState(companyId);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(CURRENT_COMPANY_CHANGE_EVENT));
    }
  };

  const selectedCompany = useMemo(() => {
    const companies = query.data ?? [];
    if (!companies.length) return undefined;
    const currentId = selectedCompanyId;
    if (!currentId) return companies[0];
    return companies.find((c) => c.id === currentId) ?? companies[0];
  }, [query.data, selectedCompanyId]);

  return {
    companies: query.data,
    selectedCompany,
    selectedCompanyId,
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
    setSelectedCompanyId,
  };
}


