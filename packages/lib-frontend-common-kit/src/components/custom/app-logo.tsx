import Image from "next/image";

interface AppLogoProps {
  srcLight: string;
  srcDark?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  customSize?: number;
}

const sizes = {
  sm: { imageSize: 24, textSize: "text-xl" },
  md: { imageSize: 32, textSize: "text-2xl" },
  lg: { imageSize: 40, textSize: "text-3xl" },
} as const;

export function AppLogo({
  srcLight,
  srcDark,
  alt = "Omninode Logo",
  size = "md",
  customSize,
}: AppLogoProps) {
  return (
    <>
      <Image
        className={"block" + (srcDark ? " dark:hidden" : "")}
        src={srcLight}
        alt={alt || "Omninode Logo"}
        height={customSize || sizes[size].imageSize}
        width={customSize ? customSize * 3 : sizes[size].imageSize * 3}
      />
      {srcDark && (
        <Image
          className="hidden dark:block"
          src={srcDark}
          alt={alt || "Omninode Logo"}
          height={customSize || sizes[size].imageSize}
          width={customSize ? customSize * 3 : sizes[size].imageSize * 3}
        />
      )}
    </>
  );
}
