"use client";
import {
  Card,
  CardContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
} from "@repo/pkg-frontend-common-kit/components";
import { ArrowRightLeft, MoveRight } from "lucide-react";
import { feCompanyInvite } from "@/types/fe-company-invite";
import { CompanyRelationshipType } from "@scaleits-solutions-gmbh/services";
import { useTranslations } from "next-intl";

interface CompanyInviteCardProps {
  data: feCompanyInvite;
  onAccept: () => void;
  isLoading: boolean;
}

export default function CompanyInviteCard({
  data,
  onAccept,
  isLoading,
}: CompanyInviteCardProps) {
  const t = useTranslations('features.companyInvite.companyInviteCard');

  return (
    <Card className="w-full max-w-md">
      <CardContent className="flex flex-col gap-4 items-center">
        <div className="text-center space-y-2 mb-2">
          <h2 className="text-xl font-semibold text-foreground">
            {t('title')}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        <div className=" flex flex-col items-center gap-6 w-full">
          <div className="flex items-center gap-6">
            <div className="flex-1 min-w-0 flex flex-col text-center items-center gap-3">
              <Avatar className="h-12 w-12 rounded-md">
                <AvatarImage alt={data.leftCompanyName} />
                <AvatarFallback seed={data.leftCompanyId}>
                  {data.leftCompanyName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-foreground truncate max-w-36">
                  {data.leftCompanyName}
                </h3>
              </div>
            </div>
            {data.relationship === CompanyRelationshipType.Partner && (
              <ArrowRightLeft className="h-6 w-6" />
            )}
            {data.relationship === CompanyRelationshipType.ServiceProvision && (
              <MoveRight className="h-6 w-6" />
            )}
            <div className="flex-1 flex flex-col text-center items-center gap-3">
              <Avatar className="h-12 w-12 rounded-md">
                <AvatarImage alt={data.rightCompanyName} />
                <AvatarFallback seed={data.rightCompanyId}>
                  {data.rightCompanyName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-foreground truncate max-w-36">
                  {data.rightCompanyName}
                </h3>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {data.companyName}
            </span>{" "}
            {t('wantsYouToBe')}{" "}
            <span className="font-semibold text-foreground">
              {data.relationship === CompanyRelationshipType.ServiceProvision
                ? data.leftCompanyId === data.inviteeCompanyId
                  ? t('customer')
                  : t('serviceProvider')
                : t('partner')}
            </span>
          </p>
          <Button
            onClick={onAccept}
            disabled={isLoading}
            isLoading={isLoading}
            className="w-full cursor-pointer"
          >
            {isLoading ? t('accepting') : t('acceptInvitation')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
