"use client";

import {
  SearchInput,
  Card,
  Badge,
  Button,
} from "@repo/pkg-frontend-common-kit/components";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Service } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

const SERVICE_OPTIONS: Array<{
  id: Service;
  name: string;
  description: string;
  icon: string;
  isAvailable: boolean;
}> = [
  {
    id: Service.Acmp,
    name: "ACMP",
    description: "Connect ACMP using hostname and API key",
    icon: "/management-console/assets/services/acmp.svg",
    isAvailable: true,
  },
  {
    id: Service.Weclapp,
    name: "Weclapp",
    description: "Connect your Weclapp tenant via API key",
    icon: "/management-console/assets/services/weclapp.svg",
    isAvailable: true,
  },
  {
    id: "Document" as Service,
    name: "Document Management System",
    description: "Connect Document Management System using API key",
    icon: "/management-console/assets/services/document-management-system.svg",
    isAvailable: false,
  },
  {
    id: "M365" as Service,
    name: "Microsoft 365",
    description: "Connect Microsoft 365 using API key",
    icon: "/management-console/assets/services/m365.svg",
    isAvailable: false,
  },
];

export default function ServiceGallery({
  selectedService,
  onSelect,
  onContinue,
}: {
  selectedService?: Service;
  onSelect: (service: Service) => void;
  onContinue?: () => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return SERVICE_OPTIONS;
    return SERVICE_OPTIONS.filter(
      (opt) =>
        opt.name.toLowerCase().includes(s) ||
        opt.description.toLowerCase().includes(s)
    );
  }, [search]);

  return (
    <div className="flex flex-col gap-4">
      <div className="max-w-[300px]">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        {filtered.map((opt) => {
          const isSelected = selectedService === opt.id;
          const isUnavailable = !opt.isAvailable;
          return (
            <button
              key={opt.id}
              type="button"
              disabled={isUnavailable}
              aria-disabled={isUnavailable}
              onClick={() => {
                if (!isUnavailable) onSelect(opt.id);
              }}
              className={`relative w-full rounded-md border px-4 py-3 text-left transition ${
                isSelected
                  ? "border-primary ring-2 ring-primary/40"
                  : "hover:bg-muted/50"
              } ${isUnavailable ? "opacity-60 grayscale cursor-not-allowed hover:bg-transparent" : "cursor-pointer"}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-md bg-muted flex items-center justify-center">
                    <Image
                      src={opt.icon}
                      alt={opt.name}
                      width={20}
                      height={20}
                    />
                  </div>
                  <div>
                    <div className="font-medium">{opt.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {opt.description}
                    </div>
                  </div>
                </div>
                {isUnavailable ? (
                  <Badge variant="secondary">Coming soon</Badge>
                ) : (
                  <div
                    className={`size-2 rounded-full ${
                      isSelected ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  />
                )}
              </div>
              {isUnavailable && (
                <div className="pointer-events-none absolute inset-0 rounded-md bg-background/40 dark:bg-black/30" />
              )}
            </button>
          );
        })}
        {filtered.length === 0 && (
          <Card className="p-4 text-sm text-muted-foreground">
            No services match your search.
          </Card>
        )}
      </div>
      {onContinue && (
        <div className="flex justify-end pt-2">
          <Button disabled={!selectedService} onClick={onContinue}>
            Continue
          </Button>
        </div>
      )}
    </div>
  );
}
