"use client";

import EditProfilePopup from "./edit-profile-popup";
import { fetchUser } from "@/lib/api-client/user-companies";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Skeleton,
  Alert,
  AlertDescription,
  AlertTitle,
} from "frontend-common-kit/components";
import { useQuery } from "@tanstack/react-query";
import {
  CalendarClock,
  AlertCircle,
  ShieldCheck,
  AtSign,
  User,
} from "lucide-react";
import { useParams } from "next/navigation";

export default function UserDetailsCard() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id as string),
  });

  const formatDate = (dateInput: string | Date | undefined) => {
    if (!dateInput) return "-";

    try {
      const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
      const formattedDate = date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      const formattedTime = date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `${formattedDate}, ${formattedTime}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return typeof dateInput === "string" ? dateInput : dateInput.toString(); // Fallback to original value if formatting fails
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex flex-col gap-0.5">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
            <div>
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-medium">User information</h4>
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 font-medium text-muted-foreground" />
                <span className="font-medium">Full name:</span>
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <AtSign className="h-4 w-4 font-medium text-muted-foreground" />
                <span className="font-medium">Email:</span>
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CalendarClock className="h-4 w-4 font-medium text-muted-foreground" />
                <span className="font-medium">Last login:</span>
                <Skeleton className="h-4 w-36" />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ShieldCheck className="h-4 w-4 font-medium text-muted-foreground" />
                <span className="font-medium">Management console access:</span>
                <Skeleton className="h-4 w-10" />
              </div>
            </div>
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-24" />
          </div>
        </CardContent>
      </Card>
    );
  }
  if (error || !data) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load user details. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={data?.imageUrl}
                alt={data?.firstName + " " + data?.lastName}
              />
              <AvatarFallback seed={data?.id}>
                {data?.firstName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <h3 className="font-medium">
                {data?.firstName + " " + data?.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">{data?.email}</p>
            </div>
          </div>
          <div>
            <Badge
              variant={data?.status === "active" ? "success" : "secondary"}
            >
              {data?.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-medium">User information</h4>
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 font-medium text-muted-foreground" />
              <span className="font-medium">Full name:</span>
              <span>{data?.firstName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <AtSign className="h-4 w-4 font-medium text-muted-foreground" />
              <span className="font-medium">Email:</span>
              <span>{data?.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CalendarClock className="h-4 w-4 font-medium text-muted-foreground" />
              <span className="font-medium">Last login:</span>
              <span>{formatDate(data?.lastSeenAt)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="h-4 w-4 font-medium text-muted-foreground" />
              <span className="font-medium">Management console access:</span>
              <span>
                {data?.managementConsoleAccess.charAt(0).toUpperCase() +
                  data?.managementConsoleAccess.slice(1)}
              </span>
            </div>
          </div>
          <span className="text-muted-foreground text-sm">
            Member since: {formatDate(data?.createdAt)}
          </span>
        </div>
        <div className="flex gap-3 mt-4">
          <EditProfilePopup />
        </div>
      </CardContent>
    </Card>
  );
}
