"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
export default function AppLogo() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc =
    theme == "dark"
      ? "/assets/omninode-dark.svg"
      : theme == "system" && systemTheme == "dark"
      ? "/assets/omninode-dark.svg"
      : "/assets/omninode.svg";

  return (
    <div className="flex items-center gap-2">
      {mounted ? (
        <Image src={logoSrc} alt="logo" width={42} height={42} />
      ) : (
        <Skeleton className="w-8 h-8 rounded-full" />
      )}
      <div className="flex flex-col items-start">
        <span className="text-2xl font-bold">
          Omni<span className="text-primary">Node</span>
        </span>
        <span className="text-sm font-medium">
          Management Console
        </span>
      </div>
    </div>
  );
}
