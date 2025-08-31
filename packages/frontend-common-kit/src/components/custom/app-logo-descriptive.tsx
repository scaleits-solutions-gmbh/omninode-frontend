import { AppLogo } from "./app-logo";
interface AppLogoDescriptiveProps {
  size?: "sm" | "md" | "lg";
  customSize?: number;
  srcLight: string;
  srcDark?: string;
  description: string;
}

export function AppLogoDescriptive({
  size,
  customSize,
  srcLight,
  srcDark,
  description,
}: AppLogoDescriptiveProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <AppLogo
        srcLight={srcLight}
        srcDark={srcDark}
        size={size}
        customSize={customSize}
      />
      <span className="text-sm font-medium">{description}</span>
    </div>
  );
}
