"use client";
import { fetchUserProfile } from "@/lib/api-client/personal-settings";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Card,
  CardContent,
  Skeleton,
} from "@repo/pkg-frontend-common-kit/components";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, AtSign, Briefcase, Calendar, User } from "lucide-react";
import EditProfilePopup from "./edit-profile-popup";
import { useTranslations } from "next-intl";

export default function UserProfileCard() {
  const t = useTranslations('features.personalSettings.profileCard');
  const tCommon = useTranslations('common');
  const { data, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => fetchUserProfile(),
    retry: false,
  });

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "-";
    try {
      const dateObj = typeof date === "string" ? new Date(date) : date;
      if (isNaN(dateObj.getTime())) {
        return "-";
      }
      const formattedDate = dateObj.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return formattedDate;
    } catch (error) {
      console.error(error);
      return "-";
    }
  };

  if (isLoading)
    return (
      <Card>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-6 w-32" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-16 rounded" />
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <Skeleton className="h-5 w-20" />
              </div>
              <Skeleton className="h-5 w-48" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <Skeleton className="h-5 w-12" />
              </div>
              <Skeleton className="h-5 w-40" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-8 w-28 rounded" />
          </div>
        </CardContent>
      </Card>
    );

  if (!data)
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{tCommon('error')}</AlertTitle>
        <AlertDescription>
          {t('failedToLoadUserDetails')}
        </AlertDescription>
      </Alert>
    );

  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={data?.imageUrl}
              alt={data?.firstName + " " + data?.lastName}
            />
            <AvatarFallback seed={data?.id}>
              {data?.firstName?.charAt(0)}
              {data?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-medium">
              {data?.firstName + " " + data?.lastName}
            </h3>
            <div className="flex items-center gap-2">
              <Badge variant="success" className="text-xs">
                {tCommon('active')}
              </Badge>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <User className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground">
                {t('fullName')}
              </p>
            </div>
            <p className="text-sm">
              {data?.firstName +
                " " +
                (data?.middleNames ? data?.middleNames + " " : "") +
                data?.lastName}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <AtSign className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground">{tCommon('email')}</p>
            </div>
            <p className="text-sm">{data?.email}</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground">{t('position')}</p>
            </div>
            <p className="text-sm">{data?.position}</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground">
                {t('memberSince')}
              </p>
            </div>
            <p className="text-sm">{formatDate(data?.createdAt)}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <EditProfilePopup />
        </div>
      </CardContent>
    </Card>
  );
}
