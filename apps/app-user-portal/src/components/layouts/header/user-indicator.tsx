"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Skeleton,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@repo/pkg-frontend-common-kit/components";
import { logout } from "@/lib/api-client/auth/login";
import { fetchUserProfile } from "@/lib/api-client/personal-settings";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function UserIndicator() {
  const t = useTranslations('components.layout.userIndicator');
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => fetchUserProfile(),
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      toast.dismiss("logout");
      toast.success(t('loggedOutSuccessfully'));
      router.push("/login");
    },
    onError: () => {
      toast.error(t('failedToLogOut'));
    },
  });

  if (!data || error) {
    return <Skeleton className="h-9 w-9 rounded-full" />;
  }

  const handleLogout = () => {
    toast.loading(t('loggingOut'), { id: "logout" });
    logoutMutation.mutate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={data?.imageUrl}
              alt={data?.firstName + " " + data?.lastName}
            />
            <AvatarFallback seed={data?.id}>
              {data?.firstName.charAt(0) + data?.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {data?.firstName} {data?.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {data?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/personal-settings">
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              {t('personalSettings')}
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          {t('logOut')}
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
