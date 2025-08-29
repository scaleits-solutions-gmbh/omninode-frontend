"use client";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getInviteCode } from "@/lib/apiClient/auth/invitationFlow";
import { useEffect, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function ActivateAccountStep0Loading() {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3.5 w-20" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3.5 w-25" />
          <Skeleton className="h-9 w-full" />
        </div>
        <Skeleton className="h-9 w-full" />
      </CardContent>
    </Card>
  );
}

type ActivateAccountStep0Props = {
  onValidate: () => void;
};

function ActivateAccountStep0Content({
  onValidate,
}: ActivateAccountStep0Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inviteCode = searchParams.get("inviteCode");

  const { data, isLoading, error } = useQuery({
    queryKey: ["inviteCode", inviteCode],
    queryFn: () => (inviteCode ? getInviteCode(inviteCode) : null),
    enabled: !!inviteCode,
  });

  useEffect(() => {
    if (data?.isValid) {
      onValidate();
    }
  }, [data?.isValid, onValidate]);

  if (!inviteCode) {
    return (
      <Card className="w-full max-w-sm">
        <CardContent className="space-y-5">
          <div>No invite code found</div>
          <Button onClick={() => router.push("/")}>Go to home</Button>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return <ActivateAccountStep0Loading />;
  }

  if (error) {
    return (
      <Card className="w-full max-w-sm">
        <CardContent className="space-y-5">
          <div>Error: {error.message}</div>
        </CardContent>
      </Card>
    );
  }

  if (!data?.isValid) {
    toast.error("Invalid invite code");
    return (
      <Card className="w-full max-w-sm">
        <CardContent className="space-y-5">
          <div>Invalid invite code</div>
        </CardContent>
      </Card>
    );
  }

  return null;
}

export default function ActivateAccountStep0(props: ActivateAccountStep0Props) {
  return (
    <Suspense fallback={<ActivateAccountStep0Loading />}>
      <ActivateAccountStep0Content {...props} />
    </Suspense>
  );
}
