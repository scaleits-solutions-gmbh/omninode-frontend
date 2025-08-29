import Image from "next/image";

interface AppLogoProps {
  size?: "sm" | "md" | "lg";
}

export default function AppLogo({ size = "md" }: AppLogoProps) {
  // Size configurations
  const sizeConfig = {
    sm: {
      imageSize: 36,
      textSize: "text-xl",
      gap: "gap-1",
      skeletonSize: "w-9 h-9"
    },
    md: {
      imageSize: 42,
      textSize: "text-2xl",
      gap: "gap-2",
      skeletonSize: "w-10.5 h-10.5"
    },
    lg: {
      imageSize: 56,
      textSize: "text-3xl",
      gap: "gap-3",
      skeletonSize: "w-14 h-14"
    }
  };

  const config = sizeConfig[size];

  return (
    <div className={`flex items-center ${config.gap}`}>
      <div className="relative">
        {/* Light theme logo (default) */}
        <Image 
          src="/assets/omninode.svg"
          alt="logo" 
          width={config.imageSize} 
          height={config.imageSize}
          className="block dark:hidden"
        />
        {/* Dark theme logo */}
        <Image 
          src="/assets/omninode-dark.svg"
          alt="logo" 
          width={config.imageSize} 
          height={config.imageSize}
          className="hidden dark:block"
        />
      </div>
      <div className="flex flex-col items-start">
        <span className={`${config.textSize} font-bold`}>
          Omni<span className="text-primary">Node</span>
        </span>
      </div>
    </div>
  );
}
