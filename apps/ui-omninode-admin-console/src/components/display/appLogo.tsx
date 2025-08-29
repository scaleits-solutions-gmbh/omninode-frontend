"use client";
import Image from "next/image";
export default function AppLogo() {
  return (
    <div className="flex items-center gap-2">
      <Image src="/assets/omninode-dark.svg" alt="logo" width={32} height={32} className="hidden dark:block" />
      <Image src="/assets/omninode-light.svg" alt="logo" width={32} height={32} className="block dark:hidden" />
      <div className="flex flex-col">
        <span className="text-2xl font-bold">
          Omni<span className="text-primary">Node</span>
        </span>
      </div>
    </div>
  );
}