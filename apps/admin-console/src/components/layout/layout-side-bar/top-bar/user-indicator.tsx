"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Skeleton,
  Button,
} from "@repo/pkg-frontend-common-kit/components";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";


export default function UserIndicator() {
  const session = useSession();

  const handleLogout = () => {
    toast.loading("Logging out...", { id: "logout" });
    signOut({ callbackUrl: "/" });
  };

  if (session.status === "loading") return <Skeleton className="h-9 w-9 rounded-full" />;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={""}
              alt={session.data?.user.name}
            />
            <AvatarFallback seed={session.data?.user.id}>
              {`${
                (session.data?.user?.given_name?.[0]
                  ?? session.data?.user?.name?.split(" ")?.[0]?.[0]
                  ?? session.data?.user?.email?.[0]
                  ?? "").toUpperCase()
              }${
                (session.data?.user?.family_name?.[0]
                  ?? session.data?.user?.name?.split(" ")?.[1]?.[0]
                  ?? "").toUpperCase()
              }`}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.data?.user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.data?.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/*<DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />*/}
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
