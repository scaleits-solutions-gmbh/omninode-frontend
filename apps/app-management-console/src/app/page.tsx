"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetCurrentOrganization } from "@repo/pkg-frontend-common-kit/hooks";
import { getOriginUrl } from "@repo/pkg-frontend-common-kit/utils";
import { USER_PORTAL_BASE_URL } from "@repo/pkg-frontend-common-kit/constants";
import { Loader2 } from "lucide-react";

export default function UsersPage() {
  const { selectedOrganizationId, isLoading, companies, error } = useGetCurrentOrganization();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !error && selectedOrganizationId) {
      router.push(`/${selectedOrganizationId}/dashboard`);
    }
  }, [selectedOrganizationId, isLoading, error, router]);

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  if (!isLoading && (!companies || companies.length === 0)) {
    router.replace(getOriginUrl() + USER_PORTAL_BASE_URL);
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
} 
