"use client";
import { AppLogo } from "@/components/custom/app-logo";
import { useCompanyId } from "@/hooks/use-session";
import {
  acceptCompanyInvite,
  getCompanyInvite,
} from "@/lib/api-client/company-invite";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import CompanyInviteCard from "./components/company-invite-card";
import LoadingCompanyInviteCard from "./components/company-invite-card-skeleton";
import {
  GeneralError,
  IncorrectCompanyError,
  NoDataError,
  NoTokenError,
} from "./components/errors";

export default function PageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const currentCompanyId = useCompanyId();
  const tNotifications = useTranslations('notifications');

  const { data, isLoading, error } = useQuery({
    queryKey: ["invitationData", token],
    queryFn: () => getCompanyInvite(token!),
    enabled: !!token,
  });

  useEffect(() => {
    // Company ID effect logic can be added here if needed
  }, [currentCompanyId]);

  const acceptInvitationMutation = useMutation({
    mutationFn: async (companyInviteId: string) => {
      return acceptCompanyInvite(companyInviteId);
    },
    onSuccess: () => {
      toast.success(tNotifications('invitationAcceptedSuccessfully'));
      router.replace("/");
    },
    onError: () => {
      toast.error(tNotifications('failedToAcceptInvitation'));
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
