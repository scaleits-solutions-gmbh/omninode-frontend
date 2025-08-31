"use client";
import { AppLogo } from "@/components/custom/app-logo";
import { useUserId } from "@/hooks/use-session";
import { activateUserInvite, getUserInvite } from "@/lib/api-client/user-invite";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import {
  ExpiredInviteError,
  GeneralError,
  IncorrectUserError,
  NoDataError,
  NoTokenError,
} from "./components/errors";
import LoadingUserInviteCard from "./components/user-invite-card-skeleton";
import UserInviteStep1 from "./components/user-invite-step1";
import UserInviteStep2 from "./components/user-invite-step2";
import UserInviteStep3 from "./components/user-invite-step3";
import { ActivatingUser } from "./types/activating-user";

export default function UserInvitePageContent() {
  const [userData, setUserData] = useState<Partial<ActivatingUser>>({});
  const tNotifications = useTranslations('notifications');

  const handleStep1Next = () => {
    if (data?.userId) {
      toast.success(tNotifications('inviteAccepted'));
      router.push("/");
    } else {
      setStep(2);
    }
  };

  const handleStep2Next = (password: string) => {
    setUserData({ ...userData, password });
    setStep(3);
  };

  const handleStep2Back = (password: string) => {
    setUserData({ ...userData, password });
    setStep(1);
  };

  const handleStep3Back = (data: Partial<ActivatingUser>) => {
    setUserData({ ...userData, ...data });
    setStep(2);
  };

  const activateInviteMutation = useMutation({
    mutationFn: ({
      companyUserInviteId,
      userData,
    }: {
      companyUserInviteId: string;
      userData: {
        firstName: string;
        middleNames: string;
        lastName: string;
        position: string;
        password: string;
      };
    }) => activateUserInvite(companyUserInviteId, userData),
    onSuccess: () => {
      toast.success(tNotifications('inviteActivated'));
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [step, setStep] = useState(1);
  const currentUserId = useUserId();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["user-invite", token],
    queryFn: () => getUserInvite(token as string),
    enabled: !!token,
  });

  useEffect(() => {
    if (isRedirecting) {
      router.push(
        "/login?redirect=" + encodeURIComponent(window.location.href),
      );
    }
  }, [isRedirecting, router]);

  useEffect(() => {
    if (data && data.email && !userData.email) {
      setUserData((prev) => ({ ...prev, email: data.email }));
    }
  }, [data, userData.email]);

  if (!token) {
    return <NoTokenError />;
  }
  if (error) {
    return <GeneralError message={error.message} />;
  }

  if (isLoading) {
    return <LoadingUserInviteCard />;
  }

  if (!isLoading && !data) {
    return <NoDataError />;
  }

  const handleStep3Activate = async (step3Data: Partial<ActivatingUser>) => {
    const finalUserData = { ...userData, ...step3Data };
    setUserData(finalUserData);

    if (!data) {
      return;
    }

    if (
      data.id &&
      finalUserData.firstName &&
      finalUserData.lastName &&
      finalUserData.position &&
      finalUserData.password
    ) {
      activateInviteMutation.mutate({
        companyUserInviteId: data.id,
        userData: {
          firstName: finalUserData.firstName,
          middleNames: finalUserData.middleNames || "",
          lastName: finalUserData.lastName,
          position: finalUserData.position,
          password: finalUserData.password,
        },
      });
    }
  };

  if (data && data.expiresAt < new Date().toISOString()) {
    return <ExpiredInviteError />;
  }

  if (data && data.userId !== currentUserId) {
    if (!currentUserId) {
      if (!isRedirecting) {
        setIsRedirecting(true);
      }
      return null;
    }
    return <IncorrectUserError />;
  }

  return (
    <>
      <div className="w-full flex flex-col gap-6 items-center">
        <AppLogo />
        {step === 1 && (
          <UserInviteStep1
            isButtonLoading={activateInviteMutation.isPending}
            data={data}
            onNext={handleStep1Next}
          />
        )}
        {step === 2 && (
          <UserInviteStep2
            password={userData.password}
            onNext={handleStep2Next}
            onBack={handleStep2Back}
          />
        )}
        {step === 3 && (
          <UserInviteStep3
            isLoading={activateInviteMutation.isPending}
            userData={userData}
            onActivate={handleStep3Activate}
            onBack={handleStep3Back}
          />
        )}
      </div>
    </>
  );
}
