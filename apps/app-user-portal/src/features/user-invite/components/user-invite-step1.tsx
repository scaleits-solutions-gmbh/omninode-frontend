"use client";
import { FeCompanyUserInvite } from "@/types/fe-company-user-invite";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
} from "@repo/pkg-frontend-common-kit/components";
import { useTranslations } from "next-intl";

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
  const t = useTranslations('features.userInvite.userInviteStep1');

  if (!data) {
    return (
      <Card className="w-full max-w-sm">
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              {t('noInvitationFound')}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t('unableToLoadInvitation')}
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
            {t('title')}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t('subtitle')}
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
              {t('invited')}: {data.email}
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
            {isButtonLoading ? t('acceptingInvitation') : t('acceptInvitation')}
          </Button>
        ) : (
          <Button onClick={onNext} className="w-full">
            {t('next')}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
