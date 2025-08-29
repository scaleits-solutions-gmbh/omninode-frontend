"use client";
import AppLogo from "@/components/display/appLogo";
import ResetPasswordCard from "./components/ResetPasswordCard";
import ResetPasswordCardSkeleton from "./components/ResetPasswordCardSkeleton";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getResetPassword } from "@/lib/apiClient/auth/resetPassword";
import { resetPassword } from "@/lib/apiClient/auth/resetPassword";
import { useUserId } from "@/hooks/useSession";
import {
  NoTokenError,
  GeneralError,
  NoDataError,
  TokenUsedError,
  TokenExpiredError,
  IncorrectUserError,
} from "./components/errors";

export default function PageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");
    const currentUserId = useUserId();

    const { data, isLoading, error } = useQuery({
        queryKey: ["reset-password", token],
        queryFn: () => getResetPassword(token as string),
        enabled: !!token,
    });

    const resetPasswordMutation = useMutation({
        mutationFn: async ({ password, resetPasswordProcessId }: { password: string, resetPasswordProcessId: string }) => {
            await resetPassword(resetPasswordProcessId, password);
        },
        onSuccess: () => {
            toast.success("Password reset successfully");
            router.replace("/login");
        },
        onError: () => {
            toast.error("Failed to reset password");
        },
    });

    const handleResetPassword = async (password: string) => {
        if (data?.id) {
            await resetPasswordMutation.mutateAsync({
                password,
                resetPasswordProcessId: data.id,
            });
        }
    };

    // Error handling following userInvite pattern
    if (!token) {
        return (
            <div className="w-full flex flex-col items-center gap-6">
                <AppLogo />
                <NoTokenError />
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full flex flex-col items-center gap-6">
                <AppLogo />
                <GeneralError message={error.message} />
            </div>
        );
    }

    // Show loading state
    if (isLoading) {
        return (
            <div className="w-full flex flex-col items-center gap-6">
                <AppLogo />
                <ResetPasswordCardSkeleton />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="w-full flex flex-col items-center gap-6">
                <AppLogo />
                <NoDataError />
            </div>
        );
    }

    if (data.isUsed) {
        return (
            <div className="w-full flex flex-col items-center gap-6">
                <AppLogo />
                <TokenUsedError />
            </div>
        );
    }

    if (new Date(data.expiresAt) < new Date()) {
        return (
            <div className="w-full flex flex-col items-center gap-6">
                <AppLogo />
                <TokenExpiredError />
            </div>
        );
    }

    if (currentUserId && currentUserId !== data.userId) {
        return (
            <div className="w-full flex flex-col items-center gap-6">
                <AppLogo />
                <IncorrectUserError />
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col items-center gap-6">
            <AppLogo />
            <ResetPasswordCard 
                onResetPassword={handleResetPassword}
                isLoading={resetPasswordMutation.isPending}
            />
        </div>
    );
} 