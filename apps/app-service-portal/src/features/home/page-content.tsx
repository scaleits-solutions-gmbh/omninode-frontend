"use client";
import { Loader2 } from "lucide-react";
import { usePersistedCurrentOrganization } from "@repo/pkg-frontend-common-kit/hooks";

export default function HomePageClient() {
  const { isLoading, error, organization } = usePersistedCurrentOrganization();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div>Failed to load service instances</div>;
  }

  if (!organization) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>No organization selected. Please select an organization from the sidebar.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <p>Select a service from the sidebar to get started.</p>
    </div>
  );
}
