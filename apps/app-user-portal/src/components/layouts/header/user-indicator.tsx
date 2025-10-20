"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Skeleton,
} from "@repo/pkg-frontend-common-kit/components";
import { LogOut, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { useAuthedQuery } from "@repo/pkg-frontend-common-kit/hooks";
import { baseOmninodeApiClient, getApiAuthentication } from "@repo/omninode-api-client";
import Link from "next/link";

export default function UserIndicator() {
  const { data: session } = useSession();

  const {
    data: userData,
    isLoading,
    error,
  } = useAuthedQuery({
    queryKey: ["me"],
    queryFn: ({ accessToken }) =>
      baseOmninodeApiClient().omninodeUser.userMicroservice.findCurrentUser({
        apiAuthentication: getApiAuthentication(accessToken),
      }),
  });
  const handleLogout = () => {
    toast.loading("Logging out...", { id: "logout" });
    signOut({ callbackUrl: "/user-portal" });
  };

  if (isLoading) {
    return <Skeleton className="h-9 w-9 rounded-full" />;
  }

  if (error || !userData) {
    return <div>Failed to fetch user data: {error?.message}</div>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={""} alt={userData.body.firstName + " " + userData.body.lastName} />
            <AvatarFallback seed={userData.body.id}>
              {userData.body.firstName.charAt(0) + userData.body.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userData.body.firstName} {userData.body.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {userData.body.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/account-settings">
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Account settings
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
