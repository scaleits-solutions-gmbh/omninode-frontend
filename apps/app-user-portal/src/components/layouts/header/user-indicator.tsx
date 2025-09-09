"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Skeleton
} from "@repo/pkg-frontend-common-kit/components";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UserIndicator() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  const handleLogout = () => {
    toast.loading("Logging out...", { id: "logout" });
    signOut({ callbackUrl: "/user-portal" });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className="h-9 w-9 rounded-full" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={""}
              alt={session?.user?.name}
            />
            <AvatarFallback seed={session?.user?.id}>
              {(session?.user?.given_name?.charAt(0) ?? "") + (session?.user?.family_name?.charAt(0) ?? "")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/*
        <DropdownMenuGroup>
          <Link href="/personal-settings">
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Personal settings
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        */}
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
