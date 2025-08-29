"use client";
import { Card, CardContent } from "@/components/ui/card";
import { FeCompanyUserInvite } from "@/types/feCompanyUserInvite";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface UserInviteStep1Props {
  isButtonLoading: boolean;
  data?: FeCompanyUserInvite;
  onNext: () => void;
}

export default function UserInviteStep1({
  isButtonLoading,
  data,
  onNext,
}: UserInviteStep1Props) {
  if (!data) {
    return (
      <Card className="w-full max-w-sm">
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              No invitation found
            </h2>
            <p className="text-sm text-muted-foreground">
              Unable to load invitation details
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm rounded-lg shadow-md">
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            Company Invitation
          </h2>
          <p className="text-sm text-muted-foreground">
            You&apos;ve been invited to join a company
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Avatar className="rounded-md size-16">
            <AvatarImage />
            <AvatarFallback seed={data.companyId}>
              {data.companyName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="text-center space-y-1">
            <h3 className="text-lg font-medium text-foreground">
              {data.companyName}
            </h3>
            <p className="text-sm text-muted-foreground">
              Invited: {data.email}
            </p>
          </div>
        </div>
        {data.userId ? (
          <Button
            onClick={() => {
              onNext();
            }}
            className="w-full"
            disabled={isButtonLoading}
          >
            {isButtonLoading ? "Accepting Invitation..." : "Accept Invitation"}
          </Button>
        ) : (
          <Button onClick={onNext} className="w-full">
            Next
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
