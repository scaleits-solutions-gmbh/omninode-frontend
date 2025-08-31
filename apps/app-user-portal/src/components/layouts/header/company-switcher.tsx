"use client";
import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Skeleton,
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
  ScrollArea,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SearchInput,
} from "@repo/pkg-frontend-common-kit/components";
import { fetchCompanies } from "@/lib/api-client/company";
import { FeCompany } from "@/types/fe-company";
import { switchCompany } from "@/lib/api-client/auth/switch-company";
import { toast } from "sonner";
import { useCompanyId } from "@/hooks/use-session";
import { useTranslations } from "next-intl";

export default function CompanySwitcher() {
  // Move all hooks to the top before any conditional logic
  const t = useTranslations('components.layout.companySwitcher');
  const queryClient = useQueryClient();
  const [search, setSearch] = React.useState("");
  const isMobile = useIsMobile();
  const [activeOrganization, setActiveOrganization] = React.useState<
    FeCompany | undefined
  >(undefined);

  const { data, isLoading, error } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
  });
  const currentCompanyId = useCompanyId();

  // Mutation for switching companies
  const switchCompanyMutation = useMutation({
    mutationFn: (companyId: string) => switchCompany(companyId),
    onSettled: () => {
      toast.dismiss("switch-company");
    },
    onSuccess: (_, companyId) => {
      toast.success(t('companySwitchedSuccessfully'));
      // Update the company ID in the Zustand store
      queryClient.invalidateQueries({ queryKey: ["sessionData"] });
      // Find and set the active organization
      const company = data?.items.find((c) => c.id === companyId);
      if (company) {
        setActiveOrganization(company);
      }
    },
    onError: () => {
      toast.error(t('failedToSwitchCompany'));
    },
  });

  // Use useEffect to set the active organization when data is loaded
  React.useEffect(() => {
    const companies = data?.items;
    if (companies && companies.length > 0 && !activeOrganization) {
      setActiveOrganization(
        companies.find((c) => c.id === currentCompanyId) || companies[0]
      );
    }
  }, [data, activeOrganization, currentCompanyId]);

  const handleCompanySwitch = (company: FeCompany) => {
    if (company.id !== activeOrganization?.id) {
      toast.loading(t('switchingCompany'), {
        id: "switch-company",
      });
      switchCompanyMutation.mutate(company.id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-4 w-24" />
      </div>
    );
  }

  if (error || !data) {
    return <div className="text-sm text-muted-foreground">{t('failedToLoad')}</div>;
  }

  if (!activeOrganization) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 gap-2 hover:bg-accent hover:text-accent-foreground"
          disabled={switchCompanyMutation.isPending}
        >
          <Avatar className="h-6 w-6 rounded-sm">
            <AvatarImage />
            <AvatarFallback seed={activeOrganization.id}>
              {activeOrganization.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium truncate max-w-24">
            {activeOrganization.name}
          </span>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-56 rounded-lg"
        align="end"
        side={isMobile ? "top" : "bottom"}
      >
        <ScrollArea className="max-h-[300px]">
          {data?.items.map((company: FeCompany) => (
            <DropdownMenuItem
              key={company.id}
              onClick={() => handleCompanySwitch(company)}
              className="gap-2 p-2"
              disabled={switchCompanyMutation.isPending}
            >
              <Avatar className="size-6 rounded-sm">
                <AvatarImage />
                <AvatarFallback seed={company.id}>
                  {company.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{company.name}</span>
                <span className="text-xs text-muted-foreground">
                  {company.type}
                </span>
              </div>
              {company.id === currentCompanyId && (
                <Check className="h-4 w-4 text-primary" />
              )}
              {/* Show loading indicator for the company being switched to */}
              {switchCompanyMutation.isPending &&
                company.id === switchCompanyMutation.variables && (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                )}
            </DropdownMenuItem>
          ))}
        </ScrollArea>
        <DropdownMenuSeparator />
        <div className="p-2 data-[state=open]:bg-sidebar-accent z-10">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
