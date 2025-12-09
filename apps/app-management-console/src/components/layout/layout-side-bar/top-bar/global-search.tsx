"use client";

import type { DialogProps } from "@radix-ui/react-dialog";
import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@repo/pkg-frontend-common-kit/components";
import { CreditCard, Group, Layers2, LayoutDashboard, Search, Settings, Smile, Users } from "lucide-react";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useRouteCurrentOrganization } from "@repo/pkg-frontend-common-kit/hooks";

export default function GlobalSearch({ ...props }: DialogProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { organizationId } = useRouteCurrentOrganization();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Open/close search dialog
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
        return;
      }

      // Only handle shortcuts when dialog is open
      if (!open || !organizationId) return;

      // Navigation shortcuts
      if (e.metaKey || e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case "d":
            e.preventDefault();
            router.push(`/${organizationId}/dashboard`);
            setOpen(false);
            break;
          case "s":
            e.preventDefault();
            router.push(`/${organizationId}/service-instances`);
            setOpen(false);
            break;
          case "r":
            e.preventDefault();
            router.push(`/${organizationId}/organization-relationships`);
            setOpen(false);
            break;
          case "u":
            e.preventDefault();
            router.push(`/${organizationId}/users`);
            setOpen(false);
            break;
          case "o":
            e.preventDefault();
            router.push(`/${organizationId}/organization-settings`);
            setOpen(false);
            break;
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, organizationId, router]);

  return (
    <>
      <div className="flex">
        <Button
          variant="outline"
          className="relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 hidden sm:flex"
          onClick={() => setOpen(true)}
          {...props}
        >
          <span className="inline-flex">
            <Search className="mr-2 h-4 w-4" />
            Search...
          </span>
          <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full flex sm:hidden"
          onClick={() => setOpen(true)}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Search className="mr-2 h-4 w-4" />
              <span>Search</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Navigation">
            <CommandItem
              onSelect={() => {
                if (organizationId) {
                  router.push(`/${organizationId}/dashboard`);
                  setOpen(false);
                }
              }}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
              <CommandShortcut>⌘D</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                if (organizationId) {
                  router.push(`/${organizationId}/service-instances`);
                  setOpen(false);
                }
              }}
            >
              <Layers2 className="h-4 w-4" />
              <span>Service Instances</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                if (organizationId) {
                  router.push(`/${organizationId}/organization-relationships`);
                  setOpen(false);
                }
              }}
            >
              <Smile className="h-4 w-4" />
              <span>Org Relationships</span>
              <CommandShortcut>⌘R</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                if (organizationId) {
                  router.push(`/${organizationId}/users`);
                  setOpen(false);
                }
              }}
            >
              <Users className="h-4 w-4" />
              <span>Users</span>
              <CommandShortcut>⌘U</CommandShortcut>
            </CommandItem>
            <CommandItem disabled>
              <Group className="h-4 w-4" />
              <span>Groups</span>
              <CommandShortcut>⌘G</CommandShortcut>
            </CommandItem>
            <CommandItem disabled>
              <CreditCard className="h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                if (organizationId) {
                  router.push(`/${organizationId}/organization-settings`);
                  setOpen(false);
                }
              }}
            >
              <Settings className="h-4 w-4" />
              <span>Organization Settings</span>
              <CommandShortcut>⌘O</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
