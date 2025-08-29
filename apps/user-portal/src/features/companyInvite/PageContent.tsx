"use client";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AppLogo from "@/components/display/appLogo";
import CompanyInviteCard from "./components/CompanyInviteCard";
import LoadingCompanyInviteCard from "./components/CompanyInviteCardSkeleton";
import {
  acceptCompanyInvite,
  getCompanyInvite,
} from "@/lib/apiClient/companyInvite";
import { useCompanyId } from "@/hooks/useSession";
import {
  NoTokenError,
  GeneralError,
  NoDataError,
  IncorrectCompanyError,
} from "./components/errors";
import { useEffect } from "react";

export default function PageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const currentCompanyId = useCompanyId();

  console.log(currentCompanyId);

  const { data, isLoading, error } = useQuery({
    queryKey: ["invitationData", token],
    queryFn: () => getCompanyInvite(token!),
    enabled: !!token,
  });

  useEffect(() => {
    console.log(currentCompanyId);
  }, [currentCompanyId]);

  const acceptInvitationMutation = useMutation({
    mutationFn: async (companyInviteId: string) => {
      return acceptCompanyInvite(companyInviteId);
    },
    onSuccess: () => {
      toast.success("Invitation accepted successfully!");
      router.replace("/");
    },
    onError: () => {
      toast.error("Failed to accept invitation");
    },
  });

  // Error handling following userInvite pattern
  if (!token) {
    return <NoTokenError />;
  }

  if (error) {
    return <GeneralError message={error.message} />;
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center gap-6">
        <AppLogo />
        <LoadingCompanyInviteCard />
      </div>
    );
  }

  if (!data) {
    return <NoDataError />;
  }

  const handleAcceptInvitation = () => {
    acceptInvitationMutation.mutate(data.id);
  };

  if (data.inviteeCompanyId !== currentCompanyId) {
    return <IncorrectCompanyError />;
  }

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <AppLogo />
      <CompanyInviteCard
        data={data}
        onAccept={handleAcceptInvitation}
          isLoading={acceptInvitationMutation.isPending}
        />
      </div>
  );
}
