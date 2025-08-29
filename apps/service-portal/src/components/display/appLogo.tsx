"use client";
import Image from "next/image";
export default function AppLogo() {

  return (
    <div className="flex items-center gap-2">
        <Image className="block dark:hidden" src={"/assets/omninode.svg"} alt="logo" width={42} height={42} />
        <Image className="hidden dark:block" src={"/assets/omninode-dark.svg"} alt="logo" width={42} height={42} />
      <div className="flex flex-col items-start">
        <span className="text-2xl font-bold">
          Omni<span className="text-primary">Node</span>
        </span>
        <span className="text-sm font-medium">Service Portal</span>
      </div>
    </div>
  );
}
